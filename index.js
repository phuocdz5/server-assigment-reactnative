const express = require('express');

const cors = require('cors');
const authRouter = require('./src/routers/authRouter');
const connectDB = require('./src/configs/connectDb');
const errorMiddleHandle = require('./src/middlewares/errorMiddleWare');
const productRouter = require('./src/routers/productRouter');
const app = express();
require('dotenv').config();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth' , authRouter);
// app.use('/product',productRouter)
connectDB();

app.use(errorMiddleHandle);
app.listen(PORT, (err) => {
    if(err) {
        console.log(err)
        return;
    }

    console.log(`Server starting at http://localhost:${PORT}`);
})