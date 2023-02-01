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

app.use(express.json());
// handle cros
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  })
);
app.use(morgan("tiny"));

app.get("/", (req, res, next) => {
  console.log(app.locals === req.app.locals)
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
