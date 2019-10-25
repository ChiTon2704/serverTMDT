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
const Phone = require('./modules/Phone');
server.use(express.json()); //khai báo để sử dụng json

server.use('/api', Phone)

server.listen(7000, () => {
    console.log('Listen at port 7000')
})