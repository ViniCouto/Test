var express = require('../config/express')();// o express exporta um funcao por isso o ()
var request  = require('supertest')(express);//retorna a função do módulo -- passa o express como argumento para o supertest e dispara as requisicoes, assim nao precisa mais subir o servidor para testar

describe('#ProdutosController', function(){
    
    beforeEach(function(done){
        var conn =  express.infra.connectionFactory();
        conn.query("delete from livros", function(ex, result){
            if(!ex){
                done();
            }
        });
    });
    
    //casos de test
    it('#Listagem json', function(done){    
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type', /json/) //espera q o content type tenha a palavra json
        .expect(200, done); //neste momento (done) o supertest sabe que pode disparar a requisicao
    });
       
    it("#Cadastro de novo produto com dados invalidos", function(done){
        request.post('/produtos')
        .send({titulo:"", descricao:"novo livro"})
        .expect(400, done);
    });
    
    it("#Cadastro de novo produto com dados validos", function(done){
        request.post('/produtos')
        .send({titulo:"titulo", descricao:"novo livro", preco:20.50})
        .expect(302, done);
    });
});

