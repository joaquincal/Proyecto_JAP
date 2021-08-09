//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentraa cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    linkPropietarios = 'https://ferqueve.github.io/autorizo/propietarios.json'
    linkAutomoviles = 'https://ferqueve.github.io/autorizo/automoviles.json' 
    
    fetch(linkPropietarios)
    .then((response) => response.json())
    .then(propietarios => {
        console.log(propietarios)
    });
});

