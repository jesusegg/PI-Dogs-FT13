const { Router } = require("express");
const { Raza, Temperamento } = require("../db");

const server = Router();

server.get("/", (req, res) => {
  res.send("hola funciona");
});

module.exports = server;
