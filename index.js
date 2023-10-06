let btn = document.getElementById('btnBuscar');
let contenedor = document.getElementById('contenedor');
let usuariosFiltrados = [];
let data = [];

function toggleMode() {
    const body = document.body
    body.classList.toggle('day-mode');
    body.classList.toggle('night-mode');
  }
 
  if (localStorage.getItem('claseBody')) {
    const claseGuardada = localStorage.getItem('claseBody');
    document.body.className = claseGuardada;
  }
  
  window.addEventListener('beforeunload', function() {
    const claseActual = document.body.className;
    localStorage.setItem('claseBody', claseActual);
  });

  
    async function fetchPeople() {
        try {
            const respuesta = await fetch('https://my-json-server.typicode.com/maximiliano836/entrega13/personas');
            data = await respuesta.json();
            console.log(data);
            showPeople(data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }
        

  
  function showPeople(people) {
      contenedor.innerHTML = '';
      people.forEach(persona => {
          const estructura = document.createElement("div");
          estructura.classList.add("usuario");
              estructura.innerHTML += `
                  <h2>${persona.name}</h2>
                  <div class="info">
                      <p>Ciudad: ${persona.country}</p>
                      <p>Telefono: ${persona.phone}</p>
                  </div>
              `;
          estructura.querySelector('.info').classList.add('hidden');
    
          estructura.addEventListener('mouseover', () => {
              estructura.querySelector('.info').classList.remove('hidden');
          });
    
          estructura.addEventListener('mouseout', () => {
              estructura.querySelector('.info').classList.add('hidden');
          });
    
          contenedor.appendChild(estructura);
      });
      }
      
      document.addEventListener("DOMContentLoaded", function () {
        fetchPeople();
    
        document.getElementById('inputBuscar').addEventListener('input', function () {
            const valor = this.value.trim().toLowerCase();
    
            contenedor.innerHTML = '';
    
            usuariosFiltrados = data.filter(persona => {
                const lowerCaseValue = valor.toLowerCase();
                return (
                    persona.name.toLowerCase().includes(lowerCaseValue) ||
                    persona.country.toLowerCase().includes(lowerCaseValue) ||
                    persona.phone.toLowerCase().includes(lowerCaseValue)
                );
            });
    
            showPeople(usuariosFiltrados);
        });
    });