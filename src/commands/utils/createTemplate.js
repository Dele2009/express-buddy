import fs from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import { simpleGit } from "simple-git";
import inquirer from "inquirer";
const url = "https://github.com/Dele2009/express-template-ts.git";
const createProject = async (projectName, repoUrl = url) => {
  const targetPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(targetPath)) {
    console.error(chalk.red(`Project directory ${targetPath} already exists.`));
    const { proceed } = await inquirer.prompt([
      {
        type: "confirm",
        name: "proceed",
        message: "Do you want to overwrite the existing directory?",
      },
    ]);
    if (!proceed) {
      console.log(chalk.red("Aborted."));
      process.exit(1);
    }
    fs.rmSync(targetPath, { force: true, recursive: true });
  }
  const spinner = ora("Creating Project Template ...").start();
  try {
    const git = simpleGit();
    await git.clone(repoUrl, targetPath);
    spinner.succeed("Template created successfully.");
    console.log(chalk.green(`Project ${projectName} created successfully.`));
    if (fs.existsSync(path.join(targetPath, "package.json"))) {
      console.log(
        chalk.bold.bgBlack.yellow(`\n\nTo get started run the following commands:\n`)
      );
      console.log(chalk.bold.yellow(`cd ${projectName}\n`));
      console.log(chalk.bold.white(`npm run init`));
      console.log(chalk.bold.white(`npm run dev`));
    }
  } catch (error) {
    spinner.fail("Error fetching template files.");
    process.exit(1);
  }
};
export default createProject;
