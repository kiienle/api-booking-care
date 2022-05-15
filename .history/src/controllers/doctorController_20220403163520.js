import doctorService from "../services/doctorService";

let handleGetTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        });
    }
};

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from the server...",
        });
    }
};

let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
    }
};

let getDoctorInfor = async (req, res) => {
    try {
    } catch (e) {
        console.log(e);
    }
};

let getInforDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDoctorById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error message from the server...",
        });
    }
};

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body);
        console.log(infor);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -2,
            errMessage: "Error message from the server...",
        });
    }
};

module.exports = {
    handleGetTopDoctor,
    getAllDoctors,
    postInforDoctor,
    getDoctorInfor,
    getInforDoctorById,
    bulkCreateSchedule,
};
