//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {
    var articulos = [];

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (obj) {
        let articulos = (obj.data.articles);
        let id = 0;
        for (article1 of articulos) {
            showCarrito(article1, id);
            id++;
        }
    });

    function showCarrito(article, controlId) {
        document.getElementById("cartTable").innerHTML += `
    <tr>
        <td class="cartProductName"><b>${article.name}</b> </td>
        <td> <img class="cartProductImage"src="${article.src}" alt=""> </td>
        <td class="cartProductCurrency">${article.currency} ${article.unitCost}</td>
        <td> <input class="cartInput" type="number" name="" id="cartInput${controlId}" min="0" onchange="updatePrice(${article.unitCost}, this.value, ${controlId}, '${article.currency}')" value="0"></td>
        <td>USD <div style="display: inline;"class="subtotal" id="${controlId}">0</div></td>
    </tr>`


        /*mostrar los productos del carrito con el input correspondiente a la cantidad*/

    }
});

function shippingCost(value) {
    let subtotalArray = document.getElementsByClassName("subtotal"); //Obtengo la lista de elementos con clase "subtotal".
    let shipCost = 0;
    let percentage = parseInt(value) / 100;
    for (sub of subtotalArray) {
        shipCost += parseInt(sub.innerHTML) * percentage;
    }
    document.getElementById('shippingPrice').innerHTML = shipCost;
    return(shipCost);
}

function finalCartPrice(price) {
    document.getElementById("finalProductsPrice").innerHTML = price;
}

function updatePrice(cost, count, id, currency) {
    if (currency == "UYU") {
        cost /= 40;
    }
    document.getElementById(id).innerHTML = parseFloat(cost) * count; //Asigno el valor del costo multiplicado por la cantidad de articulos al elemento con id correspondiente.
    let subtotalArray = document.getElementsByClassName("subtotal"); //Obtengo la lista de elementos con clase "subtotal".
    let subtotal = 0;
    for (sub of subtotalArray) {
        subtotal += parseFloat(sub.innerHTML);
    } //Recorro la lista de elementos con clase "subtotal" y sumo los precios individuales a una variable "subtotal".
    finalCartPrice(subtotal) //llamo a la funcion finalCartPrice para calcular el precio final de los articulos y el envio.
    return(subtotal);
}