const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Venta = sequelize.define('Venta', {
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
});

module.exports = Venta;
