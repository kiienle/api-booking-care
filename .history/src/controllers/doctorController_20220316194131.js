import doctorService from "../services/doctorService";

let getTopDoctorHome = (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
};

module.exports = {
    getTopDoctorHome,
};
