//  Give api a key value, can change afterwards.
const openWeatherApi = 'db1f53219cee52a111e407c0e9c57ba8';
const flickrApi = 'd083b02f7d83d378415d1feaed72229c';
// create the  connection of layout and const.
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

//search array and input
const people = [
    { name: 'david' },
    { name: 'patel' },
    { name: 'kevin' },
    { name: 'steven' },
    { name: 'coco' },
    { name: 'brock' },
    { name: 'rock' }
];
const list = document.getElementById('list');

function setList(group) {
    clearList();
    for (const person of group) {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        const text = document.createTextNode(person.name);
        item.appendChild(text);
        list.appendChild(item);
    }
    if (group.length === 0) {
        setNoResults();
    }
}

function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function setNoResults() {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    const text = document.createTextNode('No results found');
    item.appendChild(text);
    list.appendChild(item);
}

function getRelevancy(value, searchTerm) {
    if (value === searchTerm) {
        return 2;
    } else if (value.startsWith(term)) {
        return 1;
    } else if (value.includes(searchTerm)) {
        clearList();
    }
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    const value = event.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        setList(people).filter(person => {
            return person.name.includes(value);
        }).sort((personA, personB) => {
            return getRelevancy(personB.name, value) - getRelevancy(personA.name, value);
        });
    } else {
    clearList();
}
});

//load the local information 
window.addEventListener('load', () => {
    //longitude and latitude.
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            long = position.coords.longitude;
            lat = position.coords.latitude;
            //Visit api url address, tested by insomnia, can get json data in console.
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${openWeatherApi}&units=metric`;
            console.log(apiUrl);

            //Use fetch method to get json data, get the response.
            fetch(apiUrl).then((response) => {
                return response.json();
            })
                .then((data) => {
                    // Send the data to different areas in layout.
                    const { temp } = data.main;
                    const place = data.name;
                    const { description, icon } = data.weather[0];
                    const { sunrise, sunset } = data.sys;
                    // icon api from openweathermap.org
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32;

                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);


                    iconImg.src = iconUrl;
                    loc.textContent = `${place}`;
                    desc.textContent = `${description}`;
                    tempC.textContent = `${temp.toFixed(0)} °C`;
                    tempF.textContent = `${fahrenheit.toFixed()} °F`;
                    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
                });
        });
    }
});


