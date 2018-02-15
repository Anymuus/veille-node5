const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB


const app = express();

app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')) // pour utiliser le dossier public

app.set('view engine', 'ejs'); // générateur de template

app.get('/', function (req, res) {
  let resultat = 
      [
        {
            id : "1",
            nom : "Anymuus",
            telephone : "514-922-7788" 
        },
        {
            id : "2",
            nom : "AlexSilver",
            telephone : "514-722-4661" 
        }
      ]
    res.render('gabarit_1.ejs', {adresses: resultat})
})

