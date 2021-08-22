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
} //Declaro la funcion getJSONData que se encargará de hacer el pedido de los datos del json por medio de la api fetch

let resultado = getJSONData(url).then(objeto => {
    cargarDatos(objeto.data)
}) //Realizo el llamado de la función cargarDatos

function cargarDatos(products) {
    let productContent = ``
    for ( let product of products) {
        productContent += `<div class="products__container-product"><p class="product__name product__text">${product.name}</p>
        <div class="image-container"><img class="product__image" src="${product.imgSrc}"></div>
        <hr class"product__line">
        <p class="product__description product__text">${product.description}</p>
        <p class="product__cost product__text">${product.currency} ${product.cost}</p>
        <p class="product__soldcount product__text"> Cantidad de vendidos: ${product.soldCount}</p></div>`
    }
    document.getElementById("products__list").innerHTML = productContent;
} //Declaro la función cargarDatos, que se encarga de pasar al HTML el contenido del json obtenido