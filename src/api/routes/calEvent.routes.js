const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const { joi, validate } = middlewares.validator;
const { calEvent } = require('../controllers');

router.get(
  '/',
  validate({
    query: {
      limit: joi.number().integer().min(1).default(null),
      offset: joi.number().integer().min(0).default(null),
      startsAt: joi.string().default(null),
      endsAt: joi.string().default(null),
    },
  }),
  calEvent.get
);

router.post(
  '/',
  validate({
    body: {
      name: joi.string().trim().required(),
      slug: joi.string().trim().required(),
      startsAt: joi.date().required(),
      endsAt: joi.date().required(),
      description: joi.string(),
      isFeatured: joi.boolean(),
      isHasEndsAt: joi.boolean(),
      isAllDay: joi.boolean(),
      hauntedBy: joi.string(),
    },
  }),
  calEvent.post
);

router.put(
  '/:id',
  validate({
    param: {
      id: joi.number().required(),
    },
    body: {
      name: joi.string().trim().required(),
      slug: joi.string().trim().required(),
      startsAt: joi.date().required(),
      endsAt: joi.date().required(),
      description: joi.string(),
      isFeatured: joi.boolean(),
      isHasEndsAt: joi.boolean(),
      isAllDay: joi.boolean(),
      hauntedBy: joi.string(),
    },
  }),
  calEvent.put
);

router.delete(
  '/:id',
  validate({
    param: {
      id: joi.number().required(),
    },
  }),
  calEvent.delete
);

module.exports = router;