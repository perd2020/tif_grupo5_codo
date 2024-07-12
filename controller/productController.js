const db = require('../db/db');

const obtenerTodosLosProductos= (req,res) =>{

    const sql ='SELECT * FROM productos';

    db.query(sql, (err, result) =>{
        //si hay error "tirame/mostrame"
        if(err)
            throw err;            
            //si no hay error, mostrame los resultados
            res.json(result);
        });
};



//llamar productos por id

const ObtenerProductoPorId = (req,res) =>{

    const {id_producto} = req.params;
    const sql = 'SELECT * FROM productos WHERE id_producto =?;'
    db.query(sql, [id_producto] , (err, result) => 
        {
            if(err)throw err; //si hay error tiramelo

            res.json(result);//sino res ponde con un json el resultado

    });
};

//ALTA DE producto *** crear nuevo producto
const crearProducto = (req,res) =>
    {
        const {producto,precio,categoria,observaciones,stock,marca,disponible} = req.body;

        //consulta
        const sql='INSERT INTO productos(producto,precio,categoria,observaciones,stock,marca,disponible) VALUES (?,?,?,?,?,?,?)';
        
        db.query(sql,[producto,precio,categoria,observaciones,stock,marca,disponible], (err, result) => 
            {
                //que hara esta callback?
                if(err)throw err; //si hay error tiramelo
    
                //sino hay error devuelve un json y un mensaje
                res.json(
                    {
                        mensaje:'producto creado con exito',

                        idProducto:result.insertId
                    });
    
        });
    
};


//modificar producto por id
const actualizarProducto = (req,res) =>
    {
        const {id_producto} = req.params;
        const {producto,precio,categoria,observaciones,stock,marca,disponible} = req.body;

        const sql = 'UPDATE productos SET producto = ?, precio = ?, categoria = ?,observaciones = ?,stock =?,marca =?,disponible =? WHERE id_producto = ?';
    
        db.query(sql, [producto,precio,categoria,observaciones,stock,marca,disponible,id_producto] , (err, result) => 
            {
                if(err)throw err; //si hay error tiramelo
    
                 //sino hay error devuelve un json y un mensaje
                res.json(
                    {
                        mensaje:'productos editados con exito',

                        
                    });
        });
};

//borar producto por id
const borrarProducto = (req,res) => {
    const {id_producto} = req.params;

    const sql = 'DELETE FROM productos WHERE id_producto = ?';

    db.query(sql, [id_producto] , (err, result) => 
        {
            if(err)throw err; //si hay error tiramelo

             //sino hay error devuelve un json y un mensaje
            res.json(
                {
                    mensaje:'producto eliminado con exito',

                    
                });
    });
};

//exportar todas las funciones xq producto.js las va a usar 
module.exports = {
    obtenerTodosLosProductos,
    ObtenerProductoPorId,
    borrarProducto,
    actualizarProducto,
    crearProducto
};




/**
 * 
 * 
 * CREATE TABLE IF NOT EXISTS productos (
id_producto INT(11) AUTO_INCREMENT PRIMARY KEY,
producto VARCHAR (50) NOT NULL,
precio DOUBLE,
 */