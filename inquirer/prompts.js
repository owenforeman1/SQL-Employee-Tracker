const { type } = require("express/lib/response");
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // MySQL username,
  user: "root",
  // MySQL password
  password: "bootCamp",
  database: "employee_db",
});

// start of the command line
function firstPrompt() {
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
          viewAllEmployees();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee roles":
          updateEmployeeRole();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View all departments":
          viewAllDepartments();
          break;
        case "Add department":
          addDepartment();
          break;
        case "View employees by manager":
          viewEmployeesByManager();
          break;
        case "View employees by department":
          viewEmployeesByDepartment();
          break;
        case "Delete: Departments, Roles, Employees":
          deleteDepartmentRolesEmployees();
          break;
        case "Combined salaries":
          combinedSalaries();
          break;
        case "Update employee managers":
          updateEmployeeManagers();
          break;
        case "Quit":
          quit();
          break;

        default:
          break;
      }
    });
}
//functions for each option in command line
function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    firstPrompt();
    return results;
  });
}

function addEmployee() {
  db.query(
    "SELECT id, first_name, last_name, role_id, manager_id FROM employee",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      firstPrompt();
      return results;
    }
  );
  inquirer.prompt([
    {
      name: "firstname",
      type: "input",
      message: "Enter their first name",
    },
    {
      name: "lastname",
      type: "input",
      message: "Enter their last name",
    },
    {
      name: "role",
      type: "list",
      message: "What is their role?",
      choices: function () {
        let choiceArray = results.map((choice) => choice.name);
        return choiceArray;
      },
    },
    {
      name: "choice",
      type: "list",
      message: "Who is their manager",
      choices: function () {
        let choiceArray = results.map((choice) => choice.name);
        return choiceArray;
      },
    },
  ]).then;
}

function updateEmployeeRole() {
  db.query("SELECT first_name, last_name, role_id, manager_id", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquirer.prompt([
      {
        name: "firstname",
        type: "input",
        message: "Type the employees first name"
      },
      {
        name: "lastname",
        type: "input",
        message: "Type the employees last name"
      },
      {
        name: "role",
        type: "input",
        message: "Type the employees role id"
      },
      {
        name: "manager",
        type: "input",
        message: "Type the employees manager id"
      }
    ]).then((answer) => {
      
    })
  })
}

function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
    firstPrompt();
    return results;
  });
}

function addRole() {
  db.query(
    "SELECT id, title, salary, department_id FROM role",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What is their role title?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is this role's salary?",
          },
        ])
        .then((answer) => {
          db.query("SELECT id, name FROM department", function (err, results) {
            if (err) throw err;
            console.log(results);
            inquirer
              .prompt([
                {
                  name: "departmentChoice",
                  type: "list",
                  message: "Select a department",
                  choices: function () {
                    let choiceArray = results.map((choice) => choice.name);
                    return choiceArray;
                  },
                },
              ])
              .then((departmentChoice) => {
                db.query(
                  "SELECT id FROM department WHERE name = ?",
                  departmentChoice.departmentChoice,
                  function (err, results) {
                    if (err) throw err;
                    console.log(results);
                    db.query(
                      "INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)",
                      [answer.Title, answer.Salary, results[0].id],
                      function (err, results) {
                        if (err) throw err;
                        console.log(results);
                        viewAllRoles();
                      }
                    );
                  }
                );
              });
          });
        });
      return results;
    }
  );
}

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    firstPrompt();
    return results;
  });
}

function addDepartment() {
  db.query(
    "SELECT name AS 'Departments' FROM department",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      inquirer
        .prompt([
          {
            name: "newDepartment",
            type: "input",
            message: "What department are you adding?",
          },
        ])
        .then((answer) => {
          console.log(answer);
          db.query(
            "INSERT INTO department(name) VALUES(?)",
            answer.newDepartment
          );
          firstPrompt();
        });
    }
  );
}

function viewEmployeesByManager() {}

function viewEmployeesByDepartment() {}

function deleteDepartmentRolesEmployees() {}

function combinedSalaries() {
  db.query("SELECT SUM(salary) FROM role", function (err, results) {
    if (err) throw err;
    console.log(results);
    return results;
  });
}

function updateEmployeeManagers() {}

function quit() {}

//connects to serverjs
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
