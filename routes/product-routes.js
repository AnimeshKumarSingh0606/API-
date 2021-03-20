let mongoose = require('mongoose');
let product = require('../models/product');


function getProducts(req, res) {
    let query = product.find({});
    query.exec((err, products) => {
        if(err) res.send(err);
        res.json(products);
    });
}


function storeProduct(req, res) {
    var newproduct = new product(req.body);
    newproduct.save((err, product) => {
        if(err) {
            res.send(err);
        }
        else {
            res.json({
                message: "Product successfully added!", product
            });
        }
    });
}


function getProduct(req, res) {
    product.findById(req.params.id, (err, product) => {
        if(err) res.send(err);
        res.json(product);
    });
}


function deleteProduct(req, res) {
    product.remove({_id: req.params.id}, (err, result) => {
        res.json({message: "Product successfully deleted! Add one else Animesh Will hang you !!", result});
    });
}


function updateProduct(req, res) {
    product.findById({_id: req.params.id}, (err, product) => {
        if(err) res.send(err);
        Object.assign(product, req.body).save((err, product) => {
            if(err) res.send(err);
            res.json({message: 'Product updated!', product});
        });
    });
}

module.exports = {getProducts, storeProduct, getProduct, deleteProduct, updateProduct};
