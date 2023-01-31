const jwt = require("jsonwebtoken");

async function Auth(req, res, next) {
  try {
    /***_______  access the authorize header to valid user   ________**/
    const token = req.headers.authorization.split(" ")[1];
    /***_______  retrived the user details of loged user  ________**/
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ errr: err.message });
  }
}

function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}

module.exports = { Auth, localVariables };
