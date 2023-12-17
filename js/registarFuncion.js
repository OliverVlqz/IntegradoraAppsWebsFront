//registro

document.getElementById('registroForm').addEventListener('submit', 
function(event){
    event.preventDefault(); 
    let nombre = document.getElementById('nombre').value;
    let contraseña = document.getElementById('contraseña').value;
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
        window.location.href='registro.html'
            
        
    })
    .catch(error=>{
        console.error('Error:',error);
    })
})
