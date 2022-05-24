const ObjectId = require('mongoose/lib/schema/objectid');
const { User, Thoughts } = require('../models');

module.exports = {
  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((Users) => res.json(Users))
      .catch((err) => res.status(500).json(err));
  },
  // Get all Users
  getUsers(req, res) {
    User.find()
      .populate('thoughts')
      .populate('friends')
      .then((User) => {
        return res.json(User);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
      });
  },
  // GET a single user by its id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id:req.params.userId }, (err, result) => {
      if (User) {
        res.status(200).json(User);
      } else {
        res.status(500).json({ error: 'Something went wrong' });
      }
    });
  },

  // update a user by its id
  // .findOneAndUpdate updates a single document based on the filter and sort criteria. db.collection.findOneAndUpdate(filter, update, options)
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: params.userId }, {$set: req.body}, { new: true, runValidators: true })
      .then(users => {
        if (!users) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(users);
      })
      .catch(err => res.status(500).json({ error: 'Something went wrong' }));
  },

  // DELETE to remove user & thoughts by its id
  // findOneAndDelete() deletes the first matching document in the collection that matches the filter. db.collection.findOneAndDelete(filter, options)
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(users => {
        if (!users) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        } Thoughts.deleteMany({ username: users.username })
          .then(() => {
            res.json({ message: "Successfully deleted user and their thoughts" });
          })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
      });
  },

  //POST to add a new friend to a user's friend list
  //The $addToSet operator adds a value to an array unless the value is already present,
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, { $addToSet: { friends: params.userId } }, { new: true, runValidators: true }
    ).then(users => {
      if (!users) {
        res.status(404).json({ message: 'No user found with this userId' });
        return;
      }
      res.json(users);
    })
      .catch(err => res.status(500).json({ error: 'Something went wrong' }));
  },

  //DELETE to remove a friend from a user's friend list
  //The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
  removeFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true })
      .then(users => {
        if (!users) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(users);
      })
      .catch(err => res.status(500).json({ error: 'Something went wrong' }));
  },
}

