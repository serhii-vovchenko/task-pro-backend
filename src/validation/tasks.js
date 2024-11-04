import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(60).trim().required().messages({
    'any.required': 'Title name is required.',
    'string.empty': 'Title name cannot be empty.',
    'string.min': 'Title name should be at least 3 characters long.',
    'string.max': 'Title name should not exceed 60 characters.',
  }),
  description: Joi.string().trim().optional(),
  priority: Joi.string()
    .valid('low', 'medium', 'high', 'none')
    .default('none')
    .messages({
      'any.only': 'Priority must be one of low, medium, high, or none.',
    }),
  deadline: Joi.date().required().messages({
    'date.base': 'Deadline must be a valid date.',
    'any.required': 'Deadline is required.',
  }),
  columnId: Joi.string().required().messages({
    'any.required': 'Column ID is required.',
    'string.empty': 'Column ID cannot be empty.',
  }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(60).trim().required().messages({
    'any.required': 'Title name is required.',
    'string.empty': 'Title name cannot be empty.',
    'string.min': 'Title name should be at least 3 characters long.',
    'string.max': 'Title name should not exceed 60 characters.',
  }),
  description: Joi.string().trim().optional(),
  priority: Joi.string()
    .valid('low', 'medium', 'high', 'none')
    .default('none')
    .messages({
      'any.only': 'Priority must be one of low, medium, high, or none.',
    }),
  deadline: Joi.date().required().messages({
    'date.base': 'Deadline must be a valid date.',
    'any.required': 'Deadline is required.',
  }),
});
