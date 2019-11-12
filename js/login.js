auth.onAuthStateChanged(user => {
    database.ref('users').child(user.uid)
        .on('value', snap => window.objOfUserData = snap.val());
    document.location.replace("user.html");
    console.log('User logged in')

});

async function logIn(form) {
    event.preventDefault();
    try {
        await auth.signInWithEmailAndPassword(form[0].value, form[1].value);
    } catch {
        whenFormIsWrongMsg('show')
    };

    form.oninput = function () {
        whenFormIsWrongMsg('hide')
    };
};

async function signUp(form) {
    event.preventDefault();
    try {
        await auth.createUserWithEmailAndPassword(form[0].value, form[1].value);
    } catch {
        whenFormIsWrongMsg('show')
    };
    await auth.onAuthStateChanged(user => {
        const date = new Date();
        firebase.database().ref('users/' + user.uid).set({
            firstName: user.email.slice(0, user.email.indexOf('@')),
            avatarUrl: "empty",
            subscribed: [{
                "categorie": "Wine Storage ",
                "url": "blog.html?Wine Storage"
            }],
            registered: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            },
            story: ["empty"],
            wishList: ["empty"],
            orders: ["empty"]
        })
    })
    form.oninput = function () {
        whenFormIsWrongMsg('hide')
    };
};


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
    if (value.classList.contains("fa-eye-slash")) {
        value.classList.remove("fa-eye-slash");
        value.classList.add("fa-eye");
        value.parentElement.firstElementChild.type = "text";
    } else {
        value.classList.remove("fa-eye");
        value.classList.add("fa-eye-slash");
        value.parentElement.firstElementChild.type = "password";
    }

}

function changeForm(event, formHideFirst, formHideSecond, formTarget) {
    event.preventDefault();
    document.querySelector('.' + formHideFirst + '').style.display = 'none'
    document.querySelector('.' + formHideSecond + '').style.display = 'none'
    document.querySelector('.' + formTarget + '').style.display = 'flex'
}

function changeBreadcrumbs(value) {
    document.querySelector('.breadcrumb').innerHTML = '';
    breadcrumbs = [{
        name: value,
        link: "login.html"
    }]
    addPointToBreadcrumbMap(breadcrumbs)
}
changeBreadcrumbs('Log in');