const { Sequelize } = require("sequelize");
const { DB_USER, DB_PWD, DB_NAME, DB_PORT, DB_SERVER } = process.env;

const conString = `mysql://${DB_USER}${
  DB_PWD && `:${DB_PWD}`
}@${DB_SERVER}:${DB_PORT}/${DB_NAME}`;

const seq = new Sequelize(conString);

seq
  .authenticate()
  .then(() => {
    console.log("coneccion exitosa a la base de datos");
  })
  .catch((e) => {
    console.error(e.message);
  });

module.exports = seq;
