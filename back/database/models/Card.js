const { Model, DataTypes } = require("sequelize");
const validCategories = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'];


module.exports = function (connection) {
    class Card extends Model {
        static associate(models) {
            Card.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user"
            });
        }
    }
    Card.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: validCategories.find((category) => category === "FIRST"),
            validate: {
                isIn: {
                    args: [validCategories],
                    msg: "Invalid category value",
                },
            },
        },
    }, {
        sequelize: connection,
        tableName: "cards"
    });

    return Card;
}
