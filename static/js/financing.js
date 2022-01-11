let info = {}

document.addEventListener('DOMContentLoaded', function() {
    let vin = window.location.href.split('?')[1];
    if (vin) {
        info.stock = vin;
    }
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});

for (let i of document.getElementById('model-buttons').children) {
    i.addEventListener('click', () => stepOne(i.innerText));
}

let pages = [
    document.getElementById('page-1'),
    document.getElementById('page-2'),
    document.getElementById('page-3'),
    document.getElementById('page-4'),
    document.getElementById('page-5'),
    document.getElementById('thankyou')
]

let inputs = {
    firstName: document.getElementById('first_name'),
    lastName: document.getElementById('last_name'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email'),
    address: document.getElementById('address'),
    address2: document.getElementById('address_line_2'),
    zipCode: document.getElementById('zip_code'),
    city: document.getElementById('city'),
    state: document.getElementById('state'),
    living: document.getElementById('more_than_2_years'),
    employment: document.getElementById('employment-status'),
    employer: document.getElementById('employer'),
    title: document.getElementById('title'),
    timeOnJob: document.getElementById('time_on_job'),
    income: document.getElementById('income'),
    dob: document.getElementById('dob'),
    social: document.getElementById('social')
}

function stepOne(model) {
    info.model = model;
    pages[0].style.opacity = 0;
    setTimeout(() => {
        pages[0].style.display = 'none';
        pages[1].style.display = 'block';
        pages[1].style.opacity = 1;
    }, 300);
}

document.getElementById('step-2').addEventListener('click', (evt) => {
    evt.preventDefault();
    info.firstName = inputs.firstName.value;
    info.lastName = inputs.lastName.value;
    info.phone = inputs.phone.value;
    info.email = inputs.email.value;
    info.address = inputs.address.value;
    info.address2 = inputs.address2.value;
    info.zipCode = inputs.zipCode.value;
    info.city = inputs.city.value;
    info.state = inputs.state.value;
    info.living = inputs.living.checked;
    pages[1].style.opacity = 0;
    setTimeout(() => {
        pages[1].style.display = 'none';
        pages[2].style.display = 'block';
        pages[2].style.opacity = 1;
    }, 300);
    return false;
});

document.getElementById('step-3').addEventListener('click', (evt) => {
    evt.preventDefault();
    info.employment = inputs.employment.value;
    pages[2].style.opacity = 0;
    setTimeout(() => {
        pages[2].style.display = 'none';
        if (info.employment === 'fulltime' || info.employment === 'parttime') {
            pages[3].style.display = 'block';
            pages[3].style.opacity = 1;
        } else {
            pages[4].style.display = 'block';
            pages[4].style.opacity = 1;
        }
    }, 300);
    return false;
});

document.getElementById('step-4').addEventListener('click', (evt) => {
    evt.preventDefault();
    info.employer = inputs.employer.value;
    info.title = inputs.title.value;
    info.timeOnJob = inputs.timeOnJob.value;
    info.income = inputs.income.value;
    pages[3].style.opacity = 0;
    setTimeout(() => {
        pages[3].style.display = 'none';
        pages[4].style.display = 'block';
        pages[4].style.opacity = 1;
    }, 300);
    return false;
});

document.getElementById('submit').addEventListener('click', (evt) => {
    evt.preventDefault();
    info.dob = inputs.dob.value;
    info.social = inputs.social.value;
    grecaptcha.ready(() => {
        grecaptcha.execute('6LfY7gMeAAAAABz4wMoW0im7TXwUpm2b-0vj8gOL', { action: 'submit' }).then((token) => {
            console.log(token);
            fetch('/api/captcha/', {
                    method: 'POST',
                    body: JSON.stringify({ token: token }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(data => data.json())
                .then(json => {
                    if (json.valid === true) {
                        fetch('/api/financing', {
                            method: 'POST',
                            body: JSON.stringify(info),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        pages[4].style.opacity = 0;
                        setTimeout(() => {
                            pages[4].style.display = 'none';
                            pages[5].style.display = 'block';
                            pages[5].style.opacity = 1;
                        }, 300);
                    } else {
                        M.toast({ html: 'Invalid captcha' });
                    }
                });
        });
    });
    return false;
});