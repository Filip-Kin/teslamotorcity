document.addEventListener('DOMContentLoaded', function() {
    var instances = M.Parallax.init(document.querySelectorAll('.parallax'), {});
});

let nav_opaque = false;
document.addEventListener('scroll', () => {
    if (window.scrollY > 600 && !nav_opaque) {
        document.querySelector('nav').style.background = 'rgba(33,33,33,1)';
        nav_opaque = true;
    }
    else if (window.scrollY < 600 && nav_opaque) {
        document.querySelector('nav').style.background = 'rgba(33,33,33,0)';
        nav_opaque = false;
    }
});