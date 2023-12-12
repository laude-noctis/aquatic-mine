function allDepartments() {
    const allDepartments = 'SELECT * FROM departments ORDER BY name ASC'
    connection.query(allDepartments, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.table(results);
        startPrompt();
    });
};

function allRoles() {
    const allRoles = 'SELECT * FROM roles ORDER BY department_id ASC'
    connection.query(allRoles, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.table(results);
        startPrompt();
    })
};

function allEmployees() {
    const allEmployees = 'SELECT * FROM employees ORDER BY last_name ASC'
    connection.query(allEmployees, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }
        console.table(results);
        startPrompt();
    })
};

function addDepartment() {
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
};

function addRole() {
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
};

function addEmployee() {
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
};

function updateEmployee() {
    const getAllEmployees = 'SELECT * FROM emplooyes';
    connection.query(getAllEmployees, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }

        const employeeChoices = results.map((employee) => ({
            name: employee.first_name + employee.last_name,
            value: employee.id,
        }))
    })

    const AllRoles = 'SELECT * FROM roles';
    connection.query(AllRoles, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return;
        }

        const roleChoices = results.map((role) => ({
            name: role.title,
            value: role.id,
        }));
    },
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
                }
            ]).then((answers) => {
                const employeeChoice = answers.updateEmployee;
                const roleChoice = answers.updateRole;

                const updateEmployee = 'INSERT INTO employees'
                connection.query(updateEmployee, (error, results) => {
                    if (error) {
                        console.error('Error executing query:', error);
                        return;
                    }
                    console.table(results);
                    startPrompt();
                })
            })
    )
};

module.exports = allDepartments(),
allRoles(),
allEmployees(),
addDepartment(),
addEmployee(),
addRole(),
updateEmployee()