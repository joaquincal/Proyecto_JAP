//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

// function showProductData(infoArray){
//     for 
// }

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        let productJSON = resultObj.data;
            console.log(productJSON);
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
            <p class="prodInfo__soldCount"><b>Cantidad de ventas: ${productJSON.soldCount}</b></p></div>`

            document.getElementById("productInfo-container").innerHTML = htmlContent;
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(commentsInfo){
        let comments = commentsInfo.data;
        for(let comment of comments) {
            document.getElementById("productInfo-comments").innerHTML += `<div class="prodInfo-comments">
            <p><b>${comment.user}</b> ${drawStars(comment.score)}<p>
            <p>${comment.description}<p>
            <p style="text-align: right">${comment.dateTime}<p></div>`
        }
    })

    function drawStars(stars){
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

    function showComment(comentario, date) {
        let commentScore = document.getElementById("productInfo-select").value;
        if(comentario != "") {
        document.getElementById("comentarios").innerHTML += `<div class="prodInfo-comments"><p><b>${localStorage.getItem("usermail")}</b> ${drawStars(commentScore)}</p><p>${comentario}</p><p style="text-align: right">${date}</p></div>`
    } else {alert("Ingrese un comentario!")}
    }
    
    console.log()
    
    document.getElementById("commentButton").addEventListener("click", function(e) {
        var comentario = document.getElementById("newComment").value;
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        date = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + minutes + ':' + seconds;
        
        showComment(comentario, date);
        document.getElementById("productInfo-form").reset();
    })

});

