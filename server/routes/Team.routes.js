const router = require("express").Router();
const {
    addNewTeam,
    updateTeam,
    updateTeamHandler,
    deleteTeam,
    getAllTeams,
    getYourTeam,
    getTeamById,
    deleteTeamById,
    getTeamByCategoryAndId,
    getTeamsByCategory
  } = require("../Controller/Team.controller");

  const { protect } = require("../middleware/verifyToken");

  const validateRequest = require('../validations/validateRequest')
  const TeamRequestSchema  = require("../schema/Team.schema")
  
  router.post("/create/", protect, validateRequest(TeamRequestSchema ), addNewTeam);
  router.get("/yourJob", protect, getYourTeam);
  router.get("/", protect, getAllTeams);
  router.put('/:id', updateTeam);
  router.put("/updateJob/:id([0-9a-fA-F]{24})", protect, updateTeamHandler);
  router.delete("/delete/:id([0-9a-fA-F]{24})", protect, deleteTeam);
  router.delete('/:id', deleteTeamById);
  router.get('/:id', getTeamById);
  router.get("/get/:id/:category", getTeamByCategoryAndId)
  router.get('/get/:category', getTeamsByCategory);
  
  module.exports = router;