import db from "../models/index";

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

    let user = await;
    return res.status(200).json({
        errCode: 0,
        message: "hello world",
        yourEmail: email,
    });
};

module.exports = {
    handleLogin,
};
