const express=require('express');
const { handleError, notFound } = require('./middlewares/errorhandler');
const cors=require('cors')
const bodyParser=require('body-parser')
const dotenv=require('dotenv').config()
const morgan = require('morgan');
const connectDb = require('./config/connect');
const userRoute=require('./routes/authRoute')
const aiRoute=require('./routes/openAiRoute')

// all the rest variables 
const app=express()
const port=process.env.PORT || 5000;

// connecting to the database
connectDb();

// all the middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())
app.use(morgan('dev'))
app.use(express.json())

// all the routes

app.use('/api/v1/user',userRoute)
app.use('/api/v1/ai',aiRoute)

app.use(notFound)
app.use(handleError)


// listening to the port 
app.listen(port,()=>{
    console.log(` running at the port ${port}`)
})