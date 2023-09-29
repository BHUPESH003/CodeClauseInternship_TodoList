const asyncHandler = require("express-async-handler");

const Todo = require("./Models/todoModel");

const getTodos = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const postTodos = asyncHandler(async (req, res) => {
  const { task, status } = req.body;
  if (!task || !status) {
    res.status(400);
    throw new Error("All Fields Are Mandatory");
  }
  const todo = await Todo.create({
    task,
    status,
  });
  res.status(201).json(todo);
});

const deleteTodos = asyncHandler(async (req, res) => {
  const todoId = req.params.id;

  try {
    // Use Mongoose to find and delete the todo by its ID
    await Todo.findByIdAndRemove(todoId);

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const updateTodo = asyncHandler(async (req, res) => {
  try {
    const todoId = req.params.id;
    const { status } = req.body;

    // Find the todo by ID and update its status
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { status },
      { new: true } // Return the updated todo
    );

    if (!updatedTodo) {
      // If the todo with the specified ID is not found, return a 404 status
      return res.status(404).json({ message: "Todo not found" });
    }

    // Return the updated todo
    res.status(200).json(updatedTodo);
  } catch (error) {
    // Handle errors, e.g., validation errors or database errors
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  getTodos,
  postTodos,
  deleteTodos,
  updateTodo,
};
