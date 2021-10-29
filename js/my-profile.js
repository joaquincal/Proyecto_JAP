//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function loadImg() {
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

function saveProfileData() {
    let profileData = {};
    profileData.name = document.getElementById('profileName').value;
    profileData.lastname = document.getElementById('profileLastname').value;
    profileData.age = document.getElementById('profileAge').value;
    profileData.mail = document.getElementById('profileMail').value;
    profileData.phone = document.getElementById('profilePhone').value;
    profileData.photo = document.getElementById('profilePhoto').src;

    localStorage.setItem('profileInfo', JSON.stringify(profileData));
}


document.addEventListener("DOMContentLoaded", function (e) {
    let profileData = JSON.parse(localStorage.getItem('profileInfo'));

    if (profileData != null) {
        document.getElementById('profileName').value = profileData.name;
        document.getElementById('profileLastname').value = profileData.lastname;
        document.getElementById('profileAge').value = profileData.age;
        document.getElementById('profileMail').value = profileData.mail;
        document.getElementById('profilePhone').value = profileData.phone;
        document.getElementById('profilePhoto').src = profileData.photo;
    }
});