const swaggerUi = require("swagger-ui-express");
const { getSwaggerSpecs } = require("../utils/swagger.config.js");
const { Router } = require("express");

module.exports = () => {
    const router = Router();
    const specs = getSwaggerSpecs();

    router.use("/docs", swaggerUi.serve);
    router.get("/docs", swaggerUi.setup(specs));
    
    return router;
};