import db from "../models/index";
require("dotenv").config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: "R2" },
                order: [["createdAt", "DESC"]],
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueEn", "valueVi"],
                    },
                    {
                        model: db.Allcode,
                        as: "genderData",
                        attributes: ["valueEn", "valueVi"],
                    },
                ],
                raw: true,
                nest: true,
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

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" },
                attributes: {
                    exclude: ["password", "image"],
                },
                // raw: true,
            });

            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(inputData);
            if (
                !inputData.doctorId ||
                !inputData.contentHTML ||
                !inputData.contentMarkdown ||
                !inputData.action
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter!!!",
                });
            } else {
                if (inputData.action === "create") {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                    });
                } else if (inputData.action === "edit") {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false,
                    });

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown =
                            inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;

                        await doctorMarkdown.save();
                    }
                }
                resolve({
                    errCode: 0,
                    errMesage: "Save infor doctor succeed!!!",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parametor from server!!!",
                });
            }
            let data = await db.User.findOne({
                where: { id: id },
                include: [
                    {
                        model: db.Markdown,
                        attributes: [
                            "description",
                            "contentHTML",
                            "contentMarkdown",
                        ],
                    },
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueEn", "valueVi"],
                    },
                ],
                attributes: {
                    exclude: ["password"],
                },
                raw: false,
                nest: true,
            });

            if (data && data.image) {
                data.image = new Buffer(data.image, "base64").toString(
                    "binary"
                );
            }
            if (!data) data = {};
            resolve({
                errCode: 0,
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            resolve("");
            // if (!data.arrSchedule) {
            //     console.log("errr");
            //     resolve({
            //         errCode: 1,
            //         errMessage: "Missing required parametor from server!!!",
            //     });
            // } else {
            //     let schedule = data.arrSchedule;
            //     if (schedule && schedule.length > 0) {
            //         schedule.map((item) => {
            //             item.maxNumber = MAX_NUMBER_SCHEDULE;
            //             return item;
            //         });
            //     }
            //     consoele.log(schedule);
            // }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    saveDetailInforDoctor,
    getDoctorById,
    bulkCreateSchedule,
};