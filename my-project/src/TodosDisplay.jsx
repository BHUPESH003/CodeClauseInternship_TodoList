import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch data from localhost/api/todos
    fetch('http://localhost:4000/api/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.task}
            className="flex justify-between items-center bg-white p-2 shadow-md rounded mb-2"
          >
            <span className="text-lg">{todo.task}</span>
            <span
              className={`${
                todo.status === 'completed' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {todo.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
