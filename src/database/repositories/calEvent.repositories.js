const parseISO = require('date-fns/parseISO');
const { Op } = require('sequelize');
const { models, thens } = require('..');

const { calEvent } = models;
const { One, All, Update, Destroy } = thens;

// TODO add repeat logic
const create = async ({ name, slug, startsAt, endsAt, description, isFeatured, isHasEndsAt, isAllDay, hauntedBy }) => calEvent.create({ name, slug, startsAt, endsAt, description, isFeatured, isHasEndsAt, isAllDay, hauntedBy }).then(One);

const all = async ({ limit, offset, startsAt, endsAt }) => {
  const where = {};
  if (startsAt) {
    where.startsAt = {
      [Op.gte]: parseISO(startsAt)
    };
  }
  if (endsAt) {
    where.endsAt = {
      [Op.lte]: parseISO(endsAt)
    };
  }
  return calEvent.findAll({ limit, offset, where, order: [['startsAt', 'ASC']] }).then(All);
}

const update = ({ id, name, slug, startsAt, endsAt, description, isFeatured, isHasEndsAt, isAllDay, hauntedBy }) => {
  const updatedAt = new Date();
  return calEvent.update({ name, slug, startsAt, endsAt, description, isFeatured, isHasEndsAt, isAllDay, hauntedBy, updatedAt }, { where: { id } }).then(Update);
};

const destroy = ({ id }) => calEvent.destroy({ where: { id } }).then(Destroy);

module.exports = {
  create,
  all,
  update,
  destroy,
};