let port = 3000; 
const express = require('express');
const app = express();
const path = require('path');

// usuarios localhost:3000/usuarios
const productosRouter = require('./routes/productos');

app.use(express.json());

app.use('/productos',productosRouter);

app.use(express.static(path.join(__dirname,'public')));


app.listen(port , () => 
{
    console.log(`Servidor ejecutandose y probandose en el puerto ${port}`)
});