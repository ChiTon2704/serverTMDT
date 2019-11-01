const express = require('express');// khai báo express   npm i express
const cors = require('cors'); //khai báo cors   npm i cors
const server = express(); // tạo server

const mongoose = require('mongoose')

//connect database
mongoose.connect('mongodb+srv://admin:admin@tmdtdb-k3zc8.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(() => console.log('Connect Sucess !'))
    .catch((error) => console.log(error));

server.use(cors()); //sử dụng

//  Router
const Brand = require('./modules/Brand');
const Phone = require('./modules/Phone');
const Sale = require('./modules/Sale');
const Customer = require('./modules/Customer')


const Cart =require('./modules/Cart');
server.use(express.json()); //khai báo để sử dụng json


// server.use('/api/',ProviderInfo)
server.use('/api', Phone);
server.use('/api', Brand);
server.use('/api', Sale);
server.use('/api',Customer);
server.use('/api/cart',Cart)

server.listen(7000, () => {
    console.log('Listen at port 7000')
})