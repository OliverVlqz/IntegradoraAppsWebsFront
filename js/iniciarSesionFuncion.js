//InicioSesión

document.getElementById('loginForm').addEventListener('submit', 
function(event){
    event.preventDefault(); 
    let nombre = document.getElementById('nombre').value;
    let contraseña = document.getElementById('contraseña').value;
    localStorage.setItem('nombreUsuario', nombre);
    
    fetch('http://localhost:8080/integradora/usuario/',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({nombre,contraseña})
    })
    .then(response=> response.json())
    .then(data =>{
        document.getElementById('response').innerHTML = JSON.stringify(data);
        localStorage.setItem('nombreUsuario', nombre);
            window.location.href='index.html';
        
    })
    .catch(error=>{
        console.error('Error:',error);
    })
})
