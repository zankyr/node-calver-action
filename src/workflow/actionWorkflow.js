const core = require("@actions/core");
const github = require("@actions/github");
const calver = require("calver");
const jj = require("json");
const packageJson = require("../../package.json");
const fs = require("fs");

const actionWorkflow = () => {
  try {
    const format = "yy.mm.dd";
    const updatedVersion = calver.inc(format, "", "calendar");

    console.log(`Current version: ${packageJson.version}`);
    console.log(`Updated version: ${updatedVersion}`);

    jj.core.setOutput("version", updatedVersion);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
};

module.exports = { actionWorkflow };
