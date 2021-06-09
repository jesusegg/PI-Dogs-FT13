const { Router } = require("express");
const { Raza, Temperamento } = require("../db");

const server = Router();

server.post("/dog", async (req, res) => {
  const { nombre, altura, peso, años_de_vida, temperamentos } = req.body;
  //console.log(req.body.años_de_vida);

  const razaNueva = await Raza.create({
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
