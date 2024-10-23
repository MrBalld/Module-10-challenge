import inquirer from 'inquirer';
import {type QueryResult } from 'pg';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});

const connectToDb = async () => {
    try {
      await pool.connect();
      console.log('Connected to the database.');
    } catch (err) {
      console.error('Error connecting to database:', err);
      process.exit(1);
    }
};

await connectToDb();
function doAction (): void {
  inquirer
    .prompt([
      {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit' 
      ],
    },
  ])
  .then((ansers: any) => {
    if(ansers.action === 'view all departments') {
      pool.query(`SELECT * FROM department`, (err: Error, result: QueryResult) => {
        if(err) {
          console.log(err);
        } else if (result){
          console.log(result.rows)
        }
      }
      );
    } else if (ansers.action === 'view all roles') {
      pool.query(`SELECT * FROM role`, (err: Error, result: QueryResult) => {
        if(err) {
          console.log(err);
        } else if (result){
          console.log(result.rows)
        }
      }
      );
    } else if(ansers.action === 'view all employees') {
      pool.query(`SELECT * FROM employee`, (err: Error, result: QueryResult) => {
        if(err) {
          console.log(err);
        } else if (result){
          console.log(result.rows)
        }
      }
      );
    } else if(ansers.action === 'add a department') {
      inquirer
        .prompt([{
          type: 'input',
          message: 'Please enter the name of the new department you would like to add',
          name: 'depName'
        },
      ])
      .then((res: any) => {
        pool.query(`INSERT INTO deparment (department_name) VALUES (${res.depName})`, (err: Error, result: QueryResult) => {
          if(err) {
            console.log(err);
          }
        }
        );
      });
    } else if (ansers.action === 'add a role') {
      inquirer
        .prompt([{
          type: 'input',
          message: 'Please enter the title of the new role you would like to add',
          name: 'roleName'
        }, 
        {
          type: 'number',
          message: 'Please enter the salary of the new role',
          name: 'roleSalary'
        },
        {
          type: 'number',
          message: 'Please enter the id of the department this role will be a part of',
          name: 'roleDepartmentId'
        }

      ])
      .then((res: any) => {
        pool.query(`INSERT INTO role (role_title, role_salary, role_department_id) VALUES (${res.roleName}, ${res.roleSalary}, ${res.roleDepartmentId})`, (err: Error, result: QueryResult) => {
          if(err) {
            console.log(err);
          }
        }
        );
      });
    } else if (ansers.action === 'add an employee') {
      inquirer
      .prompt([{
        type: 'input',
        message: 'Please enter the first name of the new employee you would like to add',
        name: 'employeeNameFirst'
      }, 
      {
        type: 'input',
        message: 'Please enter the last name of the new employee you would like to add',
        name: 'employeeNameLast'
      },
      {
        type: 'number',
        message: 'Please enter the id of the role this employee will have',
        name: 'employeeRoleId'
      },
      {
        type: 'number',
        message: 'Please enter the id of the manager this employee will report to ',
        name: 'employeeManagerId'
      }

    ])
    .then((res: any) => {
      pool.query(`INSERT INTO employee (employee_first_name, employee_last_name, employee_role_id, employee_manager_id) VALUES (${res.employeeNameFirst}, ${res.employeeNameLast}, ${res.employeeRoleId}, ${res.employeeManagerId})`, (err: Error, result: QueryResult) => {
        if(err) {
          console.log(err);
        }
      }
      );
    });
    } else if (ansers.action === 'update an employee role') {
      inquirer
      .prompt([{
        type: 'number',
        message: 'Please input the employee id number',
        name: 'employeeId'
      },
      {
        type: 'number',
        message: 'Please input the new role id number',
        name: 'roleId'
      }
    ])
    .then((res: any) =>{
      pool.query(`UPDATE employee SET employee_role_id = ${res.roleId} WHERE employee_id = ${res.employeeId}`, (err: Error, result: QueryResult) => {
        if(err) {
          console.log(err);
        }
      }
      );
    });
    } else if (ansers.action === 'quit') {
      return;
    }
  });
  doAction()
}
doAction();

