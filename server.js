const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// lesson 45 minute 13 00

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello express</h1>');
//     res.send({
//         name: 'Dima',
//         likes: [
//             'Biking',
//             'Cities'
//         ]
//     });
// });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page title from variable'
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page Some web site'
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        linkToProject: 'https://github.com/IvanovDi/Node-server',
        pageTitle: 'Project Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});