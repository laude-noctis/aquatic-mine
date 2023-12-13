const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

function allDepartments(startPrompt) {
    const allDepartments = 'SELECT * FROM departments ORDER BY department ASC'
    connection.query(allDepartments, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.table(results);
        startPrompt();
    });
};

function allRoles(startPrompt) {
    const allRoles = `
      SELECT roles.id, roles.title, roles.salary, departments.department
      FROM roles
      JOIN departments ON roles.department_id = departments.id
      ORDER BY roles.department_id ASC
    `;
    connection.query(allRoles, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
      console.table(results);
      startPrompt();
    });
};

function allEmployees(startPrompt) {
    const allEmployeesQuery = `
      SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employees
      JOIN roles ON employees.roles_id = roles.id
      JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS manager ON employees.manager_id = manager.id
      ORDER BY departments.department ASC;
    `;
  
    connection.query(allEmployeesQuery, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
      console.table(results);
      startPrompt();
    });
  }

function addDepartment(startPrompt) {
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
            const addDepartment = 'INSERT INTO departments (department) VALUES (?)';

            connection.query(addDepartment, [departmentName], (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return;
                }
                startPrompt();
            })
        });
};

function addRole(startPrompt) {
    const getAllDepartments = 'SELECT * FROM departments';
    connection.query(getAllDepartments, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }

        const departmentChoices = results.map((department) => ({
            name: department.department,
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
                startPrompt();
            });
        });
    });
};

function addEmployee(startPrompt) {
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

        const getAllEmployees = 'SELECT * FROM employees';
        connection.query(getAllEmployees, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return;
            }
            const employeeChoices = [
                { name: 'NULL', value: null },
                ...results.map((employee) => ({
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id,
                })),
            ];
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: `What is the employee's first name?`,
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: `What is the employee's last name?`,
                    },
                    {
                        type: 'list',
                        name: 'newRole',
                        message: `What is the employee's role?`,
                        choices: roleChoices,
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: `Who is the employee's manager?`,
                        choices: employeeChoices,
                    },
                ])
                .then((answers) => {
                    const firstName = answers.firstName;
                    const lastName = answers.lastName;
                    const newRole = answers.newRole;
                    const managerId = answers.manager;

                    const addEmployeeQuery =
                        'INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)';
                    const params = [firstName, lastName, newRole, managerId];

                    connection.query(addEmployeeQuery, params, (error, results) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            return;
                        }
                        console.log('New employee added successfully');
                        startPrompt();
                    });
                });
        });
    });
}

function updateEmployee(startPrompt) {
    let employeeChoices;
    let roleChoices;
  
    const getAllEmployees = 'SELECT * FROM employees';
    const getAllRoles = 'SELECT * FROM roles';
  
    connection.query(getAllEmployees, (error, employeeResults) => {
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
      employeeChoices = employeeResults.map((employee) => ({
        name: employee.first_name + ' ' + employee.last_name,
        value: employee.id,
      }));
  
      connection.query(getAllRoles, (error, roleResults) => {
        if (error) {
          console.error('Error executing query:', error);
          return;
        }
        roleChoices = roleResults.map((role) => ({
          name: role.title,
          value: role.id,
        }));
  
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'updateEmployee',
              message: 'Which employee would you like to update?',
              choices: employeeChoices,
            },
            {
              type: 'list',
              name: 'updateRole',
              message: 'Which role do you want to assign the selected employee?',
              choices: roleChoices,
            },
          ])
          .then((answers) => {
            const employeeChoice = answers.updateEmployee;
            const roleChoice = answers.updateRole;
  
            const updateEmployeeQuery = 'UPDATE employees SET roles_id = ? WHERE id = ?';
            const params = [roleChoice, employeeChoice];
  
            connection.query(updateEmployeeQuery, params, (error, results) => {
              if (error) {
                console.error('Error executing query:', error);
                return;
              }
              console.log('Employee role updated successfully');
              startPrompt();
            });
          });
      });
    });
  }

module.exports = {
    allDepartments,
    allRoles,
    allEmployees,
    addDepartment,
    addEmployee,
    addRole,
    updateEmployee
}