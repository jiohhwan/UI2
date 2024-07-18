require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const errorMiddleware = require('./middleware/errorMiddleware')
const app = express()
const multer = require('multer');


const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));




app.use("/", require("./routes/Route"));
app.use('/addFood', upload.single('file'), require('./routes/foodRoute'));
app.use('/addDayduty', upload.single('file'), require('./routes/daydutyRoute'));
app.use('/addNightduty', upload.single('file'), require('./routes/nightdutyRoute'));
app.use('/addCloth', upload.single('file'), require('./routes/clothRoute'));




app.use(errorMiddleware);
mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
.then(() => {
    console.log('MONGODB에 연결하였습니다.');
    app.listen(PORT, ()=> {
        console.log(`서버가 ${PORT}번에서 열렸습니다.`);
    });
}).catch((error) => {
    console.log(error);
})