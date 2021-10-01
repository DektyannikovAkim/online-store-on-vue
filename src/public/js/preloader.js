'use strict'

function loader() {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function() {
        document.querySelector('.preloader').style.display = "none";
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

window.addEventListener('load', function() {
    loader();
});