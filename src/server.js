const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



const userRoutes = require('./routes/routes.user');

//initial
const app = express();

//midlewares
app.use(cors());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//routes

app.use('/user', userRoutes);


// listen
app.listen(4000,()=>{
    console.log('listening on port 4000');
})
// connect database
mongoose.connect('mongodb+srv://olmedo:olmedo123@cluster0.gpul9.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(() => console.log('connection is successfully db'))
    .catch((error) => console.log(error)
    )