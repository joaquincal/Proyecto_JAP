document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){ //Llamado de la URL del producto mediante fetch
        let productJSON = resultObj.data;
            htmlContent = ` <div class="prodInfo__data"><h2 class="prodInfo__title">${productJSON.name}</h2>
            <h3 class="prodInfo__cost">${productJSON.currency} ${productJSON.cost}</h3></div>
            <div class="Info-image__container">
            <img class="productInfo__image" src="${productJSON.images[0]}">
            <img class="productInfo__image" src="${productJSON.images[1]}">
            <img class="productInfo__image" src="${productJSON.images[2]}">
            <img class="productInfo__image" src="${productJSON.images[3]}">
            <img class="productInfo__image" src="${productJSON.images[4]}">
            </div>
            <div class="prodInfo__description-container">
            <p class="prodInfo__description">${productJSON.description}</p>
            <p class="prodInfo__soldCount"><b>Cantidad de ventas: ${productJSON.soldCount}</b></p></div>` //Asigno a la variable htmlContent todo el contenido HTML que luego será mostrado en pantalla

            document.getElementById("productInfo-container").innerHTML = htmlContent; //Muestro en pantalla el contenido antes mencionado

            let relatedProductsIndex = productJSON.relatedProducts; //La variable relatedProductsIndex contiene el arreglo con los indices de los productos relacionados            
            console.log(relatedProductsIndex);
            getJSONData(PRODUCTS_URL).then(function(obj){ //Llamado a la url de productos anidada dentro del llamado a la informacion del  producto
                let productsArray = obj.data;
                for(let productIndex of relatedProductsIndex){
                    document.getElementById("relatedProducts-container").innerHTML += `<div class="products__container-product relatedProducts"><p class="product__name product__text">${productsArray[productIndex].name}</p>
                    <div class="image-container"><img class="product__image" src="${productsArray[productIndex].imgSrc}"></div>
                    <hr class"product__line">
                    <p class="product__description product__text">${productsArray[productIndex].description}</p>
                    <p class="product__cost product__text">${productsArray[productIndex].currency} ${productsArray[productIndex].cost}</p></div>`; //For que agrega al html los productos que corresponden a los indices contenidos en la el arreglo de productos relacionados
                    
                }
            })
        });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(commentsInfo){ //Llamado de la URL que contiene los comentarios del producto
        let comments = commentsInfo.data;
        for(let comment of comments) { //For que recorre le arreglo de productos
            document.getElementById("productInfo-comments").innerHTML += `<div class="prodInfo-comments">
            <p><b>${comment.user}</b> ${drawStars(comment.score)}<p>
            <p>${comment.description}<p>
            <p style="text-align: right">${comment.dateTime}<p></div>` //Al mismo tiempo obtengo el elemento con el id "productInfo-content" y muestro en pantalla el contenido de los comentarios.
        }
    })

    function drawStars(stars){ //Función que agrega las estrellas en el comentario agregado
        let number = parseInt(stars);
        let html = "";
        for(let i =1; i<=number; i++){
            html += `<span class="fa fa-star checked"></span>`
        }
        for(let j =number+1; j<=5; j++){
            html += `<span class="fa fa-star"></span>`
        }
        return html;
    }

    function showComment(comentario, date) { //Función que se encarga de mostrar en pantalla los datos introducidos en los controles gráficos agregados para poder comentar.
        let commentScore = document.getElementById("productInfo-select").value;
        if(comentario != "") { //If que controla que el comentario no sea vacío
        document.getElementById("comentarios").innerHTML += `<div class="prodInfo-comments"><p><b>${localStorage.getItem("usermail")}</b> ${drawStars(commentScore)}</p><p>${comentario}</p><p style="text-align: right">${date}</p></div>`
    } else {alert("Ingrese un comentario!")} //Alert que se despliega si el comentario es vacío
    }
    
    console.log()
    
    document.getElementById("commentButton").addEventListener("click", function(e) { //Función que accede al botón para enviar comentarios mediante el evento "click"
        var comentario = document.getElementById("newComment").value;
        var date = new Date(); //Declaro la variable "date" como fecha
        var dd = String(date.getDate()).padStart(2, '0'); //día de hoy
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //mes actual
        var yyyy = date.getFullYear(); //año actual
        var hh = date.getHours(); //hora
        var minutes = date.getMinutes(); //minutos
        var seconds = date.getSeconds(); //segundos
        date = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + minutes + ':' + seconds; //Unifico todas las separaciones de la fecha en un solo string.
        
        showComment(comentario, date);
        document.getElementById("productInfo-form").reset(); //Se resetea el form luego de ser ejecutada la función y ser enviado el comentario.
    })

});

