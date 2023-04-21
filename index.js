
//-- Adding a dependencies--//
var inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//-- Connecting the greeting message--//
const { greeting, color } = require('./Assets/greeting');

//-- Adding a array "firstQuestion" that contains an object with properties defining a single question to ask the user using the inquirer package--//
const firstQuestion = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    },
]

//-- Adding a array "addDepartmentQuestions" that contains an object with properties defining a single question to ask the user using the inquirer package--//
const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: "What is the name of the department you would like to add?",
       

    },
]

const addRoleQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: "What is the name of the role you would like to add?",
        

    },
    {
        type: 'input',
        name: 'roleSalary',
        message: "What is the salary for this role?",
        

    },
]

const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: "For the employee you want to add, what is their first name?",
        

    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is their last name?",
        

    },
]
//-- Adding a 3 functions that use the mysql2:
//-- The db.promise() syntax means that the query function will return a promise that can be resolved with .then() or await--//
//-- employeeChoices() queries the employee table in the database and returns a promise that resolves with the results of the query--//
//-- departmentChoices() queries the department table in the database and returns a promise that resolves with the results of the query--//
//-- roleChoices() queries the role table in the database and returns a promise that resolves with the results of the query--//

function employeeChoices() {
    return db.promise().query("SELECT * from employee")
}

function departmentChoices() {
    return db.promise().query("SELECT * from department")
}

function roleChoices() {
    return db.promise().query("SELECT * from role")
}

//-- Adding a function init that serves as the entry point for the command-line application--//
//-- the inquirer uses package to prompt the user with the firstQuestion array of choices--//
//-- If the user selects 'View all departments', the viewDepartments function is called--//
// -- If the user selects 'View all roles', the viewRoles function is called and etc...--//

function init() {
    console.log(greeting)
    inquirer
        .prompt(firstQuestion)
        .then((answer) => {

            
            if (answer.menu === 'View all departments') {
                viewDepartments()
            } else if (answer.menu === 'View all roles') {
                viewRoles()
            } else if (answer.menu === 'View all employees') {
                viewEmployees()
            } else if (answer.menu === 'Add a department') {
                addDepartment()
            } else if (answer.menu === 'Add a role') {
                addRole()
            } else if (answer.menu === 'Add an employee') {
                addEmployee()
            } else if (answer.menu === 'Update an employee role') {
                updateRole()
            } else {
                console.log('Have a nice day!')
                process.exit()
            }
        })
}
//-- Adding a The createConnection() function takes an object with configuration options for the connection--//
const db = mysql.createConnection(
    
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'Password1',
        database: 'Goldie_db'
        
    },
    console.log(`Connected to the classlist_db database.`)
);

init()

//-- Adding a  functions that retrieve data from the MySQL database and display it in a formatted table using the console.table()--//
//-- The viewDepartments() function retrieves all the departments in the department--//
//-- then calls the init() function to return the user to the main menu--//
//-- The viewRoles() function retrieves all the roles in the role table using a SQL SELECT statement--//
//-- The viewEmployees() function retrieves all the employees in the employee table--//
function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init() 
    });
}


function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        init() 
    });
}

function viewEmployees() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (err, results) {
        console.table(results);
        init()
    });
}
function addDepartment() {
    inquirer
        .prompt(addDepartmentQuestions)
        .then((answer) => {
            db.query(`INSERT INTO department (id, name)
        VALUES (id, '${answer.departmentName}');`, function (err, results) {
                console.log(`Success! You added the ${answer.departmentName} department.`)
                init()
            })
        })
}
function addRole() {
    inquirer
        .prompt(addRoleQuestions)
        .then((answers) => {
            const roleTitle = answers.roleName
            const roleSalary = answers.roleSalary
            departmentChoices().then(response => {
                const dChoices = response[0].map(({ id, name }) => ({ name: name, value: id }))
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'roleDepartment',
                            message: "What is the department in for this role?",
                            choices: dChoices
                        },
                    ]).then((answer) => {
                        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, [roleTitle, roleSalary, answer.roleDepartment], function (err, results) {
                            
                            console.log(`Success! You added the ${roleTitle} role.`)
                            init()
                        })
                    })
            })

        })
}
function addEmployee() {
    inquirer
        .prompt(addEmployeeQuestions)
        .then((answers) => {
            const firstName = answers.firstName
            const lastName = answers.lastName
            roleChoices().then(response => {
                const rChoices = response[0].map(({ id, title }) => ({ name: title, value: id }))
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'newRole',
                            message: "What will be their role?",
                            choices: rChoices
                        },
                    ]).then((answers) => {
                        
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [firstName, lastName, answers.newRole, null], function (err, results) {
                            console.log("Success! " + firstName + " " + lastName + " has been added to the employee database")
                            init()
                        });
                    })
            })
        })
}
function updateRole() {
    employeeChoices().then(response => {
        
        let empChoices = response[0].map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id })) //creates an array 
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeChosen',
                    message: "What is the name of the employee for whom you want to update the role?",
                    choices: empChoices

                },

            ])
            .then((answers) => {
                
                const employee = answers.employeeChosen
                roleChoices().then(response => {
                    const rChoices = response[0].map(({ id, title }) => ({ name: title, value: id }))
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'newRole',
                                message: "What is their new role?",
                                choices: rChoices
                            },
                        ]).then((answers) => {
                            
                            db.query("UPDATE employee SET role_id= ? WHERE id= ?", [answers.newRole, employee])
                            console.log("Success! Role has been updated.")
                            init()
                        })
                })
            })
    })
}