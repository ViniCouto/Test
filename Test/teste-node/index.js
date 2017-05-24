//Carrega Rotas de Produtos --- ATENÇÃO: esta chamada de routes deve ficar antes da chamada do express ************ errado
//Sobe a aplicação - EXPRESS
var app = require('./config/express')();
var routesProdutos = require("./app/routes/produtos")(app);//app é passada como argumento

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

http.listen(3000, function(){
    console.log("Servidor rodando");
});