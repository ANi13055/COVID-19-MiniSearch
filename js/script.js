'use-strict';
const searchForm = document.querySelector('#search');
const searchScreen = document.querySelector('.search-screen');
const searchBar = document.querySelector('.search-bar');
const resultContainer = document.querySelector('.results-screen');
const loader = document.querySelector('.loader');
const countryFlag = document.querySelector('.country-flag');
const resetBtn = document.querySelector('#reset');
const modal = document.querySelector('#modal');
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector('#submit-btn');
function hide(element) {
    element.style.display = 'none';
}
function show(element) {
    element.style.display = 'block';
}
resetBtn.addEventListener('click', function(event) {
    hide(resultContainer);
    show(searchScreen);
    location.reload() //reload the window
});
closeButton.addEventListener('click', function(event) {
    hide(modal);
    show(searchScreen);
    location.reload() //reload the window
});
searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); //Prevent the default behaviour of the form
    fetch(`https://corona.lmao.ninja/countries/${searchBar.value}`)
        .then(response => {
            submitButton.disabled = true;
            submitButton.textContent = 'Searching';
            hide(searchScreen); //Hide the search screen
            show(loader); // Show the loader
            return response.json()
        })
        .then(data => {
            console.log(data)
            hide(loader);

            const flag = document.createElement('img');
            flag.src = `${data.countryInfo.flag}`
            flag.style.width = '150px'
            flag.style.height = 'auto'
            countryFlag.appendChild(flag);

            const country = document.createElement('h1');
            country.textContent = `${data.country}`
            country.style.padding = '-20px';
            resultContainer.appendChild(country);

            const latlong = document.createElement('p');
            latlong.textContent = `Latitude : ${data.countryInfo.lat} Longitude : ${data.countryInfo.long} `
            latlong.classList.add('col-12-12');
            latlong.classList.add('p-8');

            const caseTotal = document.createElement('p');
            caseTotal.textContent = `Total Cases : ${data.cases}`;
            caseTotal.style.position = 'absolute';
            caseTotal.style.top = '10%';
            caseTotal.style.left = '-25%';
            if (caseTotal.textContent < 10) {
                caseTotal.style.color = 'green';
            } else {
                caseTotal.style.color = 'red'
            }
            caseTotal.classList.add('col-12-12');
            caseTotal.classList.add('p-8');
            resultContainer.appendChild(caseTotal);

            const deathsToday = document.createElement('p');
            deathsToday.textContent = `Deaths Today : ${data.todayDeaths}`;
            deathsToday.style.position = 'absolute';
            deathsToday.style.top = '10%';
            deathsToday.style.left = '20%';
            deathsToday.style.color = 'red';
            deathsToday.classList.add('col-12-12');
            deathsToday.classList.add('p-8');
            resultContainer.appendChild(deathsToday);

            const casesToday = document.createElement('p');
            casesToday.textContent = `Cases Today : ${data.todayCases}`;
            casesToday.style.position = 'absolute';
            casesToday.style.top = '15%';
            casesToday.style.left = '-25%';
            casesToday.classList.add('col-12-12');
            casesToday.classList.add('p-8');
            resultContainer.appendChild(casesToday);

            const recovered = document.createElement('p');
            recovered.textContent = `Recovered :  ${data.recovered}`;
            recovered.style.position = 'absolute';
            recovered.style.top = '15%';
            recovered.style.left = '20%';
            recovered.style.color = 'green';
            recovered.classList.add('col-12-12');
            recovered.classList.add('p-8');
            resultContainer.appendChild(recovered);

            const activeCases = document.createElement('p');
            activeCases.textContent = `Active Cases : ${data.active}`;
            activeCases.style.position = 'absolute';
            activeCases.style.top = '20%';
            activeCases.style.left = '-25%';
            activeCases.style.color = 'blue';
            activeCases.classList.add('col-12-12');
            activeCases.classList.add('p-8');
            resultContainer.appendChild(activeCases);

            const critical = document.createElement('p');
            critical.textContent = `Critical Cases : ${data.critical}`;
            critical.style.position = 'absolute';
            critical.style.top = '20%';
            critical.style.left = '20%';
            critical.style.color = 'red';
            critical.classList.add('col-12-12');
            critical.classList.add('p-8');
            resultContainer.appendChild(critical);

            const deaths = document.createElement('p');
            deaths.textContent = `Deaths : ${data.deaths}`;
            deaths.style.position = 'absolute';
            deaths.style.top = '25%';
            deaths.style.left = '-25%';
            deaths.style.color = 'red';
            deaths.classList.add('col-12-12');
            deaths.classList.add('p-8');
            resultContainer.appendChild(deaths);

            const casesPerOneMillion = document.createElement('p');
            casesPerOneMillion.textContent = `Cases Per Million : ${data.casesPerOneMillion}`;
            casesPerOneMillion.style.position = 'absolute';
            casesPerOneMillion.style.top = '25%';
            casesPerOneMillion.style.left = '20%';
            casesPerOneMillion.classList.add('p-8');
            casesPerOneMillion.classList.add('col-12-12')
            resultContainer.appendChild(casesPerOneMillion);

            const deathsPerOneMillion = document.createElement('p');
            deathsPerOneMillion.textContent = `Deaths Per Million : ${data.deathsPerOneMillion}`;
            deathsPerOneMillion.style.position = 'absolute';
            deathsPerOneMillion.style.top = '30%';
            deathsPerOneMillion.style.left = '0%';
            deathsPerOneMillion.classList.add('p-8');
            deathsPerOneMillion.classList.add('col-12-12')
            resultContainer.appendChild(deathsPerOneMillion);

            show(resultContainer); // This should be called last
        })
        .catch(err => {
            console.log(err)
            modal.classList.add('show-modal')
        })
})
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
function toggleModal() {
    modal.classList.toggle("show-modal");
}
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}
window.addEventListener("click", windowOnClick);

function display_c(){
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('display_ct()',refresh)
}
function display_ct() {
    var x = new Date()
    document.getElementById('ct').innerHTML = x;
    display_c();
}