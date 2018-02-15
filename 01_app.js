const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote MongoDB
const fs = require("fs");
var app = express();
var util = require("util");
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended:true}))



app.use(express.static('public'));

app.get('/', function (req, res) {
  console.log('la route route get / = ' + req.url)
   
   var cursor = db.collection('adresse').find().toArray(function(err, resultat){
   if (err) return console.log(err)
   // transfert du contenu vers la vue index.ejs (renders)
   // affiche le contenu de la BD
   res.render('gabarit_2.ejs', {adresse: resultat})
   }) 

})



app.get('/formulaire', (req, res) => {

  console.log(__dirname);
 res.sendFile( __dirname + "/public/html/" + "formulaire.html");
 
 });

app.get('/membres', (req, res) => {
 fs.readFile( __dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data) {
 console.log( data );
 res.end( data );
 });
})

app.get('/ajouter', (req, res) => {
 
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.courriel
 };

console.log(reponse);
fs.readFile(__dirname + "/public/data/" + "adresses.json", 'utf8', function (err, data){

  let variable = JSON.parse(data)
  variable.push(reponse)
  let jsonVariable = JSON.stringify(variable)
  fs.writeFile(__dirname + "/public/data/" + "membres.json", jsonVariable, function(err, data){

    console.log("allo");

  })
 res.end(JSON.stringify(reponse));
})

 db.collection('adresse').save(req.query, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/')
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