import CORE from "@actions/core";

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

if (!ERROR) {
	CORE.info("Finished successfully");
}
