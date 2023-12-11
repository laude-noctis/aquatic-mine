const inquirer = require('inquirer');

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