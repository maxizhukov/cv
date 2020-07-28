window.onload = function() {
    getCovidStats();
}

function getCovidStats() {
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/16')
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            let population = data.location.country_population;
            let update = data.location.last_updated;
            let confirmedCases = data.location.latest.confirmed;
            let deaths = data.location.latest.deaths;

            document.getElementById('cases').innerHTML = confirmedCases.toLocaleString('en');
            document.getElementById('deaths').innerHTML = deaths.toLocaleString('en');
            document.getElementById('percent').innerHTML = ((Number(deaths)/Number(confirmedCases))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";




        })
        .catch(function() {
            console.log("error");
        })
    setTimeout(getCovidStats, 43200000) // update every 12 hours
}



const header = document.querySelector('.header')
const anchors = document.querySelectorAll('a[href*="#"]')
const hourText = document.querySelector('.counter-hours')
const covidCon = document.querySelector('.covid-container')


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
        covidCon.style.transform = 'translateX(0px)'
    }
    else {
        header.style.background = 'rgba(0, 0, 0, 0.4)'
        pageYOffset > 1600
    }
});
window.addEventListener('scroll', function() {
    if (pageYOffset > 2100 && pageYOffset < 3000) {
        covidCon.style.transform = 'translateX(-100px)'
    }
    if (pageYOffset > 4300) {
        covidCon.style.transform = 'translateX(-100px)'
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

