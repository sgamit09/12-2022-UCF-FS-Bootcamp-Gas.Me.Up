const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

// Schema to create a course model
const thoughtsSchema = new Schema(
  {
    thoughtPost: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
          get: Timestamp => dateFormat(Timestamp),
    },
    username: {
      type: String,
      required: true
  },
  reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('thought', thoughtsSchema);

module.exports = Thought;
