const ValidationError = require("../errors/ValidationError");
const Joi = require("joi");

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
            const cards = await Service.getCardForDate(date, req.user);
            return res.json(cards);
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
                throw new ValidationError("Invalid data");
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
