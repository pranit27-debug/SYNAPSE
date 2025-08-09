import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AddNote = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: '',
    isPinned: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const noteData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await axios.post('/api/notes', noteData);
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/home')}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Add New Note</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="form-input"
                placeholder="Enter note title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="form-label">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={12}
                className="form-input resize-none"
                placeholder="Write your note content here..."
                value={formData.content}
                onChange={handleChange}
              />
            </div>

            {/* Category and Tags Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="General">General</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Ideas">Ideas</option>
                  <option value="Learning">Learning</option>
                  <option value="Projects">Projects</option>
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  className="form-input"
                  placeholder="Enter tags separated by commas"
                  value={formData.tags}
                  onChange={handleChange}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Separate tags with commas (e.g., important, work, meeting)
                </p>
              </div>
            </div>

            {/* Pin Note */}
            <div className="flex items-center">
              <input
                id="isPinned"
                name="isPinned"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={formData.isPinned}
                onChange={handleChange}
              />
              <label htmlFor="isPinned" className="ml-2 block text-sm text-gray-900">
                Pin this note
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Note'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
