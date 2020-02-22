window.addEventListener('load', () => {
    if (localStorage.permissions < 2 || (user.permissions > 2 && localStorage.permissions < 3)) {
        document.querySelectorAll('.editPerms').forEach(elm => {
            elm.classList.add('disabled');
            if (elm.nodeName === 'INPUT') elm.setAttribute('disabled', 'true')
        });
    }

    if (user.id !== '') {
        for (let field in user) {
            console.log(field);
            if (document.forms[0][field].length == undefined) {
                document.forms[0][field].value = user[field];
            } else {
                if (field === 'permissions') {
                    document.forms[0][field].value = user.permissions
                }
            }
        }
    } else {
        document.forms[0].password.value = '';
        document.getElementById('removeBtn').style.display = 'none';
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

M.Modal.init(document.querySelectorAll('.modal'), {});

let removeUser = () => {
    fetch('/api/user/'+user.id+'/remove', {
        method: 'POST',
        headers: {id: localStorage.id, password: localStorage.password}
    }).then(res => res.json()).then(res => {
        if (res.status !== 200) {
            M.toast({html: 'Something went wrong<br>'+res.message});
        } else {
            window.location.replace('/users.html');
        }
    });
}
