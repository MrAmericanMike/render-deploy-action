import CORE from "@actions/core";

const RENDER_SERVICE_ID = CORE.getInput("render-service-id") || process.env.RENDER_SERVICE_ID;
const RENDER_API_KEY = CORE.getInput("render-api-key") || process.env.RENDER_API_KEY;
const WAIT_FOR_SUCCESS = CORE.getInput("wait-for-success") || process.env.WAIT_FOR_SUCCESS || true;

if (RENDER_SERVICE_ID === undefined) {
	CORE.setFailed("render-service-id is not defined");
}

if (RENDER_API_KEY === undefined) {
	CORE.setFailed("render-api-key is not defined");
}

CORE.info("Finished successfully");
