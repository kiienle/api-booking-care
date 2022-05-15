import db from "../models/index";

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                order: [["createAt", "DESC"]],
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getTopDoctorHome,
};
