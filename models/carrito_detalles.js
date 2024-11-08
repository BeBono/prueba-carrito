const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Carrito = require('./carrito');
const Producto = require('./productos');

const CarritoDetalle = sequelize.define('CarritoDetalle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    tableName: 'carrito_detalles',
    timestamps: false
});

// Relaciones con otras tablas
CarritoDetalle.belongsTo(Carrito, { foreignKey: 'carritoId' }); // Esta línea gestiona la clave foránea de carritoId
CarritoDetalle.belongsTo(Producto, { foreignKey: 'productoId' }); // Esta línea gestiona la clave foránea de productoId

module.exports = CarritoDetalle;
