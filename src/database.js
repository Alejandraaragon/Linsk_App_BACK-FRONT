const mysql = require('mysql2')
const { database } = require('./keys')
/* const { promisify } = require('util') */ //metodo que soporta promesas
const { promisify } = require('util')
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {   //al hacer la conexion obtener un error o la conexion
  if(err) {    //si tengo un error haz esto.  HAY 3 TIPOS DE ERROR
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('DATABASE CONNECTION WAS CLOSED'); // se perdió la conexion con la base de datos
    }
    if(err.code === 'ER_CON_COUNT_ERROR') {
        console.log('DATABASE HAS TO MANY CONNECTIONS'); //La base de datos tuvo muchas conexiones
    }
    if(err.code === 'ECONNREFUSED') {
        console.log('DATABASE CONNECTION WAS REFUSED'); //La conexion a la base de datos fue rechazada
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');
  return;
});  

pool.query = promisify(pool.query); //gracias a esta linea de codigo puedo usas  promersas

module.exports = pool;





