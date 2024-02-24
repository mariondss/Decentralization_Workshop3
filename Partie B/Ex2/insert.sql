CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE products (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    in_stock BOOLEAN NOT NULL
);

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100)
);

CREATE TABLE orders (
	id INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    TotalPrice DECIMAL(10,2),
    OrderStatus VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES users(id)
);

CREATE TABLE order_items (
	id INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    FOREIGN KEY (OrderID) REFERENCES orders(id),
    FOREIGN KEY (ProductID) REFERENCES products(id)
);

CREATE TABLE cart_items (
	id INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    ProductID INT,
    Quantity INT,
    FOREIGN KEY (UserID) REFERENCES orders(id),
    FOREIGN KEY (ProductID) REFERENCES products(id)
);

INSERT INTO products (name, description, category, price, in_stock) 
VALUES 
('Chemise', 'Chemise en coton avec col classique et boutons.', 'Hommes', 39.99, 1),
('Robe', 'Robe  légère pour femme avec motif floral et bretelles réglables', 'Femmes', 29.99, 1),
('Pantalon', 'Pantalon avec poches latérales et passants de ceinture.', 'Hommes', 49.99, 0),
('Tee-shirt', 'Tee-shirt oversize blanc', 'Femmes', 34.99, 1);

INSERT INTO users (username)
VALUES 
('marion_dss'),
('yass_bakrim'),
('jules_deleuse'),
('mathis_rf');

INSERT INTO orders (UserID, TotalPrice, OrderStatus) 
VALUES 
(1, 129.97, 'En cours'),
(2, 69.98, 'En cours'),
(3, 39.99, 'Livré'),
(4, 89.99, 'En attente');

INSERT INTO order_items (OrderID, ProductID, Quantity) 
VALUES 
(1, 1, 2),  -- Commande 1: 2 chemises
(1, 3, 1),  -- Commande 1: 1 pantalon
(2, 2, 1),  -- Commande 2: 1 robe
(2, 4, 2);  -- Commande 2: 2 tee-shirts

INSERT INTO cart_items (UserID, ProductID, Quantity) 
VALUES 
(1, 1, 2),  -- Utilisateur 1: 2 chemises
(2, 2, 1),  -- Utilisateur 2: 1 robe
(2, 4, 3);  -- Utilisateur 2: 3 tee-shirts


