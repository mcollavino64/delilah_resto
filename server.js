const express = require("express");
const app = express();
const { pedidos, productos, usuarios, rol, formasPago } = require("./src/models");
const jwt= require('jsonwebtoken');
const expressJwt = require('express-jwt');

const secretJwt = "asdfbhasdf5678234bhj34t87qwerv789ph12d34bhjl13f4";

const { validarExistenciaProducto, validarAdmin, validarExistenciaPedido, validarFormaDePago, validarUsuarioExistente } = require('./src/middlewares/middlewares');

const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.json());

// //JSONJWT

var unprotected = [
    /\/login*/,
    /api-docs/
  ];

app.use(
    expressJwt({
        secret:secretJwt,
        algorithms:['HS256'],
        
    }).unless({path: unprotected})  
)


/**
 * Login
 */
app.post('/login', async (req, res) => {

    const { username, contrasena } = req.body;
    const usuario = await usuarios.findOne({
        attributes: ['id', 'correo', 'nombre'],
        where: {
            username,
            contrasena
        },
        include: [{ model: rol }]
    });

    if (usuario == null) {
        res.status(401).json({ error: "username o contraseña incorrecta" });
    } else {
        const token = jwt.sign({
            usuario
        }, secretJwt, { expiresIn: "60m" })
        res.json({
            usuario,
            token
        })
    }
})

/**
* User registration
*/
app.post("/users",async(req,res)=>{
    const {username,nombre,telefono,direccion,contrasena,correo,rol_id } = req.body;
    const nuevoUsuario = usuarios.build({username,nombre,telefono,direccion,contrasena,correo,rol_id });

    try {
        res.status(201).json( await nuevoUsuario.save()); 
    } catch (e) {
        res.status(400).json( {error: e.message }); 
    }
});

/**
* Get user by id
*/
app.get("/users/:id", validarUsuarioExistente, async (req, res) => {
    res.status(200).json(await usuarios.findByPk(req.params.id));
});

/**
 * Get user list 
 */
app.get("/users",validarAdmin, async (req, res) => {
    res.status(200).json(await usuarios.findAll()); 
});

/**
 * Get products list
 */
app.get("/productos", async (req, res) => {
  res.status(200).json(await productos.findAll({where: {
      activo:true
  }})); // filtrar activo = true
});
/**
 * Get products by id 
 */
app.get("/productos/:id", async (req, res) => {
  res.status(200).json(await productos.findByPk(req.params.id)); 
});
/**
 * Create product (only admin)
 */
app.post("/productos",validarAdmin, async(req, res) => {

    const {nombre, precio, activo, imagen } = req.body;

    const nuevoProducto = productos.build({nombre, precio, activo, imagen });

    try {
        res.status(201).json( await nuevoProducto.save()); 
    } catch (e) {
        res.status(400).json( {error: e.message }); 
    }

});

/**
 * Update product by id (only admin)
 */
app.put("/productos/:id",validarExistenciaProducto,validarAdmin,async (req, res) => {
    try {
        res.status(200).json(await req.dataProducto.update (req.body))
    } catch (e) {
        res.status(400).json( {error: e.message }); 
    }
});

/**
 * Delete  product by id (only admin)
 */
app.delete("/productos/:id",validarExistenciaProducto,validarAdmin, async (req, res) => {
    try {
        res.status(200).json( await req.dataProducto.update ({activo: false}))
    } catch (e) {
        res.status(400).json( {error: e.message }); 
    }
});

/**
 * Get all orders 
 */ 
app.get("/pedidos", async (req, res) => {
    res.status(200).json(
        await pedidos.findAll( {
            include: [
              { model: productos,},
              { model: usuarios },
            ],
          })
    ); 
  });

/**
 * Get order by id 
 */
  app.get("/pedidos/:id",validarExistenciaPedido, async (req, res) => {
    res.status(200).json(
        await pedidos.findByPk(req.params.id, {
            include: [
              { model: productos,},
              { model: usuarios },
            ],
          })
    ); 
  });

/**
 * Create order
 */
app.post("/pedidos",validarFormaDePago,validarUsuarioExistente, async(req, res) => {
    
    const {precio_total, estado, fecha, formas_pago_id, usuarios_id } = req.body;

    const nuevoPedido = pedidos.build({precio_total, estado, fecha,formas_pago_id, usuarios_id });

    try {
        res.status(201).json( await nuevoPedido.save()); 
    } catch (e) {
        res.status(400).json( {error: e.message }); 
    }

});

/**
 * Get Orders news
 */
app.get("/pedidosNuevos", async (req, res) => {
    res.status(200).json(
        await pedidos.findAll({where: {estado:'nuevo'},
            include: [
              { model: productos,},
              { model: usuarios },
            ],
          })
    ); 
  });

/**
 * Update order by id (only admin)
 */
app.put("/pedidos/:id",validarAdmin,validarExistenciaPedido,async (req, res) => {
    try {
        res.status(200).json(await req.dataPedido.update (req.body))
    } catch (e) {
        res.status(400).json( {error: e.message }); 
    }
});

app.listen(APP_PORT, () => {
  console.info("server corriendo en puerto " + APP_PORT);
});
