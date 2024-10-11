import React, { useState, useEffect } from 'react';
import '../css/DragAndDrop.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import taskImage from './task.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';

const DragAndDrop = () => {
  const [tasks, setTasks] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData('text/plain', taskId.toString());
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = (event, status) => {
    event.preventDefault();
    const taskId = parseInt(event.dataTransfer.getData('text/plain'), 10);
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: 'New Task',
      description: 'Task description goes here...',
      mission: 'Not Urgent',
      deadline: null,
      status: 'todo'
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (taskId, updatedProperties) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          ...updatedProperties
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update local storage
  };

  const EditForm = ({ task, onSave }) => {
    const [editedTask, setEditedTask] = useState(task);

    const handleInputChange = event => {
      const { name, value } = event.target;
      setEditedTask({ ...editedTask, [name]: value });
    };

    const handleDateChange = date => {
      setEditedTask({ ...editedTask, deadline: date });
    };

    const handleSave = () => {
      onSave(editedTask);
    };

    return (
      <div className="edit-form">
        <div className="mb-4">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mission" className="text-sm font-medium text-gray-700">
            Mission:
          </label>
          <select
            id="mission"
            name="mission"
            value={editedTask.mission}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
          >
            <option value="Not Urgent">Not Urgent</option>
            <option value="Middle Urgent">Middle Urgent</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="text-sm font-medium text-gray-700">
            Deadline:
          </label>
          <DatePicker
            id="deadline"
            name="deadline"
            selected={editedTask.deadline}
            onChange={handleDateChange}
            className="border border-gray-300 rounded-md px-2 py-1 mt-1 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  const Task = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = updatedTask => {
      handleEditTask(task.id, updatedTask);
      setIsEditing(false);
    };

    const handleDelete = () => {
      handleDeleteTask(task.id);
    };

    const cardClassName = classNames('task', {
      'bg-red-100': task.status === 'todo' && isDragging,
      'bg-blue-100': task.status === 'inProgress' && isDragging,
      'bg-green-100': task.status === 'completed' && isDragging,
      'bg-white': !isDragging
    });

    return (
      <div
        className={cardClassName}
        key={task.id}
        draggable
        onDragStart={event => handleDragStart(event, task.id)}
        onDragEnd={handleDragEnd}
        onDoubleClick={() => setIsEditing(true)}
      >
        {isEditing ? (
          <EditForm task={task} onSave={handleSave} />
        ) : (
          <div>
            <img src={taskImage} alt="Task" className="w-12 h-12 mb-2" />
            <h3 className="text-lg font-medium mb-2">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="flex items-center mt-4">
              <div className="mr-2 flex items-center">
                <FaEdit
                  onClick={() => setIsEditing(true)}
                  className="text-gray-600 cursor-pointer"
                />
              </div>
              <div className="flex items-center">
                <FaTrash
                  onClick={handleDelete}
                  className="text-gray-600 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="mr-2">
                <span className="text-sm font-medium text-gray-700">Mission:</span>
                <span className="text-sm text-gray-600 ml-1">{task.mission}</span>
              </div>
              {task.deadline && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Deadline:</span>
                  <span className="text-sm text-gray-600 ml-1">
                    {task.deadline.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container123">
      <div
        className="card p-4 bg-red-100"
        onDragOver={handleDragOver}
        onDrop={event => handleDrop(event, 'todo')}
      >
        <h2 className="text-xl font-medium text-red-800 mb-4">To Do</h2>
        {tasks.map(task => {
          if (task.status === 'todo') {
            return <Task key={task.id} task={task} />;
          }
          return null;
        })}
        <button
          onClick={handleAddTask}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md mt-4"
        >
          Add Task
        </button>
      </div>
      <div
        className="card p-4 bg-blue-100"
        onDragOver={handleDragOver}
        onDrop={event => handleDrop(event, 'inProgress')}
      >
        <h2 className="text-xl font-medium text-blue-800 mb-4">In Progress</h2>
        {tasks.map(task => {
          if (task.status === 'inProgress') {
            return <Task key={task.id} task={task} />;
          }
          return null;
        })}
      </div>
      <div
        className="card p-4 bg-green-100"
        onDragOver={handleDragOver}
        onDrop={event => handleDrop(event, 'completed')}
      >
        <h2 className="text-xl font-medium text-green-800 mb-4">Completed</h2>
        {tasks.map(task => {
          if (task.status === 'completed') {
            return <Task key={task.id} task={task} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default DragAndDrop;
