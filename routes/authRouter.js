const authController = require("../controllers/authController");
const router = require("express").Router();
// const { auth, logout } = require("../middleware");

router.post("/createUser", authController.createUser);
router.post("/login", authController.login);

// router.post("/logout", logout, authController.logout);
// router.post("/signUp", authController.signUp);
// router.get("/forgotPassword", authController.forgotPassword);
// router.get("/resetPassword", authController.resetPassword);

module.exports = router;
