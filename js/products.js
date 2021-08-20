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

let url = "https://japdevdep.github.io/ecommerce-api/product/all.json"

var getJSONData = function(url){
    var result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

// let resultado = getJSONData(url).then(objeto => {
//     cargarDatos(objeto.data)
// })

function cargarDatos(productos) {
    let contenido = ``
    for ( let producto of productos) {
        contenido += `<p class="product__name">${producto.name}</p>
        <p class="product__image">${producto.imgSrc}</p>
        <p class="product__description">${producto.description}</p>
        <p class="product__cost">${producto.currency}${producto.cost}</p>
        <p class="product__soldcount">${producto.soldCount}</p>`
    }
    document.getElementById("products__list").innerHTML = contenido;
} 