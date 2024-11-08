// routes/productos.js
const express = require('express');
const router = express.Router();
const Producto = require('../models/productos');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);  // Esto mostrará más detalles del error
        res.status(500).send('Error al obtener los productos...');
    }
});


module.exports = router;
