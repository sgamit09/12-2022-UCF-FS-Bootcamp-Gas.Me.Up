const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "Users",
      },
  ]
  },
 {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//gets total count of friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;
