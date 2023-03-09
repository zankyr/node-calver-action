const core = require("@actions/core");
const github = require("@actions/github");
const calver = require("calver");
const { version } = require("./package.json");

try {
  const format = "yy.mm.dd";
  const updatedVersion = calver.inc(format, "", "calendar");

  console.log(`Current version: ${version}`);
  console.log(`Updated version: ${updatedVersion}`);

  core.setOutput("version", updatedVersion);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
