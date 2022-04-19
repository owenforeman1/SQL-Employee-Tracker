SELECT employee.id, employee.first_name, employee.last_name,role.title, role.salary, department.name AS department, manager.first_name AS ManagerName
FROM employee 
LEFT JOIN role ON role.id = employee.role_id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN Employee manager ON employee.manager_id = manager.id;


