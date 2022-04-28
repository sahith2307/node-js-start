const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.route("/").get(noteController.getAl1Notes).post(noteController.postNote);
router
  .route("/:noteId")
  .get(noteController.getNoteById)
  .put(noteController.updateNote)
  .delete(noteController.deleteNote); 
module.exports = router;
