function ProdutosDAO(connection){
    this._connection = connection;//_ usada para variveis privadas
}

ProdutosDAO.prototype.lista =  function(callback){
    this._connection.query("select * from livros", callback);
}

ProdutosDAO.prototype.salva =  function(produto, callback){
    this._connection.query("insert into livros set ?", produto, callback); //o drive do mysql já coloca o objeto json produto de acordo com as colunas da tabela
    
}

//deletar

//alterar

module.exports = function(){
    return ProdutosDAO;
}