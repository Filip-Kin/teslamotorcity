const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let makeCard = (c) => {
    if (typeof c.images !== 'object') c.images = JSON.parse(c.images);

    let imgSrc = '/img/' + c.images[0];
    let titleText = `Model ${c.model} <span class="year">${c.year}</span>`;
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

let cars = [];
let filter = {
    price: {min: 0, max: 1000},
    year: {min: 3000, max: 0},
    mileage: {min:0, max: 200000},
    model: [],
    color: [],
    driverAssist: []
};

let resetFilter = true;

let makeInventory = () => {
    return fetch('/api/car/')
        .then(res => res.json())
        .then(c => {
            cars = c;
            let inventory = document.getElementById('inventory');
            inventory.innerHTML = '';
            for (car of cars) {
                if (resetFilter) {
                    if (car.price > filter.price.max) filter.price.max = car.price;
                    if (car.year < filter.year.min) filter.year.min = parseInt(car.year);
                    if (car.year > filter.year.max) filter.year.max = parseInt(car.year);
                    if (car.mileage > filter.mileage.max) filter.mileage.max = car.mileage;
                }
                car.elm = makeCard(car);
                inventory.appendChild(car.elm);
            };
            resetFilter = false;
        });
}

function filterElms() {
    for (let car of cars) {
        if (
            car.price > filter.price.max || 
            car.price < filter.price.min ||
            car.year > filter.year.max ||
            car.year < filter.year.min ||
            /*car.mileage > filter.mileage.max ||
            car.mileage < filter.mileage.min ||*/
            !filter.model.includes(car.model) ||
            !filter.color.includes(car.color) //||
            //!filter.driverAssist.includes(car.driverAssist)
            ) {
                car.elm.style.display = 'none';
            } else {
                car.elm.style.display = 'block';
            }
    }
}

function updateFilter(update = true) {
    filter = {
        price: {min: 0, max: 1000},
        year: {min: 3000, max: 0},
        mileage: {min:0, max: 200000},
        model: [],
        color: [],
        driverAssist: []
    };
    filter.price.min = parseInt(inputs.priceSlider.get()[0].replace('$', ''));
    filter.price.max = parseInt(inputs.priceSlider.get()[1].replace('$', ''));
    filter.year.min = parseInt(inputs.yearSlider.get()[0]);
    filter.year.max = parseInt(inputs.yearSlider.get()[1]);
    filter.mileage.min = parseInt(inputs.mileSlider.get()[0]);
    filter.mileage.max = parseInt(inputs.mileSlider.get()[1]);
    for (let i in inputs.model) {
        if (inputs.model[i].checked) filter.model.push(i);
    }
    for (let i in inputs.color) {
        if (inputs.color[i].checked) filter.color.push(i);
    }
    for (let i in inputs.assist) {
        if (inputs.assist[i].checked) filter.assist.push(i);
    }
    if (update) filterElms();
}

const inputs = {
    priceSlider: undefined,
    yearSlider: undefined,
    mileSlider: undefined,
    model: {
        'S': document.getElementById('model-s'),
        'S Plaid': document.getElementById('model-s-plaid'),
        '3': document.getElementById('model-3'),
        '3 Long Range': document.getElementById('model-3-longrange'),
        '3 Performance': document.getElementById('model-3-performance'),
        'X': document.getElementById('model-x'),
        'X Plaid': document.getElementById('model-x-plaid'),
        'Y Long Range': document.getElementById('model-y-longrange'),
        'Y Performance': document.getElementById('model-y-performance')
    },
    color: {
        'Pearl White': document.getElementById('color-white'),
        'Solid Black': document.getElementById('color-black'),
        'Midnight Silver': document.getElementById('color-silver'),
        'Deep Blue': document.getElementById('color-blue'),
        'Red': document.getElementById('color-red'),
    },
    driverAssist: {
        'Autopilot': document.getElementById('assist-autopilot'),
        'Full Self Driving': document.getElementById('assist-fsd')
    }
}

async function magic() {
    await makeInventory();

    inputs.priceSlider = noUiSlider.create(document.getElementById('price-slider'), {
        start: [filter.price.min, filter.price.max],
        connect: true,
        step: 500,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: filter.price,
        format: wNumb({
            decimals: 0,
            prefix: '$'
        }),
        tooltips: true
    });
    
    inputs.yearSlider = noUiSlider.create(document.getElementById('year-slider'), {
        start: [filter.year.min, filter.year.max],
        connect: true,
        step: 1,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: filter.year,
        format: wNumb({
            decimals: 0
        }),
        tooltips: true
    });
    
    inputs.mileSlider = noUiSlider.create(document.getElementById('mile-slider'), {
        start: [filter.mileage.min, filter.mileage.max],
        connect: true,
        step: 10000,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: filter.mileage,
        format: wNumb({
            decimals: 0
        }),
        tooltips: true
    });
    
    let translateFilterBar = false
    document.addEventListener('scroll', () => {
        let breakpoint = document.querySelector('main').clientHeight - window.innerHeight + 64;
        if (window.scrollY < breakpoint) {
            if (!translateFilterBar) document.getElementById('filter-bar').style.transform = `translateY(0)`;
            translateFilterBar = false;
        } else {
            document.getElementById('filter-bar').style.transform = `translateY(${(window.scrollY-breakpoint)*-1}px)`;
            translateFilterBar = true;
        }
    });

    updateFilter();
    inputs.priceSlider.on('update', updateFilter);
    inputs.yearSlider.on('update', updateFilter);
    inputs.mileSlider.on('update', updateFilter);
    for (let i in inputs.model) inputs.model[i].addEventListener('change', updateFilter);
    for (let i in inputs.color) inputs.color[i].addEventListener('change', updateFilter);
    for (let i in inputs.assist) inputs.assist[i].addEventListener('change', updateFilter);
}

magic();
