import db from "../models/index";

let handleLogin = (req, res) => {
  return res.status(200).json({
    message: "hello world",
  });
};

module.exports = {
  handleLogin,
};
