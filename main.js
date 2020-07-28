const header = document.querySelector('.header')
const anchors = document.querySelectorAll('a[href*="#"]')
const hourText = document.querySelector('.counter-hours')


for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const blockID = anchor.getAttribute('href')
        document.querySelector('' + blockID).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}



//HEADER
window.addEventListener('scroll', function() {
    if (pageYOffset > 40) {
        header.style.background = 'rgba(0, 0, 0, 0.9)'
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.4)'
    }
});

//SLIDER
var slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("item");
    var dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// SKILLS COUNTER
const date = '2020-04-04T00:00:00.000Z'
let currentDate = Date.parse(new Date())
let hours = Math.round(((currentDate - Date.parse(date))/86400000) * 4)
hourText.innerText = hours

