const core = require("@actions/core");
const github = require("@actions/github");
const calver = require("calver");
const packageJson = require("../../package.json");
const fs = require("fs");

const actionWorkflow = () => {
  try {
    const format = "yy.mm.dd";
    const updatedVersion = calver.inc(format, "", "calendar");

    console.log(`Current version: ${packageJson.version}`);

    packageJson.version = updatedVersion;
    console.log(`Updated version: ${packageJson.version}`);

    fs.writeFileSync(
      "./package.json",
      JSON.stringify(packageJson, undefined, 4)
    );

    core.setOutput("version", updatedVersion);
  } catch (error) {
    core.setFailed(error.message);
  }
};

module.exports = { actionWorkflow };
