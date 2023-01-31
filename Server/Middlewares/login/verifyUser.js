const UserModle = require("../../Model/User.model");
async function verifyUser(req, res, next) {
  try {
    const { email } = req.method === "GET" ? req.query : req.body;
    const existUser = await UserModle.findOne({
      $or: [{ email: email }, { userName: email }],
    });
    if (!existUser) return res.status(404).json({ error: "Can't find user." });
    next();
  } catch (err) {
    res.status(401).json({ error: "Authetication Error" });
  }
}

module.exports = { verifyUser };
