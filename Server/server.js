const doteEnv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router/router");
const mongoose = require("mongoose");
const {
  notFound,
  defaultErrorHandler,
} = require("./Middlewares/common/defaultErrorHandler");
doteEnv.config({ path: ".env" });

// create app
const app = express();
mongoose.set("strictQuery", false);
/***_______ LOCAL= mongodb://127.0.0.1:27017/Abir    ________**/
mongoose
  .connect(process.env.CONNECTION_SRT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connection successfull.....!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json({ limit: "5mb" }));
// handle cros

// "http://localhost:3000",
// https://authenticatewithabir.netlify.app/
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  })
);
app.use(morgan("tiny"));

app.get("/", (req, res, next) => {
  console.log(app.locals === req.app.locals);
  res.json({
    msg: "OK",
  });
});
app.use("/", router);
//  deafult error handler
app.use(notFound);
app.use(defaultErrorHandler);
app.listen(process.env.PORT, () => {
  console.log(`You server started... on http://localhost:${process.env.PORT}/`);
});
