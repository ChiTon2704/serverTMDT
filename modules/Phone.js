const express = require('express');// khai báo express   npm i express
const router = express.Router();
const { Phone } = require('../models/Phone');
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
        .then((result) => {
            console.log('phone added !');
            res.send({result});
        });
})
//get one phone
router.post("/getPhone/:id", (req, res) => {
    Phone.findById(req.params.id)
        .then((result) => {
            res.send({result});
        })
})

//get all phones
router.post("/getPhones", (req, res) => {
    const { pagination } = req.body
    let perPage = 0;
    let skip = 0;
    if (pagination) {
        perPage = pagination.perPage
        skip = (pagination.page - 1) * perPage
    }
    Phone.find()
        .limit(perPage)
        .skip(skip)
        .then((result) => {
            Phone.count()
                .then(count => {
                    res.send({ result, count })
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
    }).then((result) => {
        console.log("phone deleted !");
        res.send({result});
    })
})
module.exports = router;
