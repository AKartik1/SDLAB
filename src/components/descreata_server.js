const mongoose = require("mongoose");

// Connect to MongoDB (use an in-memory database or a local MongoDB instance for testing)
mongoose
  .connect("mongodb://127.0.0.1:27017/discreteGame", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Define the schema for questions
const questionSchema = new mongoose.Schema({
  topic: String,
  question: String,
  options: [String],
  correctAnswer: String,
  type: { type: String, enum: ["multipleChoice", "fillInTheBlank"] },
});

// Define the model
const Question = mongoose.model("Question", questionSchema);

// Function to seed fake data into the database
const seedQuestions = async () => {
  await Question.deleteMany({}); // Clear existing data

  const questions = [
    {
      topic: "Groups",
      question: "Is addition of integers a group?",
      options: ["Yes", "No"],
      correctAnswer: "Yes",
      type: "multipleChoice",
    },
    {
      topic: "Groups",
      question: "Is multiplication of even numbers a group?",
      options: ["Yes", "No"],
      correctAnswer: "No",
      type: "multipleChoice",
    },
    {
      topic: "Groups",
      question: "What is the identity element of addition in integers?",
      options: [],
      correctAnswer: "0",
      type: "fillInTheBlank",
    },
    {
      topic: "Semigroups",
      question: "Is addition of natural numbers a semigroup?",
      options: ["Yes", "No"],
      correctAnswer: "Yes",
      type: "multipleChoice",
    },
    {
      topic: "Semigroups",
      question: "Is string concatenation a semigroup?",
      options: ["Yes", "No"],
      correctAnswer: "Yes",
      type: "multipleChoice",
    },
    
  ];

  await Question.insertMany(questions);
  console.log("Database seeded with questions");
};

// Fetch questions by topic
const getQuestionsByTopic = async (topicName) => {
  const questions = await Question.find({ topic: topicName });
  return questions;
};

// Seed data and fetch example
(async () => {
  await seedQuestions();

  const exampleTopic = "Groups";
  const questions = await getQuestionsByTopic(exampleTopic);
  console.log(`Questions for topic "${exampleTopic}":`, questions);

  mongoose.connection.close();
})();
