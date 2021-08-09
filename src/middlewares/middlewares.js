const { pedidos, productos, usuarios, rol, formasPago } = require('../models');
const jwt= require('jsonwebtoken');
const expressJwt = require('express-jwt');

function validarExistenciaProducto(req, res, next) {
    productos.findByPk(req.params.id).then((prod)=> {
        if (prod != null) {
            req.dataProducto = prod;
            next();
        }else {
         res.status(400).json({"error": `Producto id = ${req.params.id} no existe`})
        }
    }).catch(e => {
       res.status(400).json({"error": e.message})
    })
 }
 
 function validarAdmin (req,res,next) {
 
    if(req.user.usuario.rol.nombre == 'admin' ) {
        next();
    }else {
     res.status(401).json({error: "el usuario no es administrador"});
    }
 
 }
 
 function validarExistenciaPedido (req, res, next){
     pedidos.findByPk(req.params.id).then((ped)=> {
         if (ped != null) {
            req.dataPedido = ped;
             next();
         }else {
          res.status(400).json({"error": `Pedido id = ${req.params.id} no existe`})
         }
     }).catch(e => {
        res.status(400).json({"error": e.message})
     })
 }
 
 function validarFormaDePago(req,res,next){
     FPID = req.body.formas_pago_id
     formasPago.findByPk(FPID).then((fp)=> {
         
         if (fp != null) {
             next();
         }else {
          res.status(400).json({"error": `Forma de pago id = ${FPID} no existe`})
         }
 
     }).catch(e => {
        res.status(400).json({"error": e.message})
     })
 }
 
 function validarUsuarioExistente (req,res,next){
     userId = req.body.usuarios_id
     if(userId != null){
        console.log('BODY');
     }else{
        console.log('params');
     }
     usuarios.findByPk(userId).then((user)=> {
         
         if (user != null) {
             next();
         }else {
          res.status(400).json({"error": `El usuario id = ${userId} no existe`})
         }
 
     }).catch(e => {
        res.status(400).json({"error": e.message})
     })
 }

 module.exports = {validarExistenciaProducto, validarAdmin,validarExistenciaPedido,validarFormaDePago,validarUsuarioExistente}