require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { Console } = require("console");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );
const sequelize = new Sequelize(
  "postgres://qbfmpqgwizwogm:ccf03cc4e53f4fc9e3d08e3a07ffb13b0728ae7714cc9940665ded18687a3127@ec2-52-23-45-36.compute-1.amazonaws.com:5432/d3eu6gb3guhfqh",
  {
    logging: false,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
  }

  // {
  //   logging: false, // set to console.log to see the raw SQL queries
  //   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  //   //dialect: "postgres",

  // }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Raza, Temperamento } = sequelize.models;

// Aca vendrian las relaciones
Raza.belongsToMany(Temperamento, { through: "raza_temperamento" });
Temperamento.belongsToMany(Raza, { through: "raza_temperamento" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
