/*******************************************************
 * Objetivo: arquivo responsável pela validação, consistência de dados das requisições da API de filmes
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// IMport das mensagens de erro e configuração do projeto
const message = require ('../modulo/config.js');



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

        if(dadosFilmes.length > 0){
            // Cria o JSON para devolver para o APP
        filmesJSON.filmes = dadosFilmes;
        filmesJSON.quantidade = dadosFilmes.length;
        filmesJSON.status_code = 200;
        return filmesJSON;
        } else {
            return message.ERROR_NOT_FOUND
        } 
    }else{
        return message.ERROR_INTERNAL_SERVER_DB; 
    }
}

const getBuscarFilmeNome = async(nome) => {
     // Cri o objeto JSON

     let nomeFilme = nome
     let filmesJSON = {};

    if (nomeFilme == '' || nomeFilme == undefined){
        return message.ERROR_INVALID_ID
    } else {
         //Chama a funcão do DAO para retornar os dados da tabela de filmes
     let dadosFilmes = await filmeDAO.selectByNome(nome)


     if(dadosFilmes){
        if(dadosFilmes.length > 0){
                filmesJSON.filme = dadosFilmes;
                filmesJSON.status_code = 200;

                // console.log(filmesJSON)

                return filmesJSON;
        } else {
            return message.ERROR_NOT_FOUND;
        }
     } else {
        return message.ERROR_INTERNAL_SERVER_DB
     }

    }
}

//função para buscar filme pelo ID
const getBuscarFilme = async function (id){

    // Recebe o id do filme
    let idFilme = id;
    //Cria o objeto JSON
    let filmesJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosFilme = await filmeDAO.selectByIdFilme(id)

        // verifca se o DAO retornou dados 
        if(dadosFilme){

            // Validação para verificar a quantidade de itens retornados
            if(dadosFilme.length > 0){
                 // Cria o JSON para retorno 
            filmesJSON.filme = dadosFilme;
            filmesJSON.status_code = 200;

            return filmesJSON;
            } else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}


module.exports = {
    setAtualizarFilme,
    setInserirNovoFilme,
    setExcluirFilme,
    getBuscarFilme,
    getListarFilmes,
    getBuscarFilmeNome
}
