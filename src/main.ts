console.log("Deploy to Render");

import CORE from "@actions/core";

const RENDER_SERVICE_ID = CORE.getInput("render-service-id") || process.env.RENDER_SERVICE_ID;
const RENDER_API_KEY = CORE.getInput("render-api-key") || process.env.RENDER_API_KEY;
const WAIT_FOR_SUCCESS = CORE.getInput("wait-for-success") || process.env.WAIT_FOR_SUCCESS || true;

console.log({ RENDER_SERVICE_ID, RENDER_API_KEY, WAIT_FOR_SUCCESS });
