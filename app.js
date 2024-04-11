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
 *  - npx prisma init (para funcionar ligar ele ao projeto)
 * 
 */  


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use((request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors())
    
    next();
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Import dos arquivos da controller do projeto 
    const controllerFilmes = require ('./controller/controller_filme.js');

    const controllerAtores = require ('./controller/controller_atores.js')

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Criando um objeto para controlar a chegada dos dados da requisição em formato JSON 
const bodyParserJson = bodyParser.json();



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

// endPoint: retorna o filme filtrando pelo ID
app.get('/v2/filmesAcme/filme/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idFilme = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})

// primeiro end point usando POST 
app.post('/v2/filmesAcme/filme', cors(), bodyParserJson, async function (request, response,next ){

    // recebe o ContentType com os tipos de dados encaminhados na requisição
    let contentType = request.headers['content-type'];

    // vou receber o que chegar no corpo da requisição e guardar nessa variável local
    let dadosBody = request.body;
    // encaminha os dados para a controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody,contentType);


    response.status(resultDadosNovoFilme.status_code);
    response.json(resultDadosNovoFilme);

})

app.delete('/v1/filmesAcme/deleteFilme/:id', cors (), async function (request,response,next){

    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.setExcluirFilme(idFilme);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme)
})

app.put('/v1/filmesAcme/uptadeFilme/:id', cors(), bodyParserJson, async function(request,response,next){

    let idFilme = request.params.id
    let contentType = request.headers['content-type'];
    let dadosBody = request.body

    let resultUptadeFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType);

    response.status(resultUptadeFilme.status_code)
    response.json(resultUptadeFilme)

    
} )


 

// ************************************************************************************************************************************* //
// ****************************  CRUD DOS ATORES ************************************************************
// **************************************************************************************************************************************//


//EndPoint : Versão 2.0 - retorna todos os atores do Banco de Dados 
app.get('/v2/filmesAcme/atores', cors(),async function (request,response,next){

    // chama a função da controller para retornar os atores;
    let dadosAtores = await controllerAtores.getListarAtores();

    // validação para retornar o Json dos filmes ou retornar o erro 404;
    if(dadosAtores){
        response.json(dadosAtores);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
});


// endPoint: retorna o ator filtrando pelo ID
app.get('/v2/filmesAcme/ator/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idAtor = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosAtores = await controllerAtores.getBuscarAtorId(idAtor);

    response.status(dadosAtores.status_code);
    response.json(dadosAtores);
})


app.delete('/v1/filmesAcme/deleteAtor/:id', cors (), async function (request,response,next){

    let idAtor = request.params.id

    let dadosAtores = await controllerAtores.setExcluirAtor(idAtor);

    response.status(dadosAtores.status_code);
    response.json(dadosAtores)
})


app.listen('8080', function(){
    console.log('API FUNCIONANDO')
})











