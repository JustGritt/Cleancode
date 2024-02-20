const { Router } = require("express");

module.exports = function (Controller, options) {
  const router = Router();

  router.get("/", Controller.cget);

  router.post("/", Controller.post);

  router.get("/quizz", Controller.get);

  router.patch("/:cardId/answer", Controller.patch);

  return router;
};