document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});

let inputs = {
    model: document.getElementById('model'),
    firstName: document.getElementById('first_name'),
    lastName: document.getElementById('last_name'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email')
}

document.forms[0].addEventListener('submit', (evt) => {
    evt.preventDefault();
    document.getElementById('main-container').style.filter = 'blur(3px)';
    document.getElementById('loader').style.display = 'block';

    if (model.value === 'Select model') {
        M.toast({html: 'Select a model'});
        return false;
    }

    fetch('/api/special', {
        method: 'POST',
        body: JSON.stringify({
            model: inputs.model.value,
            firstName: inputs.firstName.value,
            lastName: inputs.lastName.value,
            phone: inputs.phone.value,
            email: inputs.email.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        document.getElementById('main-container').style.display = 'none';
        document.getElementById('loader').style.display = 'none';
        document.getElementById('thankyou').style.display = 'block';
    });

    return false;
});