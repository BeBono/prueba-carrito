const express = require('express');
const Carrito = require('../models/carrito');
const CarritoDetalle = require('../models/carrito_detalles');
const Producto = require('../models/productos');

const router = express.Router();

// En /routes/carrito.js

// Agregar producto al carrito
router.post('/agregar', async (req, res) => {
    const { productoId, cantidad, usuarioId } = req.body; // Asegúrate de recibir usuarioId también

    try {
        // Busca el producto para obtener su precio
        const producto = await Producto.findOne({ where: { id: productoId } });
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Crea o busca un carrito activo para el usuario
        let carrito = await Carrito.findOne({ where: { usuarioId, status: 'activo' } });
        if (!carrito) {
            carrito = await Carrito.create({ usuarioId });
        }

        // Agrega el detalle al carrito con el precio del producto
        await CarritoDetalle.create({
            carritoId: carrito.id,
            productoId,
            cantidad,
            precio: producto.precio, // Incluye el precio aquí
        });

        res.json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).json({ error: 'Error al agregar al carrito' });
    }
});

module.exports = router;
