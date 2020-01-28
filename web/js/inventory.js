const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let makeCard = (c) => {
    /*
    <div class="col s12 m6 l4">
        <div class="card">
            <div class="card-image">
                <img src="https://via.placeholder.com/250">
            </div>
            <div class="card-content">
                <span class="card-title">Card Title</span>
                <p>short</p>
            </div>
            <div class="card-action">
                <a href="#">This is a link</a>
            </div>
        </div>
    </div>
    */

    let imgSrc = 'https://via.placeholder.com/250';
    let titleText = c.make + ' ' + c.model;
    let subtitleText = c.year + ' <b>$' + numberWithCommas(c.price/100)+'</b>';

    // DOM creation
    let col = document.createElement('div');
    col.classList.add('col');
    col.classList.add('s12');
    col.classList.add('m6');
    col.classList.add('l4');
    
    let card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click',  () => {
        window.location.href = '/car/'+c.id;
    });
    card.style.cursor = 'pointer';
    col.appendChild(card);


    let imgContainer = document.createElement('div');
    imgContainer.classList.add('card-image');
    card.appendChild(imgContainer);
    
    let img = document.createElement('img');
    img.src = imgSrc;
    imgContainer.appendChild(img);


    let content = document.createElement('div');
    content.classList.add('card-content');
    card.appendChild(content);
    
    let title = document.createElement('span');
    title.classList.add('card-title');
    title.innerHTML = titleText;
    content.appendChild(title);

    let subtitle = document.createElement('div');
    subtitle.classList.add('card-subtitle');
    subtitle.innerHTML = subtitleText;
    content.appendChild(subtitle);

    let divider = document.createElement('div');
    divider.classList.add('divider');
    divider.style.margin = '.6rem 0';
    content.appendChild(divider);

    let carInfo = document.createElement('p');
    carInfo.innerHTML = c.engine + '<br>' + c.transmission + ' ' + c.drive + '<br>' + c.color + ' ' + c.body;
    content.appendChild(carInfo);

    return col;
}

let makeInventory = () => {
    fetch('/api/car/')
    .then(res => res.json())
    .then(c => {
        let inventory = document.getElementById('inventory');
        for (car of c) {
            inventory.appendChild(makeCard(car));
        };
    });
}

makeInventory();