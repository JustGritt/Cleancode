const { Model, DataTypes } = require("sequelize");

const validCategories = [
    {category: 'FIRST', frequence: 1},
    {category: 'SECOND', frequence: 2},
    {category: 'THIRD', frequence: 4},
    {category: 'FOURTH', frequence: 8},
    {category: 'FIFTH', frequence: 16},
    {category: 'SIXTH', frequence: 32},
    {category: 'SEVENTH', frequence: 64},
    {category: 'DONE', frequence: 0},
];

module.exports = function (connection) {
    class Card extends Model {
        static associate(models) {
            Card.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user"
            });
        }

        getNextCategory() {
            //for the given instance of card, traverse the validCategories array and return the next category
            const currentCategory = validCategories.find((item) => item.category === this.category);
            const nextCategory = validCategories.find((item) => item.frequence === currentCategory.frequence * 2);
            return nextCategory ? nextCategory.category : "DONE";
        }

        getDefaultValue() {
            return validCategories[0].category;
        }

        getCategoryFrequence() {
            return validCategories.find((item) => item.category === this.category).frequence;
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
            defaultValue: validCategories[0].category,
            validate: {
                isIn: {
                    args: [validCategories.map(item => item.category)],
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
