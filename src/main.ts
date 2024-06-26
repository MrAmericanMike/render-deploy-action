import CORE from "@actions/core";
import { DeployStatusData } from "./types";

const RENDER_SERVICE_ID = CORE.getInput("render-service-id") || process.env.RENDER_SERVICE_ID;
const RENDER_API_KEY = CORE.getInput("render-api-key") || process.env.RENDER_API_KEY;
const WAIT_FOR_SUCCESS = CORE.getInput("wait-for-success") || process.env.WAIT_FOR_SUCCESS || true;

let ERROR = false;

if (RENDER_SERVICE_ID === undefined) {
	CORE.setFailed("'render-service-id' is not defined");
	ERROR = true;
}

if (RENDER_API_KEY === undefined) {
	CORE.setFailed("'render-api-key' is not defined");
	ERROR = true;
}

async function checkRenderDeployStatus(deployId: string) {
	const RESPONSE = await fetch(`https://api.render.com/v1/services/${RENDER_SERVICE_ID}/deploys/${deployId}`, {
		headers: { Authorization: `Bearer ${RENDER_API_KEY}` }
	});

	if (RESPONSE.ok) {
		const DATA: DeployStatusData = await RESPONSE.json();
		return DATA.status;
	} else {
		throw Error("Could not retrieve Render deploy status.");
	}
}

async function waitForSuccess(data: DeployStatusData) {
	let previousStatus = "";
	while (true) {
		await new Promise((resolve) => {
			setTimeout(resolve, 10000);
		});

		const STATUS = await checkRenderDeployStatus(data.id);

		if (STATUS !== previousStatus) {
			CORE.info(`Deploy status: ${STATUS}`);
			previousStatus = STATUS;
		}

		if (STATUS.endsWith("failed") || STATUS === "canceled" || STATUS === "deactivated") {
			CORE.setFailed(`Deploy status: ${STATUS}`);
			return;
		}

		if (STATUS === "live") {
			CORE.info(`Deploy finished successfully`);
			return;
		}
	}
}

async function runDeploy() {
	const RESPONSE = await fetch(`https://api.render.com/v1/services/${RENDER_SERVICE_ID}/deploys`, {
		method: "POST",
		headers: { Authorization: `Bearer ${RENDER_API_KEY}` }
	});

	const DATA = await RESPONSE.json();
	if (RESPONSE.status === 401) {
		CORE.setFailed("Render Deploy Action: Unauthorized. Please check your API key.");
		return;
	} else if (!RESPONSE.ok) {
		CORE.setFailed(`Deploy error: ${DATA.message} (status code ${RESPONSE.status})`);
		return;
	}

	CORE.info(`Deploy ${DATA.status} - Commit: ${DATA.commit.message}`);

	if (WAIT_FOR_SUCCESS === "true" || WAIT_FOR_SUCCESS === "1" || WAIT_FOR_SUCCESS === true) {
		await waitForSuccess(DATA);
	}
}
if (!ERROR) {
	runDeploy().catch((error) => CORE.setFailed(error.message));
}
