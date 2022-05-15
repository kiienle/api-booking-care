import { response } from "express";
import db from "../models";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    //check email exist
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parametor!",
        });
    }

    let userData = await userService.handleUserLogin(email, password);
    console.log(userData);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //ALL, ID

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parametor!",
            users: [],
        });
    }
    let users = await userService.getAllUsers(id);
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: "ok",
        users,
    });
};

let handleCreateNewUser = async (req, res) => {
    console.log(req.body);
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json({ message });
};

let handleEditUser = async (req, res) => {
    let message = await userService.getUserInfoById(req.query.id);
    return res.status(200).json({ message });
};

let handlePutUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData();
    return res.status(200).json({
        message,
    });
};

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing require parametor!!!",
        });
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json({
        message,
    });
};
module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
};
