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

function startPrompt() {
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
                }],
        },
    ]).then((answers) => {
        switch (answers.name) {
            case 'allDepartments':
                allDepartments();
                break;
            case 'allRoles':
                allRoles();
                break;
            case 'allEmployees':
                allEmployees();
                break;
            case 'addDepartment':
                addDepartment();
                break;
            case 'addRole':
                addRole();
                break;
            case 'addEmployee':
                addEmployee();
                break;
            case 'updateEmployee':
                updateEmployee();
                break;
            case 'quit':
                console.log('exiting the application...')
                connection.end();
                process.exit();
            default:
                console.log('please select an option')
        }
    })
}