var express = require('express');
var router = express.Router();



/* Get A List Of Products */
router.get('/', function (req, res, next) {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'pyxis',
        password: '@Pyxis123',
        database: 'pyxis',
        insecureAuth: true
    });
    connection.connect()
    var query = "SELECT * FROM Products;";

    console.log(query);
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        }
        else {
            var Products=[];
            console.log(rows);
            rows.forEach(function(element) {
                Products.push(element);
              });
            res.json(Products);
        }
    })

    connection.end();
})


/* Add A New Product. */
router.post('/create', function (req, res, next) {
    console.log(req.body);
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'pyxis',
        password: '@Pyxis123',
        database: 'pyxis',
        insecureAuth: true
    });

    connection.connect()
    var query = 'INSERT INTO Products (ProductID,ProductSize,ProductDescription,UnitType,BuyPrice,SellPrice,ProductCount) ';
    query = query + "values ('" + req.body['ProductID'] + "','" + req.body['ProductSize'] + "','" + req.body['ProductDescription'] + "','" + req.body['UnitType'] + "'," + req.body['BuyPrice'] + "," + req.body['SellPrice'] + ",0)";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        }
        else {
            console.log(rows);
            res.json(req.body);
        }
    })
    connection.end()
});

/* Edit Product Details */
router.post('/edit', function (req, res, next) {
    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'pyxis',
        password: '@Pyxis123',
        database: 'pyxis',
        insecureAuth: true
    });
    connection.connect()
    var query = "UPDATE Products SET ProductSize='" + req.body['ProductSize'] + "',ProductDescription='" + req.body['ProductDescription'] + "',";
    query = query + "UnitType='" + eq.body['UnitType'] + "',BuyPrice=" + req.body['BuyPrice'] + ",SellPrice=" + req.body['SellPrice'];
    query = query + " WHERE ProductID='" + req.body['ProductID'] + "';";
    console.log(query);
    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log(err.code);
            res.json(err.code);
        }
        else {
            console.log(rows);
            res.json(req.body);
        }
    })

    connection.end()
})

module.exports = router;