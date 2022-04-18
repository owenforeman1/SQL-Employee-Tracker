const inquirer = require("inquirer");
function firstPrompt(params) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your user name?",
        name: "username",
      },
      {
        type: "languages",
        message: "What languages do you know?",
        name: "language",
      },
      {
        type: "communication",
        message: "What is your preferred method of communication?",
        name: "confirm",
      },
    ])
    .then((response) =>
      response.confirm === response.password
        ? console.log("Success!")
        : console.log("You forgot your password already?!")
    );
}

function viewAllEmployees(params) {}

function addEmployee(params) {}

function updateEmployeeRole(params) {}

function viewAllRoles(params) {}

function addRole(params) {}

function viewAllDepartments(params) {}

function addDepartment(params) {}

function viewEmployeesByManager(params) {}

function viewEmployeesByDepartment(params) {}

function deleteDepartmentRolesEmployees(params) {}

function combinedSalaries(db) {
  db.query("SELECT SUM(salary) FROM role", function(err, results) {
    console.log(results);
    return results;
  });
}

function updateEmployeeManagers(params) {}

function quit(params) {}

module.exports = {
firstPrompt,
viewAllEmployees,
addEmployee,
updateEmployeeRole,
viewAllRoles,
addRole,
viewAllDepartments,
addDepartment,
viewEmployeesByManager,
viewEmployeesByDepartment,
deleteDepartmentRolesEmployees,
combinedSalaries,
updateEmployeeManagers
}
