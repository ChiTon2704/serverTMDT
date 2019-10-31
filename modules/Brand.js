
const express = require('express');// khai báo express   npm i express
const router = express.Router();
const { Brand } = require('../models/Brand')


//create brand
router.post("/createBrand", (req, res) => {
    const brand = new Brand({
        name_brand: req.body.name_brand
    });
    brand.save()
        .then((result) => {
            console.log("brand created !");
            res.send({result});
        })
})
//get all brand
router.post("/getBrands",(req,res)=>{
    const { pagination, sort, filter } = req.body
    let perPage = 0;
    let skip = 0;
    if (pagination) {
        perPage = pagination.perPage
        skip = (pagination.page - 1) * perPage
    }
    Brand.find()
        .limit(perPage)
        .skip(skip)
        .then((result) => {
            Brand.count()
                .then(count => {
                    res.send({ brand: result, count })
                })
        })
})
//get one brand
router.post("/getBrand/:id",(req,res)=>{
    Brand.findById(req.params.id)
    .then((result)=>{
        res.send({result});
    })
})
//update one brand
router.post("/updateBrand/:id",(req,res)=>{
    Brand.findByIdAndUpdate(req.params.id,{
        name_brand:req.body.data.name_brand
    })
    .then((result)=>{
        console.log("brand updated !")
        res.send({result});
    })
})
//delete brand
router.post("/deleteBrand/:id", (req, res) => {
    Brand.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.send(err);
        }
    }).then((result) => {
        console.log("brand deleted !");
        res.send({result});
    })
})
module.exports = router;
