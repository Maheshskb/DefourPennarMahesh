require('./config/config');
require('./models/db');
require('./config/PassportConfiguration');
require('./config/DSEpassportConfig');

const { mongoose } = require('./models/db');
var productDetailsController = require('./controllers/ProductDetailsController');
var priceDetailsController = require('./controllers/PriceDetailsController');
//Customer Details Controller (Dealer Sales Engg)
var customerDetailsController = require('./controllers/PSEregisterController');
//Register Dealer Sales Enginee Controller
var registerDealerSalesEnggController = require('./controllers/DSEregisterController');
var registerPennarSalesEnggController = require('./controllers/PSEregisterController');
var registerDealerController = require('./controllers/DealerRegisterController');


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var productDetailsController = require('./controllers/ProductDetailsController');

var app = express();

// middleware
app.use(bodyParser.json());
//allows request from any port number or domain 
app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize());
app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

app.use('/productDetails', productDetailsController);
//Price modification URL
app.use('/priceDetails', priceDetailsController);
//add customer Details
app.use('/customerDetails', customerDetailsController);
//Register Dealer Sales Engg
app.use('/RegisterDealerSalesEngineer', registerDealerSalesEnggController);
//Pennar Sales Engineer
app.use('/RegisterPennarSalesEngineer', registerPennarSalesEnggController);
//Dealer
app.use('/RegisterDealer', registerDealerController);


// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));