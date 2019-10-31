const express = require('express');// khai báo express   npm i express
const router = express.Router();
const { Sale } = require('../models/Sale')

//create sale
router.post("/createSale", (req, res) => {
    const sale = new Sale({
        name_sale: req.body.name_sale,
        price_sale: req.body.price_sale
    })
    sale.save()
        .then((result) => {
            console.log("sale created !");
            res.send(result);
        })
})
//get all sale
router.post("/getSales", (req, res) => {
    Sale.find()
        .then((result) => {
            res.send(result);
        })
})
//get one sale 
router.post("/getSale/:id", (req, res) => {
    Sale.findById(req.params.id)
        .then((result) => {
            res.send(result);
        })
})
//update sale
router.post("/updateSale/:id", (req, res) => {
    Sale.findByIdAndUpdate(req.params.id, {
        name_sale: req.body.name_sale,
        price_sale: req.body.price_sale
    })
        .then(() => {
            console.log("sale updated !");
        })
})
//delete sale
router.post("/deleteSale/:id", (req, res) => {
    Sale.findByIdAndDelete(req.params.id, {
    })
        .then(() => {
            console.log("sale deleted !");
        })
})

module.exports = router;