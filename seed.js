const { pedidos, productos, usuarios,pedidosHasProductos } = require ('./src/models');

// Users
const usersData = [
    { username: "fedecba92", nombre: "fede", telefono: '4768965', direccion:'los alemanes 345', contrasena:'1234', correo:'fede@gmail.com' , rol_id:1 },
    { username: "rocio145", nombre: "rocio", telefono: '5373785', direccion:'flores 456', contrasena:'7892', correo:'rocio@gmail.com' , rol_id:2}
];

// Products
const productsData = [
    { nombre: "focaccia", precio: 690, activo:1,imagen:'https://picsum.photos/200' },
    { nombre: "verdeveggie", precio: 320, activo:1,imagen:'https://picsum.photos/200' },
    { nombre: "hamclass", precio: 820, activo:1,imagen:'https://picsum.photos/200' }
];

// Orders
const pedidosData = [
    { precio_total: 1000 , fecha: '2021-03-01 12:03:23', formas_pago_id : 1, usuarios_id: 1, estado:'nuevo' },
    { precio_total: 1500 , fecha: '2021-04-01 12:03:23', formas_pago_id : 2 , usuarios_id: 3 ,estado:'nuevo'},
    { precio_total: 2000 , fecha: '2021-05-01 12:03:23', formas_pago_id : 3 , usuarios_id: 3, estado:'nuevo' } 
];

const pedidosHasProductsData = [
    { cantidad: 1, pedido_id: 4, producto_id:1 },
    { cantidad: 1, pedido_id: 4, producto_id:2 },
    { cantidad: 1, pedido_id: 5, producto_id:2 },
    { cantidad: 1, pedido_id: 6, producto_id:3 } 
];

//PRUEBA SEED USUARIO
// const data = usersData.map(async user =>{
//     const tempUser = await usuarios.create(user)
// })

//PRUEBA SEED PRODUCTOS
// const data = productsData.map(async product =>{
//     const tempProduct = await productos.create(product)
// })

//PRUEBA SEED PEDIDOS
// const data = pedidosData.map(async pedido =>{
//     const tempPedido = await pedidos.create(pedido)
// })

//PRUEBA SEED PEDIDOSHASPRODUCTOS
//  const data = pedidosHasProductsData.map (async ped =>  {
//     const tempPed= await pedidosHasProductos.create(ped, { fields: ["cantidad","pedido_id", "producto_id"] })
//  });


pedidos.findByPk(1, {
    include: [
      { model: productos,},
      { model: usuarios },
    ],
  })
  .then((data) => console.log(data.productos.map((p)=> p.nombre)));
//   .then((data) => console.log(data.usuario)); //datos del usuario que  realizo el pedido
  
