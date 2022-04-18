const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

const inquirer = require("./inquirer/prompts");
const cTable = require("console.table");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "bootCamp",
    database: "employee_db",
  },
);

// Query database
// db.query("SELECT * FROM employee", function (err, results) {
//   console.log(results);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

console.log(`
 _______             _                           
(_______)           | |                          
 _____   ____  ____ | | ___  _   _ _____ _____   
|  ___) |    \\|  _ \\| |/ _ \\| | | | ___ | ___ |  
| |_____| | | | |_| | | |_| | |_| | ____| ____|  
|_______)_|_|_|  __/ \\_)___/ \\__  |_____)_____)  
              |_|           (____/               
 _______                _                        
(_______)              | |                       
    _  ____ _____  ____| |  _ _____  ____        
   | |/ ___|____ |/ ___) |_/ ) ___ |/ ___)       
   | | |   / ___ ( (___|  _ (| ____| |           
   |_|_|   \\_____|\\____)_| \\_)_____)_|           
                                                 
`);

inquirer.firstPrompt(db);
