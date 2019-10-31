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
            res.send({ result });
        })
})
//get all sale
router.post("/getSales", (req, res) => {
    const { pagination, sort, filter } = req.body
    let perPage = 0;
    let skip = 0;
    if (pagination) {
        perPage = pagination.perPage
        skip = (pagination.page - 1) * perPage
    }
    Sale.find()
        .limit(perPage)
        .skip(skip)
        .then((result) => {
            Sale.count()
                .then(count => {
                    res.send({ sale: result, count })
                })
        })
})
//get one sale 
router.post("/getSale/:id", (req, res) => {
    Sale.findById(req.params.id)
        .then((result) => {
            res.send({ result });
        })
})
//update sale
router.post("/updateSale/:id", (req, res) => {
    Sale.findByIdAndUpdate(req.params.id, {
        name_sale: req.body.data.name_sale,
        price_sale: req.body.data.price_sale
    })
        .then((result) => {
            console.log("sale updated !");
            res.send({ result });
        })
})
//delete sale
router.post("/deleteSale/:id", (req, res) => {
    Sale.findByIdAndDelete(req.params.id, {
        if(err) {
            res.send(err);
        }
    })
        .then((result) => {
            console.log("sale deleted !");
            res.send({ result });
        })
})

//get sales
router.post("/getSaleFromArray",(req,res)=>{
    const {ids}=req.body
    Sale.find({_id:ids})
    .then(Sales =>{
        return res.status(200).send({data: Sales})
    }).catch((error)=>{
        console.log(error)
        return res.status(400);
    })
})

module.exports = router;