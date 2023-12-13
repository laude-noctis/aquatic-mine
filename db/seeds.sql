INSERT INTO departments (department)
VALUES ('Sales'),
       ('Marketing'),
       ('Finance'),
       ('IT'),
       ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Manager', 80000.00, 1),
        ('Account Executive', 90000.00, 1),
        ('Sales Representative', 75000.00, 1),
        ('Marketing Coordinator', 80000.00, 2),
        ('Marketing Manager', 70000.00, 2),
        ('Social Media Manager', 68000.00, 2),
        ('Financial Analyst', 85000.00, 3),
        ('Financial Controller', 130000.00, 3),
        ('Accountant', 75000.00, 3),
        ('Network Administrator', 58000.00, 4),
        ('Systems Analyst', 90000.00, 4),
        ('Support Specialist', 78000.00, 4),
        ('HR Coordinator', 60000.00, 5),
        ('HR Manager', 75000.00, 5);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES  ('Jill', 'Valentine', 1, 2),
        ('Chris', 'Redfield', 2, NULL),
        ('Leon', 'Kennedy', 3, 2),
        ('Claire', 'Redfield', 4, 5),
        ('Ada', 'Wong', 5, NULL),
        ('Carlos', 'Oliveira', 6, 5),
        ('Ashley', 'Graham', 7, 8),
        ('Rebecca', 'Chambers', 8, NULL),
        ('Ethan', 'Winters', 9, 8),
        ('Sherry', 'Birkin', 10, NULL),
        ('Mia', 'Winters', 11, 10),
        ('Jack', 'Krauser', 12, 10),
        ('Donna', 'Beneviento', 13, 14),
        ('Sheva', 'Alomar', 14, NULL);