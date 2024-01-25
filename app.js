//app importa funcoes


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use((request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods', 'GET');
    app.use(cors())
    
    next();
})


app.get('/v1/filmesAcme/filmes', cors(), async function(request,response,next){

    let filme = require ('./controller/funcoes');
    let filmes = filme.filmes();

        response.json(filmes);
        response.status(200);
    
} )


app.get('/v1/filmesAcme/filme/:id', cors(), async function(request,response,next){


    let mostrarFilme = request.params.id
    let filme = require ('./controller/funcoes');
    let filmes1 = filme.filme(mostrarFilme);

        response.json(filmes1);
        response.status(200);
} )




app.listen('8080', function(){
    console.log('API FUNCIONANDO')
})











