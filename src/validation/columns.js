import Joi from 'joi';

export const createColumnSchema = Joi.object({
  title: Joi.string().min(3).max(60).required().messages({
    'any.required': 'Title name is required.',
    'string.empty': 'Title name cannot be empty.',
    'string.min': 'Title name should be at least 3 characters long.',
    'string.max': 'Title name should not exceed 60 characters.',
  }),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().min(3).max(60).messages({
    'string.empty': 'Title name cannot be empty.',
    'string.min': 'Title name should be at least 3 characters long.',
    'string.max': 'Title name should not exceed 60 characters.',
  }),
});
