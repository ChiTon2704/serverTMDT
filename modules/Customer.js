const express = require('express');// khai báo express   npm i express
const router = express.Router();
const { Customer } = require('../models/Customer')
//create customer
router.post("/createCustomer", (req, res) => {
    const customer = new Customer({
        name_customer: req.body.name_customer,
        phone_customer: req.body.phone_customer,
        address_customer: req.body.address_customer,
    })
    customer.save()
        .then((result) => {
            console.log("customer created !")
            res.send({ result });
        })
})
//get all customer
router.post("/getCustomers", (req, res) => {
    const { pagination, sort, filter } = req.body
    let perPage = 0;
    let skip = 0;
    if (pagination) {
        perPage = pagination.perPage
        skip = (pagination.page - 1) * perPage
    }
    Customer.find()
        .limit(perPage)
        .skip(skip)
        .then((result) => {
            Customer.count()
                .then(count => {
                    res.send({ customer: result, count })
                })
        })
})


// get one customer
router.post("/getCustomer/:id", (req, res) => {
    Customer.findById(req.params.id)
        .then((result) => {
            res.send({ result });
        })
})
// update one customer
router.post("/updateCustomer/:id", (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, {
        name_customer: req.body.data.name_customer,
        phone_customer: req.body.data.phone_customer,
        address_customer: req.body.data.address_customer
    })
        .then((result) => {
            console.log("customer updated !");
            res.send({ result });
        })
})
//delete customer
router.post("/deleteCustomer/:id", (req, res) => {
    Customer.findByIdAndDelete(req.params.id, {
        if(err) {
            res.send(err);
        }
    })
        .then((result) => {
            console.log("customer deleted !");
            res.send({ result });
        })
})

//get customers
router.post("/getCustomerFromArray",(req,res)=>{
    const {ids}=req.body
    Customer.find({_id:ids})
    .then(Customers =>{
        return res.status(200).send({data: Customers})
    }).catch((error)=>{
        console.log(error)
        return res.status(400);
    })
})

module.exports = router;