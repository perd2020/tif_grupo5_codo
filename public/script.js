document.addEventListener('DOMContentLoaded', () =>{
    const mostrarCrearProductoFormBtn = document.getElementById('mostrarCrearProductoFormBtn');
    const crearProductoForm = document.getElementById('crearProductoForm');
    const editarProductoForm = document.getElementById('editarProductoForm');
    const listarProductosBtn = document.getElementById('listarProductosBtn');
    const listaProductos = document.getElementById('listaDeProductos');


    //mostrar u ocultar el form de creación de producto

    mostrarCrearProductoFormBtn.addEventListener('click',() => 
    {
        crearProductoForm.classList.toggle('hidden');
        
    });
    
    

    //CREAR NUEVO PRODUCTO
    crearProductoForm.addEventListener('submit', async (e) =>
    {  
        e.preventDefault();
        const formData = new FormData(crearProductoForm);
        const data = 
        {
            producto: formData.get('producto'),
            precio: formData.get('precio'),
            categoria: formData.get('categoria'),
            observaciones: formData.get('observaciones'),
            stock: formData.get('stock'),
            marca: formData.get('marca'),
            disponible: formData.get('disponible')
        }

        const response = await fetch ('/productos',
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert("producto Creado Con exito");

        crearProductoForm.reset();
        crearProductoForm.classList.add('hidden');
        enlistandoProductos();

    });



    //EDITAR USUARIO
    editarProductoForm.addEventListener('submit', async(e) => 
    {
        e.preventDefault();
        const formData = new FormData(editarProductoForm);
        const id_producto = formData.get('editProductoID');
        const data = 
        {
            producto: formData.get('editProducto'),
            precio: formData.get('editPrecio'),
            categoria: formData.get('editCategoria'),
            observaciones: formData.get('editObservaciones'),
            stock: formData.get('editStock'),
            marca: formData.get('editMarca'),
            disponible: formData.get('editDisponible')
        }

        const response = await fetch(`/productos/${id_producto}`,
        {
            method: 'PUT',
            headers: 
            {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        editarProductoForm.reset();
        editarProductoForm.classList.add('hidden');
        enlistandoProductos();

    });
    //listar todos los usuarios

    listarProductosBtn.addEventListener('click', enlistandoProductos);

    async function enlistandoProductos()
    {
        const response = await fetch('/productos');
        const productos = await response.json();
        listaProductos.innerHTML='';//limpio la lista de productos

        productos.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span> 
                ID: ${producto.id_producto}, 
                Producto: ${producto.producto}, 
                Precio: ${producto.precio}, 
                Categoria: ${producto.categoria},
                Observaciones: ${producto.observaciones},
                Stock: ${producto.stock},
                Marca: ${producto.marca},
                Stock: ${producto.stock},
                Disponible: ${producto.disponible}
                </span>
                <div class="actions"><button class="update" 
                    data-id_producto="${producto.id_producto}" data-producto="${producto.producto}" data-precio="${producto.precio}" data-categoria="${producto.categoria}" data-observaciones="${producto.observaciones}" data-stock="${producto.stock}" data-marca="${producto.marca}" data-disponible="${producto.disponible}" > Actualizar Producto </button> 

                    <button class="delete" data-id_producto="${producto.id_producto}"> Eliminar Producto</button>

                </div>
            `;

            listaProductos.appendChild(li);
        });


        document.querySelectorAll('.update').forEach(button => 
            {
                button.addEventListener('click',(e) => 
                {
                    const id_producto = e.target.getAttribute('data-id_producto');                    
                    const producto = e.target.getAttribute('data-producto');                    
                    const precio = e.target.getAttribute('data-precio');                    
                    const categoria = e.target.getAttribute('data-categoria');
                    const observaciones = e.target.getAttribute('data-observaciones');
                    const stock = e.target.getAttribute('producto.stock');
                    const marca = e.target.getAttribute('producto.marca');
                    const disponible = e.target.getAttribute('producto.disponible');

                    document.getElementById('editProductoID').value = id_producto;
                    document.getElementById('editProducto').value = producto;
                    document.getElementById('editPrecio').value = precio;
                    document.getElementById('editCategoria').value = categoria;
                    document.getElementById('editObservaciones').value = observaciones;
                    document.getElementById('editStock').value = stock;
                    document.getElementById('editMarca').value = marca;
                    document.getElementById('editDisponible').value = disponible;

                    editarProductoForm.classList.remove('hidden');
                });
            });


            document.querySelectorAll('.delete').forEach(button => 
                {
                    button.addEventListener('click', async(e)=>
                    {
                        const id_producto = e.target.getAttribute('data-id_producto');
                        const response = await fetch(`/productos/${id_producto}`,{
                            method: 'DELETE'
                        });

                        const result = await response.json();
                        alert(result.message);
                        enlistandoProductos();
                    });

                });


    }

});

