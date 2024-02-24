require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
// Require mysql2
const mysql = require('mysql2');

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

// update a product with a put
app.put('/products/:id', (req, res) => {
    // Example query
    connection.query('UPDATE products SET name = ?, description = ?, category = ?, price = ?, in_stock = ? WHERE id = ?', [req.body.name, req.body.description, req.body.category, req.body.price, req.body.in_stock, req.params.id], (error, results) => {
        if (error) throw error;
        
        // Send a json object of the updated product
        res.send({
            id: req.params.id,
            ...req.body
        });
    });
});

// delete a product with a delete
app.delete('/products/:id', (req, res) => {
    // Example query
    connection.query('DELETE FROM products WHERE id = ?', [req.params.id], (error, results) => {
        if (error) throw error;
        
        // Send a json object of the deleted product
        res.send({
            id: req.params.id
        });
    });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});