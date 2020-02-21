window.addEventListener('load', () => {
    let toast = M.toast({html: 'Loading...'});
    if (car.id !== "${id}") {
        for (let field in car) {
            console.log(field);
            if (document.forms[0][field].length == undefined) {
                document.forms[0][field].value = car[field];
            } else {
                if (field === 'drive') {
                    switch (car[field]) {
                        case 'Front wheel drive': document.forms[0][field][2].checked = true;
                        case 'Rear wheel drive': document.forms[0][field][1].checked = true;
                        case 'All wheel drive': document.forms[0][field][0].checked = true;
                    }
                } else if (field === 'transmission') {
                    switch (car[field]) {
                        case 'Automatic': document.forms[0][field][1].checked = true;
                        case 'Manual': document.forms[0][field][0].checked = true;
                    }
                } else if (field === 'fuel') {
                    switch (car[field]) {
                        case 'Gas': document.forms[0][field][2].checked = true;
                        case 'Hybrid': document.forms[0][field][1].checked = true;
                        case 'Electric': document.forms[0][field][0].checked = true;
                    }
                }
            }
        }
        M.updateTextFields();
        renderImages(toast);
    }
});

let renderImages = (toast=null) => {
    let tbody = document.getElementById('images');
    let out = '';
    let i = 0;
    for (let img of images) {
        console.log(img);
        out += `<tr><td width="50%"><img style="responsive-img" width="100%" src="/img/${img}"></td>`;
        out += `<td><div class="row center"><a class="btn amber darken-2" href="#" onclick="removeImg(${i})">Remove</a></div>`;
        out += `<div class="row center"><a class="btn amber darken-2${(i<1)?' disabled':''}" onclick="imgUp(${i})"><i class="material-icons">arrow_upward</i></a>`;
        out += `<a class="btn amber darken-2${(i>=images.length-1)?' disabled':''}" onclick="imgDown(${i})"><i class="material-icons">arrow_downward</i></a></div></td>`;
        i++;
    }
    tbody.innerHTML = out;
    if (toast!==null) toast.dismiss();
}

let removeImg = (i) => {
    fetch('/api/image/'+images[i]+'/remove', {method: 'POST', headers: {id: localStorage.id, password: localStorage.password}}).then(res => res.json()).then(res => {
        if (res.status !== 200) {
            M.toast({html: "Image deletion failed<br>"+res.message});
        } else {
            let newArr = [];
            for (let j = 0; j < i; j++) {
                newArr.push(images[j]);
            }
            for (let k = i+1; k < images.length; k++) {
                newArr.push(images[k]);
            }
            images = newArr;
            renderImages();
        }
    });
}

let imgUp = (i) => {
    let newArr = [];
    for (let j = 0; j+1 < i; j++) {
        newArr.push(images[j]);
    }
    newArr.push(images[i]);
    newArr.push(images[i-1]);
    for (let k = i+1; k < images.length; k++) {
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
    newArr.push(images[i+1]);
    newArr.push(images[i]);
    for (let k = i+2; k < images.length; k++) {
        newArr.push(images[k]);
    }
    images = newArr;
    renderImages();
}

let getRadioValue = (radios) => {
    for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
                break;
            }
      }
}

let addFormSubmit = () => {
    let toast = M.toast({html: 'Saving...'});
    let newcar = {
        id: car.id,
        make: document.forms[0].make.value,
        model: document.forms[0].model.value,
        year: document.forms[0].year.value,
        vin: document.forms[0].vin.value,
        price: document.forms[0].price.value,
        description: document.forms[0].description.value,
        body: document.forms[0].body.value,
        color: document.forms[0].color.value,
        engine: document.forms[0].engine.value,
        drive: getRadioValue(document.forms[0].drive),
        cylinders: document.forms[0].cylinders.value,
        transmission: getRadioValue(document.forms[0].transmission),
        fuel: getRadioValue(document.forms[0].fuel),
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
                M.toast({html: 'Something went wrong<br>'+res.message});
            })
        } else {
            window.location.replace('/admin.html');
        }
    });
}

let uploadImages = () => {
    let toast = M.toast({html: 'Uploading, please wait'});
    let files = document.forms[0].imageUpload.files;
    console.log(files);
    let promises = [];
    for (let img of files) {
        promises.push(new Promise((resolve, reject) => {
            fetch('/api/image/add', {
                method: 'POST',
                headers: {id: localStorage.id, password: localStorage.password},
                body: img
            }).then(res => res.json()).then(res => resolve(res));
        }))
    }
    Promise.all(promises).then((files) => {
        for (let img of files) {
            if (img.status !== 200) {
                M.toast({html: 'Failed upload image<br>'+img.message});
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
    fetch('/api/car/'+car.id+'/remove', {
        method: 'POST',
        headers: {id: localStorage.id, password: localStorage.password}
    }).then(res => res.json()).then(res => {
        if (res.status !== 200) {
            M.toast({html: 'Something went wrong<br>'+res.message});
        } else {
            window.location.replace('/admin.html');
        }
    });
}
