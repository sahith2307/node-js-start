const NoteSchema = require("../models/note");

exports.getAl1Notes = async (req, res, next) => {
  const notes = await NoteSchema.find({ createdBy: req.user.id });
  res.status(200).json(notes);
};
exports.postNote = async (req, res, next) => {
  const note = new NoteSchema(req.body);

  note.createdBy = req.user.id;
  try {
    const noted = await note.save();

    res.status(201).json(noted);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
exports.getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const singleNote = await NoteSchema.find({ _id: noteId });
    res.status(200).json(singleNote);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
exports.updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    await NoteSchema.findByIdAndUpdate(noteId, req.body);
    res.status(200).json({ success: "updated successfully" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
exports.deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    await NoteSchema.findByIdAndRemove(noteId);
    res.status(200).json({ success: `deleted ${noteId}` });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
