import db from '../models/index';
import CRUDService from '../services/CRUDService'
import bcrypt from 'bcryptjs'

var salt = bcrypt.genSaltSync(10); 


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}

let getCrud = async (req, res) => {
    try {
        return res.render('test/crud.ejs');
    } catch (e) {
        console.log(e)
    }
}
let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body)
    return res.send('post CRUD')
    // try {
    //     console.log(req.body)
    //     return res.send("post CRUD");
    // } catch (e) {
    //     console.log(e)
    // }
}

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        var bcrypt = require('bcryptjs');
        var hash = bcrypt.hashSync("B4c0/\/", salt);
    })
}

module.exports = {
    getHomePage,
    getCrud,
    postCRUD,
}