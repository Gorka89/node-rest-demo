var cool = require('cool-ascii-faces');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.route('/payments')
  .get(function(request, response) {
    response.render('pages/payments');
  })
  .post(function(request, response) {
    //response.render('pages/payments');
    console.log("recieved post payments");
    console.log(request.body);
    var createdDate = request.body.created;
    console.log("creationDate recived "+createdDate);
    var payment_id = request.body.id;
    console.log(request.body.data.object);
    var status = request.body.data.object.status;

    console.log("status pay "+status);

    if (status){
      response.json('{ payment: success }');
    }
    else{
      response.json('{ payment: fail }');
    }
    response.setStatus(200);
    response.end();

  });


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
