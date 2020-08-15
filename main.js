window.onload = function() {
    getCovidStats();
    createSignature()
}

function createSignature() {
    setTimeout(() => {
        const signatureCon = document.querySelector('.signature')
        signatureCon.src = 'gif/animatedsignmax.gif'
    }, 1500)
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
const covidBox = document.querySelector('.covid-container')


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
    }
    else {
        header.style.background = 'rgba(0, 0, 0, 0.4)'
    }
});

// COVID
window.addEventListener('scroll', function() {
    if (pageYOffset > 200 && pageYOffset < 4600) {
        covidBox.style.display = 'flex'
    } else {
        covidBox.style.display = 'none'
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
let hours = Math.round(((currentDate - Date.parse(date))/86400000) * 6)
hourText.innerText = hours


// KEYDOWN
const popup = document.querySelector('.popup')

function runOnKeys(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
        pressed.add(event.code);

        for (let code of codes) {
            if (!pressed.has(code)) {
                return;
            }
        }
        pressed.clear();

        func();
    });

    document.addEventListener('keyup', function(event) {
        pressed.delete(event.code);
    });

}

runOnKeys(
    () => popup.style.display = "flex",
    "AltLeft",
    "ShiftLeft",
    "KeyS"
);

// POPUP CLOSE

const closeBtn = document.querySelector('.close-popup')
closeBtn.addEventListener('click', closePopup)

function closePopup() {
    popup.style.display = "none"
}


// STATISTIC APP

document.addEventListener('DOMContentLoaded', getLists)

const skillsInput = document.querySelector('.skills-input')
const skillsAddBtn = document.querySelector('.btn-add')

skillsAddBtn.addEventListener('click', addSkill)


const popupBox = document.querySelector('.popup-box')
function addSkill() {
    const containerText = document.createElement('p')
    containerText.innerText = skillsInput.value
    saveLocalStatsName(skillsInput.value)
    containerText.classList.add('pop-text')
    const counterText = document.createElement('span')
    counterText.innerText = 0
    counterText.classList.add('pop-count')
    containerText.appendChild(counterText)
    const buttonPlus = document.createElement('button')
    buttonPlus.innerText = '+'
    buttonPlus.classList.add('pop-btn-plus')
    containerText.appendChild(buttonPlus)
    const minButton = document.createElement('button')
    minButton.innerText = '-'
    minButton.classList.add('pop-btn-min')
    containerText.appendChild(minButton)
    const delButton = document.createElement('button')
    delButton.innerText = 'delete'
    delButton.classList.add('pop-btn-del')
    containerText.appendChild(delButton)
    popupBox.appendChild(containerText)
    skillsInput.value = ''
}


popupBox.addEventListener('click', counting)
function counting(e) {
    const item = e.target
    let counter = item.parentElement.childNodes[1].innerText
    item.parentElement.childNodes[1].innerText
    if (item.classList[0] === 'pop-btn-plus') {
        item.parentElement.childNodes[1].innerText = +counter + 1
        getList()
    } else if (item.classList[0] === 'pop-btn-min') {
        item.parentElement.childNodes[1].innerText = +counter - 1
        getList()
    } else if (item.classList[0] === 'pop-btn-del') {
        item.parentElement.remove()
        removeLocalNames(item.parentElement)
        getList()
    }
}
function getList() {
    let countArr = []
    const list = document.querySelectorAll('.pop-text')
    list.forEach( (item) => {
        countArr.push(item.childNodes[1].innerText)
        saveLocalStatsCount(countArr)
    })
}

function saveLocalStatsName(statName) {
    let statsName
    if (localStorage.getItem('statsName') === null) {
        statsName = []
    } else {
        statsName = JSON.parse(localStorage.getItem('statsName'))
    }
    statsName.push(statName)
    localStorage.setItem('statsName', JSON.stringify(statsName))
}
function saveLocalStatsCount(statCount) {
    if (localStorage.getItem('statsCount') === null) {
        statsCount = []
    } else {
        statsCount = JSON.parse(localStorage.getItem('statsCount'))
    }
    statsCount = statCount
    localStorage.setItem('statsCount', JSON.stringify(statsCount))
}



function getLists() {
    let statsName
    let statsCount
    if (localStorage.getItem('statsName') === null && localStorage.getItem('statsCount') === null) {
        statsName = []
        statsCount = []
    } else {
        statsName = JSON.parse(localStorage.getItem('statsName'))
        statsCount = JSON.parse(localStorage.getItem('statsCount'))
    }
    let steps = 0
    statsName.forEach(function (statName, statCount) {
        steps ++
        const containerText = document.createElement('p')
        containerText.innerText = statName
        console.log(statsName)
        containerText.classList.add('pop-text')
        const counterText = document.createElement('span')
        counterText.innerText = statsCount[steps - 1]
        counterText.classList.add('pop-count')
        containerText.appendChild(counterText)
        const buttonPlus = document.createElement('button')
        buttonPlus.innerText = '+'
        buttonPlus.classList.add('pop-btn-plus')
        containerText.appendChild(buttonPlus)
        const minButton = document.createElement('button')
        minButton.innerText = '-'
        minButton.classList.add('pop-btn-min')
        containerText.appendChild(minButton)
        const delButton = document.createElement('button')
        delButton.innerText = 'delete'
        delButton.classList.add('pop-btn-del')
        containerText.appendChild(delButton)
        popupBox.appendChild(containerText)
    })
}

function removeLocalNames(statName) {
    let statsName
    if (localStorage.getItem('statsName') === null) {
        statsName = []
    } else {
        statsName = JSON.parse(localStorage.getItem('statsName'))
    }
    const statNameIndex = statName.children[0].innerText
    statsName.splice(statsName.indexOf(statNameIndex), 1)
    localStorage.setItem('statsName', JSON.stringify(statsName))
}











