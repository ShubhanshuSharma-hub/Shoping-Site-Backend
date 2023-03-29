require("dotenv").config();
require("express-async-errors");
const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// authenticate User
const authenticateUser = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// routers
const productRouter = require("./routes/product");

app.use("/api/v1/product", productRouter);

// middleware created by me
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 3000;

// start
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

// <<********MongoDB********>> //

// require("dotenv").config();
// require("express-async-errors");
// const express = require("express");
// const app = express();

// // connectDB
// const connectDB = require("./db/connect");

// // authenticate User
// const authenticateUser = require("./middleware/authentication");

// // routers
// const productRouter = require("./routes/product");
// const authRouter = require("./routes/auth");
// const orderRouter = require("./routes/order");

// // error handler
// const notFoundMiddleware = require("./middleware/not-found");
// const errorHandlerMiddleware = require("./middleware/error-handler");

// // middleware
// app.use(express.json());

// // routes
// app.use("/api/v1/product", authenticateUser, productRouter);
// app.use("/api/v1/order", authenticateUser, orderRouter);
// app.use("/api/v1/auth", authRouter);

// // middleware created by me
// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

// // port
// const port = process.env.PORT || 3000;

// // start
// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () => {
//       console.log(`Server is listening on port ${port}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();
