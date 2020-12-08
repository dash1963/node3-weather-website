const request = require('postman-request');

const geocode = (address, callback) => {
            const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2VyZ2lvNDIzNCIsImEiOiJja2lkbHd4cTUwc2w3MnRsZ3ZheDd3Z21pIn0.bgOHlskDIA8F33ocSXsZNA&limit=1`;
    
            request({url: geoUrl, json: true}, (error, response) => {
                  if (error)
                  {
                     callback('Geolocation: Unable to connect to geo-location service', undefined)  
                  } else if (response.body.message || response.body.features.length === 0) {
                     callback(`Geolocation-Error: Location not found!`, undefined);
                  } else {
                         location = response.body.features[0].place_name;
                         longitude = response.body.features[0].center[0];
                         latitude = response.body.features[0].center[1];
                         callback(undefined, {location, longitude, latitude});
                  }
          }); 
    }
    
    module.exports = geocode;
    