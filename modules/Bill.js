const express = require('express');// khai báo express   npm i express
const router = express.Router();
const { Bill } = require('../models/Bill')
const {BillDetail}=require('../models/billDetail')
//create Bill
router.post("/createBill", (req, res) => {
    const {customer,billDetail=[],date,deliveryState}=req.body
    console.log(billDetail)
    if(billDetail.length>0){
        billDetail.forEach(element => {
            element.phone = ObjectId(element.phoneId)
        });
        BillDetail.insertMany(billDetail)
        .then((result) => {
            let detail = []
            result.forEach(element => detail.push(element._id))
            const newBill = new Bill({  
                customer,
                billDetail:detail,
                date: date ? date : new Date(),
                deliveryState: deliveryState ? 'ORDER_PAY_BY_PAYPAL' : 'ORDER'
            })
            newBill.save()
            .then(bill => {
                console.log(bill)
                return res.status(200).send(bill)
            })
            .catch(err => {
                console.log(err)
                return res.status(401).send(err)
            })
        }).catch((err) => {
            return res.status(401).send(err)
        });
    } else res.status(401).send("Can't create empty bill")
})
//get all Bill
router.post('/getBills',((req,res) => { 
    Bill.find()
    .sort({ createAt: -1})
    .then(result => {
        Bill.count().then(count=>{
            return res.status(200).send({bill:result,count})
        })
    })
}))
// get one Bill
router.post('/getBill',(req,res)=>{
    console.log(req.body)
    Bill.findById(req.body.id)
    .sort({ createAt: -1})
    .then(result => {
        BillDetail.find({_id:result.billDetail}).then(detail=>{
            let price = 0;
            detail.map(element => price += Number(element.price)*Number(element.quantity))
            const newResult = {...result._doc,totalPay:price}
            return res.status(200).send({data:newResult})
        })
    })
})
//get bills
router.post('/getBillDetailByArray',(req,res)=>{
    BillDetail.find({_id:req.body.ids})
    .sort({ createAt: -1})
    .populate('phone')
    .then(result => {
        return res.status(200).send({data:result,total:result.length})
    }) 
})
module.exports = router;