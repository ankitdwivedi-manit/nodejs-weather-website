const path = require('path');
const express = require('express');
const hbs  = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define path for express configurations:
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views: 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve:
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather',
        name : 'Ankit Dwivedi'
    });
});

app.get('/about', (req, res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Ankit Dwivedi'
    }
    )
});


app.get('/help', (req, res)=>{
    res.render('help',{
        title : 'Help',
        name : 'Ankit Dwivedi'
    }
    )
});


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error : 'please provide address!'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, place_name} = {})=>{
        if(error){
            return res.send({
                error : error
            });
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error : error
                });
            }
            return res.send({
                place_name : place_name,
                forecastData : forecastData
            });
        })
    })
});

app.get('/help/*', (req, res) =>{
    res.render('error',{
        title : 'page not found',
        name : 'Ankit Dwivedi',
        msg : 'Help page not found'
    })
});

app.get('*', (req, res) =>{
    res.render('error',{
        title : '404 ',
        name : 'Ankit Dwivedi',
        msg : '404 ERROR PAGE!'
    })
})

app.listen(3000, ()=>{
    console.log('server is on on port 3000.');
});
