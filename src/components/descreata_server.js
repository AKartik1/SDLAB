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
  difficulty: { type: String, enum: ["easy", "medium", "hard"] }, // New field for difficulty
});

// Define the model
const Question = mongoose.model("Question", questionSchema);

// Function to seed questions
const seedQuestions = async () => {
  await Question.deleteMany({}); // Clear existing data

  const questions = [
    // EASY QUESTIONS
    {
      topic: "Groups",
      question: "What is the identity element of addition in integers?",
      options: ["1", "0", "-1", "2"],
      correctAnswer: "0",
      difficulty: "easy",
    },
    {
      topic: "Groups",
      question: "Is the set of integers under addition a group?",
      options: ["Yes", "No", "Only under certain conditions", "Not Sure"],
      correctAnswer: "Yes",
      difficulty: "easy",
    },
    {
      topic: "Groups",
      question: "Does the set of natural numbers under multiplication form a group?",
      options: ["Yes", "No", "Only if 1 is included", "Depends on the operation"],
      correctAnswer: "No",
      difficulty: "easy",
    },
    {
      topic: "Semigroups",
      question: "Which operation forms a semigroup in natural numbers?",
      options: ["Addition", "Subtraction", "Division", "Exponentiation"],
      correctAnswer: "Addition",
      difficulty: "easy",
    },
    {
      topic: "Semigroups",
      question: "Is string concatenation a semigroup?",
      options: ["Yes", "No", "Sometimes", "Not Sure"],
      correctAnswer: "Yes",
      difficulty: "easy",
    },

    // MEDIUM QUESTIONS
    {
      topic: "Groups",
      question: "Which of these sets forms a cyclic group under addition modulo 5?",
      options: ["{1, 2, 3, 4, 5}", "{0, 1, 2, 3, 4}", "{1, 3, 5, 7, 9}", "{0, 2, 4, 6, 8}"],
      correctAnswer: "{0, 1, 2, 3, 4}",
      difficulty: "medium",
    },
    {
      topic: "Groups",
      question: "Which of the following is NOT a group?",
      options: [
        "Integers under addition",
        "Rational numbers under addition",
        "Non-zero real numbers under multiplication",
        "Natural numbers under addition",
      ],
      correctAnswer: "Natural numbers under addition",
      difficulty: "medium",
    },
    {
      topic: "Semigroups",
      question: "Which property is necessary for a semigroup?",
      options: ["Identity", "Associativity", "Inverses", "Commutativity"],
      correctAnswer: "Associativity",
      difficulty: "medium",
    },
    {
      topic: "Semigroups",
      question: "Which of these sets forms a semigroup under multiplication?",
      options: ["Natural Numbers", "Integers", "Matrices", "Strings"],
      correctAnswer: "Matrices",
      difficulty: "medium",
    },

    // HARD QUESTIONS
    {
      topic: "Groups",
      question:
        "If a and b are elements of a group, which property ensures (a ⋅ b)⁻¹ = b⁻¹ ⋅ a⁻¹?",
      options: ["Closure", "Associativity", "Identity", "Inverses"],
      correctAnswer: "Inverses",
      difficulty: "hard",
    },
    {
      topic: "Groups",
      question: "Which of these is an example of a non-abelian group?",
      options: [
        "Integers under addition",
        "Symmetric group S3",
        "Real numbers under multiplication",
        "Cyclic group of order 4",
      ],
      correctAnswer: "Symmetric group S3",
      difficulty: "hard",
    },
    {
      topic: "Semigroups",
      question: "Which of these is a semigroup but NOT a monoid?",
      options: [
        "Strings under concatenation",
        "Natural numbers under addition",
        "Natural numbers under subtraction",
        "Even integers under addition",
      ],
      correctAnswer: "Natural numbers under subtraction",
      difficulty: "hard",
    },
    {
      topic: "Semigroups",
      question: "Which property differentiates a semigroup from a group?",
      options: ["Closure", "Associativity", "Identity", "Inverse"],
      correctAnswer: "Identity",
      difficulty: "hard",
    },
  ];

  await Question.insertMany(questions);
  console.log("Database seeded with questions");
};

// Fetch questions by topic and difficulty
const getQuestionsByTopicAndDifficulty = async (topicName, difficultyLevel) => {
  const questions = await Question.find({ topic: topicName, difficulty: difficultyLevel });
  return questions;
};

// Seed data and fetch example
(async () => {
  await seedQuestions();

  const exampleTopic = "Groups";
  const difficultyLevel = "medium";
  const questions = await getQuestionsByTopicAndDifficulty(exampleTopic, difficultyLevel);
  console.log(`Questions for topic "${exampleTopic}" with difficulty "${difficultyLevel}":`, questions);

  mongoose.connection.close();
})();

