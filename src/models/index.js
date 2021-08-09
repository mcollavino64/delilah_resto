const formasPago = require("./formasPago");
const pedidos = require("./pedidos");
const pedidosHasProductos = require("./pedidosHasProductos");
const productos = require("./productos");
const rol = require("./rol");
const usuarios = require("./usuarios");

usuarios.belongsTo(rol,{
    foreignKey:'rol_id'
});

usuarios.hasMany(pedidos,{
    foreignKey:'usuarios_id'
})

pedidos.belongsTo(usuarios,{
    foreignKey: 'usuarios_id'
})

pedidos.belongsToMany(productos, {
    through: pedidosHasProductos
});

pedidos.belongsTo(formasPago,{
    foreignKey: 'formas_pago_id'
})


module.exports = { usuarios,productos,rol,pedidosHasProductos,pedidos, formasPago};

