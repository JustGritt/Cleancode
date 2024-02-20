const { Sequelize } = require("sequelize");
const { Card } = require("../database");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  create: async function (data, user) {
    try {
      return await Card.create({
        ...data,
        userId: user.id,
      });
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  findByTags: async function (tags, user) {
    //if the tags is empty, return all the cards for the user otherwise return the cards that match the tags
    const where = tags.length ? { tag: tags, userId: user.id } : { userId: user.id };
    return await Card.findAll({ where });
  },
  setNextCategory: async function (card) {
    const newCategpry =  card.getNextCategory();
    return await card.update({ category: newCategpry });
  }
};