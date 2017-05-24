var express = require('express');
var load =  require('express-load'); //o express load já chama as funcoes dos seus módulos no momento do carregamento //não precisa colocar os require nas classes
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
    var app = express();
   
    app.use(express.static('./app/public'));

    app.set('view engine', 'ejs');
    app.set('views', './app/views');
   
    //MiddlewareBodyParser -> outros middelewares -- funcao q trata a req
    app.use(bodyParser.urlencoded({extended : true})); 
    app.use(bodyParser.json());
    app.use(expressValidator()); 

    load('routes', {cwd: 'app'}) //procurar estas pastas direto no diretório app
        .then('infra')
        .into(app); //chamada do express
        
        app.use(function(req, res, next){  //depois de invocar o express load  ////////////////////////// Middleware
            res.status(404).render('errors/404');
            next();
        });

        app.use(function(error, req, res, next){  //depois de invocar o express load  ////////////////////////// Middleware
            if(process.env.NODE_ENV == 'production'){
                res.status(500).render('errors/500');
                return;
            }
            next(error);
        });

    return app;
}   