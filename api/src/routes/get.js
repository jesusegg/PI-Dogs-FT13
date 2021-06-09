const { Router } = require("express");
const { Raza, Temperamento } = require("../db");
const { Op } = require("sequelize");
const {
  filtroRazas,
  filtroNombres,
  filtroNombre,
} = require("../db_function/filtros");

const server = Router();

server.get("/dogs", async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }
  let size = 8;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 8) {
    size = sizeAsNumber;
  }

  const raza = await Raza.findAndCountAll({
    include: [
      {
        model: Temperamento,
        required: true,
        attributes: ["nombre"],
      },
    ],
    limit: size,
    offset: page * size,
    order: [["nombre"]],
    attributes: ["nombre", "imagen"],
  });

  if (req.query.name) {
    const nameReq = await Raza.findAll({
      where: {
        nombre: {
          [Op.startsWith]: req.query.name.toLowerCase(),
        },
      },

      include: [
        {
          model: Temperamento,
          required: true,
          attributes: ["nombre"],
        },
      ],
      limit: size,
      offset: page * size,
      order: [["nombre"]],
      attributes: ["nombre", "imagen"],
    });

    if (!nameReq.length) {
      return res
        .status(404)
        .json("No existe ninguna raza de perro con el nombre ingresado");
    }

    filtroNombres(nameReq);

    return res.json(nameReq);
  }

  filtroRazas(raza);

  res.json(raza);
});

server.get("/dogs/:idRaza", async (req, res) => {
  console.log(req.params.idRaza);
  const razaId = await Raza.findOne({
    where: {
      id: req.params.idRaza,
    },
    include: [
      {
        model: Temperamento,
        required: true,
        attributes: ["nombre"],
      },
    ],
    attributes: ["nombre", "peso", "altura", "años_de_vida", "imagen"],
  });

  if (!razaId) {
    return res
      .status(404)
      .json(
        "ups el id ingresado no pertenece a ninguna raza en nuestra base de datos"
      );
  }

  filtroNombre(razaId);
  res.json(razaId);
});

server.get("/temperament", async (req, res) => {
  const temperamentos = await Temperamento.findAll({
    attributes: ["id", "nombre"],
  });

  res.json(temperamentos);
});

module.exports = server;
