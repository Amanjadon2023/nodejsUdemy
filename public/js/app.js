const getData = (cityName, callback) => {
    fetch(`http://localhost:4000/weather?address=${cityName}`).then((res) => {
        return res.json();
    }).then((data) => {
        if (data.error) {
            console.log('error', data.error.info)
        }
        else {
            console.log(data)
            callback(data)
            return data;
        }
    })
}
let form = document.querySelector('form');
let input = document.querySelector('input');
let locate = document.querySelector('#location');
let loading = document.querySelector('#loading');
let temp = document.querySelector('#temp');
let weather = document.querySelector('#weather');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = input.value;
    loading.innerText = "loading..."
    // console.log(location)
    getData(city, (data) => {
        // console.log(data)
        loading.innerText = ""
        locate.innerText = "Location: " + data.locations
        temp.innerText = "Temperature: " + data.temperature
        weather.innerText = "Weather: " + data.weather
    })
})