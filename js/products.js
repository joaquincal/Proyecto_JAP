//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentraa cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// document.addEventListener("DOMContentLoaded", function (e) {
//     linkPropietarios = 'https://ferqueve.github.io/autorizo/propietarios.json'
//     linkAutomoviles = 'https://ferqueve.github.io/autorizo/automoviles.json'

//     fetch(linkPropietarios)
//         .then((response) => response.json())
//         .then(propietarios => {
//             console.log(propietarios)
//         });
// });

let url = "https://japdevdep.github.io/ecommerce-api/product/all.json"
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;
const ASC_BY_PRICE = "upPrice";
const DESC_BY_PRICE = "downPrice";
const DESC_BY_REL = "downRel";
//Variables y constantes declaradas para ser utilizadas mas adelante

function showProducts() { //Declaro la funcion showProducts
    let productContent = ``
    for(let i = 0; i < currentProductsArray.length; i++){ //For que recorre el arreglo con los productos
        let product = currentProductsArray[i];
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
        ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) { //If que declara las conduciones que definen la forma en la que operara la funcion luego

            productContent += ` <a href="product-info.html" class="product__link"><div class="products__container-product"><p class="product__name product__text">${product.name}</p>
        <div class="image-container"><img class="product__image" src="${product.imgSrc}"></div>
        <hr class"product__line">
        <p class="product__description product__text">${product.description}</p>
        <p class="product__cost product__text">${product.currency} ${product.cost}</p>
        <p class="product__soldcount product__text"> Cantidad de vendidos: ${product.soldCount}</p></div></a>` //Asigno los datos del productos en forma de string a la variable productContent
        }
    }
    document.getElementById("products__list").innerHTML = productContent; //Introduzco la variable productContent en el elemento del HTML que tiene la id "products__list"
}

function sortProducts(prodCriteria, prodArray) { //Defino la funcion sortProducts que funciona de la misma forma que sortCategories pero con cambios en los nombres de las constantes y el ultimo else
    let result = []; //Defino la variable result como un arreglo vacio
    if (prodCriteria === ASC_BY_PRICE) //Seccion que ordena los productos de forma ascendente por precio
    {
        result = prodArray.sort(function(a, b)
            {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (prodCriteria === DESC_BY_PRICE){ //Seccion que ordena los productos de forma descendente por precio
        result = prodArray.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (prodCriteria === DESC_BY_REL){ //Seccion que ordena los productos de forma descendente por relevancia
        result = prodArray.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result; //Retorno la variable result que contiene el arreglo ordenado con el criterio correspondiente
}

function sortAndShowProducts(sortCriteria, productsArray){ //Defino la funcion sortAndShowProducts que funciona exactamente igual que la funcion sortAndShowCategories
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray); //Ordeno el arreglo segun dado segun el criterio dado

    showProducts(); //Muestro los productos en pantalla
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
            sortAndShowProducts(ASC_BY_PRICE, resultObj.data); //Cuando ningun criterio de orden fue dado, muestro los productos con un criterio predeterminado
    });

    //Los siguientes eventos son los que corresponden a las formas de seleccionar el orden requerido por el usuario

    document.getElementById("sortAsc-prod").addEventListener("click", function(){
        sortAndShowProducts(ASC_BY_PRICE); //Mostrar los productos en orden ascendente por precio
    });

    document.getElementById("sortDesc-prod").addEventListener("click", function(){
        sortAndShowProducts(DESC_BY_PRICE); //Mostrar los productos en orden descendente por precio
    });

    document.getElementById("sortBySold-prod").addEventListener("click", function(){
        sortAndShowProducts(DESC_BY_REL); //Mostrar los productos en orden descendente por relevancia
    });

    document.getElementById("price__button").addEventListener("click", function(){
        minPrice = document.getElementById("minimumPrice").value; //Obtengo el valor ingresado en el valor de precio minimo del form
        maxPrice = document.getElementById("maximumPrice").value; //Obtengo el valor ingresado en el valor de precio maximo del form

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice); //Asigno el valor de precio minimo a la variable minPrice
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice); //Asigno el valor de precio maximo a la variable maxPrice
        }
        else{
            maxPrice = undefined;
        }

        showProducts(); //Muestro el resultado en pantalla
    });
});
