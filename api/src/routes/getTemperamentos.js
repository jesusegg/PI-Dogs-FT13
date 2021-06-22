const { Router } = require("express");
const { Temperamento, Raza } = require("../db");
const {
  dataCompleta,
  ordenDescendente,
  ordenPeso,
  paginado,
} = require("../db_function/filtros");

const server = Router();

server.get("/", async (req, res) => {
  //http://localhost:3001/temperament/?busqueda=Stubborn&page=2 ruta busqueda temperamentos
  try {
    if (req.query.busqueda) {
      let JsonPrincipal = await dataCompleta();

      if (!JsonPrincipal) {
        res.status(404).json("error en la base de datos");
      }

      const a = JsonPrincipal.filter((x) =>
        x.temperamentos?.includes(` ${req.query.busqueda}`)
      );
      const b = JsonPrincipal.filter((x) =>
        x.temperamentos?.includes(`${req.query.busqueda}`)
      );
      JsonPrincipal = [...a, ...b];
      if (req.query.listado === "Des") {
        ordenDescendente(JsonPrincipal);
      }
      if (req.query.peso) {
        ordenPeso(req, JsonPrincipal);
      }

      return paginado(req, res, JsonPrincipal);
    }

    const temperamentos = await Temperamento.findAll({
      attributes: ["nombre"],
    });

    const arrayTemperamentos = temperamentos.map((x) =>
      Object.values(x?.dataValues).toString()
    );

    res.json(arrayTemperamentos);
  } catch (error) {
    return res.status(404).json("error para traer temperamentos de la api");
  }
});

module.exports = server;
