const {prompt} = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/index.js');
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
        prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Choose an option:',
                choices: [
                    {
                        name: 'view all departments',
                        value: 'allDepartments',
                        action: () => {
                            db.alldepartments();
                        }
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
        ])
}