const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/42ac10b265a6a89ed65d3e62d7636dd6/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=si'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to Weather Service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find the location!', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast