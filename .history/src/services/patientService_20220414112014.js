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
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3",
                    },
                });

                if (user && user[0]) {
                    await db.Booking.create({
                        doctorId: data.doctorId,
                        patientId: user[0].id,
                        date: data.date,
                        timeType: data.timeType,
                    });
                }

                resolve({
                    errCode: 0,
                    errMesage: "Save infor user succeed",
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
