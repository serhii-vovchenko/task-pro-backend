import Joi from 'joi';

export const helpMailSchema = Joi.object({
  email: Joi.string().email().required(),
  userMessage: Joi.string().min(2).max(300).required(),
});
