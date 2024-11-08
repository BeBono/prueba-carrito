const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' } // Referencia a usuarios
    },
    
    status: {
        type: DataTypes.ENUM('activo', 'comprado', 'cancelado'),
        defaultValue: 'activo',
        allowNull: false
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    fechaActualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'carritos',
    timestamps: false
});

module.exports = Carrito;
