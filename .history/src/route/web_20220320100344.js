import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/crud", homeController.getCrud);
    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);

    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);

    router.get("/delete-crud", homeController.deleteCRUD);

    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.post("/api/create-new-user", userController.handleCreateNewUser);
    router.get("/api/get-edit-user", userController.handleEditUser);
    router.put("/api/edit-user", userController.handlePutUser);
    router.delete("/api/delete-user", userController.handleDeleteUser);

    router.get("/api/allcode", userController.getAllCode);
    router.get("/api/top-doctor-home", doctorController.handleGetTopDoctor);
    router.get("/api/get-all-doctors", doctorController.getAllDoctors);
    router.post("/api/save-infor-doctor", doctorController.postInforDoctor);

    return app.use("/", router);
};

module.exports = initWebRoutes;
