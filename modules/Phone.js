const express = require('express');// khai báo express   npm i express
const router = express.Router();
const { Phone } = require('../models/Phone');
const { Cart } = require('../models/Cart');
ObjectId = require("mongoose").Types.ObjectId;

//create one phone
router.post("/createPhone", (req, res) => {
    //tao phone moi
    const phone = new Phone({
        name_phone: req.body.name_phone,
        price: req.body.price,
        brand: req.body.brand,
        sale: req.body.sale,
        description: req.body.description,
        img: req.body.img,
        is_sale: req.body.is_sale,
        is_new: req.body.is_new,
    });
    phone.save()
        //.populate('sale')
        .then((result) => {
            console.log('phone added !');
            res.send({ result });
        });
})

//get one phone
router.post("/getPhone/:id", (req, res) => {
    Phone.findById(req.params.id)
    .populate('sale')
        .then((result) => {
            res.send({ result });
        })
})

//get all phones admin
router.post("/getPhones", (req, res) => {
    const { pagination } = req.body
    console.log(pagination);
    let perPage = 0;
    let skip = 0;
    if (pagination) {
        perPage = pagination.perPage
        skip = (pagination.page - 1) * perPage
    }
    Phone.find()
        .populate('sale')
        .limit(perPage)
        .skip(skip)
        .then((result) => {
            Phone.count()
                .then(count => {
                    res.send({ phone: result, count })
                })
        })
})

//update phone
router.post("/updatePhone/:id", (req, res) => {
    Phone.findByIdAndUpdate(req.params.id, {
        name_phone: req.body.data.name_phone,
        price: req.body.data.price,
        brand: req.body.data.brand,
        sale: req.body.data.sale,
        description: req.body.data.description,
        img: req.body.data.img,
        is_sale: req.body.data.is_sale,
        is_new: req.body.data.is_new,
    })
        .then((result) => {
            console.log("phone updated !");
            res.send({ result });
        })
})

//delete phone
router.post("/deletePhone/:id", (req, res) => {
    Phone.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.send(err);
        }
    })
    .populate('sale')
    .then((result) => {
        console.log("phone deleted !");
        res.send({ result });
    })
})

// hiện trên giao diện người dùng
//get all
//sua thanh post de phu hop vs dataprovider
router.post("/phone/getallphones", (req, res) => {
    Phone.find()
        .populate('sale')
        .then((result) => {
            res.send(result)
        })
})

//lay thong tin 1 san pham
router.post("/phone/getphone/:id", (req, res) => {
    Phone.findById(req.params.id)
        .populate('sale')
        .then((result) => {
            res.send(result);
        })
})

//create them 1 sản phẩm mới vào cart
router.post("/phone/additemcart/:id", (req, res) => {
    //tao provider moi
    const newItemPhone = new Phone({
        name_phone: req.body.name_phone,
        price: req.body.price,
        brand: req.body.brand,
        sale: req.body.sale,
        description: req.body.description,
        img: req.body.img,
        is_sale: req.body.is_sale,
        is_new: req.body.is_new,
        quantity: req.body.quantity
    })
    Cart.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            items: newItemPhone
        }
        .then((result) => {
            console.log('add item in cart success !');
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
    })  
}) 

//get phones
router.post("/getPhoneFromArray",(req,res)=>{
    const {ids}=req.body
    Phone.find({_id:ids})
    .populate('sale')
    .then(Phones =>{
        return res.status(200).send({data: Phones})
    }).catch((error)=>{
        console.log(error)
        return res.status(400);
    })
        
})

module.exports = router;
