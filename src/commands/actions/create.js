import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import createProject from "../utils/createTemplate.js";
import { Choices } from "../utils/choiceValues.js";
import { validateInput } from "../utils/validateQuestions.js";
const create = async (name, options) => {
    console.log(chalk.bold.greenBright(figlet.textSync("EXPRESS BUDDY", {
        horizontalLayout: "full",
        verticalLayout: "full",
        font: "Big Money-ne",
    })));
    const questions = [
        {
            type: "input",
            name: "projectName",
            message: chalk.bold.bgGreenBright("Enter the project name:"),
            when: () => !name,
            validate: (input) => validateInput(input),
        },
        {
            type: "list",
            name: "templateType",
            message: chalk.bold.bgGreenBright("Select template type:"),
            choices: Choices.templateType,
            when: () => !options.template,
        },
    ];
    const answers = await inquirer.prompt(questions);
    const projectName = name || answers.projectName;
    const templateType = options.template || answers.templateType;
   
    await createProject(projectName, templateType);
};
export default create;
