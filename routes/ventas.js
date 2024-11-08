const express = require('express');
const { sequelize } = require('../config/db');
const Carrito = require('../models/carrito');
const CarritoDetalle = require('../models/carrito_detalles');
const Producto = require('../models/productos');
const Venta = require('../models/ventas');
const VentaDetalle = require('../models/venta_detalles');


const router = express.Router();

// Ruta para obtener el resumen del carrito
router.get('/resumen', async (req, res) => {
    try {
        console.log('Iniciando la consulta del carrito');
        const carrito = await Carrito.findOne({
            
            where: { status: 'activo' },
            include: {
                model: CarritoDetalle,
                include: { model: Producto }
            }
        });

        console.log('Carrito con detalles:', JSON.stringify(carrito, null, 2));
        console.log('My message');

        if (!carrito) {
            return res.status(400).json({ error: 'El carrito está vacío o no se encontró.' });
            
        }

        console.log(carrito);

        const detallesCarrito = carrito.CarritoDetalles.map(detalle => ({
            producto: detalle.Producto,
            cantidad: detalle.cantidad,
            precioUnitario: detalle.Producto.precio,
            subtotal: detalle.cantidad * detalle.Producto.precio
        }));

        res.status(200).json(detallesCarrito);
    } catch (error) {
        console.error('Error al obtener el resumen del carrito:', error);
        res.status(500).json({ error: 'Hubo un problema al obtener el resumen del carrito_.' });
    }
});

// Ruta para procesar la compra
router.post('/procesar', async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const carrito = await Carrito.findOne({
            where: { status: 'activo' },
            include: {
                model: CarritoDetalle,
                include: { model: Producto }
            },
            transaction: t
        });

        if (!carrito) {
            return res.status(400).json({ error: 'El carrito está vacío o no se encontró.' });
        }

        const venta = await Venta.create({
            status: 'comprado',
            fechaCreacion: new Date(),
        }, { transaction: t });

        const ventaDetalles = carrito.CarritoDetalles.map(item => ({
            productoId: item.Producto.id,
            cantidad: item.cantidad,
            precioUnitario: item.Producto.precio,
            subtotal: item.cantidad * item.Producto.precio,
            ventaId: venta.id
        }));

        await VentaDetalle.bulkCreate(ventaDetalles, { transaction: t });
        await carrito.update({ status: 'comprado' }, { transaction: t });

        await t.commit();
        res.status(200).json({ message: 'Compra realizada con éxito', venta });
    } catch (error) {
        await t.rollback();
        console.error('Error al realizar la compra:', error);
        res.status(500).json({ error: 'Hubo un problema al realizar la compra.' });
    }
});

module.exports = router;

