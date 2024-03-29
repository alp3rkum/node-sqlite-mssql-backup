CREATE DATABASE sqlite_database;

USE sqlite_database;

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'database')
BEGIN
    CREATE TABLE [database] (
        id INT IDENTITY(1,1) PRIMARY KEY,
        product_name VARCHAR(50),
        category_name VARCHAR(50),
        price FLOAT,
        quantity INT
    );
END;

INSERT INTO [database_example] (product_name, category_name, price, quantity)
VALUES 
('Wireless Mouse', 'Electronics', 249.99, 40),
('Wireless Keyboard', 'Electronics', 589.99, 20),
('AMD 6-core 512GB SSD Laptop', 'Computers', 12999, 10),
('Intel 8-core 1TB HDD Laptop', 'Computers', 17999, 15),
('Intel 2-core 128 HDD Notebook', 'Computers', 9999, 15),
('Webcam w/ Microphone', 'Accessories', 989.99, 20),
('Mini USB PC Speaker', 'Accessories', 199.99, 30),
('Super Bass PC Speaker', 'Accessories', 399.99, 15),
('32GB Entry Level Smartphone', 'Smartphone', 4999, 10),
('128GB 8-Core Smartphone', 'Smartphone', 14999, 10),
('256GB Flagship Smartphone', 'Smartphone', 29999, 10),
('RGB LED Wireless Mouse', 'Electronics', 599.99, 25),
('AMD 2-core 128GB Notebook', 'Computers', 10489, 5),
('4-Port USB Multiplier', 'Accessories', 169.99, 20),
('64GB Dual-SIM Smartphone', 'Smartphone', 7999, 15);