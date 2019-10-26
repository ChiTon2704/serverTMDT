const express = require('express');// khai báo express   npm i express
const router = express.Router();

const { Phone } = require('../models/Phone');
const { ProviderInfo } = require('../models/ProviderInfo');
//create
router.post("/provider/:id", (req, res) => {
    //tao provider moi
    const newProvider = new ProviderInfo({
        nameProvider: req.body.nameProvider,
        address: req.body.address,
        numberPhone: req.body.numberPhone
    })
    Phone.findByIdAndUpdate(req.params.id, {
        $addToSet:  {
            providerInfo:  newProvider 
        }
    })
    .then((result) => {
        console.log('provider success !');
        res.send(result);
    })
})

//create
router.post("/providers/:id", (req, res) => {
    //tao provider moi
    const newProvider = new ProviderInfo({
        nameProvider: req.body.nameProvider,
        address: req.body.address,
        numberPhone: req.body.numberPhone
    })
    Phone.findById(req.params.id, {
        $set: {
            providerInfo: { newProvider }
        }
    })
        .then((result) => {
            console.log('add success !');
            res.send(result);
        })
});


module.exports = router;
