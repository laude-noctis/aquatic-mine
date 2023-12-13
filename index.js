const inquirer = require('inquirer');
const mysql = require('mysql2');
const { allDepartments, allEmployees, allRoles, addDepartment, addEmployee, addRole, updateEmployee } = require('./db/query.js')
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Connected to the database!');
        startPrompt();
    }
});


async function startPrompt() {
    const answers = await new Promise((resolve) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Choose an option:',
                choices: [
                    {
                        name: 'view all departments',
                        value: 'allDepartments',
                    },
                    {
                        name: 'view all roles',
                        value: 'allRoles',
                    },
                    {
                        name: 'view all employees',
                        value: 'allEmployees',
                    },
                    {
                        name: 'add a department',
                        value: 'addDepartment',
                    },
                    {
                        name: 'add a role',
                        value: 'addRole',
                    },
                    {
                        name: 'add an employee',
                        value: 'addEmployee',
                    },
                    {
                        name: 'update an employee role',
                        value: 'updateEmployee',
                    },
                    {
                        name: 'exit',
                        value: 'quit',
                    }
                ],
            },
        ]).then((answers) => {
            resolve(answers);
        });
    })

    switch (answers.name) {
        case 'allDepartments':
            allDepartments(startPrompt);
            break;
        case 'allEmployees':
            allEmployees(startPrompt);
            break;
        case 'allRoles':
            allRoles(startPrompt);
            break;
        case 'addDepartment':
            addDepartment(startPrompt);
            break;
        case 'addEmployee':
            addEmployee(startPrompt);
            break;
        case 'addRole':
            addRole(startPrompt);
            break;
        case 'updateEmployee':
            updateEmployee(startPrompt);
            break;
        case 'quit':
            console.log('exiting the application...')
            connection.end();
            process.exit();
          default:
            console.log('Please select an option');
        }
}