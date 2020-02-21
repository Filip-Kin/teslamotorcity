window.addEventListener('load', () => {
    if (user.id !== '') {
        for (let field in user) {
            console.log(field);
            if (document.forms[0][field].length == undefined) {
                document.forms[0][field].value = user[field];
            } else {
                if (field === 'permissions') {
                    switch (user[field]) {
                        case 0: document.forms[0][field][2].checked = true;
                        case 1: document.forms[0][field][1].checked = true;
                        case 2: document.forms[0][field][0].checked = true;
                    }
                }
            }
        }
    } else {
        document.forms[0].password.value = '';
    }
    M.updateTextFields();
});

let getRadioValue = (radios) => {
    for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
      }
}

let addUserFormSubmit = () => {
    let newuser = {
        id: user.id,
        username: document.forms[0].username.value,
        password: document.forms[0].password.value,
        permissions: parseInt(getRadioValue(document.forms[0].permissions))
    }

    if (newuser.password === "Don't change the password") newuser.password = '';
    console.log(newuser);

    fetch('/api/user/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            id: localStorage.id, 
            password: localStorage.password
        },
        body: JSON.stringify(newuser)
    }).then((res) => {
        if (res.status !== 200) {
            res.json().then((res) => {
                console.error(res);
                M.toast({html: 'Something went wrong<br>'+res.message});
            })
        } else {
            window.location.replace('/users.html');
        }
    });
}
