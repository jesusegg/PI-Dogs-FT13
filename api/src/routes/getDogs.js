const { Router } = require("express");
const { Raza, Temperamento } = require("../db");

const {
  filtroRazas,
  arrayApi,
  paginado,
  dataCompleta,
  ordenDescendente,
  ordenPeso,
} = require("../db_function/filtros");

const server = Router();

server.get("/", async (req, res) => {
  try {
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
        peso: x.peso,
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
      attributes: ["id", "nombre", "peso", "imagen"],
    });
    raza = filtroRazas(raza);

    const JsonPrincipal = [...arrayFiltro, ...raza];

    if (req.query.raza) {
      const filterByRaza = JsonPrincipal.filter((x) =>
        x.nombre.toLowerCase()?.includes(req.query.raza)
      );
      if (req.query.listado === "Des") {
        ordenDescendente(filterByRaza);
      }
      if (req.query.peso) {
        ordenPeso(req, filterByRaza);
      }

      if (!filterByRaza.length) {
        return res.status(404).json("raza de perro no encontrada");
      } else {
        return paginado(req, res, filterByRaza);
      }
    }
    if (req.query.peso) {
      if (req.query.listado === "Des") {
        ordenDescendente(JsonPrincipal);
      }
      ordenPeso(req, JsonPrincipal);
      return paginado(req, res, JsonPrincipal); //dentro del if para retornar req.query.peso
    }

    if (req.query.listado === "Des") {
      ordenDescendente(JsonPrincipal);
    }

    paginado(req, res, JsonPrincipal);
  } catch (error) {
    return res.status(404).json("error en la base de datos");
  }
});

server.get("/:idRaza", async (req, res) => {
  try {
    const array = await dataCompleta();
    //const array = await arrayApi();

    const busquedaId = array.find((x) => x.id.toString() === req.params.idRaza);

    const copiaBusqueda = { ...busquedaId };
    delete copiaBusqueda.id;

    if (!busquedaId) {
      return res.status(404).json("Id ingresado no valido");
    }
    res.json(copiaBusqueda);
  } catch (error) {
    return res.status(404).json("error en la base de datos");
  }
});

module.exports = server;
