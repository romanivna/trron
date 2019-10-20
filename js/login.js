let useresArrObj;
(function () {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            useresArrObj = JSON.parse(xhr.response);
            changeBreadcrumbs('Log in');
            //goToUserPage()
        }
    };
    xhr.open("GET", "../jsons/users.json", true);
    xhr.send();
})();

function changeBreadcrumbs(value) {
    document.querySelector('.breadcrumb').innerHTML = '';
    breadcrumbs = [{
        name: value,
        link: "login.html"
    }]
    addPointToBreadcrumbMap(breadcrumbs)
}

function goToUserPage() {
    const user = localStorage.getItem('user')
    if (user === null || user === '') {
        return
    }
    document.location.replace("user.html?" + user);
}

function logIn(form) {
    event.preventDefault();

    function checkUserName(data) {
        return data.name === form[0].value
    }

    function checkUserPassword(data) {
        return data.password === form[1].value
    }
    form.oninput = function () {
        whenFormIsWrongMsg('hide')
    }

    if (useresArrObj.some(checkUserName)) {
        form[0].style.borderColor = '#fca53c';
        if (useresArrObj.some(checkUserPassword)) {
            form[1].style.borderColor = '#fca53c';
            localStorage.setItem('user', form[0].value)
            document.location.replace("/");

        } else {
            whenFormIsWrongMsg('show')
        }
    } else {
        whenFormIsWrongMsg('show')
    }
}

function whenFormIsWrongMsg(value) {
    const formMsg = document.querySelector('.form-group-msg');
    if (value === 'show') {
        formMsg.parentElement.parentElement.classList.remove('form-group--invisible');
        formMsg.parentElement.classList.remove('form-group--invisible');
        formMsg.classList.remove('form-group--invisible');
    }
    if (value === 'hide') {
        formMsg.parentElement.parentElement.classList.add('form-group--invisible');
        formMsg.parentElement.classList.add('form-group--invisible');
        formMsg.classList.add('form-group--invisible');
    }
}

function showPass(value) {
    const passwordInput = document.getElementById("pass");
    if (value.classList.contains("fa-eye-slash")) {
        value.classList.remove("fa-eye-slash");
        value.classList.add("fa-eye");
        passwordInput.type = "text";
    } else {
        value.classList.remove("fa-eye");
        value.classList.add("fa-eye-slash");
        passwordInput.type = "password";
    }

}


function changeForm(event, formHideFirst, formHideSecond, formTarget) {
    event.preventDefault();
    document.querySelector('.' + formHideFirst + '').style.display = 'none'
    document.querySelector('.' + formHideSecond + '').style.display = 'none'
    document.querySelector('.' + formTarget + '').style.display = 'flex'
    console.log(event)
}