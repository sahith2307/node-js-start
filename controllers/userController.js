const User = require("../models/user.js");
const dotenv = require("dotenv");
const jwtToken = require("jsonwebtoken");
dotenv.config();
const secret_key = process.env.secret_key;
exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(User);
  const user = await User.findOne({ email });
  if (user)
    return res.status(403).json({ error: { message: "email already exists" } });
  const newUser = new User({ firstName, lastName, email, password });
  try {
    await newUser.save();
    const token = getToken(newUser);
    res.status(200).json({ token });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
exports.signin = async (req, res, next) => {
  console.log(secret_key);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(403).json({ error: { message: "invalid email" } });
  const isValidPass = await user.isPasswordValid(password);
  if (!isValidPass)
    return res.status(403).json({ error: { message: "invalid password" } });

  const token = getToken(user);
  res.status(200).json({ token });
};

getToken = (user) => {
  return jwtToken.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    secret_key,
    { expiresIn: "1h" }
  );
};
