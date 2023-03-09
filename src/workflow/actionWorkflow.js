const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");
const calver = require("calver");
const packageJson = require("../../package.json");
const fs = require("fs");

const actionWorkflow = async () => {
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

    core.info("Updating package.json");
    packageJson.version = updatedVersion;

    fs.writeFileSync(
      "./package.json",
      JSON.stringify(packageJson, undefined, 2)
    );

    core.info("Pushing changes to the repo");
    await exec.exec("git add", ["./package.json"]);
    await exec.exec("git commit", [
      "-m",
      `Update project version to ${updatedVersion}`,
    ]);
    await exec.exec("git push");

    core.setOutput("version", updatedVersion);
  } catch (error) {
    return core.setFailed(error.message);
  }
};

module.exports = { actionWorkflow };
