const express = require("express");

const {getTodos,postTodos,deleteTodos, updateTodo} = require("./todoController");

const route = express.Router();


route.get("/todos", getTodos);

route.post("/todos",postTodos);
route.delete("/todos/:id",deleteTodos);
route.put('/todos/:id', updateTodo);

module.exports=route;