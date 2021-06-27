const { Router } = require("express");
const { Raza, Temperamento } = require("../db");

const server = Router();

server.delete("/", async (req, res) => {
  try {
    const { id, nombre } = req.body;
    //console.log(id);
    const eliminado = await Raza.findOne({
      where: {
        id: id,
      },
    });
    //console.log(eliminado);
    await eliminado.destroy();
    res.json(`Raza ${nombre} eliminada correctamente`);
  } catch (error) {}
});

module.exports = server;
