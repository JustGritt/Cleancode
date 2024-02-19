require("dotenv").config();
const { connection } = require("./database");

connection.sync({alter: true}).then(() => {
  console.log("Database synchronized");
  connection.close();
});