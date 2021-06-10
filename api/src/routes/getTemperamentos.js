const { Router } = require("express");
const { Temperamento } = require("../db");

const server = Router();

server.get("/", async (req, res) => {
  const temperamentos = await Temperamento.findAll({
    attributes: ["id", "nombre"],
  });

  res.json(temperamentos);
});

module.exports = server;
