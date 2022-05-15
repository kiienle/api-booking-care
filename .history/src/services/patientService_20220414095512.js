import db from "../models/index";
import _ from "lodash";

let postBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: -2,
                    errMessage: "Missing parametor from the server...",
                });
            } else {
                let user = await db.User({
                    where: { email: data.email },
                    default: {
                        email: data.email,
                        roleId: "R3",
                    },
                });
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

module.exports = {
    postBookingAppointment,
};
