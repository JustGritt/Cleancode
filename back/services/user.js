const { Sequelize } = require("sequelize");
const { User } = require("../database");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return User.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || {}),
    });
  },
  create: async function (data) {
    try {
      return await User.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  findById: async function (id) {
    return User.findByPk(id);
  },
  login: async function (data) {
    try {
      const user = await User.findOne({ where: { email: data.email } });
      if (!user)  throw new ValidationError("Invalid email or password");
      if (!(await user.checkPassword(data.password))) throw new ValidationError("Invalid email or password");
      //delete the user password of the object
      delete user.dataValues.password;
      return { user, token: user.generateToken() };
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
};