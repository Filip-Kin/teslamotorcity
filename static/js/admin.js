let loginFormSubmit = () => {
    document.forms.loginForm.login.blur();
    document.forms.loginForm.password.blur();
    console.log('/api/user/'+document.forms.loginForm.login.value);
    fetch('/api/user/'+document.forms.loginForm.login.value)
    .then(res => res.json())
    .then(res => {
        if (res.message === true) {
            localStorage.setItem('id', res.id);
            localStorage.setItem('username', document.forms.loginForm.login.value);
            fetch('/api/auth/'+res.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{
                    "password": "${document.forms.loginForm.password.value}"
                }`})
            .then(res => res.json())
            .then(res => {
                if (res.auth) {
                    document.forms.loginForm.login.classList.remove('invalid');
                    document.forms.loginForm.password.classList.remove('invalid');
                    document.forms.loginForm.login.classList.add('valid');
                    document.forms.loginForm.password.classList.add('valid');
                    localStorage.setItem('password', document.forms.loginForm.password.value);
                    localStorage.setItem('permissions', res.permissions);
                    document.getElementById('login').style.display = 'none';
                    document.getElementById('admin-page').style.display = '';
                    generateCarList();
                } else {
                    if (localStorage.password == undefined) {
                        document.forms.loginForm.login.classList.add('invalid');
                        document.forms.loginForm.password.classList.add('invalid');
                        M.toast({html: 'Incorrect username or password'})
                    } else {
                        localStorage.remove('password')
                        document.getElementById('login').style.display = '';
                    }
                }
            });
        } else {
            document.forms.loginForm.login.classList.add('invalid');
            document.forms.loginForm.password.classList.add('invalid');
            document.getElementById('login').style.display = '';
            M.toast({html: 'Incorrect username or password'})
        }
    });
};

if (localStorage.username != undefined) {
    document.forms.loginForm.login.value = localStorage.username;
    if (localStorage.password != undefined) {
        document.forms.loginForm.password.value = localStorage.password;
        loginFormSubmit();
    } else {
        document.getElementById('login').style.display = '';
    }
} else {
    document.getElementById('login').style.display = '';
}

let logout = () => {
    localStorage.removeItem('password');
    localStorage.removeItem('permissions');
    window.location.replace('/index.html');
}

let generateCarList = () => {
    fetch('/api/car').then(res => res.json()).then(cars => {
        let out = '';
        console.log(cars);
        for (car of cars) {
            out += `<tr><td><div><img src="/img/${JSON.parse(car.images)[0]}" style="width: 15vw; height: auto"></div></td>`;
            out += `<td>${car.make} ${car.model}</td>`;
            out += `<td>${car.year}</td>`;
            out += `<td>${car.price}</td>`;
            out += `<td><a href="add/${car.id}" class="btn amber darken-3">Edit</a></td></tr>`;
        }
        document.getElementById('car-list').innerHTML += out;
    });
}