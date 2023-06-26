const bcrypt = require('bcrypt');
const crypto = require("crypto");
const { repositories } = require('../../database');

// const socket = require('../../socket');
// const { scenes } = require('../../light');
// const robot = require('../../robot');
const util = require('../../util');
// const { queues } = require('../../queue');
const { sendEmail } = require('../controllers/email.controllers');
// const controllers = require('../controllers');
const { user } = repositories;

const { jwt } = util;

module.exports.get = async (req, res) => {
  const { limit, offset } = req.query;
  res.json({ user: await user.all({ limit, offset }) });
};

module.exports.getOne = async (req, res) => {
  const { id } = req.params;
  res.json({ user: await user.one({ id }) });
};

module.exports.post = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const { id } = await user.createUser({ name, email, password: hash });
    res.send({ id });
  } catch (error) {
    if (error.errors && error.errors[0].type === 'unique violation') {
      res.error('user email must be unique');
    } else {
      res.send(error);
    }
  }
};

module.exports.put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await user.update({ id, name, email, password: hash });
    res.sendStatus(204);
  } catch (error) {
    if (error.errors && error.errors[0].type === 'unique violation') {
      return res.error('user email must be unique');
    }
    res.send(error);
  }
};

/* module.exports.put = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!(await user.update({ id, name }))) throw Error('not found');
  res.sendStatus(204);
}; */

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!(await user.destroy({ id }))) throw Error('not found');
  res.sendStatus(204);
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  let loginUser = await user.oneByEmailWithPassword({ email });
  if (!loginUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const match = await bcrypt.compare(password, loginUser.password);
  if (!match) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  delete loginUser.password;
  delete loginUser.rememberToken;
  loginUser = { ...loginUser };
  const token = await jwt.sign(loginUser);
  res.send({ ...loginUser, token });
};

module.exports.rememberToken = async (req, res) => {
  const rememberToken = crypto.randomBytes(32).toString("hex");
  const { email } = req.body;
  // if (!(await user.createRememberTokenByEmail({ email, rememberToken }))) throw Error('not found');
  const userData = await user.createRememberTokenByEmail({ email, rememberToken });
  // console.log(JSON.stringify(userData));
  // const dataToSend = {};
  const dataToSend = {
    email: userData.email,
    resetLink: `https://www.fourgreenfieldsfarm.com/admin/reset-password/${userData.rememberToken}`,
    templatePath: '../../static/emails/password-reset.html',
    successMessage: 'Please check your email to reset your password.',
  };
  await sendEmail(dataToSend);
  res.sendStatus(204);
};

module.exports.resetPassword = async (req, res) => {
  const { token: rememberToken, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const userData = await user.updatePasswordByRememberToken({ rememberToken, password: hash });
  res.sendStatus(204);
};