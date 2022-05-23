const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtsController.js');

// GET all and Post at /api/users
// /api/thoughts
router
.route('/')
.get(getThoughts)
.post(addThought);

// /api/thoughts/:id
router
.route('/thoughts/:id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:Id/reactions
router
    .route('/thoughts/:id/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;
