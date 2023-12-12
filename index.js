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
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Choose an option:',
                choices: [
                    {
                        name: 'view all departments',
                        value: 'allDepartments',
                        action: () => {
                            const query = 'SELECT * FROM departments ORDER BY name ASC';
                            connection.query(query, (error, results) => {
                                if (error) {
                                    console.error(error);
                                } else {
                                    console.log(results);
                                }
                                connection.end();
                            });
                        }
                    },
                    {
                        name: 'view all roles',
                        value: 'allRoles',
                        action: () => {

                        }
                    },
                    {
                        name: 'view all employees',
                        value: 'allEmployees',
                        action: () => {

                        }
                    },
                    {
                        name: 'add a department',
                        value: 'addDepartment',
                        action: () => {

                        }
                    },
                    {
                        name: 'add a role',
                        value: 'addRole',
                        action: () => {

                        }
                    },
                    {
                        name: 'add an employee',
                        value: 'addEmployee',
                        action: () => {

                        }
                    },
                    {
                        name: 'update an employee role',
                        value: 'updateEmployee',
                        action: () => {

                        }
                    },
                    {
                        name: 'exit',
                        value: 'quit',
                        action: () => {

                        }
                    }],
            },
        ])
}