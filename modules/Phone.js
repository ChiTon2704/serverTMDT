const express = require('express');// khai báo express   npm i express
const router = express.Router();

const { Phone } = require('../models/Phone');

//create
router.post("/phone", (req, res) => {
    //tao phone moi
    const phone = new Phone({
        name_phone: req.body.name_phone,
        category: req.body.category,
        NB: req.body.NB,
        discount: req.body.discount,
        description: req.body.description,
        img: req.body.img,
        sale: req.body.sale,
        price: req.body.price
    });
    phone.save()
        .then((result) => {
            console.log('add success !');
            res.send(result);
        });
})


//get all
router.get("/phones", (req, res) => {
    Phone.find()
        .then((result) => {
            res.send(result)
        })
})
//get phone with category= oppo
router.get("/phones/oppo", (req, res) => {
    Phone.find({
        "category": "Oppo"
    })
        .then((result) => {
            res.send(result)
        })
})
router.get("/phones/iphone", (req, res) => {
    Phone.find({
        "category": "Iphone"
    })
        .then((result) => {
            res.send(result)
        })
})
router.get("/phones/samsung", (req, res) => {
    Phone.find({
        "category": "Samsung"
    })
        .then((result) => {
            res.send(result)
        })
})
router.get("/phones/xiaomi", (req, res) => {
    Phone.find({
        "category": "Xiaomi"
    })
        .then((result) => {
            res.send(result)
        })
})
router.get("/phones/huawei", (req, res) => {
    Phone.find({
        "category": "Huawei"
    })
        .then((result) => {
            res.send(result)
        })
})
router.get("/phones/nokia", (req, res) => {
    Phone.find({
        "category": "Nokia"
    })
        .then((result) => {
            res.send(result)
        })
})

//lay thong tin 1 san pham
router.get("/phone/:id", (req, res) => {
    Phone.findById(req.params.id)
        .then((result) => {
            res.send(result);
        })
})

//sua thong tin san pham
router.post("/phone/:id", (req, res) => {
    Phone.findByIdAndUpdate(req.params.id, {
        $set: {
            name_phone: req.body.name_phone,
            price: req.body.price
        }
    })
        .then((result) => {
            console.log("update success !");
            res.send(result);
        })
})






module.exports = router;
