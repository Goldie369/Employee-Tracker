INSERT INTO department (department_name)
VALUES ("Admin"),
       ("Legal"),
       ("Marketing"),
       ("Sales");

       INSERT INTO `role` (title, salary, department_id)
VALUES ("Administrative Assistant", 60000, 1),
       ("Sales Associate", 65000, 4),
       ("Legal Intern", 100000, 2),
       ("Sales Lead", 95000, 4),
       ("Marketing Intern", 55000, 3),
       ("Marketing Manager", 80000, 3);

    
       
       
       INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Goldie", "Riz", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
       ("Jack", "Sparrow", 2, 1),
       ("Megan", "Smith", 3, 1);
       INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
       ("Courtney", "Bennet", 4, null),
       ("Blake", "Sanchez", 5, 4),
       ("Joseph", "Parker", 6, 4),
       ("Rashad", "Kelly", 6, null);
       

       SET FOREIGN_KEY_CHECKS = 1;
       
      
       

      