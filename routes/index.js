const express = require("express");
const userRouter = require("./UsersRoutes.js");
const patientRouter = require("./PatientsRoutes.js");

const router = express.Router();

router.use("/users", userRouter);
router.use("/patients", patientRouter);

module.exports = router;
