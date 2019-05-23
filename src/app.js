const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const post=process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rohan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Rohan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rohan'
    })
})

const command = process.argv[2]
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please Enter a location!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Rohan',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Rohan',
        errorMessage: 'No page found!'
    })
})

app.listen(port, () => {
    console.log('Server Running.')
})