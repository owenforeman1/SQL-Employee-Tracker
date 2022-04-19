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
          "Delete: Departments, Roles, Employees",
          "Combined salaries",
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
        case "Delete: Departments, Roles, Employees":
          deleteDepartmentRolesEmployees();
          break;
        case "Combined salaries":
          combinedSalaries();
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
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name,role.title, role.salary, department.name AS department, manager.first_name AS ManagerName
FROM employee 
LEFT JOIN role ON role.id = employee.role_id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN Employee manager ON employee.manager_id = manager.id;`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      firstPrompt();
      return results;
    }
  );
}

function addEmployee() {
  //all roles and managers
  db.query(
    `SELECT * FROM employee WHERE manager_id IS NULL;`,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      db.query(`SELECT * FROM role;`, function (err, roleResults) {
        if (err) throw err;
        console.table(roleResults);
        inquirer
          .prompt([
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
                let choiceArray = roleResults.map(
                  (choice) => choice.title + "-" + choice.department_id
                );
                return choiceArray;
              },
            },
            {
              name: "manager",
              type: "list",
              message: "Who is their manager",
              choices: function () {
                let choiceArray = results.map(
                  (choice) => choice.first_name + "-" + choice.id
                );
                return choiceArray;
              },
            },
          ])
          .then((answer) => {
            console.log(answer);
            db.query(
              "INSERT INTO employee(first_name, last_name, role_id, manager_id ) VALUES(?, ?, ?, ?)",
              [
                answer.firstname,
                answer.lastname,
                answer.role.split("-")[1],
                answer.manager.split("-")[1],
              ],
              function (err, results) {
                if (err) throw err;
                console.log(results);
                viewAllRoles();
              }
            );
          });
      });
    }
  );
}

function updateEmployeeRole() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt([
        {
          name: "name",
          type: "list",
          message: "What is the employees name?",
          choices: function () {
            let choiceArray = results.map(
              (choice) =>
                choice.first_name + " " + choice.last_name + "-" + choice.id
            );
            return choiceArray;
          },
        },
      ])
      .then((employeeAnswer) => {
        db.query("SELECT * FROM role", function (err, results) {
          if (err) throw err;
          console.table(results);
          inquirer
            .prompt([
              {
                name: "newRole",
                type: "list",
                message: "Select a new role for this employee",
                choices: function () {
                  let choiceArray = results.map(
                    (choice) => choice.title + "-" + choice.id
                  );
                  return choiceArray;
                },
              },
            ])
            .then((roleAnswer) => {
              db.query(
                `UPDATE employee
                SET role_id = ? 
                WHERE id = ?;`,
                [
                  roleAnswer.newRole.split("-")[1],
                  employeeAnswer.name.split("-")[1],
                ],
                function (err, results) {
                  if (err) throw err;
                  console.table(results);
                  viewAllEmployees();
                }
              );
            });
        });
      });
  });
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

function deleteDepartmentRolesEmployees() {}

function combinedSalaries() {
  db.query("SELECT SUM(salary) FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
    return results;
  });
  firstPrompt();
}

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
  deleteDepartmentRolesEmployees,
  combinedSalaries,
};
