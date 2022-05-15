import db from '../models/index';
import CRUDService from '../services/CRUDService'


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
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('post CRUD')
    // try {
    //     console.log(req.body)
    //     return res.send("post CRUD");
    // } catch (e) {
    //     console.log(e)
    // }
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    return res.render('displayCRUD.ejs', {
        data
    })
}

let getEditCRUD = (req, res) => {
    let id = req.query.id;
    console.log(userId)
    if(userId) {
        let userData = CRUDService.getUserInfoById(userId)
    } else {
        return res.send('hello to edit pages')
    }
}

module.exports = {
    getHomePage,
    getCrud,
    postCRUD,
    displayGetCRUD,
    getEditCRUD
}