const request = require('request')

const forecast = (longitude, latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=bcc2ce84c771e90adf3b2b2dbbc41d82&query='+ longitude +','+latitude +'&units=m'

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like '+ body.current.feelslike +' degress out')
        }
    })
}

module.exports = forecast