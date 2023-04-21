var inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


const { greeting, color } = require('./Assets/greeting');

const firstQuestion = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    },
]

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

function employeeChoices() {
    return db.promise().query("SELECT * from employee")
}

function departmentChoices() {
    return db.promise().query("SELECT * from department")
}

function roleChoices() {
    return db.promise().query("SELECT * from role")
}

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
