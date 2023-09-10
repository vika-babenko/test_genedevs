const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  questions: [
    {
      questionText: String,
      answerOptions: [String],
    },
  ],
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
