const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const { database } = require('./keys'); 
const bodyParser = require('body-parser');
const expressMySQLSession = require('express-mysql-session');
const { pool } = require('./database');


//initializations
const app = express();
const MySQLStore = expressMySQLSession(session);


//settings
app.set('port', process.env.PORT || 4000);// aca defino el puerto
app.set('views', path.join(__dirname, 'views'));
const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
  });
  app.engine(".hbs", hbs.engine);
  app.set('view engine', '.hbs');


//middlewares - se ejecutan cada vez que un usuario envia una peticion al servidor
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  }) 
  );


//routes
app.use(require('./routes/index'));
app.use('/links', require('./routes/links'));   


//public - archivos publicos
app.use(express.static(path.join(__dirname, 'public')))// le estamos diciendo que nuestra carpeta public se encuentra en esa direccion


//starting the server
app.listen(app.get('port'), () => { // aca uso el puerto
    console.log('Server on port', app.get('port'));
}) 
//si existe un puerto definido en el sistema tomalo
