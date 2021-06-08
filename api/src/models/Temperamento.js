const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("temperamento", {
    nombre: {
      type: DataTypes.STRING,
    },
  });
};

// Page.addHook('beforeValidate', (page) => {
//   if(page.title) {
//     page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
//   }
// })
