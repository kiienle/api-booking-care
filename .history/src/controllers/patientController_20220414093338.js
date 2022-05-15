import patientService from "../services/patientService";

let postBookingAppointment = async (req, res) => {
    try {
        let response = await patientService.postBookingAppointment(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error message from the server...",
        });
    }
};

module.exports = {
    postBookingAppointment,
};
