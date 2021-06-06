const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("dog", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
    },
    temperament: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
  // sequelize.define("raza", {
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   weight: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   height: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   life_span: {
  //     type: DataTypes.STRING,
  //   },
  // });

  // .sequelize.define("temperamento", {
  //   name: {
  //     type: DataTypes.ARRAY(DataTypes.STRING),
  //   },
  // });
};
