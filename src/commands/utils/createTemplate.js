import fs from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import { simpleGit } from "simple-git";
import inquirer from "inquirer";
import { execSync } from "child_process";

const defaultUrl = "https://github.com/Dele2009/express-template-ts.git";

const createProject = async (
  projectName,
  templateType,
  repoUrl = defaultUrl
) => {
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
    // const git = simpleGit();
    // await git.clone(repoUrl, targetPath);
    await new Promise((resolve, reject) => {
      fs.cp(
        path.join(process.cwd(), `src/app-templates/exp-budy-${templateType}`),
        targetPath,
        { recursive: true },
        (err) => {
          if (err) {
            spinner.fail("Error fetching template files.");
            reject(err);
          }
        }
      );
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    spinner.succeed("Template created successfully.");
    console.log(chalk.green(`Project ${projectName} created successfully.`));

    const { installPkgs } = await inquirer.prompt([
      {
        type: "confirm",
        name: "installPkgs",
        message: "Do you want to install project dependencies?",
      },
    ]);

    if (installPkgs) {
      spinner.start("Installing project dependencies ...");
      execSync("npm run init", { cwd: targetPath, stdio: "inherit" });
      spinner.succeed("Project dependencies installed successfully");
    }
    console.log(
      chalk.bold.bgGreenBright.white(
        `\n\nTo get started run the following commands:\n`
      )
    );
    console.log(chalk.bold.yellow(`cd ${projectName}\n`));
    console.log(installPkgs ? "" : chalk.bold.white(`npm run init`));
    console.log(chalk.bold.white(`npm run dev`));
    
  } catch (error) {
    spinner.fail("An error ocurred while creating the project.");
    process.exit(1);
  }
};
export default createProject;
