const {
  createProject,
  updateProject,
  getProjectByProjectId,
  deleteProject,
  getProjectsByUserId,
} = require("../controllers/projectController");
const router = require("express").Router();

router.post("/createProject", createProject);
router.put("/updateProject", updateProject);
router.get("/getProjectByProjectId", getProjectByProjectId);
router.get("/getProjectsByUserId", getProjectsByUserId);
router.delete("/deleteProject", deleteProject);

module.exports = router;
