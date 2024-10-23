INSERT INTO department (department_name)
VALUES ('Sales'),
('Human Resources'),
('Development');

INSERT INTO role (role_title, role_salary, role_department_id)
VALUES ('Sales Rep', 1000.10, 1),
('Sales Manager', 2000.20, 1),
('Recruiter', 1500.10, 2),
('Trainer', 3000.30, 2),
('Developer', 1500.10, 3),
('Poject Manager', 4000.40, 3);


INSERT INTO employee(employee_first_name, employee_last_name, employee_role_id, employee_manager_id)
VALUES ('James', 'Howlett', 1, 2),
('Ororo', 'Munroe', 1),
('Charles', 'Xavier', 2),
('Raven', 'Darkhome', 2),
('Henry', 'McCoy', 3, 6),
('Erik', 'Lehnsherr', 3);