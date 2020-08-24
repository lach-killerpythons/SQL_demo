

function helloPug() {
    let message = document.getElementById('name');
    window.alert('hello from hellopug.js! ' + message.value);
    message.value = '';
}

function createLink () {
    let email = document.getElementById('email');
    let name = document.getElementById('name');
    //location.href='http://localhost:3000/'
    var myString = "http://localhost:3000/users?name=" + name.value + "email=" + email.value;
    //window.alert('hello' + myString)
    //location.href = myString;
    return myString;
}

