module.exports = function(app){
    app.get('/produtos', function(req, res, next){ //next 
        var connection = app.infra.connectionFactory(); //quando o express load varre as pastas do projeto ele cria objetos globais como a pasta infra e uma propriedade do que foi exportado do objeto "connectionFactory"
        var produtosDAO =  new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(erros,resultados){
            if(erros){
                return next(erros); // express executar a proxima funcao da cadeia de funcoes
                //return para interroper o fluxo de processamento
            }

            res.format({
                html: function(){
                    res.render('produtos/lista',{lista:resultados});
                },
                json: function(){
                    res.json(resultados);
                }
            });
        });
        connection.end();
    });

    app.get('/produtos/form', function(req, res){
        res.render('produtos/form',
            {produto:{},
            errosValidacao:{}});
        
    });

    app.post('/produtos', function(req, res){      
        var produto = req.body;
        req.assert('titulo', 'Titulo é obrigatório').notEmpty();
        req.assert('preco', 'Formato inválido').isFloat();

        var erros = req.validationErrors();
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render("produtos/form",{errosValidacao:erros,produto:produto});
                },
                json: function(){
                    res.status(400).send(errors);
                }
            });
            return ;
        }
       

        var connection = app.infra.connectionFactory();
        var produtosDAO =  new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto , function(erros, resultados){
            res.redirect('/produtos');  //evitar o problema do f5 na lista inserir registro duplicado, always redirect after post
        });
    });
}