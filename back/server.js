const express = require("express");
const cors = require('cors');
require("dotenv").config();
const { authenticationGuard } = require("./middlewares/authGuard");
const errorHandler = require("./middlewares/errorHandler");

//IMPORT CONTROLLERS
const GenericController = require("./controllers/genericCRUD");
const CardController = require("./controllers/card");
const GenericRouter = require("./routes/genericCRUD");

//IMPORT SERVICES
const userService = require("./services/user");
const cardService = require("./services/card");

// Create express app
const app = express();
app.use(cors());
app.use(express.json());
app.disable('x-powered-by');

// Call routes
app.use(require("./routes/swagger")())
app.use(require("./routes/security")(userService));
app.use("/users", new GenericRouter(new GenericController(userService)));
//app.use("/cards", authenticationGuard({ JWTAuth: true}), new CardRouter(new CardController(cardService)));
app.use("/cards", authenticationGuard({ JWTAuth: true}), new GenericRouter(new CardController(cardService)));


app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
}
  
module.exports = app;