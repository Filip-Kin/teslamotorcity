let loginFormSubmit = () => {
    console.log(document.forms.loginForm.login.value);
    console.log(document.forms.loginForm.password.value);
    fetch({
        url: '/api/login', 
        body: {
            login: document.forms.loginForm.login.value, 
            password: document.forms.loginForm.password.value
        },
    method: 'POST'})
    .then(res => res.json())
    .then(res => {
        if (res.status === 200) {
            console.log('logged in');
        } else {
            // bad
        }
    });
};