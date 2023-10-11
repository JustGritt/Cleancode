const swaggerUi = require("swagger-ui-express");
const { getSwaggerSpecs } = require("../utils/swagger.config.js");

module.exports = (app) => {
    const specs = getSwaggerSpecs();
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(specs));
};