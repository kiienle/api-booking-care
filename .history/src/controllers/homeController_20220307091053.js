import db from '../models/index';


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homePage.ejs');
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getHomePage,
}