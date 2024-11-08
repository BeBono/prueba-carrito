const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Venta = require('./ventas');

const Pago = sequelize.define('Pago', {
    ventaId: { type: DataTypes.INTEGER, references: { model: Venta, key: 'id' } },
    monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    metodo: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Pago;
