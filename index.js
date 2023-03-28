const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const authRouter = require("./Routes/auth");
const cookieParser = require("cookie-parser");
const gigRouter = require("./Routes/gig");
const userRouter = require("./Routes/user");
const reviewRouter = require("./Routes/review");
const ordersRouter = require("./Routes/orders");
const convoRouter = require("./Routes/conversation");
const messageRouter = require("./Routes/message");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("err in mongo connection:", error);
  }
};

app.use(
  cors({
    origin: ["http://localhost:5173", "https://fiverr-app-hazel.vercel.app/"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/gigs", gigRouter);

app.use("/api/users", userRouter);

app.use("/api/reviews", reviewRouter);

app.use("/api/orders", ordersRouter);

app.use("/api/conversations", convoRouter);

app.use("/api/messages", messageRouter);

app.use("/", (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "something went wrong";
  res.status(statusCode).json(message);
});

app.listen(8800, async () => {
  await connectDB();
  console.log("connected to atlas");
});
