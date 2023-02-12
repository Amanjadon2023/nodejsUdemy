const express = require('express');
const { weatherData } = require('../../weather/weather_data.js')
const hbs = require('hbs');
const app = express()
const path = require('path');
console.log(__dirname)
console.log(path.join(__dirname, 'amanjadon'))
const pathAboutPage = path.join(__dirname, '../public')
console.log(pathAboutPage)
app.set('view engine', 'hbs')
app.use(express.static(pathAboutPage))
const partailsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partailsPath)
// app.get('',(req,res)=>{
//     res.send('hello this is home page')
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>')
// })
const pathViewsDirectory = path.join(__dirname, '../templates/views')
app.set('views', pathViewsDirectory)
app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather',
        'name': 'aman jadon'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'name': 'aman jadon',
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About me',
        'name': 'aman jadon'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'page nhi mil rha h help k baad'
    })
})

app.get('/weather', (req, res) => {
    const city = req.query.address
    console.log(city)
    if (!req.query.address) {
        return res.send({
            error: 'plese provide address to get the weather'
        })
    }
    weatherData(city, (dataObject) => {
        return res.send(dataObject)
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        error: 'page nhi mil rha h home se'
    })
})

// app.get('/weather-report',(req,res)=>{
//     res.send('todays weather is clear')
// })
// app.get('/help',(req,res)=>{
//     res.send('help page')
// })
app.listen(4000, () => {
    console.log('server is listening at 4000')
})