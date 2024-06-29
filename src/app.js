const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Kosta Rainesh',
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Kosta Rainesh'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Kosta Rainesh'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location} = {})=>{
        if (error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req,res)=>{
    res.render('help404',{
        errorMessage: 'Help article not found',
        name: 'Kosta Rainesh',
        title:'Help'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        errorMessage: 'Page not found',
        name: 'Kosta Rainesh',
        title: '404'
    })
})


app.listen(port, ()=>{
    console.log('Server is up on port' + port)
})