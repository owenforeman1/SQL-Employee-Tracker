const inquirer = require("inquirer");

function firstPrompt(db) {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choices",
        choices: [
          "View all employees",
          "Add employee",
          "Update employee roles",
          "View all roles",
          "Add Role",
          "View all departments",
          "Add department",
          "View employees by manager",
          "View employees by department",
          "Delete: Departments, Roles, Employees",
          "Combined salaries",
          "Update employee managers",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      switch (response.choices) {
        case "View all employees":
          viewAllEmployees(db);
          break;
        case "Add employee":
          addEmployee(db);
          break;
        case "Update employee roles":
          updateEmployeeRole(db);
          break;
        case "View all roles":
          viewAllRoles(db);
          break;
        case "Add Role":
          addRole(db);
          break;
        case "View all departments":
          viewAllDepartments(db);
          break;
        case "Add department":
          addDepartment(db);
          break;
        case "View employees by manager":
          viewEmployeesByManager(db);
          break;
        case "View employees by department":
          viewEmployeesByDepartment(db);
          break;
        case "Delete: Departments, Roles, Employees":
          deleteDepartmentRolesEmployees(db);
          break;
        case "Combined salaries":
          combinedSalaries(db);
          break;
        case "Update employee managers":
          updateEmployeeManagers(db);
          break;
        case "Quit":
          quit(db);
          break;

        default:
          break;
      }
    });
}

function viewAllEmployees(db) {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    firstPrompt();
    return results;
  });
}

function addEmployee(db) {}

function updateEmployeeRole(db) {}

function viewAllRoles(db) {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    firstPrompt();
    return results;
  });
}

function addRole(db) {}

function viewAllDepartments(db) {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    firstPrompt();
    return results;
  });
}

function addDepartment(db) {}

function viewEmployeesByManager(db) {}

function viewEmployeesByDepartment(db) {}

function deleteDepartmentRolesEmployees(db) {}

function combinedSalaries(db) {
  db.query("SELECT SUM(salary) FROM role", function (err, results) {
    console.log(results);
    return results;
  });
}

function updateEmployeeManagers(db) {}

function quit(db) {}

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
  updateEmployeeManagers,
};
