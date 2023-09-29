import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await axios.post('/api/todos', newTodo);
      const addedTodo = response.data;

      // Update the todo state with the newly added todo
      setTodos([...todos, addedTodo]);

      // Show the success message for a few seconds
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      // Optionally, you can perform additional actions after adding the todo
      console.log('Todo added:', addedTodo);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id) => {
    try {
      // Send a PUT request to mark the todo as done
      await axios.put(`/api/todos/${id}`, { status: 'done' });

      // Update the todo state to reflect the change
      const updatedTodos = todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, status: 'done' };
        }
        return todo;
      });

      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error marking todo as done:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      // Send a DELETE request to remove the todo from the backend
      await axios.delete(`/api/todos/${id}`);

      // Update the todo state to remove the deleted todo
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <TodoForm onAddTodo={handleAddTodo} />
      {showSuccess && <SuccessPopup />}
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
};

const TodoForm = ({ onAddTodo }) => {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('todo');

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

      // Pass the new todo up to the parent component to update the todos list
      onAddTodo(addedTodo);

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

const TodoList = ({ todos, onDeleteTodo }) => {
 { /*const markAsDone = async (_id) => {
    try {
      // Find the todo to mark as done by its ID
      const todoToUpdate = todos.find((todo) => String(todo._id) === String(id));

  
      
       
  console.log(todoToUpdate)
        // Update the todo in the parent component's state
        onUpdateTodo(todoToUpdate);
      
    } catch (error) {
      console.error('Error marking todo as done:', error);
    }
  }; */}
  
  
  const deleteTodo = async (id) => {
    try {
      // Send a DELETE request to remove the todo from the backend
      await axios.delete(`/api/todos/${id}`);

      // Update the todo state to remove the deleted todo
      onDeleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center bg-white p-2 shadow-md rounded mb-2"
          >
            <div>
              <span className={`text-lg ${todo.status === 'done' ? 'line-through' : ''}`}>
                {todo.task}
              </span>
              <span className={`text-sm ml-2 ${todo.status === 'done' ? 'text-green-600' : 'text-red-600'}`}>
                {todo.status}
              </span>
            </div>
            <div>
            {/*<button
  className={`mr-2 text-green-600 ${
    todo.status === 'done' ? 'cursor-not-allowed' : ''
  }`}
  onClick={() => markAsDone(todo._id)}
  disabled={todo.status === 'done'}
>
  Mark as Done
</button> */}
              <button className="text-red-600" onClick={() => deleteTodo(todo._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SuccessPopup = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="bg-green-300 p-4 rounded-lg shadow-lg text-white">
        <span className="text-2xl mr-2">✅</span>
        Todo added successfully
      </div>
    </div>
  );
};

export default TodoApp;
