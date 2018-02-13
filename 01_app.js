const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB
const app = express();
app.set("view engine", "ejs")
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))

var util = require("util");


app.get('/', function (req, res) {
  console.log('la route route get / = ' + req.url)
   
   var cursor = db.collection('adresse')
                  .find().toArray(function(err, resultat){
   if (err) return console.log(err)
   // transfert du contenu vers la vue index.ejs (renders)
   // affiche le contenu de la BD
   res.render('gabarit.ejs', {adresse: resultat})
   }) 

})

let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})