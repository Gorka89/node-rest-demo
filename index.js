var cool = require('cool-ascii-faces');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var mysql = require('mysql');
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

app.route('/mysql')
  .get(function(request, response){
    console.log("injectinggg");

    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'restful_api_demo',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          //self.stop(err);
          console.log("error connecting");
            //  response.json('{ mysql: error }');
        } else {
          console.log("CONNECT");
          //    response.json('{ mysql: success }');

          //self.configureExpress(connection);
        }
    });

    response.json('{ mysql: inject }');
    response.setStatus(200);
    response.end();
  });

app.route('/mysqlnew')
  .get(function(request, response){
    response.render('pages/mysql');
  }); 

app.get('/:table', function(req,res){
  var connectionpool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'secret',
        database : 'rest_demo'
    });
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
              res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            // query the database using connection
            console.log("connn");
            connection.query('SELECT * FROM '+req.params.table+' ORDER BY id DESC LIMIT 20', req.params.id, function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    fields: fields,
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
});

app.get('/tables', function(req,res){
    var connectionpool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : 'secret',
        database : 'rest_demo'
    });
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
              res.send({
                result: 'error',
                err:    err.code
            });
        } else {
          console.log("eyyy");
            // query the database using connection
        }
    });
});     


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function connectMysql(){
  console.log("en connectMysql");
  var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'restful_api_demo',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          //self.stop(err);
          console.log("error connecting");
              //response.json('{ mysql: error }');
        } else {
          console.log("CONNECT");
              //response.json('{ mysql: success }');

          //self.configureExpress(connection);
        }
    });
}