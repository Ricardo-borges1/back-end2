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
    response.header('Access-Control-Allow-Origin','*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors())
    
    next();
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Import dos arquivos da controller do projeto 
    const controllerFilmes = require ('./controller/controller_filme.js');

    const controllerAtores = require ('./controller/controller_atores.js');

    const controllerGeneros = require ('./controller/controller_generos.js');

    const controllerClassificacao = require ('./controller/controller_classificacao.js');

    const controllerDiretores = require ('./controller/controlller_diretores.js')

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

app.put('/v1/filmesAcme/updateFilme/:id', cors(), bodyParserJson, async function(request,response,next){

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

app.post('/v2/filmesAcme/novoAtor', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultDadosNovoAtor = await controllerAtores.setInserirAtor(dadosBody,contentType)
    response.status(resultDadosNovoAtor.status_code)
    response.json(resultDadosNovoAtor)
})

app.put('/v2/filmesAcme/updateAtores/:id', cors(), bodyParserJson, async function(request, response){
   let contentType = request.headers['content-type']
   let dadosBody = request.body
   let idAtor=request.params.id
   
   let resultDadosNovoAtor = await controllerAtores.setAtualizarAtor(idAtor,dadosBody,contentType)
   console.log(resultDadosNovoAtor);
   response.status(200)
   response.json(resultDadosNovoAtor)
})

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

app.get('/v1/filmesAcme/atorNome', cors(), async function (request, response){
    let nomeAtor = request.query.nome
    let dadosAtores = await controllerAtores.getBuscarAtorNome(nomeAtor)
    response.status(dadosAtores.status_code)
    response.json(dadosAtores)
})



// ************************************************************************************************************************************* //
// ****************************  CRUD DO GENERO  ************************************************************
// **************************************************************************************************************************************//

//EndPoint : Versão 2.0 - retorna todos os GENEROS do Banco de Dados 
app.get('/v2/filmesAcme/generos', cors(),async function (request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosGenero = await controllerGeneros.getListarGeneros();

    // validação para retornar o Json dos filmes ou retornar o erro 404;
    if(dadosGenero){
        response.json(dadosGenero);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
});


// endPoint: retorna o genero filtrando pelo ID
app.get('/v2/filmesAcme/generos/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idGenero = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosGenero = await controllerGeneros.getBuscarGeneroId(idGenero);

    response.status(dadosGenero.status_code);
    response.json(dadosGenero);
})


// primeiro end point usando POST 
app.post('/v2/filmesAcme/genero', cors(), bodyParserJson, async function (request, response,next ){

    // recebe o ContentType com os tipos de dados encaminhados na requisição
    let contentType = request.headers['content-type'];

    // vou receber o que chegar no corpo da requisição e guardar nessa variável local
    let dadosBody = request.body;
    // encaminha os dados para a controller enviar para o DAO
    let resultDadosNovoGenero = await controllerGeneros.setInserirNovoGenero(dadosBody,contentType);


    console.log(resultDadosNovoGenero)
    response.status(200);
    response.json(resultDadosNovoGenero);

})


app.delete('/v1/filmesAcme/deleteGenero/:id', cors (), async function (request,response,next){

    let idGenero = request.params.id

    let dadosGenero = await controllerGeneros.setExcluirGenero(idGenero);

    response.status(dadosGenero.status_code);
    response.json(dadosGenero)
})


app.put('/v1/filmesAcme/uptadeGenero/:id', cors(), bodyParserJson, async function(request,response,next){

    let idGenero = request.params.id
    let contentType = request.headers['content-type'];
    let dadosBody = request.body

    let resultUptadeGenero = await controllerGeneros.setAtualizarGenero(idGenero, dadosBody, contentType);

    console.log();
    response.status(200)
    response.json(resultUptadeGenero)

} )



// ************************************************************************************************************************************* //
// ****************************  CRUD DA CLASSIFICACAO  ************************************************************
// **************************************************************************************************************************************//


//EndPoint : Versão 2.0 - retorna todas as classificacao do Banco de Dados 
app.get('/v2/filmesAcme/classificacao', cors(),async function (request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosClassificacao = await controllerClassificacao.getListarClassificacao();

    // validação para retornar o Json dos filmes ou retornar o erro 404;
    if(dadosClassificacao){
        response.json(dadosClassificacao);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
});


// endPoint: retorna a classificacao filtrando pelo ID
app.get('/v2/filmesAcme/classificacao/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idClassificacao = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosClassificacao = await controllerClassificacao.getBuscarClassificacaoId(idClassificacao);

    response.status(dadosClassificacao.status_code);
    response.json(dadosClassificacao);
})


// primeiro end point usando POST 
app.post('/v2/filmesAcme/classificacao', cors(), bodyParserJson, async function (request, response,next ){

    // recebe o ContentType com os tipos de dados encaminhados na requisição
    let contentType = request.headers['content-type'];

    // vou receber o que chegar no corpo da requisição e guardar nessa variável local
    let dadosBody = request.body;
    // encaminha os dados para a controller enviar para o DAO
    let resultDadosNovaClassificacao = await controllerClassificacao.setInserirNovaClassificacao(dadosBody,contentType);


    console.log(resultDadosNovaClassificacao)
    response.status(200);
    response.json(resultDadosNovaClassificacao);

})


app.delete('/v1/filmesAcme/deleteClassificacao/:id', cors (), async function (request,response,next){

    let idClassificacao = request.params.id

    let dadosClassificacao = await controllerClassificacao.setExcluirClassificacao(idClassificacao);

    response.status(dadosClassificacao.status_code);
    response.json(dadosClassificacao)
})


app.put('/v1/filmesAcme/uptadeClassificacao/:id', cors(), bodyParserJson, async function(request,response,next){

    let idClassificacao = request.params.id
    let contentType = request.headers['content-type'];
    let dadosBody = request.body

    let resultUptadeClassificacao = await controllerClassificacao.setAtualizarClassificacao(idClassificacao, dadosBody, contentType);

    console.log();
    response.status(200)
    response.json(resultUptadeClassificacao)

} )


// ************************************************************************************************************************************* //
// ****************************  CRUD DOS DIRETORES ************************************************************
// **************************************************************************************************************************************//


//EndPoint : Versão 2.0 - retorna todos os diretores do Banco de Dados 
app.get('/v2/filmesAcme/diretores', cors(),async function (request,response,next){

    // chama a função da controller para retornar os atores;
    let dadosDiretores = await controllerDiretores.getListarDiretores();

    // validação para retornar o Json dos filmes ou retornar o erro 404;
    if(dadosDiretores){
        response.json(dadosDiretores);
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro foi encontrado'});
        response.status(404);
    }
});

app.post('/v2/filmesAcme/novoDiretor', cors(), bodyParserJson, async function (request, response){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultDadosNovoDiretor = await controllerDiretores.setInserirDiretor(dadosBody,contentType)
    response.status(resultDadosNovoDiretor.status_code)
    response.json(resultDadosNovoDiretor)
})

app.put('/v2/filmesAcme/updateDiretor/:id', cors(), bodyParserJson, async function(request, response){
   let contentType = request.headers['content-type']
   let dadosBody = request.body
   let idDiretor=request.params.id
   
   let resultDadosNovoDiretor = await controllerDiretores.setAtualizarDiretor(idDiretor,dadosBody,contentType)
   console.log(resultDadosNovoDiretor);
   response.status(200)
   response.json(resultDadosNovoDiretor)
})

// endPoint: retorna o ator filtrando pelo ID
app.get('/v2/filmesAcme/diretor/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idDiretor = request.params.id

    //encaminha o id para a acontroller buscar o filme
    let dadosDiretores = await controllerDiretores.getBuscarDiretorId(idDiretor);

    response.status(dadosDiretores.status_code);
    response.json(dadosDiretores);
})


app.delete('/v1/filmesAcme/deleteDiretor/:id', cors (), async function (request,response,next){

    let idDiretor = request.params.id

    let dadosDiretores = await controllerDiretores.setExcluirDiretor(idDiretor);

    response.status(dadosDiretores.status_code);
    response.json(dadosDiretores)
})

app.get('/v1/filmesAcme/DiretorNome', cors(), async function (request, response){
    let nomeDiretor = request.query.nome
    let dadosDiretores = await controllerDiretores.getBuscarDiretorNome(nomeDiretor)
    response.status(dadosDiretores.status_code)
    response.json(dadosDiretores)
})


app.listen('8080', function(){
    console.log('API FUNCIONANDO')
})











