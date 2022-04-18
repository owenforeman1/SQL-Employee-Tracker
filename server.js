const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

const inquirer = require("./inquirer/prompts");
const cTable = require("console.table");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Query database
// db.query("SELECT * FROM employee", function (err, results) {
//   console.log(results);
// });

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

inquirer.firstPrompt();
