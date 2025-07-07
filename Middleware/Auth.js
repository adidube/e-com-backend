const jwt =require("jsonwebtoken");
const User =require("../Models/User.js");

exports.Authenticated = async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    };
  console.log(token);

  if (!token) return res.json({ message: "Login first" });

  const decoded = jwt.verify(token, "!@#$%^&*()");

  const id = decoded.userId;

  let user = await User.findById(id);

  if (!user) return res.json({ message: "User not exist" });

  req.user = user;
  next();

  // console.log(decoded)
};
