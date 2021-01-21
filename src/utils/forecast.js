const request = require('request');

const forecast = function(latitude,longitude, callback){
    const url = `http://api.weatherstack.com/current?access_key=ecc02f586c63628686c5bbf0cd7679f1&query=${latitude},${longitude}`;
    request({url ,json:true}, (error, {body}) => {
        if(error){
            callback('unable to connect forecast services!', undefined);
        }
        else if(body.error){
            callback('unable to find location try another location!', undefined);
        }
        else{
            callback(undefined,{
                temperature : body.current.temperature, 
                feelslike : body.current.feelslike
            });
        }
    })
}
module.exports = forecast;