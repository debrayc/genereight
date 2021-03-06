const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars');
const SiteInfo = require('./models/siteInfo')
const welcome = require('./controllers/welcome')
const {siteInformation} = require('./controllers/welcome')
const Handlebars = require('Handlebars')
const fs = require('fs')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000)
app.use(bodyParser.urlencoded())

Handlebars.registerPartial('head-er', '{{name}}')
Handlebars.registerPartial('foot-er', '{{name}}')
Handlebars.registerPartial('head-er', '{{name}}')
Handlebars.registerPartial('welcome', '{{name}}')
Handlebars.registerHelper('itWorked', '{{name}}')



const options = {
  dotfiles: 'ignore',
  extensions: ['htm', 'html'],
  index: false
}

app.use(express.static(path.join(__dirname, 'views') , options))

app.get('/', function(req, res){
  if(siteInformation === undefined){
    res.render('welcome')
  } else {
    res.render('index', {siteInformation})
  }

});

app.get('/submit', (req, res) => {
  res.render('index')
})

app.get('/welcome', function(req, res){
  res.render('welcome');

});
app.post('/submit', (req, res) => {
  console.log(req.body);
  let siteInformation = req.body
  fs.writeFile("siteInformation.json", JSON.stringify(siteInformation), (err) => {
    if (err){
      console.error(err);
      return
    } else {
      console.log('siteInformation.json File Created');
    }
  })
  res.render('index', {siteInformation})

})
app.listen(app.get('port'), () => {
  console.log(`Server LIVE on http://localhost:` +

app.get('port') + `; press Ctrl-C to terminate.'` );
});
