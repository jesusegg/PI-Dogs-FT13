const { Router } = require("express");
const { Raza, Temperamento } = require("../db");
const { v4: uuidv4 } = require("uuid");

const server = Router();

server.post("/", async (req, res) => {
  const { nombre, altura, peso, años_de_vida, temperamentos } = req.body;

  const razaNueva = await Raza.create({
    id: uuidv4(),
    nombre: nombre.toLowerCase(),
    peso: peso,
    altura: altura,
    años_de_vida: años_de_vida,
    // imagen: x.image.url,
  });

  arrayTemperamentos = temperamentos.map((x) => x.trim());

  arrayTemperamentos.map(async (x) => {
    await Temperamento.findOrCreate({
      where: { nombre: x },
      defaults: { nombre: x },
    });
  });

  const temperamentoRaza = await Temperamento.findAll({
    where: {
      nombre: arrayTemperamentos,
    },
  });

  razaNueva.setTemperamentos(temperamentoRaza);

  res.send("Raza agregada correctamente");
});

module.exports = server;
