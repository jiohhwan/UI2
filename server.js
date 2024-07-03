require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')



const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND

var corsOptions = {
    origin: FRONTEND, // env파일에서 프론트엔드의 ip주소를 입력 ex) http://127.0.0.1:5173
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  } 

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

//routes

app.use('/', productRoute);

app.get('/blog', (req, res) => {
    res.send('hello blog hi')
})


app.use(errorMiddleware);



mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
.then(() => {
    console.log('connected to mongoDB');
    app.listen(PORT, ()=> {
        console.log(`node api app is runing in port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})