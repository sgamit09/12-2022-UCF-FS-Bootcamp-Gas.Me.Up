const { Thought } = require('../models/Thought');

module.exports = {
  // GET to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .then(async (Thoughts_db) => {
        return res.json(Thoughts_db);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // GET to get a single thought by its id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then(async (Thoughts_db) => {
        if (!Thoughts_db) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(Thoughts_db);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // POST to create a new thought
  // $push operator appends a specified value to an array.
  addThought({ body }, res) {
    Thought.create(body)
      .then(Thoughts_db => {
        User.findOneAndUpdate({ _id: body.id }, { $push: { thoughts: Thoughts_db.id } }, { new: true })
          .then(Thoughts_db => {
            if (!Thoughts_db) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(Thoughts_db);
          })
          .catch(err => res.json(err));
      })
  },
  // update a user by its id
  // .findOneAndUpdate updates a single document based on the filter and sort criteria. db.collection.findOneAndUpdate(filter, update, options)
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(Thoughts_db => {
        if (!Thoughts_db) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(Thoughts_db);
      })
      .catch(err => res.status(400).json(err));
  },
//DELETE to remove a thought by its id
//The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate({ _id: params.userId },{ $pull: { thoughts: params.thoughtId } }, { new: true });
        })
        .then(Users_db => {
            if (!Users_db) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(Users_db);
        })
        .catch(err => res.json(err));
},
  // POST to create a reaction stored in a single thought's reactions array field
  // $addToSet operator adds a value to an array unless the value is already present
  addReaction({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, { $addToSet: { reactions: body } }, { runValidators: true })
      .then(Thoughts_db => {
        if (!Thoughts_db) {
          res.status(404).json({ message: 'No thought found with this id' });
          return;
        }
        res.json(Thoughts_db);
      })
      .catch(err => res.status(400).json(err));
  },
  //DELETE to remove a friend from a user's friend list
  //The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, { $pull: { reactions: { reactionid: params.id } } }, { runValidators: true })
      .then(Thoughts_db => {
        if (!Thoughts_db) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(Thoughts_db);
      })
      .catch(err => res.status(400).json(err));
  },

}
