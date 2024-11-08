const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
},

{
    timestamps: false // Deshabilita los campos createdAt y updatedAt  // Hay que asegurarse que en MySQL Work bench esté commo Not null o deshabilitado.
}

);

module.exports = Usuario;
