const reportController = require("../controllers/reportController");
const router = require("express").Router();
// const { auth, logout } = require("../middleware");

router.post("/createReport", reportController.createReport);
router.get("/getReportByUserId", reportController.getReportByUserId);
router.get("/getReportByReportId", reportController.getReportByReportId);
router.delete("/deleteReport", reportController.deleteReport);
router.put("/updateReport", reportController.updateReport);

// router.post("/logout", logout, authController.logout);
// router.post("/signUp", authController.signUp);
// router.get("/forgotPassword", authController.forgotPassword);
// router.get("/resetPassword", authController.resetPassword);

module.exports = router;
