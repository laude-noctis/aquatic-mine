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
                    action: () => {

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