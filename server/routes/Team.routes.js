const router = require("express").Router();
const {
    addNewTeam,
    updateTeamHandler,
    deleteTeam,
    getAllTeams,
    getYourTeam
  } = require("../Controller/Team.controller");

  const { protect } = require("../middleware/verifyToken");

  const validateRequest = require('../validations/validateRequest')
  const TeamRequestSchema  = require("../schema/Team.schema")
  
  router.post("/create/", protect, validateRequest(TeamRequestSchema ), addNewTeam);
  router.get("/yourJob", protect, getYourTeam);
  router.get("/", protect, getAllTeams)
  router.put("/updateJob/:id([0-9a-fA-F]{24})", protect, updateTeamHandler);
  router.delete("/delete/:id([0-9a-fA-F]{24})", protect, deleteTeam);
  
  module.exports = router;