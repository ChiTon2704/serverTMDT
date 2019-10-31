const express = require('express');// khai báo express   npm i express
const router = express.Router();
const { Customer } = require('../models/Customer')

//create customer
router.post("/createCustomer", (req, res) => {
    const customer = new Customer({
        name_customer: req.body.name_customer,
        phone_customer: req.body.phone_customer,
        address_customer: req.body.address_customer
    })
    customer.save()
        .then((result) => {
            console.log("customer created !")
            res.send(result);
        })
})
//get all customer
router.post("/getCustomers", (req, res) => {
    Customer.find()
        .then((result) => {
            res.send(result);
        })
})
// get one customer
router.post("/getCustomer/:id", (req, res) => {
    Customer.findById(req.params.id)
        .then((result) => {
            res.send(result);
        })
})
// update one customer
router.post("/updateCustomer/:id", (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, {
        name_customer: req.body.name_customer,
        phone_customer: req.body.phone_customer,
        address_customer: req.body.address_customer
    })
        .then(() => {
            console.log("customer updated !");
        })
})
//delete customer
router.post("/deleteCustomer/:id", (req, res) => {
    Customer.findByIdAndDelete(req.params.id, {

    })
        .then(() => {
            console.log("customer deleted !");
        })
})
module.exports = router;