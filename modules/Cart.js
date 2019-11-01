const express = require('express');// khai báo express   npm i express
const router = express.Router();

const { Cart } = require('../models/Cart');
const { Phone } = require('../models/Phone');


//tạo một giỏ hàng mới
router.post("/createcart", (req, res) => {
    //tao phone moi
    const cart = new Cart({
        nameCustomer: req.body.nameCustomer,
        addressCustomer: req.body.addressCustomer,
        phoneCustomer: req.body.phoneCustomer,
    });
    cart.save()
        .then((result) => {
            console.log('add cart success !');
            res.send(result);
        });
})

//lay thong tin 1 gio hang
router.post("/getcart/:id", (req, res) => {
    Cart.findById(req.params.id)
        .then((result) => {
            res.send(result);
        })
})

// Xóa giỏ hạng hiện tại
router.post("/deletecart/:id", (req, res) => {
    Cart.findByIdAndDelete(req.params.id)
        .then((result) => {
            console.log('delete cart success !');
            res.send(result);
        })
})






module.exports = router;


