require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

port = 3000;
// Require mysql2
const mysql = require('mysql2');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  // get the password and database from the environment variables
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// Connect to the database
connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

app.get('/', (req, res) => {
  // Example query
  connection.query('SELECT NOW()', (error, results) => {
    if (error) throw error;
    
    // Send query results as the response
    res.send(results[0]);
  });
});

// get all products
app.get('/products', (req, res) => {
    // Example query
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) throw error;
        
        // Send query results as the response
        res.send(results);
    });
});

// get product by id
app.get('/products/:id', (req, res) => {
    // Example query
    connection.query('SELECT * FROM products WHERE id = ?', [req.params.id], (error, results) => {
        if (error) throw error;
        
        // Send query results as the response
        res.send(results);
    });
});

// add a new product with a post
app.post('/products', (req, res) => {
    // Example query
    connection.query('INSERT INTO products (name, description,category,price,in_stock) VALUES (?,?,?,?,?)', [req.body.name, req.body.description, req.body.category, req.body.price, req.body.in_stock], (error, results) => {
        if (error) throw error;
        
        // Send a json object of the created product
        res.send({
            id: results.insertId,
            ...req.body
        });
    });
});

// update a product with a put, Only fields to be updated need to be included.
app.put('/products/:id', (req, res) => {
    // Example query
    connection.query('UPDATE products SET ? WHERE id = ?', [req.body, req.params.id], (error, results) => {
        if (error) throw error;
        
        // Send a json object of the updated product
        res.send({
            id: req.params.id,
            ...req.body
        });
    });
});

// Orders Routes
// POST /orders to create a new order
app.post('/orders', (req, res) => {
    const { userId, products } = req.body; // products should be an array of { productId, quantity }
    let total = 0;

    // Start transaction
    connection.beginTransaction(err => {
        if (err) { throw err; }

        // Insert into orders table
        connection.query('INSERT INTO orders (UserID, TotalPrice, OrderStatus) VALUES (?, ?, "Processing")', [userId, 0], (error, results) => {
            if (error) {
                return connection.rollback(() => {
                    throw error;
                });
            }

            const orderId = results.insertId;
            let processedItems = 0;

            // Insert each product into order_items table
            products.forEach(product => {
                connection.query('SELECT price FROM products WHERE id = ?', [product.productId], (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            throw error;
                        });
                    }

                    const price = results[0].price;
                    const itemTotal = price * product.quantity;
                    total += itemTotal;

                    connection.query('INSERT INTO order_items (OrderID, ProductID, Quantity) VALUES (?, ?, ?)', [orderId, product.productId, product.quantity], (error, results) => {
                        if (error) {
                            return connection.rollback(() => {
                                throw error;
                            });
                        }

                        processedItems++;
                        if (processedItems === products.length) {
                            // Update total price in orders table
                            connection.query('UPDATE orders SET TotalPrice = ? WHERE id = ?', [total, orderId], (error, results) => {
                                if (error) {
                                    return connection.rollback(() => {
                                        throw error;
                                    });
                                }

                                connection.commit(err => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            throw err;
                                        });
                                    }
                                    res.send({ orderId, userId, products, total, status: "Processing" });
                                });
                            });
                        }
                    });
                });
            });
        });
    });
});

// GET /orders/:userId to retrieve all orders for a user
app.get('/orders/:userId', (req, res) => {
    const userId = req.params.userId;

    connection.query('SELECT * FROM orders WHERE UserID = ?', [userId], (error, orders) => {
        if (error) throw error;

        let processedOrders = 0;
        const ordersResponse = [];

        if (orders.length === 0) {
            res.send([]);
            return;
        }

        orders.forEach(order => {
            connection.query('SELECT oi.OrderID, oi.Quantity, p.id as ProductID, p.name, p.price FROM order_items oi JOIN products p ON oi.ProductID = p.id WHERE oi.OrderID = ?', [order.id], (error, items) => {
                if (error) throw error;

                ordersResponse.push({
                    orderId: order.id,
                    userId: order.UserID,
                    total: order.TotalPrice,
                    status: order.OrderStatus,
                    items
                });

                processedOrders++;
                if (processedOrders === orders.length) {
                    res.send(ordersResponse);
                }
            });
        });
    });
});

// Cart Routes
// POST /cart/:userId to add a product to the cart
app.post('/cart/:userId', (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;

    connection.query('INSERT INTO cart_items (UserID, ProductID, Quantity) VALUES (?, ?, ?)', [userId, productId, quantity], (error, results) => {
        if (error) throw error;

        res.send({ message: 'Product added to cart', userId, productId, quantity });
    });
});

// GET /cart/:userId to get the cart for a user
app.get('/cart/:userId', (req, res) => {
    const userId = req.params.userId;

    connection.query('SELECT ci.Quantity, p.id as ProductID, p.name, p.price FROM cart_items ci JOIN products p ON ci.ProductID = p.id WHERE ci.UserID = ?', [userId], (error, results) => {
        if (error) throw error;

        res.send(results);
    });
});

// DELETE /cart/:userId/item/:productId to remove a product from the cart and check if the product exists in the cart
app.delete('/cart/:userId/item/:productId', (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    connection.query('DELETE FROM cart_items WHERE UserID = ? AND ProductID = ?', [userId, productId], (error, results) => {
        if (error) throw error;

        if (results.affectedRows === 0) {
            res.send({ message: 'Product not found in cart' });
        } else {
            res.send({ message: 'Product removed from cart', userId, productId });
        }
    });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});