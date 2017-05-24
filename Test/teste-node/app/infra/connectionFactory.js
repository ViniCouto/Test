var mysql = require('mysql');

function connectMYSQL(){
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : 'root',
            database : 'base_teste' //base de desenvolvimento
        });
    }

    if(process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : 'root',
            database : 'base_teste_test' //base de teste
        });
    }
}

//wrapper -- função que retorna uma outra função
module.exports = function (){ //não precisa conectar ao subir o express // para nao executa a conexao todas vezes que houver um request
    return connectMYSQL; 
}