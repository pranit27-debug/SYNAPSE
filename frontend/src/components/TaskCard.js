import React from 'react';

const TaskCard = ({ task, onDelete, onToggle }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !task.completed;
  };

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return 'text-gray-500';
    if (isOverdue(dueDate)) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className={`card hover:shadow-md transition-all duration-200 ${
      task.completed ? 'opacity-75 bg-gray-50' : 'bg-white'
    }`}>
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <button
            onClick={() => onToggle(task._id)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              task.completed
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'border-gray-300 hover:border-primary-400'
            }`}
          >
            {task.completed && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className={`text-lg font-semibold ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-600 hover:text-red-800 p-1 rounded ml-2"
              title="Delete task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {task.description && (
            <p className={`text-gray-600 mb-3 ${
              task.completed ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-3">
              {/* Priority Badge */}
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>

              {/* Category */}
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {task.category}
              </span>
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={`text-sm ${getDueDateColor(task.dueDate)}`}>
                  {isOverdue(task.dueDate) && !task.completed && '⚠️ '}
                  Due: {formatDate(task.dueDate)}
                </span>
              </div>
            )}
          </div>

          {/* Created Date */}
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Created: {formatDate(task.createdAt)}
              {task.updatedAt !== task.createdAt && (
                <span> • Updated: {formatDate(task.updatedAt)}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
