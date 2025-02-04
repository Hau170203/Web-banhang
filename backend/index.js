const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();
const routers = require('./src/routers/index.route');

const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(bodyparser.json());
app.use(cookieParser());


routers(app);

mongoose.connect(process.env.MONGODB_CONNECT)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Connection failed", err);
    })


app.listen(port, () => {  
  console.log(`Example app listening at http://localhost:${port}`);
});