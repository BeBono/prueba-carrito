const express = require('express');
const path = require('path');
const { sequelize, connectDB } = require('./config/db');
const carritoRoutes = require('./routes/carrito');
const ventasRoutes = require('./routes/ventas');
const productosRoutes = require('./routes/getproductos'); 
const app = express();

connectDB();

// Sincronizar la base de datos y crear las tablas según los modelos
sequelize.sync({ force: false })  // Cambia a 'true' si deseas sobrescribir tablas existentes durante el desarrollo
    .then(() => console.log('Tablas sincronizadas correctamente'))
    .catch((error) => console.error('Error al sincronizar tablas:', error));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configura las rutas de la API
app.use('/api/productos', productosRoutes); // Muestra el JSON de los productos.
app.use('/api/carrito', carritoRoutes);  // +'/agregar'  agrega producto al carrito.
app.use('/api/comprar', ventasRoutes); // +'/resumen' Muestra vista resumen compra con los productos seleccionados.



// Ruta para la vista de productos (HTML estático)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'productos.html'));  // Envia productos.html al cliente
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
