const ValidationError = require("../errors/ValidationError");
const Joi = require("joi");

function calculateDaysDifference(date1, date2) {
    const day1 = date1.getDate();
    const day2 = date2.getDate();
    const difference = day1 - day2;
    return difference;
}

function selectCardsForQuizz(cards, date) {
    return cards.filter(card => {
        if (card.category === "DONE") {
            return false;
        }
        const cardFrequenecy = card.getCategoryFrequence();
        const lastQuizzDate = new Date(card.updatedAt);
        const delayInDays = calculateDaysDifference(new Date(date), lastQuizzDate);
        return delayInDays >= cardFrequenecy;
    });
}

module.exports = function (Service) {
    return {
        post: async (req, res, next) => {
            try {
                const service = await Service.create(req.body, req.user);
                return res.status(201).json(service);
            } catch (err) {
                next(err);
            }
        },
        cget: async (req, res, next) => {
            try {
                const tags = req.query.tags ?? [];
                const schema = Joi.alternatives(
                    Joi.array().items(Joi.string()).min(0),
                    Joi.string().min(1),
                    Joi.array().items(Joi.string()).min(1)
                )
                const { error } = schema.validate(tags);
                if (error) {
                    throw new ValidationError("Invalid tags");
                }
                console.log(tags);
                const cards = await Service.findByTags(tags, req.user);
                return res.json(cards);
            } catch (err) {
                next(err);
            }
        },
        get: async (req, res, next) => {
            const date = req.query.date;
            const cards = await Service.findAll(req.user);
            const filteredCards = selectCardsForQuizz(cards, date);
            return res.json(filteredCards);
        },
        patch: async (req, res, next) => {
            const cardId = req.params.cardId;
            const card = await Service.findById(cardId);
            const { isValid } = req.body;
            const validationSchema = Joi.object({
                isValid: Joi.boolean().required()
            });
            const { error } = validationSchema.validate(req.body);
            if (error) {
                return next(new ValidationError(error.details[0].message));
            }

            if (isValid) {
                const updatedCard = await Service.setNextCategory(card);
                return res.json(updatedCard);
            }

            const updatedCard = await Service.setToDefaultCategory(card);
            return res.json(updatedCard);
        },
    }
}
