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