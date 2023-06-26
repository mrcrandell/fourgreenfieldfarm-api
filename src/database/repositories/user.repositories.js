const { models, thens } = require('..');

const { user } = models;
const { One, All, Update, Destroy } = thens;

const create = async ({ name, email, password }) =>
  user.create({ name, email, password }).then(One);

const all = async ({ limit, offset }) =>
  user
    .findAll({
      limit,
      offset,
      attributes: { exclude: ['password', 'rememberToken'] },
      order: [['createdAt', 'ASC']],
    })
    .then(All);

const one = ({ id }) =>
  user
    .findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'rememberToken'],
      },
    })
    .then(One);

const oneByEmail = ({ email }) =>
  user
    .findOne({
      where: { email },
      attributes: {
        exclude: ['password', 'rememberToken'],
      },
    })
    .then(One);

const oneByEmailWithPassword = ({ email }) =>
  user
    .findOne({
      where: { email },
    })
    .then(One);

const destroy = ({ id }) => user.destroy({ where: { id } }).then(Destroy);

const update = ({ id, name, email, password }) =>
  user.update({ name, email, password }, { where: { id } }).then(Update);

const createRememberTokenByEmail = async ({ email, rememberToken }) => {
  await user.update({ rememberToken }, { where: { email } }).then(Update);
  return user
    .findOne({
      where: { email },
    })
    .then(One);
}

const updatePasswordByRememberToken = async ({ password, rememberToken }) => {
  const userData = await user.findOne({
    where: { rememberToken },
    attributes: {
      exclude: ['password', 'rememberToken'],
    },
  })
  .then(One);
  // Update password
  await user.update({ password }, { where: { rememberToken } }).then(Update);
  // Set token to null
  await user.update({ rememberToken: null }, { where: { id: userData.id } }).then(Update);
  return userData;
};
  

module.exports = {
  create,
  destroy,
  all,
  one,
  oneByEmail,
  oneByEmailWithPassword,
  update,
  createRememberTokenByEmail,
  updatePasswordByRememberToken,
};
