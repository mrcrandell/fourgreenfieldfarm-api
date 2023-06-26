const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const { user } = require('../controllers');

const { joi, validate } = middlewares.validator;

router.get(
  '/',
  validate({
    query: {
      limit: joi.number().integer().min(1).default(10),
      offset: joi.number().integer().min(0).default(0),
    },
  }),
  user.get
);
router.get(
  '/:id',
  validate({
    param: {
      id: joi.string().uuid().required(),
    },
  }),
  user.getOne
);
/* router.post(
  '/',
  validate({
    body: {
      name: joi.string().trim().required(),
      email: joi.string().trim().required(),
      password: joi.string().min(12).max(128).required(),
    },
  }),
  user.post
);
router.put(
  '/:id',
  validate({
    param: {
      id: joi.string().uuid().required(),
    },
    body: {
      name: joi.string().trim().required(),
      email: joi.string().trim().required(),
      password: joi.string().min(12).max(128).required(),
    },
  }),
  user.put
);
router.delete(
  '/:id',
  validate({
    param: {
      id: joi.string().uuid().required(),
    },
  }),
  user.delete
); */

router.post(
  '/auth',
  validate({
    body: {
      email: joi.string().trim().required(),
      password: joi.string().min(6).max(128).required(),
    },
  }),
  user.login
);

router.post(
  '/forgot-password',
  validate({
    body: {
      email: joi.string().trim().required(),
    },
  }),
  user.rememberToken
);

router.post(
  '/reset-password',
  validate({
    body: {
      token: joi.string().trim().required(),
      password: joi.string().min(6).max(128).required(),
      confirmPassword: joi.string().required().valid(joi.ref('password')),
    },
  }),
  user.resetPassword
);

module.exports = router;
