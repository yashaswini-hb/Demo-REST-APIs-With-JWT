var http = require('http');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();
var httpServer = http.createServer(app)
var cors = require('cors')
app.use(cors())  

const AddItems = require('./item_route');
const GetToken = require('./getToken');

app.use('/uploads', express.static('uploads')); 

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auto_reconnect: true,
    useCreateIndex: true,
};
 
app.use(express.json({limit: '100kb', extended: true}));
app.use(express.urlencoded({limit: '100kb', extended: true}));

mongoose.connect('mongodb://<UserName>:<Password>@servers.mongodirector.com:27017/DataBase_Name?ssl=true', options) 
    .then(() => console.log('Now connected to Data Base!'))
    .catch(err => console.error('Something went wrong', err));  


app.use('/api/items', AddItems);
app.use('/api/token',GetToken);

httpServer.listen(4000); 

