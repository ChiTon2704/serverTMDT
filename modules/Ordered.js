const express = require('express');// khai báo express   npm i express
const router = express.Router();
const { Ordered } = require('../models/Ordered')
ObjectId = require("mongoose").Types.ObjectId;
//create Ordered
router.post("/createOrdered", (req, res) => {
    const ordered = new Ordered({
        date: req.body.date,
        price: req.body.price,
        quantity: req.body.quantity,
        total: req.body.price * req.body.quantity,
        customer: req.body.customer,
    })
    ordered.save()
        .then((result) => {
            console.log("Ordered created !")
            res.send({ result });
        })
})
//get all Ordered
router.post("/getOrdereds", (req, res) => {
    const { pagination, sort, filter } = req.body
    let perPage = 0;
    let skip = 0;
    if (pagination) {
        perPage = pagination.perPage
        skip = (pagination.page - 1) * perPage
    }
    Ordered.find()
        .limit(perPage)
        .skip(skip)
        .then((result) => {
            Ordered.count()
                .then(count => {
                    res.send({ ordered: result, count })
                })
        })
})
// get one Ordered
router.post("/getOrdered/:id", (req, res) => {
    Ordered.findById(req.params.id)
        .then((result) => {
            res.send({ result });
        })
})
// update one Ordered
router.post("/updateOrdered/:id", (req, res) => {
    Ordered.findByIdAndUpdate(req.params.id, {
        date: req.body.data.date,
        price: req.body.data.price,
        quantity: req.body.data.quantity,
        total: req.body.data.total,
        customer:req.body.data.customer
    })
        .then((result) => {
            console.log("Ordered updated !");
            res.send({ result });
        })
})
//delete Ordered
router.post("/deleteOrdered/:id", (req, res) => {
    Ordered.findByIdAndDelete(req.params.id, {
        if(err) {
            res.send(err);
        }
    })
        .then((result) => {
            console.log("Ordered deleted !");
            res.send({ result });
        })
})

//get orders
router.post("/getOrderFromArray",(req,res)=>{
    const {ids}=req.body
    Ordered.find({_id:ids})
    .then(Ordereds =>{
        return res.status(200).send({data: Ordereds})
    }).catch((error)=>{
        console.log(error)
        return res.status(400);
    })
})

module.exports = router;