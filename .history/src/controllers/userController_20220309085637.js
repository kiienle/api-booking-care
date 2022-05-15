import db from "../models/index";
import userService from '../services/userService'

let handleLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    //check email exist
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parametor!",
        });
    }

    let userData = 
    return res.status(200).json({
        errCode: 0,
        message: "hello world",
        yourEmail: email,
    });
};

module.exports = {
    handleLogin,
};
