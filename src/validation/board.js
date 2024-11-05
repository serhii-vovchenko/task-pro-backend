import Joi from 'joi';

export const createBoardSchema = Joi.object({
  title: Joi.string().min(3).max(60).trim().required().messages({
    'any.required': 'Title name is required.',
    'string.empty': 'Title name cannot be empty.',
    'string.min': 'Title name should be at least 3 characters long.',
    'string.max': 'Title name should not exceed 60 characters.',
  }),
  iconName: Joi.string()
    .valid(
      '1_icon-project',
      '2_icon-star',
      '3_icon-loading',
      '4_icon-puzzle-piece',
      '5_icon-container',
      '6_icon-lightning',
      '7_icon-colors',
      '8_icon-hexagon',
    )
    .required()
    .messages({
      'any.required': 'Icon name is required.',
      'string.empty': 'Icon name cannot be empty.',
      'any.only': 'Icon name must be one of the predefined values.',
    }),
  backgroundName: Joi.string()
    .valid(
      'bg-1',
      'bg-2',
      'bg-3',
      'bg-4',
      'bg-5',
      'bg-6',
      'bg-7',
      'bg-8',
      'bg-9',
      'bg-10',
      'bg-11',
      'bg-12',
      'bg-13',
      'bg-14',
      'bg-15',
    )
    .messages({
      'any.only': 'Background name must be one of the predefined values.',
    })
    .default(null),
});

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(3).max(60).trim().messages({
    'string.empty': 'Title name cannot be empty.',
    'string.min': 'Title name should be at least 3 characters long.',
    'string.max': 'Title name should not exceed 60 characters.',
  }),
  iconName: Joi.string()
    .valid(
      '1_icon-project',
      '2_icon-star',
      '3_icon-loading',
      '4_icon-puzzle-piece',
      '5_icon-container',
      '6_icon-lightning',
      '7_icon-colors',
      '8_icon-hexagon',
    )
    .messages({
      'string.empty': 'Icon name cannot be empty.',
      'any.only': 'Icon name must be one of the predefined values.',
    }),
  backgroundName: Joi.string()
    .valid(
      'bg-1',
      'bg-2',
      'bg-3',
      'bg-4',
      'bg-5',
      'bg-6',
      'bg-7',
      'bg-8',
      'bg-9',
      'bg-10',
      'bg-11',
      'bg-12',
      'bg-13',
      'bg-14',
      'bg-15',
    )
    .messages({
      'any.only': 'Background name must be one of the predefined values.',
    })
    .default(null),
});

export const updateActiveBoardSchema = Joi.object({
  previous_boardId: Joi.string()
    .length(24)
    .pattern(/^[0-9a-fA-F]{24}$/)
    .allow(null)
    .messages({
      'string.length': 'Board ID must be exactly 24 characters long.',
      'string.pattern.base':
        'Board ID must only contain hexadecimal characters (0-9, a-f).',
    }),
});
