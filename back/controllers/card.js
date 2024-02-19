const ValidationError = require("../errors/ValidationError");
const Joi = require("joi");

module.exports = function (Service) {
    return {
        post: async (req, res, next) => {
            try {
                const service = await Service.create(req.body, req.user);
                res.status(201).json(service);
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
                res.json(cards);
            } catch (err) {
                next(err);
            }
        },
        get: async (req, res, next) => {
            next(new ValidationError("Method not allowed"));
        },
        put: async (req, res, next) => {
            //throw not handled method
            next(new ValidationError("Method not allowed"));
        },
        patch: async (req, res, next) => {
            //throw not handled method
            next(new ValidationError("Method not allowed"));
        },
        delete: async (req, res, next) => {
            //throw not handled method
            next(new ValidationError("Method not allowed"));
        }
    }
}
