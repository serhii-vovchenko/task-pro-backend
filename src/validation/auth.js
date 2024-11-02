import Joi from 'joi';

export const registrationUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Name is required.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name should be at least 3 characters long.',
    'string.max': 'Name should not exceed 30 characters.',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Invalid email format.',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'any.required': 'Password is required.',
    'string.empty': 'Password cannot be empty.',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Invalid email format.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required.',
    'string.empty': 'Password cannot be empty.',
  }),
});

export const updateThemeSchema = Joi.object({
  theme: Joi.string()
    .valid('dark', 'light', 'violet')
    .default('dark')
    .messages({
      'any.only':
        'The theme must be one of the following values: dark, light, violet',
    }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name should be at least 3 characters long.',
    'string.max': 'Name should not exceed 30 characters.',
  }),
  email: Joi.string().email().messages({
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Invalid email format.',
  }),
  password: Joi.string().min(8).max(64).messages({
    'string.empty': 'Password cannot be empty.',
  }),
  photoUrl: Joi.any(),
});
