/*******************************************************
 * Objetivo: arquivo responsável pela validação, consistência de dados das requisições da API de filmes
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// Import do arquivo DAO que fará a comuicação do banco de dados 
const filmeDAO = require('../model/DAO/filme.js')


//função para validar e inserir um novo filme
const setInserirNovoFilme = async function (){

}


//função para validar e atualizar um filme
const setAtualizarFilme = async function(){

}

//funcção para excluir um filme
const setExcluirFilme = async function(){

}

//função para retornar todos os filmes
const getListarFilmes = async function(){

    // Cri o objeto JSON
    let filmesJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosFilmes = await filmeDAO.selectAllFilmes();

    // Validação para verificar s existem dados 
    if (dadosFilmes){
        // Cria o JSON para devolver para o APP
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        return filmesJSON;

    }else{
        return false; 
    }
}

const getBuscarFilmeNome = async(nome) => {
     // Cri o objeto JSON
     let filmesJSON = {nome};

     //Chama a funcão do DAO para retornar os dados da tabela de filmes
     let dadosFilmes = await filmeDAO.selectByNome(nome)
 
     // Validação para verificar s existem dados 
     if (dadosFilmes){
         // Cria o JSON para devolver para o APP
         filmesJSON.filmes = dadosFilmes;
         filmesJSON.quantidade = dadosFilmes.length;
         filmesJSON.status_code = 200;
         return filmesJSON;
 
     }else{
         return false; 
     }
}

//função para buscar filme pelo ID
const getBuscarFilme = async function (){

}



module.exports = {
    setAtualizarFilme,
    setInserirNovoFilme,
    setExcluirFilme,
    getBuscarFilme,
    getListarFilmes,
    getBuscarFilmeNome
}
