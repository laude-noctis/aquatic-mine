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
                    const allRoles = 'SELECT * FROM roles ORDER BY department_id ASC'
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
                                startPrompt();
                            })
                        });
                    break;
                    case 'addRole':
                        const getAllDepartments = 'SELECT * FROM departments';
                        connection.query(getAllDepartments, (error, results) => {
                          if (error) {
                            console.error('Error executing query:', error);
                            return;
                          }
                      
                          const departmentChoices = results.map((department) => ({
                            name: department.name,
                            value: department.id,
                          }));
                      
                          inquirer.prompt([
                            {
                              type: 'input',
                              name: 'titleRole',
                              message: 'What is the new role?'
                            },
                            {
                              type: 'input',
                              name: 'salaryRole',
                              message: 'What is the salary for the role?'
                            },
                            {
                              type: 'list',
                              name: 'departmentRole',
                              message: 'What department does the role belong to?',
                              choices: departmentChoices,
                            },
                          ]).then((answers) => {
                            const titleRole = answers.titleRole;
                            const salaryRole = answers.salaryRole;
                            const departmentId = answers.departmentRole;
                      
                            const addRole = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
                            connection.query(addRole, [titleRole, salaryRole, departmentId], (error, results) => {
                              if (error) {
                                console.error('Error executing query:', error);
                                return;
                              }
                      
                              console.table(results);
                              startPrompt();
                            });
                          });
                        });
                    break;
                    case 'addEmployee':
                        const getAllRoles = 'SELECT * FROM roles';
                        connection.query(getAllRoles, (error, results) => {
                          if (error) {
                            console.error('Error executing query:', error);
                            return;
                          }

                          const roleChoices = results.map((role) => ({
                            name: role.title,
                            value: role.id,
                          }));

                          inquirer
                            .prompt([
                              {
                                type: 'input',
                                name: 'firstName',
                                message: `What is the employee's first name?`
                              },
                              {
                                type: 'input',
                                name: 'lastName',
                                message: `What is the employee's last name?`
                              },
                              {
                                type: 'list',
                                name: 'newRole',
                                message: `What is the employee's role?`,
                                choices: roleChoices,
                              },
                            ])
                            .then((answers) => {
                              const firstName = answers.firstName;
                              const lastName = answers.lastName;
                              const newRole = answers.newRole;

                              const addEmployee = 'INSERT INTO employees (first_name, last_name, roles_id) VALUES (?, ?, ?)';
                              connection.query(addEmployee, [firstName, lastName, newRole], (error, results) => {
                                if (error) {
                                  console.error('Error executing query:', error);
                                  return;
                                }
                                console.table(results);
                                startPrompt();
                              });
                            });
                        });
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