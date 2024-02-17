const container = document.querySelector(".container");
const serach = document.querySelector(".search-box");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const errorMsg = document.querySelector('.not-found');

serach.addEventListener('click', () => {
    const APIkey = '904fe1c018eeb774e16eabc3e82bada1';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json()).then(json => {
            if (json.cod == 404) {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                errorMsg.classList.add('active');
                return;
            } else {
                container.style.height = '555px';
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                errorMsg.classList.remove('active');
            }


            const image = document.querySelector('.weather-box img');
            const temp = document.querySelector('.weather-box .temp');
            const desc = document.querySelector('.weather-box .desc');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');


            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;
                case 'Cloud':
                    image.src = 'img/cloud.png';
                    break;
                case 'Rain':
                    image.src = 'img/rain.png';
                    break;
                case 'Snow':
                    image.src = 'img/snow.png';
                    break;
                case 'Mist':
                    image.src = 'img/mist.png';
                    break;
                case 'Haze':
                    image.src = 'img/mist.png';
                    break;

                default:
                    image.src = 'img/cloud.png'
                    break;
            }
            temp.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            desc.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        })
});