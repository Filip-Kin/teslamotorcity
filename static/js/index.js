document.addEventListener('DOMContentLoaded', function() {
    var instances = M.Parallax.init(document.querySelectorAll('.parallax'), {});
});

let nav_opaque = false;
document.addEventListener('scroll', () => {
    if ((
            (window.innerWidth > 992 && window.scrollY > 600) ||
            (window.innerWidth < 992 && window.scrollY > 250)) &&
        !nav_opaque) {
        document.querySelector('nav').classList.remove('clear')
        document.querySelector('.menu-button').style.color = '#fff';
        document.querySelector('.brand-logo').style.color = '#fff';
        document.querySelector('.phone-button').style.color = '#fff';
        nav_opaque = true;
    } else if ((
            (window.innerWidth > 992 && window.scrollY < 600) ||
            (window.innerWidth < 992 && window.scrollY < 250)) &&
        nav_opaque) {
        document.querySelector('nav').classList.add('clear');
        document.querySelector('.menu-button').style.color = '#000';
        document.querySelector('.brand-logo').style.color = '#000';
        document.querySelector('.phone-button').style.color = '#000';
        nav_opaque = false;
    }
});

if (
    (window.innerWidth > 992 && window.scrollY > 600) ||
    (window.innerWidth < 992 && window.scrollY > 250)) {
    document.querySelector('nav').classList.remove('clear');
    document.querySelector('.menu-button').style.color = '#fff';
    document.querySelector('.brand-logo').style.color = '#fff';
    document.querySelector('.phone-button').style.color = '#fff';
    nav_opaque = true;
}