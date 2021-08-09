const { DataTypes } = require ('sequelize');
const sequelize = require ('./../config/db');


const pedidos = sequelize.define('pedidos', {
    precio_total: {
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    estado: {
        type: DataTypes.ENUM(['nuevo','confirmado','preparando','enviando','cancelado','entregado']),
        allowNull:false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull:true
    }
}, {
    timestamps: false,
    underscored: true
  });



module.exports = pedidos;