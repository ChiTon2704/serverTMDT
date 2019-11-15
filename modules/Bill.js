const express = require('express');// khai báo express   npm i express
const router = express.Router();
const { Bill } = require('../models/Bill')
//create Bill
router.post("/createBill", (req, res) => {
    const bill = new Bill({
        date: req.body.date,
        price: req.body.price,
        quantity: req.body.quantity,
        total: req.body.price * req.body.quantity,
        customer: req.body.customer,
    })
    bill.save()
        .then((result) => {
            console.log("Bill created !")
            res.send({ result });
        })
})
//get all Bill
router.post("/getBills", (req, res) => {
    const { pagination, sort, filter } = req.body
    let perPage = 0;
    let skip = 0;
    if (pagination) {
        perPage = pagination.perPage
        skip = (pagination.page - 1) * perPage
    }
    Bill.find()
        .limit(perPage)
        .skip(skip)
        .then((result) => {
            Bill.count()
                .then(count => {
                    res.send({ Bill: result, count })
                })
        })
})
// get one Bill
router.post("/getBill/:id", (req, res) => {
    Bill.findById(req.params.id)
        .then((result) => {
            res.send({ result });
        })
})
// update one Bill
router.post("/updateBill/:id", (req, res) => {
    Bill.findByIdAndUpdate(req.params.id, {
        date: req.body.data.date,
        price: req.body.data.price,
        quantity: req.body.data.quantity,
        total: req.body.data.total,
        customer:req.body.data.customer
    })
        .then((result) => {
            console.log("Bill updated !");
            res.send({ result });
        })
})
//delete Bill
router.post("/deleteBill/:id", (req, res) => {
    Bill.findByIdAndDelete(req.params.id, {
        if(err) {
            res.send(err);
        }
    })
        .then((result) => {
            console.log("Bill deleted !");
            res.send({ result });
        })
})
//get orders
router.post("/getBillFromArray",(req,res)=>{
    const {ids}=req.body
    Bill.find({_id:ids})
    .then(Bills =>{
        return res.status(200).send({data: Bills})
    }).catch((error)=>{
        console.log(error)
        return res.status(400);
    })
})
module.exports = router;