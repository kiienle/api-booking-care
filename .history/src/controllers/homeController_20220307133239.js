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
        return res.send('get CRUD with kieen')
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getHomePage,
    getCrud,
}