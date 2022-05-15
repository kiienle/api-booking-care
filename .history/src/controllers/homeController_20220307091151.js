import db from '../models/index';


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('------------------')
        console.log(data)
        console.log('------------------')
        return res.render('homePage.ejs');
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getHomePage,
}