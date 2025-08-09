import React, { useState } from 'react';

const NoteCard = ({ note, onDelete }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getPriorityColor = (isPinned) => {
    return isPinned ? 'bg-yellow-100 border-yellow-300' : 'bg-white border-gray-200';
  };

  return (
    <div className={`card hover:shadow-md transition-shadow duration-200 ${getPriorityColor(note.isPinned)}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {note.title}
            </h3>
            {note.isPinned && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800">
                📌 Pinned
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {formatDate(note.createdAt)}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-600 hover:text-red-800 p-1 rounded"
            title="Delete note"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 whitespace-pre-wrap">
          {showFullContent ? note.content : truncateContent(note.content)}
        </p>
        {note.content.length > 150 && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-primary-600 hover:text-primary-800 text-sm mt-2 font-medium"
          >
            {showFullContent ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {note.category}
          </span>
        </div>
        
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{note.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
