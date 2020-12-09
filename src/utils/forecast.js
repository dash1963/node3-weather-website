const request = require('postman-request');

const forecast = (latitude, longitude, callback) => 
{
    const url = `https://api.darksky.net/forecast/221ad6d821e3ccd4e793996e7d035795/${latitude},${longitude}`;
    request({url, json: true}, (error, response) => 
    {  
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback(`Unable to find location!: ${response.body.error}`, undefined)
        } else {  
            callback(undefined, 
                response.body.daily.data[0].temperatureLow,
                response.body.daily.data[0].temperatureHigh,
                response.body.currently );
        }
    })
}

module.exports = forecast;

