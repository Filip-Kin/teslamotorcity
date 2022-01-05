document.addEventListener('DOMContentLoaded', function() {
    var instances = M.Parallax.init(document.querySelectorAll('.parallax'), {});
});

let nav_opaque = false;
document.addEventListener('scroll', () => {
    if ((
        (window.innerWidth > 996 && window.scrollY > 600) ||
        (window.innerWidth < 996 && window.scrollY > 250))
         && !nav_opaque) {
        document.querySelector('nav').classList.remove('clear')
        nav_opaque = true;
    }
    else if ((
        (window.innerWidth > 996 && window.scrollY < 600) || 
        (window.innerWidth < 996 && window.scrollY < 250)) 
        && nav_opaque) {
        document.querySelector('nav').classList.add('clear');
        nav_opaque = false;
    }
});

if (
    (window.innerWidth > 996 && window.scrollY > 600) ||
    (window.innerWidth < 996 && window.scrollY > 250)) {
    document.querySelector('nav').classList.remove('clear');
    nav_opaque = true;
}