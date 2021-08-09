const { DataTypes } = require ('sequelize');
const sequelize = require ('./../config/db');


const productos = sequelize.define('productos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    activo: {
        type: DataTypes.TINYINT,
        allowNull:false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull:true
    },
}, {
    timestamps: false
  });

module.exports = productos;