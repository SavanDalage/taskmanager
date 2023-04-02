const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismynewtoken");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token; // zapisujemy token, by potem móc się np. wylogować

    req.user = user; // zapisujemy usera w req by handler miał potem do niego dostęp
    next();
  } catch (e) {
    res.status(401).send({ error: "Plese authenticate" });
  }
};

module.exports = auth;
