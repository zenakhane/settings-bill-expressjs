// var PORT = process.env.PORT || 3012
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const SettingsBill = require("./settings-bill")
const moment = require("moment")
moment().format()
const app = express()

const settingsBill = SettingsBill()

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath:  './views',
    layoutsDir : './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res) {
    res.render("index", {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        color: settingsBill.changeColor()
    })
});  

app.post('/settings', function(req, res) {
 

 settingsBill.setSettings({
     callCost:req.body.callCost,
     smsCost: req.body.smsCost,
     warningLevel: req.body.warningLevel,
     criticalLevel: req.body.criticalLevel
 })

 res.redirect('/')
});

app.post('/action', function(req, res) {

  settingsBill.recordAction(req.body.actionType)
    res.redirect('/')
});


app.get('/actions', function(req, res) {

    var actionsList = settingsBill.actions()
    actionsList.forEach(element => {
        element.currentTime = moment(element.timestamp).fromNow()
    });
    res.render('actions', {actions: actionsList})

});

app.get('/actions/:actionType', function(req, res) {
    var actionsList = settingsBill.actions()
    actionsList.forEach(element => {
        element.currentTime = moment(element.timestamp).fromNow()
    });
    res.render('actions', {actions: actionsList})
});

const PORT = process.env.PORT || 3013
app.listen(PORT, function() {
    console.log("App started at port:", PORT)
});