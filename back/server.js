const express = require("express");
const cors = require('cors');
require("dotenv").config();

// Import routes
const swaggerRoutes = require("./app/routes/swagger.routes.js");
const userRoutes = require("./app/routes/user.routes.js");

const app = express();
app.use(cors());
app.use(express.json());

// Call routes
swaggerRoutes(app);
userRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});