const questions = [
  {
    "question": "What is the primary methodology of Dynamic Programming?[cite: 6]",
    "options": [
      "Generating random numbers.",
      "Breaking complex problems into smaller overlapping subproblems.",
      "Sorting arrays in descending order.",
      "Ignoring base cases."
    ],
    "answer": "Breaking complex problems into smaller overlapping subproblems.[cite: 6]"
  },
  {
    "question": "How does Dynamic Programming significantly improve performance?[cite: 6]",
    "options": [
      "By increasing CPU cycle speeds.",
      "By reducing linear sequences into exponential trees.",
      "By reducing exponential recursive trees (O(2^n)) to linear sequences (O(n)).",
      "By bypassing compilation steps."
    ],
    "answer": "By reducing exponential recursive trees (O(2^n)) to linear sequences (O(n)).[cite: 6]"
  },
  {
    "question": "What does the 'Overlapping Subproblems' core principle state?[cite: 6]",
    "options": [
      "The exact same smaller problem appears repeatedly.",
      "No two problems are ever identical.",
      "Subproblems must execute simultaneously.",
      "Variables must constantly change types."
    ],
    "answer": "The exact same smaller problem appears repeatedly.[cite: 6]"
  },
  {
    "question": "Which DP execution strategy utilizes a recursive function methodology and caches completed results instantly?[cite: 6]",
    "options": [
      "Top-Down",
      "Bottom-Up",
      "Inside-Out",
      "Greedy-First"
    ],
    "answer": "Top-Down[cite: 6]"
  },
  {
    "question": "Which DP execution strategy relies on iterative loop construction built from base cases?[cite: 6]",
    "options": [
      "Top-Down",
      "Bottom-Up",
      "Randomized Allocation",
      "Matrix Generation"
    ],
    "answer": "Bottom-Up[cite: 6]"
  },
  {
    "question": "What tradeoff is generally made when using Dynamic Programming?[cite: 6]",
    "options": [
      "Accuracy is traded for speed.",
      "CPU cycles are traded for memory.",
      "Security is traded for performance.",
      "Memory is traded for smaller file sizes."
    ],
    "answer": "CPU cycles are traded for memory.[cite: 6]"
  },
  {
    "question": "What is the first step in the DP Solution Pipeline?[cite: 6]",
    "options": [
      "Apply memoization algorithms.",
      "Establish terminating conditions.",
      "Identify subproblem variables (State).",
      "Link small problems mathematically (Recurrence)."
    ],
    "answer": "Identify subproblem variables (State).[cite: 6]"
  },
  {
    "question": "In what specific scenario should Dynamic Programming be avoided?[cite: 6]",
    "options": [
      "When overlapping subproblems exist.",
      "When memory space remains strictly constrained.",
      "When CPU cycles are unlimited.",
      "When base cases are simple."
    ],
    "answer": "When memory space remains strictly constrained.[cite: 6]"
  },
  {
    "question": "How are solutions built in the 'Climbing Stairs' problem?[cite: 6]",
    "options": [
      "Using a greedy approach.",
      "Building solutions bottom-up by adding the previous two steps (dp[i-1] + dp[i-2]).",
      "Generating random numbers between 1 and N.",
      "Multiplying the current step by two."
    ],
    "answer": "Building solutions bottom-up by adding the previous two steps (dp[i-1] + dp[i-2]).[cite: 6]"
  },
  {
    "question": "In the 'Coin Change' algorithm, how is the DP array initially populated?[cite: 6]",
    "options": [
      "With negative values.",
      "With random integers.",
      "With infinity, except dp[0] which is 0.",
      "With the exact coin values."
    ],
    "answer": "With infinity, except dp[0] which is 0.[cite: 6]"
  },
  {
    "question": "What data structure is utilized for string comparisons in the 'Longest Common Subsequence' approach?[cite: 6]",
    "options": [
      "A 1D array.",
      "A binary search tree.",
      "A 2D matrix/grid.",
      "A hash map."
    ],
    "answer": "A 2D matrix/grid.[cite: 6]"
  },
  {
    "question": "In 'Longest Common Subsequence', what happens when characters match between text1 and text2?[cite: 6]",
    "options": [
      "The value resets to zero.",
      "The program terminates.",
      "The sequence is extended: dp[i][j] = dp[i-1][j-1] + 1.",
      "It carries forward the maximum value only."
    ],
    "answer": "The sequence is extended: dp[i][j] = dp[i-1][j-1] + 1.[cite: 6]"
  },
  {
    "question": "In 'Longest Common Subsequence', what happens when characters do NOT match?[cite: 6]",
    "options": [
      "It throws an exception.",
      "It subtracts 1 from the total.",
      "It carries forward the maximum value: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      "It sets the current grid cell to infinity."
    ],
    "answer": "It carries forward the maximum value: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).[cite: 6]"
  },
  {
    "question": "What is the primary goal of the classic '0/1 Knapsack' problem?[cite: 6]",
    "options": [
      "To find the shortest route between multiple cities.",
      "To maximize absolute target value within strict capacity constraints.",
      "To sort items in alphabetical order.",
      "To align DNA sequences."
    ],
    "answer": "To maximize absolute target value within strict capacity constraints.[cite: 6]"
  },
  {
    "question": "What condition must be met to use the 'Optimal Substructure' principle?[cite: 6]",
    "options": [
      "The problem must run in O(1) time.",
      "Optimal overall solutions must contain optimal sub-solutions.",
      "Variables must be strictly static.",
      "A random seed must be provided."
    ],
    "answer": "Optimal overall solutions must contain optimal sub-solutions.[cite: 6]"
  }
];

const removeCitation = (str) => str.replace(/\[cite:\s*\d+\]/g, '').trim();

const mappedQuestions = questions.map(q => {
    const cleanQuestion = removeCitation(q.question);
    const cleanAnswer = removeCitation(q.answer);
    const correctOptionIndex = q.options.findIndex(opt => removeCitation(opt) === cleanAnswer);
    if (correctOptionIndex === -1) {
        throw new Error('Answer not found in options for question: ' + cleanQuestion);
    }
    return {
        question: cleanQuestion,
        options: q.options.map(removeCitation),
        correctOptionIndex
    };
});

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const WorkshopSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    lectures: [{
        title: { type: String, required: true },
        youtubeVideoId: { type: String, required: true },
        quiz: [{
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctOptionIndex: { type: Number, required: true }
        }]
    }]
}, { timestamps: true });
const Workshop = mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema);

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const workshop = await Workshop.findOne({ slug: 'dsa-workshop-sept-2026' });
        if (!workshop) {
            console.log('Workshop not found');
            process.exit(1);
        }
        const lecture = workshop.lectures.find(l => l.title.includes('Session 7'));
        if (!lecture) {
            console.log('Lecture not found');
            process.exit(1);
        }
        console.log('Found lecture:', lecture.title);
        lecture.quiz = mappedQuestions;
        await workshop.save();
        console.log('Successfully saved questions to the session.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
run();
