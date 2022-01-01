const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let makeCard = (c) => {
    if (typeof c.images !== 'object') c.images = JSON.parse(c.images);

    let imgSrc = '/img/' + c.images[0];
    let titleText = c.make + ' ' + c.model + ' <span class="year">' + c.year + '</span>';
    let subtitleText = '$' + numberWithCommas(c.price);

    // DOM creation
    let col = document.createElement('div');
    col.classList.add('col');
    col.classList.add('s12');
    col.classList.add('m6');
    col.classList.add('l4');

    let card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click', () => {
        window.location.href = '/car/' + c.id;
    });
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

function filterPips(value, type) {
    if (type === 0) {
        return value < 2000 ? -1 : 0;
    }
    return value % 1000 ? 2 : 1;
}


const priceSlider = noUiSlider.create(document.getElementById('price-slider'), {
    start: [0, 100000],
    connect: true,
    step: 500,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
        'min': 0,
        'max': 100000
    },
    format: wNumb({
        decimals: 0,
        prefix: '$'
    }),
    tooltips: true
});

const yearSlider = noUiSlider.create(document.getElementById('year-slider'), {
    start: [2012, 2022],
    connect: true,
    step: 1,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
        'min': 2012,
        'max': 2022
    },
    format: wNumb({
        decimals: 0
    }),
    tooltips: true
});

const mileSlider = noUiSlider.create(document.getElementById('mile-slider'), {
    start: [0, 200000],
    connect: true,
    step: 10000,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
        'min': 0,
        'max': 200000
    },
    format: wNumb({
        decimals: 0
    }),
    tooltips: true
});

let translateFilterBar = false
document.addEventListener('scroll', () => {
    let breakpoint = document.querySelector('main').clientHeight - window.innerHeight + 84;
    if (window.scrollY < breakpoint) {
        if (!translateFilterBar) document.getElementById('filter-bar').style.transform = `translateY(0)`;
        translateFilterBar = false;
    } else {
        document.getElementById('filter-bar').style.transform = `translateY(${(window.scrollY-breakpoint)*-1}px)`;
        translateFilterBar = true;
    }
});
