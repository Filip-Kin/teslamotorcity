window.addEventListener('load', () => {
    if (localStorage.permissions < 1) {
        document.querySelectorAll('.editPerms').forEach(elm => {
            elm.classList.add('disabled');
            if (elm.nodeName === 'INPUT') elm.setAttribute('disabled', 'true')
        });
    }

    if (car.id !== "") {
        for (let field in car) {
            console.log(field);
            document.forms[0][field].value = car[field];
        }
    } else {
        document.getElementById('removeBtn').style.display = 'none';
    }

    M.updateTextFields();
    M.FormSelect.init(document.querySelectorAll('select'), {});
    renderImages();
});

let renderImages = (toast = null) => {
    let tbody = document.getElementById('images');
    let out = '';
    let i = 0;
    let disabled = (localStorage.permissions < 1) ? 'disabled ' : '';
    for (let img of images) {
        out += `<tr><td width="50%"><img style="responsive-img" width="100%" src="/img/${img}"></td>`;
        out += `<td><div class="row center"><a class="${disabled}btn red darken-2" href="#" onclick="removeImg(${i})">Remove</a></div>`;
        out += `<div class="row center"><a class="btn red darken-2${(i<1)?' disabled':''}" onclick="imgUp(${i})"><i class="material-icons">arrow_upward</i></a>`;
        out += `<a class="btn red darken-2${(i>=images.length-1)?' disabled':''}" onclick="imgDown(${i})"><i class="material-icons">arrow_downward</i></a></div></td>`;
        i++;
    }
    tbody.innerHTML = out;
    if (toast !== null) toast.dismiss();
}

let removeImg = (i) => {
    fetch('/api/image/' + images[i] + '/remove', { method: 'POST', headers: { id: localStorage.id, password: localStorage.password } }).then(res => res.json()).then(res => {
        if (res.status !== 200) {
            M.toast({ html: "Image deletion failed<br>" + res.message });
        } else {
            let newArr = [];
            for (let j = 0; j < i; j++) {
                newArr.push(images[j]);
            }
            for (let k = i + 1; k < images.length; k++) {
                newArr.push(images[k]);
            }
            images = newArr;
            renderImages();
        }
    });
}

let imgUp = (i) => {
    let newArr = [];
    for (let j = 0; j + 1 < i; j++) {
        newArr.push(images[j]);
    }
    newArr.push(images[i]);
    newArr.push(images[i - 1]);
    for (let k = i + 1; k < images.length; k++) {
        newArr.push(images[k]);
    }
    images = newArr;
    renderImages();
}

let imgDown = (i) => {
    let newArr = [];
    for (let j = 0; j < i; j++) {
        newArr.push(images[j]);
    }
    newArr.push(images[i + 1]);
    newArr.push(images[i]);
    for (let k = i + 2; k < images.length; k++) {
        newArr.push(images[k]);
    }
    images = newArr;
    renderImages();
}

let addFormSubmit = () => {
    let toast = M.toast({ html: 'Saving...' });
    let newcar = {
        id: car.id,
        stock: car.stock,
        model: document.forms[0].model.value,
        year: document.forms[0].year.value,
        miles: document.forms[0].miles.value,
        vin: document.forms[0].vin.value,
        price: document.forms[0].price.value,
        description: document.forms[0].description.value,
        color: document.forms[0].color.value,
        engine: document.forms[0].engine.value,
        drive: document.forms[0].drive.value,
        assist: document.forms[0].cylinders.assist,
        images: images
    }
    console.log(newcar);

    fetch('/api/car/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            id: localStorage.id,
            password: localStorage.password
        },
        body: JSON.stringify(newcar)
    }).then((res) => {
        if (res.status !== 200) {
            res.json().then((res) => {
                console.error(res);
                toast.dismiss();
                M.toast({ html: 'Something went wrong<br>' + res.message });
            })
        } else {
            window.location.replace('/admin.html');
        }
    });
}

let uploadImages = () => {
    let toast = M.toast({ html: 'Uploading, please wait' });
    let files = document.forms[0].imageUpload.files;
    console.log(files);
    let promises = [];
    for (let img of files) {
        promises.push(new Promise((resolve, reject) => {
            fetch('/api/image/add', {
                method: 'POST',
                headers: { id: localStorage.id, password: localStorage.password },
                body: img
            }).then(res => res.json()).then(res => resolve(res));
        }))
    }
    Promise.all(promises).then((files) => {
        for (let img of files) {
            if (img.status !== 200) {
                M.toast({ html: 'Failed upload image<br>' + img.message });
            } else {
                images.push(img.message);
            }
        }
        renderImages(toast);
        document.forms[0].imageUpload.value = '';
    });
}

document.forms[0].imageUpload.addEventListener('change', uploadImages, false);
M.Modal.init(document.querySelectorAll('.modal'), {});

let removeCar = () => {
    fetch('/api/car/' + car.id + '/remove', {
        method: 'POST',
        headers: { id: localStorage.id, password: localStorage.password }
    }).then(res => res.json()).then(res => {
        if (res.status !== 200) {
            M.toast({ html: 'Something went wrong<br>' + res.message });
        } else {
            window.location.replace('/admin.html');
        }
    });
}