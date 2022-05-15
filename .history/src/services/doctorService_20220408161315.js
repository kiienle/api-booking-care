import db from "../models/index";
import _ from "lodash";

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
            console.log(e);
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
            console.log(e);
            reject(e);
        }
    });
};

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !inputData.doctorId ||
                !inputData.contentHTML ||
                !inputData.contentMarkdown ||
                !inputData.selectedPrice ||
                !inputData.selectedProvince ||
                !inputData.selectedPayment ||
                !inputData.nameClinic ||
                !inputData.addressClinic
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

                // upsert to Doctor_infor table
                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: { doctorId: inputData.doctorId },
                    raw: false,
                });

                if (doctorInfor) {
                    //update
                    doctorInfor.doctorId = inputData.doctorId;
                    doctorInfor.priceId = inputData.selectedPrice;
                    doctorInfor.provinceId = inputData.selectedProvince;
                    doctorInfor.paymentId = inputData.selectedPayment;
                    doctorInfor.nameClinic = inputData.nameClinic;
                    doctorInfor.addressClinic = inputData.addressClinic;
                    doctorInfor.note = inputData.note;

                    await doctorInfor.save();
                } else {
                    //create
                    await db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note,
                    });
                }
                resolve({
                    errCode: 0,
                    errMesage: "Save infor doctor succeed!!!",
                });
            }
        } catch (e) {
            console.log(e);
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
                    {
                        model: db.Doctor_Infor,
                        attributes: { exclude: ["id", "doctorId"] },
                        include: [
                            {
                                model: db.Allcode,
                                as: "priceTypeData",
                                attributes: ["valueVi", "valueEn"],
                            },
                            {
                                model: db.Allcode,
                                as: "provinceTypeData",
                                attributes: ["valueVi", "valueEn"],
                            },
                            {
                                model: db.Allcode,
                                as: "paymentTypeData",
                                attributes: ["valueVi", "valueEn"],
                            },
                        ],
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
            console.log("check data", data);
            if (!data) data = {};
            resolve({
                errCode: 0,
                data,
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parametor from server!!!",
                });
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });
                }
                //get all ezisting data
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formatedDate },
                    attributes: ["timeType", "date", "doctorId", "maxNumber"],
                    raw: true,
                });

                //compare different
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    console.log(a, b);
                    return (
                        a.timeType === b.timeType && a.date === parseInt(b.date)
                    );
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }

                resolve({
                    errCode: 0,
                    errMesage: "OK",
                });
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing require parametor from the server!!!",
                });
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: { doctorId: doctorId, date: date },
                    include: [
                        {
                            model: db.Allcode,
                            as: "timeTypeData",
                            attributes: ["valueEn", "valueVi"],
                        },
                    ],
                    attributes: {
                        exclude: ["currentNumber"],
                    },
                    raw: false,
                    nest: true,
                });
                if (!dataSchedule) dataSchedule = [];
                resolve({
                    errCode: 0,
                    dataSchedule,
                });
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

let getExtraInforDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parametor from the server!!!",
                });
            } else {
                let extraInforDoctor = await db.Doctor_Infor.findOne({
                    where: { doctorId: id },
                    attributes: { exclude: ["id", "doctorId"] },
                    include: [
                        {
                            model: db.Allcode,
                            as: "priceTypeData",
                            attributes: ["valueVi", "valueEn"],
                        },
                        {
                            model: db.Allcode,
                            as: "provinceTypeData",
                            attributes: ["valueVi", "valueEn"],
                        },
                        {
                            model: db.Allcode,
                            as: "paymentTypeData",
                            attributes: ["valueVi", "valueEn"],
                        },
                    ],
                });
                resolve({
                    errCode: 0,
                    extraInforDoctor,
                });
            }
        } catch (e) {
            console.log(e);
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
    getScheduleByDate,
    getExtraInforDoctor,
};
