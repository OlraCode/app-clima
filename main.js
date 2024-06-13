document.getElementById("search").addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
        ConsultarTempo()
    }
})


async function ConsultarTempo(){

    const container = document.querySelector("main")
    const error = document.querySelector(".error")
    const weather = document.querySelector(".weather")
    const city_name = document.querySelector("#name")
    const image = document.querySelector("#image")
    const temperature = document.querySelector("#temperature")
    const description = document.querySelector("#description")
    const humidity = document.querySelector("#humidity")
    const wind = document.querySelector("#wind")
    const key = 'f92c6f89153f558cd38b5d86e8d56f41'
    const city = document.querySelector("#search").value
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&appid=${key}`

    let response = await fetch(URL)
    let data = await response.json()
    
    if (data.cod == '404'){
        container.style.height = "500px"
        weather.style.display = "none"
        error.style.display = 'block'
        error.classList.add('fade-in')
        return
    }

    error.style.display = "none"
    error.classList.remove("fade-in")

    city_name.innerText = data.name
    temperature.innerHTML = `${parseInt(data.main.temp)}<span>ºC</span>`
    description.innerText = data.weather[0].description
    humidity.innerText = `${data.main.humidity}%`
    wind.innerText = `${parseInt(data.wind.speed)}Km/h`
    switch (data.weather[0].main){
        case "Clear":
            image.src = "img/clear.png"
            break
        case "Clouds":
            image.src = "img/cloud.png"
            break
        case "Mist":
            image.src = "img/mist.png"
            break
        case "Rain":
            image.src = "img/rain.png"
            break
        case "Snow":
            image.src = "img/snow.png"
            break
        default:
            image.src = ""
    }

    weather.style.display = ''
    weather.classList.add("fade-in")
    container.style.height = "600px"
}