INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", "80000", 002),
       ("Software Engineer", "120000.00", 001),
       ("Senior Engineer", "150000.00", 001),
       ("Lawyer", "190000.00", 004),
       ("Account Manager", "160000.00", 003),
       ("Accountant", "125000.00", 003),
       ("Legal Team Lead", "250000.00", 004);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Owen", "Foreman", 003),
       ("Will", "Foreman", 005),
       ("Leo", "Testa", 007),
       ("Connor", "Harris", 002),
       ("Ethan", "Harris", 006),
       ("Quentin", "Miller", 001),
       ("Wes", "Miller", 004);

UPDATE `employee_db`.`employee` SET `manager_id` = 1 WHERE (`id` = 4);
UPDATE `employee_db`.`employee` SET `manager_id` = 3 WHERE (`id` = 7);
UPDATE `employee_db`.`employee` SET `manager_id` = 2 WHERE (`id` = 5);