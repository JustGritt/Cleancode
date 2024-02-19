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
    return await Card.findAll({
      where: {
        userId: user.id,
        tag: tags,
      },
    });
  },
};