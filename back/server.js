const express = require("express");
const cors = require('cors');
require("dotenv").config();

//Gneric CRUD
const GenericController = require("./controllers/genericCRUD");
const GenericRouter = require("./routes/genericCRUD");

//IMPORT SERVICES
const userService = require("./services/user");

// Create express app
const app = express();
app.use(cors());
app.use(express.json());

// Call routes
app.use(require("./routes/swagger")())
app.use(require("./routes/security")(userService));
app.use("/users", new GenericRouter(new GenericController(userService)));

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
}
  
module.exports = app;