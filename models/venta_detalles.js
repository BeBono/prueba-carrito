const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Venta = require('./ventas');
const Producto = require('./productos');

const VentaDetalle = sequelize.define('VentaDetalle', {
    ventaId: { type: DataTypes.INTEGER, references: { model: Venta, key: 'id' } },
    productoId: { type: DataTypes.INTEGER, references: { model: Producto, key: 'id' } },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = VentaDetalle;
