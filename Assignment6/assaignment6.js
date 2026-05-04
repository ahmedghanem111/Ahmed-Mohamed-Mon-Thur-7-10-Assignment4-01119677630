const db = require('./db');


//                            part 3

// 1.create tables 
await db.execute(`
CREATE TABLE IF NOT EXISTS Suppliers (
  SupplierID INT AUTO_INCREMENT PRIMARY KEY,
  SupplierName VARCHAR(100),
  ContactNumber VARCHAR(20)
)`);

await db.execute(`
CREATE TABLE IF NOT EXISTS Products (
  ProductID INT AUTO_INCREMENT PRIMARY KEY,
  ProductName VARCHAR(100),
  Price DECIMAL(10,2),
  StockQuantity INT,
  SupplierID INT,
  FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
)`);

await db.execute(`
CREATE TABLE IF NOT EXISTS Sales (
  SaleID INT AUTO_INCREMENT PRIMARY KEY,
  ProductID INT,
  QuantitySold INT,
  SaleDate DATE,
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
)`);


// 2.add column
await db.execute(`ALTER TABLE Products ADD Category VARCHAR(50)`);


// 3.remove column
await db.execute(`ALTER TABLE Products DROP COLUMN Category`);


// 4.change column
await db.execute(`ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15)`);


// 5.not null
await db.execute(`ALTER TABLE Products MODIFY ProductName VARCHAR(100) NOT NULL`);


// 6.insert
// a.
await db.execute(`
INSERT INTO Suppliers (SupplierName, ContactNumber) 
VALUES ('FreshFoods', '01001234567')
`);

// b.
await db.execute(`
INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
VALUES 
('Milk', 15.00, 50, 1),
('Bread', 10.00, 30, 1),
('Eggs', 20.00, 40, 1)
`);

// c.
await db.execute(`
INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
VALUES (1, 2, '2025-05-20')
`);


// 7.update
await db.execute(`
UPDATE Products SET Price = 25.00
WHERE ProductName = 'Bread'
`);


// 8.delete
await db.execute(`DELETE FROM Products WHERE ProductName = 'Eggs'`);


// 9.select total sold
const [rows1] = await db.execute(`
SELECT ProductID, SUM(QuantitySold) AS TotalSold
FROM Sales
GROUP BY ProductID
`);
console.log(rows1);


// 10.select products with highest stock
const [rows2] = await db.execute(`
SELECT * FROM Products
ORDER BY 
    StockQuantity DESC
    LIMIT 1
`);
console.log(rows2);


// 11.select products start with F
const [rows3] = await db.execute(`
SELECT * FROM Suppliers
WHERE 
 SupplierName LIKE 'F%'
`);
console.log(rows3);


// 12.select products did not sale 
const [rows4] = await db.execute(`
SELECT * FROM Products
WHERE
 ProductID NOT IN (
    SELECT ProductID FROM Sales
 )
`);
console.log(rows4);


// 13.select products with sales and product name
const [rows5] = await db.execute(`
SELECT p.ProductName, s.SaleDate
FROM Sales s
JOIN 
    Products p ON s.ProductID = p.ProductID
`);
console.log(rows5);


// 14.create user
await db.execute(`
CREATE USER 'store_manager'@'localhost' IDENTIFIED BY ''
`);

await db.execute(`
GRANT SELECT, INSERT, UPDATE ON *.* TO 'store_manager'@'localhost'
`);


// 15.update user
await db.execute(`
REVOKE UPDATE ON *.* FROM 'store_manager'@'localhost'
`);


// 16.delete user
await db.execute(`
GRANT DELETE ON store_db.Sales TO 'store_manager'@'localhost'
`);

