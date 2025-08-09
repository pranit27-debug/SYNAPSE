const { body, param, query } = require('express-validator');

// User validation rules
const userValidation = {
  register: [
    body('username')
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers, and underscores'),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
  ],
  login: [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ]
};

// Note validation rules
const noteValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('Title is required and must be less than 200 characters'),
    body('content')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Content is required'),
    body('category')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Category must be less than 50 characters'),
    body('tags')
      .optional()
      .isArray()
      .withMessage('Tags must be an array'),
    body('tags.*')
      .optional()
      .trim()
      .isLength({ max: 30 })
      .withMessage('Each tag must be less than 30 characters'),
    body('isPinned')
      .optional()
      .isBoolean()
      .withMessage('isPinned must be a boolean')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid note ID'),
    body('title')
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('Title must be less than 200 characters'),
    body('content')
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage('Content cannot be empty'),
    body('category')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Category must be less than 50 characters'),
    body('tags')
      .optional()
      .isArray()
      .withMessage('Tags must be an array'),
    body('isPinned')
      .optional()
      .isBoolean()
      .withMessage('isPinned must be a boolean')
  ]
};

// Task validation rules
const taskValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('Title is required and must be less than 200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Description must be less than 1000 characters'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium, or high'),
    body('dueDate')
      .optional()
      .isISO8601()
      .withMessage('Due date must be a valid date'),
    body('category')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Category must be less than 50 characters')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('title')
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('Title must be less than 200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Description must be less than 1000 characters'),
    body('completed')
      .optional()
      .isBoolean()
      .withMessage('Completed must be a boolean'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium, or high'),
    body('dueDate')
      .optional()
      .isISO8601()
      .withMessage('Due date must be a valid date'),
    body('category')
      .optional()
      .trim()
      .isLength({ max: 50 })
      .withMessage('Category must be less than 50 characters')
  ]
};

// Common validation rules
const commonValidation = {
  mongoId: [
    param('id').isMongoId().withMessage('Invalid ID format')
  ],
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ]
};

module.exports = {
  userValidation,
  noteValidation,
  taskValidation,
  commonValidation
};
