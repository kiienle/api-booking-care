import db from '../models/index';


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
    try {
        console.log(req.body)
        return res.render('test/crud.ejs');
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getHomePage,
    getCrud,
    postCRUD,
}