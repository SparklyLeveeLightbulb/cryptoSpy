// app.use(express.static(__dirname + '/views'));

module.exports = function(app, passport) {

  

app.get('/', function(req, res) {
  res.render('main')
});


};