require ('dotenv').config();

const mysql= require('mysql2');

const connection= mysql.createConnection(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME
});


//si hay error en la conexion con la bbdd
connection.connect((err) =>
{
    if(err){
        console.error(`ERROR intentando conectar con la base de datos : ${err}`);
        return;
    }

    //si no hay error
    console.info('CONNECTADA A LA BASE DE DATOS EXITOSAMENTE')
});

//exportar el modulo conexion
module.exports = connection;
