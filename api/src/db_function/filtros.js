const filtroRazas = function (busqueda) {
  busqueda.rows.map((x) =>
    x.temperamentos.map((y) => delete y.dataValues.raza_temperamento)
  );
};

const filtroNombres = function (busqueda) {
  busqueda.map((x) =>
    x.temperamentos.map((y) => delete y.dataValues.raza_temperamento)
  );
};

const filtroNombre = function (busqueda) {
  busqueda.temperamentos.map((y) => delete y.dataValues.raza_temperamento);
};

module.exports = { filtroRazas, filtroNombres, filtroNombre };
