const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Producto = sequelize.define('Producto', {
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    descripcion: { 
        type: DataTypes.STRING 
    },
    precio: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    stock: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    imagenUrl: { 
        type: DataTypes.STRING(255), // Este campo almacena la URL de la imagen
        allowNull: true // Permite que sea nulo si no se proporciona una imagen
    }
}, {
    timestamps: false // Deshabilita los campos createdAt y updatedAt
});

module.exports = Producto;


 