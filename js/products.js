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
const DESC_BY_REL = "downRel"

function showProducts() {
    let productContent = ``
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
        ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {

            productContent += ` <a href="product-info.html" class="product__link"><div class="products__container-product"><p class="product__name product__text">${product.name}</p>
        <div class="image-container"><img class="product__image" src="${product.imgSrc}"></div>
        <hr class"product__line">
        <p class="product__description product__text">${product.description}</p>
        <p class="product__cost product__text">${product.currency} ${product.cost}</p>
        <p class="product__soldcount product__text"> Cantidad de vendidos: ${product.soldCount}</p></div></a>`
        }
    }
    document.getElementById("products__list").innerHTML = productContent;
} //Declaro la función cargarDatos, que se encarga de pasar al HTML el contenido del json obtenido

function sortProducts(prodCriteria, prodArray) {
    let result = [];
    if (prodCriteria === ASC_BY_PRICE)
    {
        result = prodArray.sort(function(a, b)
            {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (prodCriteria === DESC_BY_PRICE){
        result = prodArray.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (prodCriteria === DESC_BY_REL){
        result = prodArray.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProducts();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url).then(function(resultObj){
            sortAndShowProducts(ASC_BY_PRICE, resultObj.data);
    });

    document.getElementById("sortAsc-prod").addEventListener("click", function(){
        sortAndShowProducts(ASC_BY_PRICE);
    });

    document.getElementById("sortDesc-prod").addEventListener("click", function(){
        sortAndShowProducts(DESC_BY_PRICE);
    });

    document.getElementById("sortBySold-prod").addEventListener("click", function(){
        sortAndShowProducts(DESC_BY_REL);
    });

    document.getElementById("price__button").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("minimumPrice").value;
        maxPrice = document.getElementById("maximumPrice").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProducts();
    });
});
