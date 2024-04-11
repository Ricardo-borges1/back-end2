/*******************************************************
 * Objetivo: arquivo responsável pela validação, consistência de dados das requisições da API de filmes
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/


// IMport das mensagens de erro e configuração do projeto
const message = require ('../modulo/config.js');


// Import do arquivo DAO que fará a comuicação do banco de dados 
const atorDAO = require('../model/DAO/atores.js')


//função para retornar todos os atores
const getListarAtores = async function(){

    try {

    // Cri o objeto JSON
    let atoresJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de atores
    let dadosAtores = await atorDAO.selectAllAtores();

    // Validação para verificar s existem dados 
    if (dadosAtores){

        if(dadosAtores.length > 0){
            // Cria o JSON para devolver para o APP
        atoresJSON.atores = dadosAtores;
        atoresJSON.quantidade = dadosAtores.length;
        atoresJSON.status_code = 200;
        return atoresJSON;
        } else {
            return message.ERROR_NOT_FOUND
        } 
    }else{
        return message.ERROR_INTERNAL_SERVER_DB; 
    }

} catch (error) {
    return message.ERROR_INTERNAL_SERVER;
}
}


//função para buscar ator pelo ID
const getBuscarAtorId = async function (id){

    try{

    
    // Recebe o id do filme
    let idAtor = id;
    //Cria o objeto JSON
    let atoresJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idAtor == '' || idAtor == undefined || isNaN(idAtor)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosAtores = await atorDAO.selectAtoresById(id)

        // verifca se o DAO retornou dados 
        if(dadosAtores){

            // Validação para verificar a quantidade de itens retornados
            if(dadosAtores.length > 0){
                 // Cria o JSON para retorno 
            atoresJSON.atores = dadosAtores;
            atoresJSON.status_code = 200;

            return atoresJSON;
            } else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
} catch (error) {
    return message.ERROR_INTERNAL_SERVER
}
}

//funcção para excluir um ator 
const setExcluirAtor = async function(id){

    try {

    let idAtor = id;

    if(idAtor == ''  || idAtor == undefined || isNaN (id)){
        return message.ERROR_INVALID_ID //400
    } else {
        let atorById = await atorDAO.selectAtoresById(id)
        
        if(atorById.length > 0){
            let deleteAtores = await atorDAO.deleteAtores(id)

            if (deleteAtores){
                return message.SUCESS_DELETE_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }else{
            return message.ERROR_NOT_FOUND
        }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


module.exports = {
    getListarAtores,
    getBuscarAtorId,
    setExcluirAtor
}