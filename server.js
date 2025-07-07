const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./Routes/User");
const productRouter = require("./Routes/Product");
const cartRouter = require("./Routes/Cart");
const addressRouter = require("./Routes/Address.js");
const paymentRouter =require('./Routes/Payment.js');
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const port = 3000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log("connection successfull");
  });

app.use(express.json());
app.use(bodyParser.json());

//user router
app.use("/api/user", userRouter);

// product Router
app.use("/api/product", productRouter);

// cart Router
app.use("/api/cart", cartRouter);

// address Router
app.use("/api/address", addressRouter);

// payment Router
app.use('/api/payment',paymentRouter)

app.listen(port, () => console.log(`Server is running on port ${port}`));
