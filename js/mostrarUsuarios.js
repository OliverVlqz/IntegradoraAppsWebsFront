function mostrarUsuarios() {
  const url = "http://localhost:8080/integradora/usuario/";

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then((usuarios) => {
      const tabla = document.querySelector(".table tbody");

      tabla.innerHTML = "";

      usuarios.forEach((usuario, index) => {
        console.log(usuario);
        console.log(usuario.id_usuario);
        const fila = `
                <tr>
                    <th scope="row" >${index + 1}</th>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.contraseña}</td>
                    <td>
                    <a href="./editarUsuario.html?id_usuario=${
                      usuario.id_usuario
                    }" class="btn btn-warning"><i class="bi bi-pencil-square"></i></a>
                       
                    <button type="button" class="btn btn-danger" onclick="eliminarUsuario(${
                      usuario.id_usuario
                    })"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
        console.log;
        tabla.innerHTML += fila;
      });
    })
    .catch((error) => {
      console.error("Error al obtener usuarios:", error.message);
    });
}

mostrarUsuarios();
