import { InitAlert } from "./screen.js";

var shown = false;

var password_field = document.getElementById('password');
var button = document.querySelector('.showhide');



function showhide() {
    if (!shown) {
        button.textContent = 'Hide Password';
        password_field.setAttribute('type', 'text')
        shown = !shown;
    } else {
        button.textContent = 'Show Password';
        password_field.setAttribute('type', 'password')
        shown = !shown;
    }
}

window.showhide = showhide;
window.incorrectAlert = InitAlert('Login Failed', 'Please check your Username or Password.');

document.querySelector('.button-login').addEventListener('click', () => {

    return incorrectAlert.Show();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('https://proton.varchardev.repl.co/login')
        .then(res => res.json()).then(data => {
            if (data.success) {
                localStorage.setItem('loginfo', JSON.stringify({
                    username: username,
                    password: password,
                    id: data.id
                }));
            } else {
                incorrectAlert.Show();
            }
        });
});

window.InitAlert = InitAlert;
