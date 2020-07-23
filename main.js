const header = document.querySelector('.header')



window.addEventListener('scroll', function() {
    if (pageYOffset > 40) {
        header.style.background = 'black'
    } else {
        header.style.background = 'transparent'
    }
});
