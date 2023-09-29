import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = () => {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('false'); // Default status is set to 'todo'

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new todo object
    const newTodo = { task, status };

    try {
      // Send a POST request to your backend API to add the new todo
      const response = await axios.post('/api/todos', newTodo);

      // Assuming your backend responds with the added todo including an ID
      const addedTodo = response.data;

      // Clear the input fields
      setTask('');
      setStatus('todo'); // Reset status to 'todo'

      // Optionally, you can perform additional actions after adding the todo
      console.log('Todo added:', addedTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add a New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Task:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={task}
            onChange={handleTaskChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                value="todo"
                checked={status === 'todo'}
                onChange={handleStatusChange}
              />
              <span className="ml-2">To-Do</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                className="form-radio text-green-500"
                value="done"
                checked={status === 'done'}
                onChange={handleStatusChange}
              />
              <span className="ml-2">Done</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
