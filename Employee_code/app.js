const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function
// const render = require("./lib/htmlRenderer");
// Alternative rendering function
const render = require("./lib/page-template.js.js");

const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user
const idArray = [];

function appMenu() {
  // create manager first then create the team
  // once manager is created we will create team by asking the user which type of employee to create
  // based on choice we will  make that employee object
  // loop through the create team until user is done from create employee
  // then we will use the employee objects to build the team
  function createManager() {
    console.log("Please build your team");
    inquirer
      .prompt([
        // CREATE OBJECTS OF QUESTIONS HERE FOR
        {
          type: "input",
          name: "managerName",
          message: "Enter name of team manager",
        },
        {
          type: "input",
          name: "managerId",
          message: "Enter manager id:",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "please enter a Manager id Number to continue";
            }
          },
        },
        {
          type: "input",
          name: "managerEmail",
          message: "Enter the manager's e-mail",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "please enter the manager's e-mail to continue";
            }
          },
        },
        {
          type: "input",
          name: "managerOfficeNum",
          message: "Enter managers office number",
        },
        {
          type: "list",
          name: "managerJobTitle",
          choices: ["Manager", "Engineer", "Intern"],
        },
      ])
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber,
          answers.managerJobTitle
        );
        // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
        // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
        teamMembers.push(manager);
        idArray.push(answers.managerId);

        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        // CREATE OBJECTS OF QUESTIONS HERE FOR
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "Enter name of engineer",
        },
        {
          type: "input",
          name: "engineerId",
          message: "Enter engineer id: ",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "please enter Engineer Id to continue";
            }
          },
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "Enter the engineer's e-mail",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "please enter Engineer e-mail to continue";
            }
          },
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "Enter engineer's github username",
        },
        {
          type: "list",
          name: "engineerJobTitle",
          choices: ["Manager", "Engineer", "Intern"],
        },
        //
        // YOUR CODE HERE
        // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      ])
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub,
          answers.engineerJobTitle
        );
        // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
        // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);

        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        // CREATE OBJECTS OF QUESTIONS HERE FOR
        {
          type: "input",
          name: "internName",
          message: "Enter name of Intern",
        },
        {
          type: "input",
          name: "internId",
          message: "Enter Intern id: ",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "please enter intern's Id to continue";
            }
          },
        },
        {
          type: "input",
          name: "internEmail",
          message: "Enter the intern's e-mail",
          validate: (value) => {
            if (value) {
              return true;
            } else {
              return "please enter intern's e-mail to continue";
            }
          },
        },
        {
          type: "input",
          name: "internEdu",
          message: "Enter the name of the university the intern attends",
        },
        {
          type: "list",
          name: "internJobTitle",
          choices: ["Manager", "Engineer", "Intern"],
        },
      ])
      // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
      //    TO THE INTERN CLASS CONSTRUCTOR
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internEdu,
          answers.InternJobTitle
        );
        // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
        // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
        teamMembers.push(intern);
        idArray.push(answers.internId);

        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();
}

appMenu();
