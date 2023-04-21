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


