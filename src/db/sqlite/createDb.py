import sqlite3
import csv

product_name = ""
category_name = ""
price = 0
quantity = 0

connection = sqlite3.connect("database.db")
cursor = connection.cursor()
cursor.execute('''
        CREATE TABLE IF NOT EXISTS database (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_name VARCHAR(50),
            category_name VARCHAR(50),
            price REAL,
            quantity INTEGER
        )
    ''')

with open("firstData.csv", "r") as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            product_name = row[0]
            category_name = row[1]
            price = float(row[2])
            quantity = int(row[3])
            cursor.execute('''
                INSERT INTO database (product_name, category_name, price, quantity)
                VALUES (?, ?, ?, ?)
            ''', (product_name, category_name, price, quantity))
            connection.commit()

connection.close()