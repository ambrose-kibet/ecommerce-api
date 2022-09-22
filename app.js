const express = require("express");
require("dotenv").config();
require("express-async-errors");

const app = express();
// other imports
const cookieParser = require("cookie-parser");
const connectDB = require("./DB/connect");
const morgan = require("morgan");
const expressfileUpload = require("express-fileupload");
// import security packages
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
//import  routers
const authRouter = require("./Routes/authRouter");
const userRouter = require("./Routes/userRouter");
const productRouter = require("./Routes/productsRouter");
const reviewRouter = require("./Routes/reviewRoute");
const orderRouter = require("./Routes/orderRouter");
// security packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
// express middleware
app.use(morgan("tiny"));
app.use(express.static("./public"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(expressfileUpload());
// routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
// other middleware

const notFoundMiddleware = require("./Middleware/notFound");
const errorHandlerMiddleware = require("./Middleware/errorHandlerMiddleware");

// app.get("/api/v1", (req, res) => {
//   res.send("ecommerce APi");
// });
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const Port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(Port, console.log(`server is listening port ${Port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
