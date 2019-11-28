const express = require('express');// khai báo express   npm i express
const router = express.Router();
const { Phone } = require('../models/Phone');
ObjectId = require("mongoose").Types.ObjectId;

//create one phone
router.post("/createPhone", (req, res) => {
    const phone = new Phone({
        name_phone: req.body.name_phone,
        price: req.body.price,
        brand: req.body.brand,
        sale: ObjectId(req.body.sale._id),
        description: req.body.description,
        img: req.body.img,
        is_sale: req.body.is_sale,
        is_new: req.body.is_new,
    });
    phone.save()
        .then((result) => {
            console.log('phone added !');
            res.send({result});
        });
})
//get one phone
router.post("/getPhone/:id", (req, res) => {
    Phone.findById(req.params.id)
    .populate('sale')
        .then((result) => {
            res.send({result});
        })
})
//get all phones
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
                    res.send({phone: result, count })
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
            res.send({result});
        })
}) 
//delete phone
router.post("/deletePhone/:id", (req, res) => {
    Phone.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.send(err);
        }
    })
    .then((result) => {
        console.log("phone deleted !");
        res.send({result});
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
