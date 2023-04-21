INSERT INTO department (deparment_name)
VALUES ("Admin"),
       ("Legal"),
       ("Marketing"),
       ("Sales");

       INSERT INTO `role` (title, salary, department_id)
VALUES ("Administrative Assistant", 20000, 1),
       ("Sales Associate", 35000, 4),
       ("Legal Intern", 800000, 2),
       ("Sales Lead", 45000, 4),
       ("Marketing Intern", 77000, 3),
       ("Marketing Manager", 340000, 3);

       
       INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Goldie", "Riz", 1, null),
       ("Jack", "Sparrow", 2, 1),
       ("Megan", "Smith", 3, 1),
       ("Courtney", "Bennet", 4, null),
       ("Blake", "Sanchez", 5, 4),
       ("Joseph", "Parker", 6, 4),
       ("Rashad", "Kelly", 7, null),
       

       SET FOREIGN_KEY_CHECKS = 1;