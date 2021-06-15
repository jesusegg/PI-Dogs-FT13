const { Router } = require("express");
const { Raza, Temperamento } = require("../db");

const {
  filtroRazas,
  arrayApi,
  paginado,
  dataCompleta,
} = require("../db_function/filtros");

const server = Router();

server.get("/", async (req, res) => {
  let array = await arrayApi();

  if (!array) {
    return res.status(404).json("error de conexion con la api");
  }

  let arrayFiltro = [];

  array.map((x) => {
    arrayFiltro.push({
      id: x.id,
      nombre: x.nombre.toLowerCase(),
      imagen: x.imagen,
      temperamentos: x.temperamentos,
    });
  });

  let raza = await Raza.findAndCountAll({
    include: [
      {
        model: Temperamento,
        required: true,
        attributes: ["nombre"],
      },
    ],
    order: [["nombre"]],
    attributes: ["id", "nombre", "imagen"],
  });
  raza = filtroRazas(raza);

  const JsonPrincipal = [...arrayFiltro, ...raza];

  if (req.query.raza) {
    const filterByRaza = JsonPrincipal.filter((x) =>
      x.nombre.toLowerCase()?.includes(req.query.raza)
    );
    if (!filterByRaza.length) {
      return res.status(404).json("raza de perro no encontrada");
    } else {
      return paginado(req, res, filterByRaza);
      // return res.json(filterByRaza.slice(0, 8));
    }
  }

  if (req.query.peso) {
    array.forEach((x) => (x.peso = x.peso.split("-").map((y) => parseInt(y))));
    // http://localhost:3001/dogs/?page=2&peso=Asc ruta para orden peso y paginado
    // http://localhost:3001/dogs/?page=2&peso=Des ruta para orden peso y paginado

    if (req.query.peso === "Asc") {
      array.sort(function (a, b) {
        return a.peso[0] - b.peso[0];
      });
      array.forEach((x) => (x.peso = `${x.peso[0]} - ${x.peso[1]}`));
    }
    if (req.query.peso === "Des") {
      array.sort(function (a, b) {
        return b.peso[0] - a.peso[0];
      });
      array.forEach((x) => (x.peso = `${x.peso[0]} - ${x.peso[1]}`));
    }

    return paginado(req, res, array);
  }

  if (req.query.listado === "Des") {
    JsonPrincipal.sort(function (a, b) {
      if (b.nombre > a.nombre) {
        return 1;
      }
      if (b.nombre < a.nombre) {
        return -1;
      }
      return 0;
    });
    // http://localhost:3001/dogs?listado=Des&page=2 ruta de ordenado descendente
  }

  paginado(req, res, JsonPrincipal);
});

server.get("/:idRaza", async (req, res) => {
  const array = await dataCompleta();
  //const array = await arrayApi();

  const busquedaId = array.find((x) => x.id.toString() === req.params.idRaza);

  const copiaBusqueda = { ...busquedaId };
  delete copiaBusqueda.id;

  if (!busquedaId) {
    return res.status(404).json("Id ingresado no valido");
  }
  res.json(copiaBusqueda);
});

module.exports = server;
