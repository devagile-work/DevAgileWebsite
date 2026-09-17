require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const quizInput = [
  {
    "question": "Unlike trees, which feature a strict hierarchical root origin, what type of entry points do graphs possess?[cite: 4]",
    "options": [
      "A single entry point.",
      "Multiple arbitrary entry points.",
      "No entry points.",
      "Only leaf node entry points."
    ],
    "answer": "Multiple arbitrary entry points.[cite: 4]"
  },
  {
    "question": "Which data structure is characterized by absolute cycle prevention?[cite: 4]",
    "options": [
      "Graphs",
      "Implicit Grids",
      "Trees",
      "Adjacency Matrices"
    ],
    "answer": "Trees[cite: 4]"
  },
  {
    "question": "What is the space complexity of an Adjacency Matrix used for memory representation of a graph?[cite: 4]",
    "options": [
      "$O(V+E)$",
      "$O(V^2)$",
      "$O(1)$",
      "$O(\\log V)$"
    ],
    "answer": "$O(V^2)$[cite: 4]"
  },
  {
    "question": "Which graph memory representation uses $O(V+E)$ space and allows for efficient neighbor iteration?[cite: 4]",
    "options": [
      "Adjacency List",
      "Adjacency Matrix",
      "Implicit Grid",
      "Hash Map"
    ],
    "answer": "Adjacency List[cite: 4]"
  },
  {
    "question": "What is the mandatory purpose of tracking visited nodes in a \"Visited Array\" during graph traversals?[cite: 4]",
    "options": [
      "To sort the nodes in alphabetical order.",
      "To prevent infinite cycle loops.",
      "To calculate the maximum value in a graph.",
      "To convert the graph into a directed tree."
    ],
    "answer": "To prevent infinite cycle loops.[cite: 4]"
  },
  {
    "question": "In an implicit graph, such as a 2D matrix grid, what do the adjacent cells natively represent?[cite: 5]",
    "options": [
      "Root nodes",
      "Edges",
      "Visited arrays",
      "Disconnected islands"
    ],
    "answer": "Edges[cite: 5]"
  },
  {
    "question": "Why are strict bound checks necessary during a Matrix Traversal?[cite: 5]",
    "options": [
      "To prevent out-of-bounds matrix exceptions.",
      "To count the total number of connected islands.",
      "To resolve dependencies automatically.",
      "To convert the matrix into an Adjacency List."
    ],
    "answer": "To prevent out-of-bounds matrix exceptions.[cite: 5]"
  },
  {
    "question": "What tool is commonly used to navigate coordinates (up, down, left, right) in a Matrix Traversal?[cite: 5]",
    "options": [
      "Hash Maps",
      "Binary Trees",
      "[dr, dc] direction arrays",
      "Zero-degree queues"
    ],
    "answer": "[dr, dc] direction arrays[cite: 5]"
  },
  {
    "question": "What graph pattern involves the iterative discovery of disconnected cluster islands?[cite: 5]",
    "options": [
      "Topological Sort",
      "K-Connected Components",
      "Adjacency Matrix Generation",
      "Binary Search"
    ],
    "answer": "K-Connected Components[cite: 5]"
  },
  {
    "question": "When discovering graph islands using a linear scan, what specific event triggers a BFS or DFS traversal?[cite: 5]",
    "options": [
      "Reaching the boundary of the matrix.",
      "Finding a valid unvisited node.",
      "Encountering a cyclic loop.",
      "Sorting the matrix elements."
    ],
    "answer": "Finding a valid unvisited node.[cite: 5]"
  },
  {
    "question": "What is the primary objective of a Topological Sort in graph algorithms?[cite: 5]",
    "options": [
      "Counting the number of islands.",
      "Dependency resolution.",
      "Finding the shortest path between two nodes.",
      "Reversing a linked list in place."
    ],
    "answer": "Dependency resolution.[cite: 5]"
  },
  {
    "question": "In Topological Sorting, what is the purpose of \"In-Degree Tracking\"?[cite: 5]",
    "options": [
      "To count the number of outgoing edges.",
      "To count prerequisites for every graph node.",
      "To determine the total number of nodes in the graph.",
      "To measure the distance from the root."
    ],
    "answer": "To count prerequisites for every graph node.[cite: 5]"
  },
  {
    "question": "During Kahn's Algorithm for Topological Sort, which nodes are initially placed into the queue?[cite: 4, 5]",
    "options": [
      "Nodes with the highest numerical values.",
      "Nodes with exactly one dependency.",
      "Nodes requiring no dependencies (zero indegree).",
      "All nodes present in the graph."
    ],
    "answer": "Nodes requiring no dependencies (zero indegree).[cite: 4, 5]"
  },
  {
    "question": "How does a Depth-First Search (DFS) methodically explore a graph?[cite: 4]",
    "options": [
      "Through level-order radial expansion via a queue.",
      "Through exhaustive branch penetration via recursion.",
      "By sorting all nodes prior to processing.",
      "By selecting adjacent nodes purely at random."
    ],
    "answer": "Through exhaustive branch penetration via recursion.[cite: 4]"
  },
  {
    "question": "How does a Breadth-First Search (BFS) methodically traverse a graph?[cite: 4]",
    "options": [
      "Through exhaustive branch penetration via recursion.",
      "Through pre-order topological sorting.",
      "Through level-order radial expansion via a queue.",
      "Through iterative dependency pruning."
    ],
    "answer": "Through level-order radial expansion via a queue.[cite: 4]"
  }
];

const transformedQuiz = quizInput.map(q => {
  const cleanAnswer = q.answer.replace(/\[cite:\s*\d+(?:,\s*\d+)*\]/, '').trim();
  const correctOptionIndex = q.options.findIndex(opt => opt.trim() === cleanAnswer);
  if (correctOptionIndex === -1) {
    throw new Error(`Answer not found in options for question: ${q.question}\nClean Answer: '${cleanAnswer}'\nOptions: ${JSON.stringify(q.options)}`);
  }
  return {
    question: q.question,
    options: q.options,
    correctOptionIndex: correctOptionIndex
  };
});

async function updateDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    
    // The workshop seems to contain lectures.
    // Let's find the workshop that has a lecture with title containing "Session 6"
    const workshop = await db.collection('workshops').findOne({
      "lectures.title": { $regex: /Session 6/i }
    });

    if (!workshop) {
      console.error("Workshop with Session 6 not found.");
      process.exit(1);
    }

    // Update the specific lecture's quiz array
    const result = await db.collection('workshops').updateOne(
      { _id: workshop._id, "lectures.title": { $regex: /Session 6/i } },
      { $set: { "lectures.$.quiz": transformedQuiz } }
    );

    console.log("Update Result:", result);
    process.exit(0);
  } catch (error) {
    console.error("Error updating DB:", error);
    process.exit(1);
  }
}

updateDb();
