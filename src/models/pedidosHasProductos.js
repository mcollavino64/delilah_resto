const { DataTypes } = require ('sequelize');
const sequelize = require ('./../config/db');
const pedidos = require('./pedidos');
const productos = require('./productos');

const pedidosHasProductos = sequelize.define('pedidos_has_productos', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    pedido_id: {
        field: 'pedido_id',
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:pedidos,
            key:'id',
        }
    },
    producto_id: {
        field: 'producto_id',
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:productos,
            key:'id'
        }
    }
}, {
    timestamps: false,
    underscored: true
  });


module.exports = pedidosHasProductos;