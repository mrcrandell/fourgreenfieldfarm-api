const { repositories } = require('../../database');
const { calEvent } = repositories;

module.exports.get = async (req, res) => {
  const { limit, offset, startsAt, endsAt } = req.query;
  res.json({ calEvent: await calEvent.all({ limit, offset, startsAt, endsAt }) });
};

module.exports.post = async (req, res) => {
  const { name, slug, startsAt, endsAt, description, isFeatured, isHasEndsAt, isAllDay, hauntedBy } = req.body;
  res.send(await calEvent.create({ name, slug, startsAt, endsAt, description, isFeatured, isHasEndsAt, isAllDay, hauntedBy }));
};

module.exports.put = async (req, res) => {
  const { id } = req.params;
  const { name, slug, startsAt, endsAt, description, isFeatured, isHasEndsAt, isAllDay, hauntedBy } = req.body;
  if (!(await calEvent.update({ id, name, slug, startsAt, endsAt, description, isFeatured, isHasEndsAt, isAllDay, hauntedBy }))) throw Error('not found');
  res.sendStatus(204);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!(await calEvent.destroy({ id }))) throw Error('not found');
  res.sendStatus(204);
};