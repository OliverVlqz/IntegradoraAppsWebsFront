// Función que maneja el envío del formulario
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/integradora/plazas")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        let latitud = element.latitud;
        let longitud = element.longitud;
        console.log(element.latitud);
      });
    });
});
///
document
  .getElementById("formularioPlaza")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el envío normal del formulario

    // Recolectar los datos del formulario
    var formData = new FormData(this);
    var objetoData = {};
    formData.forEach(function (value, key) {
      // Convertir la latitud y longitud a números si es necesario
      if (key === "latitud" || key === "longitud") {
        objetoData[key] = parseFloat(value);
      } else {
        objetoData[key] = value;
      }
    });

    // Hacer la petición POST
    fetch("http://localhost:8080/integradora/plazas", {
      // Asegúrate de que la URL sea correcta
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objetoData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Manejo de la respuesta exitosa
      })
      .catch((error) => {
        console.error("Error:", error);
        // Manejo de errores de red o de servidor
      });
  });
///
var ubicacionSeleccionada = {
  latitude: null,
  longitude: null,
};

function cargarUbicaciones() {
  fetch("http://localhost:8080/integradora/plazas")
    .then((response) => response.json())
    .then((ubicaciones) => {
      const contenedorUbicaciones = document.getElementById("Ubicaciones");
      contenedorUbicaciones.innerHTML = "";

      ubicaciones.forEach((ubicacion, index) => {
        const label = document.createElement("label");
        label.className = "radio";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "radio";
        input.dataset.latitud = ubicacion.latitud;
        input.dataset.longitud = ubicacion.longitud;
        if (index === 0) {
          input.checked = true;
          actualizarUbicacionSeleccionada(input);
        }

        input.addEventListener("change", function () {
          actualizarUbicacionSeleccionada(this);
        });

        const span = document.createElement("span");
        span.className = "name";
        span.textContent = ubicacion.nombre;

        label.appendChild(input);
        label.appendChild(span);
        contenedorUbicaciones.appendChild(label);
      });

      // Crear el mapa una vez que todas las ubicaciones estén cargadas
      crearMapa();
    })
    .catch((error) => console.error("Error al cargar ubicaciones:", error));
}

function actualizarUbicacionSeleccionada(input) {
  ubicacionSeleccionada.latitude = parseFloat(input.dataset.latitud);
  ubicacionSeleccionada.longitude = parseFloat(input.dataset.longitud);

  // Actualiza el mapa con la ubicación seleccionada
  new Mapkick.Map("map", fetchData);
}

function fetchData(success, fail) {
  if (
    ubicacionSeleccionada.latitude != null &&
    ubicacionSeleccionada.longitude != null
  ) {
    success([
      {
        latitude: ubicacionSeleccionada.latitude,
        longitude: ubicacionSeleccionada.longitude,
      },
    ]);
  } else {
    fail("Datos de ubicación no disponibles");
  }
}

function crearMapa() {
  new Mapkick.Map("map", fetchData);
}

document.addEventListener("DOMContentLoaded", cargarUbicaciones);
