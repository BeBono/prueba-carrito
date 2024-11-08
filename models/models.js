const Usuario = require('./usuarios');
const Producto = require('./productos');
const Carrito = require('./carrito');
const CarritoDetalle = require('./carrito_detalles');
const Venta = require('./ventas');
const VentaDetalle = require('./venta_detalles');
const Pago = require('./pagos');

// Relaciones entre los modelos

// Un carrito pertenece a un usuario
Usuario.hasOne(Carrito, { foreignKey: 'usuarioId' });
Carrito.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Un carrito tiene muchos detalles de productos
Carrito.hasMany(CarritoDetalle, { foreignKey: 'carritoId' });
CarritoDetalle.belongsTo(Carrito, { foreignKey: 'carritoId' });

// Un detalle de carrito pertenece a un producto
Producto.hasMany(CarritoDetalle, { foreignKey: 'productoId' });
CarritoDetalle.belongsTo(Producto, { foreignKey: 'productoId' });

// Relaciones con la venta...

module.exports = { Usuario, Producto, Carrito, CarritoDetalle, Venta, VentaDetalle, Pago };
