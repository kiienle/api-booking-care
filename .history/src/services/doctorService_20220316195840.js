import db from "../models/index";

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                order: [["createAt", "DESC"]],
                attributes: {
                    exclude: ["password"],
                },
                // raw: true
            });
            resolve({
                errCode: 0,
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getTopDoctorHome,
};
