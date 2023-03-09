const core = require("@actions/core");
const github = require("@actions/github");
const calver = require("calver");
const packageJson = require("../../package.json");
const fs = require("fs");

const actionWorkflow = () => {
  try {
    const format = "yy.mm.dd";
    const currentVersion = packageJson.version;
    const updatedVersion = calver.inc(format, "", "calendar");

    core.info(`Current version: ${currentVersion}`);
    core.info(`Updated version: ${updatedVersion}`);

    if (currentVersion === updatedVersion) {
      return core.info(
        "Current version is already the latest, no action required"
      );
    }

    packageJson.version = updatedVersion;

    fs.writeFileSync(
      "./package.json",
      JSON.stringify(packageJson, undefined, 4)
    );

    core.setOutput("version", updatedVersion);
  } catch (error) {
    return core.setFailed(error.message);
  }
};

module.exports = { actionWorkflow };
