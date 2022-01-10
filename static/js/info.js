let inputs = {
    vin: document.getElementById('vin'),
    firstName: document.getElementById('first_name'),
    lastName: document.getElementById('last_name'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email'),
    comment: document.getElementById('comment')
}

document.addEventListener('DOMContentLoaded', function() {
    let vin = window.location.href.split('?')[1];
    if (vin) {
        inputs.vin.value = vin;
        M.updateTextFields();
    }    
});

document.forms[0].addEventListener('submit', (evt) => {
    evt.preventDefault();
    document.forms[0].style.filter = 'blur(3px)';
    document.getElementById('loader').style.display = 'block';

    fetch('/api/eprice', {
        method: 'POST',
        body: JSON.stringify({
            vin: inputs.vin.value,
            firstName: inputs.firstName.value,
            lastName: inputs.lastName.value,
            phone: inputs.phone.value,
            email: inputs.email.value,
            comment: inputs.comment.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        document.forms[0].style.display = 'none';
        document.getElementById('loader').style.display = 'none';
        document.getElementById('thankyou').style.display = 'block';
    });

    return false;
});
