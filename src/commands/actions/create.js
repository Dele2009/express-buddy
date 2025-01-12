import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import createProject from "../utils/createTemplate.js";
const create = async (name) => {
    console.log(chalk.yellow(figlet.textSync("EXPRESS BUDDY", {
        horizontalLayout: "full",
        verticalLayout: "full",
    })));
    const questions = [
        {
            type: "input",
            name: "projectName",
            message: "Enter the project name:",
            when: () => !name,
        },
    ];
    const answers = await inquirer.prompt(questions);
    const projectName = name || answers.projectName;
    await createProject(projectName);
};
export default create;
