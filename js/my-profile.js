//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function loadImg() { //funcion que carga la imagen del perfil
    let profilePic = document.getElementById('profilePhoto');
    let file = document.getElementById('photoInput').files[0];

    let reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
    } else {
        profilePic.src = "img/avatar.png"
    }
    reader.onloadend = function () {
        profilePic.src = reader.result
    }

}

function saveProfileData() { //funcion que guarda los datos del usuario como elementos del objeto "profileData"
    let profileData = {};
    profileData.name = document.getElementById('profileName').value;
    profileData.lastname = document.getElementById('profileLastname').value;
    profileData.age = document.getElementById('profileAge').value;
    profileData.mail = document.getElementById('profileMail').value;
    profileData.phone = document.getElementById('profilePhone').value;
    profileData.photo = document.getElementById('profilePhoto').src;

    localStorage.setItem('profileInfo', JSON.stringify(profileData)); //el objeto profileData se guarda en local storage mediante el metodo JSON.stingify
}


document.addEventListener("DOMContentLoaded", function (e) {
    let profileData = JSON.parse(localStorage.getItem('profileInfo')); //obtencion del objeto profileData mediante el llamado al local storage

    if (profileData != null) { //Si la informacion del perfil no esta vacia, asigna los valores de las variables a los campos determinados del html
        document.getElementById('profileName').value = profileData.name;
        document.getElementById('profileLastname').value = profileData.lastname;
        document.getElementById('profileAge').value = profileData.age;
        document.getElementById('profileMail').value = profileData.mail;
        document.getElementById('profilePhone').value = profileData.phone;
        document.getElementById('profilePhoto').src = profileData.photo;
    }
});