var registerClick = document.getElementsByClassName('register-click'),
    register = document.getElementsByClassName('register')[0],
    loginClick = document.getElementsByClassName('login-click'),
    login = document.getElementsByClassName('login')[0];

function registerClickEvent() {
    for (var i = 0; i < registerClick.length; i++) {
        registerClick[i].onclick = function() {
            register.style.display = "block";
        }
    }

}

function loginClickEvent() {
    for (var i = 0; i < loginClick.length; i++) {
        loginClick[i].onclick = function() {
            login.style.display = "block";
        }
    }
}

function delRegister() {
    var del = document.getElementsByClassName('del');
    for (var i = 0; i < del.length; i++) {
        del[i].onclick = function() {
            register.style.display = "none";
            login.style.display = "none";
        }
    }
}
registerClickEvent();
loginClickEvent();
delRegister();