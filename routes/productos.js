const express = require('express');
const router = express.Router();
const productController=require('../controller/productController');

// trabajando con rutas de productController que manipula productos POR ID
router.get('/',productController.obtenerTodosLosProductos);//traer todos los productos
router.get('/:id_producto',productController.ObtenerProductoPorId);//traer producto por id que recibe un id
router.post('/',productController.crearProducto);//crear producto nuevo
router.put('/:id_producto',productController.actualizarProducto);//modifica producto, recibe un id
router.delete('/:id_producto',productController.borrarProducto);//borra producto , recibe un id


module.exports = router;
