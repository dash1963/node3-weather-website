// Command to include different viewfile extensions:  nodemon src/app.js -e js,hbs
//                                                                       =========

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode  = require('./utils/geocode');
const forecast = require('./utils/forecast');


const clog = console.log;
const port = 3000;

const app = express();

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location folder
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static( publicDirectoryPath));

//
//------R-O-U-T-E-S----------------------------------------------
//
app.get('', (req, res) => {
res.render('index', { 
    title: 'Weather App',
    name: 'Dear user'
});
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'The About Page',
        name: 'Serginho'
    })
});


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'The Help Page',
        message:'Please call Technical Support @ 847-606-6606',
        name: 'Serginho'

        })
});

//
// Serving APIs to the BROWSER
//


app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
       return res.send({
              error:  'You must provide and address. Please try again!'
              });
    }

    geocode( req.query.address, 
             (error, { location, latitude, longitude } = {}) => {      
        if (error)
        {
           return res.send({
               error: `${error}`
           })
        }  
       
        forecast(latitude, longitude, (error, { summary, temperature, precipProbability} = {}) => {
          if (error) {
            return res.send({
                error: `Error: ${error}`
            })
          } else 
          {
            const forecast = `${summary}.` + 
                                ` It is currently ${temperature} degrees outside.` + 
                                ` There is a ${precipProbability}% chance of rain`;

            res.send({
                    forecast,
                    location,
                    address: req.query.address
            });
         }
         });
   });
});



app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
           error: 'You must provide a search term!'
       });
    }
    clog(req.query.search)
    res.send({
        products: []
    })
});

//
// Serving APIs to the BROWSER ends
//

app.get('/help/*', (req, res ) => {
    res.render('404', {
        title: 'The 404 Page',
        message:'Help article not found!',
        name: 'Serginho'
    });
});
  

app.get('*', (req, res ) => {
    res.render('404', {
        title: 'The 404 Page',
        message: 'Page not found!!',
        name: 'Serginho'
    });
});





//---------------------------------------------------------
//






app.listen(port, ()=>{
    clog('server started on port: ', port)
});

