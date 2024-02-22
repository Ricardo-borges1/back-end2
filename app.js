/*******************************************************
 * Objetivo: ENDPOINTS
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/


//app importa funcoes


/**
 * Para realizar o acesso ao banco de dados precisamos instalar algumas bibliotecas
 * 
 *  - SEQUELIZE - UMA BIBLIOTECA MAIS ANTIGA
 *  -PRISMA ORM -  BIBLIOTECA MAIS ATUAL (será utilizado no projeto)
 *  - FASTFY ORM  - BIBLIOTECA MAIS ATUAL 
 * 
 *  Para instalar o PRISMA:
 *  - npm install prisma --save (Irá realizar a conexão com banco de dados)
 *  - npm install @prisma/client --save (Irá executar os scripts SQL no BD)
 *   - npx prisma init (para funcionar ligar ele ao projeto)
 * 
 */  


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use((request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods', 'GET');
    app.use(cors())
    
    next();
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Import dos arquivos da controller do projeto 
    const controllerFilmes = require ('./controller/controller_filme.js');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//EndPoint : Versão 2.0 - retorna todos os filmes do Banco de Dados 
app.get('/v2/filmesAcme/filmes', cors(),async function (request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    // validação para retornar o Json dos filmes ou retornar o erro 404;
    if(dadosFilmes){
        response.json(dadosFilmes);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
});

app.get('/v1/filmesAcme/filmeNome', cors(), async function(request,response,next){

    let nomeFilme = request.query.nome
    let filmeNome = await controllerFilmes.getBuscarFilmeNome(nomeFilme)

        response.json(filmeNome);
        response.status(filmeNome.status_code)
} )

// endPoint: retorna o filme filtrano pelo ID
app.get('/v2/filmesAcme/filme/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idFilme = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})

app.listen('8080', function(){
    console.log('API FUNCIONANDO')
})











