const { Router } = require("express");
const { Raza, Temperamento } = require("../db");

const server = Router();

server.post("/", async (req, res) => {
  const { nombre, altura, peso, años_de_vida, imagen, temperamentos } =
    req.body;

  try {
    const razaNueva = await Raza.create({
      nombre: nombre.toLowerCase(),
      peso: peso,
      altura: altura,
      años_de_vida: años_de_vida,
      imagen: imagen,
    });

    temperamentos.map(async (x) => {
      await Temperamento.findOrCreate({
        where: { nombre: x },
        defaults: { nombre: x },
      });
    });

    const temperamentoRaza = await Temperamento.findAll({
      where: {
        nombre: temperamentos,
      },
    });

    razaNueva.setTemperamentos(temperamentoRaza);

    res.json(razaNueva);
  } catch (error) {
    return res.status(404).json("error al crear la raza");
  }
});

module.exports = server;
