//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

var loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", function(e){
    e.preventDefault();
    
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;

    if (password != "" && email != "") {
        location.replace("home.html")
    }
    else {
        alert("Usuario y/o contraseña inválidos")
    }
});