let btn = document.getElementById('btnBuscar');

btn.addEventListener('click', async () => {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
    
        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status} - ${respuesta.statusText}`);
        }
    
        const data = await respuesta.json();

        const valor = document.getElementById('inputBuscar').value.trim().toLowerCase();
        
        if (valor != '') {
        const usuariosFiltrados = data.filter(resultado => resultado.name.toLowerCase().includes(valor));

        console.log(usuariosFiltrados);

        const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML = "";

        if (usuariosFiltrados.length === 0) {
            alert('No se encontraron usuarios que coincidan con la búsqueda.');
        } else {
            const estructura = document.createElement("div");
            estructura.innerHTML = `
                <h2>${usuariosFiltrados[0].name}</h2>
                <p>Ciudad: ${usuariosFiltrados[0].address.city}</p>
                <p>Telefono: ${usuariosFiltrados[0].phone}</p>
                <p>Nombre de usuario: ${usuariosFiltrados[0].username}</p>
                <p>Email: ${usuariosFiltrados[0].email}</p>
            `;
          
            contenedor.appendChild(estructura);
        }
    } else {
        alert('Debes ingresar un nombre');
    } 

    } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
    }
});