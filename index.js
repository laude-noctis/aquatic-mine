const inquirer = require('inquirer');
const mysql = require('mysql2');
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
                    const allDepartments = 'SELECT * FROM departments ORDER BY name ASC'
                    connection.query(allDepartments, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            return;
                        }
                        console.table(results);
                        startPrompt();
                    });
                    break;
                case 'allRoles':
                    const allRoles = 'SELECT * FROM roles ORDER BY department ASC'
                    connection.query(allRoles, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            return;
                        }
                        console.table(results);
                        startPrompt();
                    })
                    break;
                case 'allEmployees':
                    const allEmployees = 'SELECT * FROM employees ORDER BY last_name ASC'
                    connection.query(allEmployees, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            return;
                        }
                        console.table(results);
                        startPrompt();
                    })
                    break;
                case 'addDepartment':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'departmentName',
                                message: 'Enter the department name:',
                            },
                        ])
                        .then((answers) => {
                            const departmentName = answers.departmentName;
                            const addDepartment = 'INSERT INTO departments (name) VALUES (?)';

                            connection.query(addDepartment, [departmentName], (error, results) => {
                                if (error) {
                                    console.error('Error executing query:', error);
                                    return;
                                }
                        console.table(results);
                        startPrompt();
                    })
                });
                    break;
                case 'addRole':
                    const addRole = ''
                    connection.query(addRole, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            return;
                        }
                        console.table(results);
                        startPrompt();
                    })
                    break;
                case 'addEmployee':
                    const addEmployee = ''
                    connection.query(addEmployee, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            return;
                        }
                        console.table(results);
                        startPrompt();
                    })
                    break;
                case 'updateEmployee':
                    const updateEmployee = ''
                    connection.query(updateEmployee, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            return;
                        }
                        console.table(results);
                        startPrompt();
                    })
                    break;
                case 'quit':
                    console.log('exiting the application...')
                    connection.end();
                    process.exit();
                    break;
                default:
                    console.log('please select an option')
            }
        })
}