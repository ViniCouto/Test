module.exports = function(app){
    app.get("/promocoes/form", function(req , res){
        var connection = app.infra.connectionFactory(); //quando o express load varre as pastas do projeto ele cria objetos globais como a pasta infra e uma propriedade do que foi exportado do objeto "connectionFactory"
        var produtosDAO =  new app.infra.ProdutosDAO(connection);
        
        produtosDAO.lista(function(erros,resultados){
            res.render('promocoes/form', {lista:resultados});
        });
        connection.end()
    });

    app.post("/promocoes", function(req, res){
        var promocao = req.body;
        app.get('io').emit('novaPromocao', promocao);//disparar evento web socket 
        res.redirect('promocoes/form');
    });
}