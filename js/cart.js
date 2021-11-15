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

function paymentDisplay(paymentType) {
    let bankDisplay = document.getElementById('bank-info');
    let cardDisplay = document.getElementById('card-info');
    if (paymentType == 'bank') {
        bankDisplay.classList.remove('invisible');
        bankDisplay.classList.add('visible');
        cardDisplay.classList.remove('visible');
        cardDisplay.classList.add('invisible');
        document.getElementById('bankName').required = true;
        document.getElementById('bankAccount').required = true;

        document.getElementById('cardName').required = false;
        document.getElementById('cardNumber').required = false;
        document.getElementById('card-date').required = false;
        document.getElementById('cardCVV').required = false;

        document.getElementById('cardName').value = '';
        document.getElementById('cardNumber').value = '';
        document.getElementById('card-date').value = '';
        document.getElementById('cardCVV').value = '';
    } else if (paymentType == 'card') {
        cardDisplay.classList.remove('invisible');
        cardDisplay.classList.add('visible');
        bankDisplay.classList.remove('visible');
        bankDisplay.classList.add('invisible');

        document.getElementById('bankName').required = false;
        document.getElementById('bankAccount').required = false;

        document.getElementById('cardName').required = true;
        document.getElementById('cardNumber').required = true;
        document.getElementById('card-date').required = true;
        document.getElementById('cardCVV').required = true;

        document.getElementById('bankName').value = '';
        document.getElementById('bankAccount').value = '';
    }
};

function paymentClose() {
    let bankDisplay = document.getElementById('bank-info');
    let cardDisplay = document.getElementById('card-info');
    bankDisplay.classList.remove('visible');
    bankDisplay.classList.add('invisible');
    cardDisplay.classList.remove('visible');
    cardDisplay.classList.add('invisible')

    document.getElementById('pay-card').checked = false;
    document.getElementById('pay-bank').checked = false;
}

function shippingCost(value) {
    let subtotalArray = document.getElementsByClassName("subtotal"); //Obtengo la lista de elementos con clase "subtotal".
    let shipCost = 0;
    let subtotalSum = 0;
    let percentage = parseInt(value) / 100;
    for (sub of subtotalArray) {
        shipCost += parseInt(sub.innerHTML) * percentage;
        subtotalSum += parseFloat(sub.innerHTML);
    }
    document.getElementById('shippingPrice').innerHTML = shipCost;
    document.getElementById('totalPrice').innerHTML = shipCost + subtotalSum;
}

function updatePrice(cost, count, id, currency) {
    if (currency == "UYU") {
        cost /= 40;
    }
    document.getElementById(id).innerHTML = parseFloat(cost) * count;   //Asigno el valor del costo multiplicado por la cantidad de articulos al elemento con id correspondiente.
    let subtotalArray = document.getElementsByClassName("subtotal");    //Obtengo la lista de elementos con clase "subtotal".
    let subtotal = 0;
    for (sub of subtotalArray) {
        subtotal += parseFloat(sub.innerHTML);
    }                                                                   //Recorro la lista de elementos con clase "subtotal" y sumo los precios individuales a una variable "subtotal".
    document.getElementById("finalProductsPrice").innerHTML = subtotal; //llamo a la funcion finalCartPrice para mostrar el precio final de los articulos y el envio.
}