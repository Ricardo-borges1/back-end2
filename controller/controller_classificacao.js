/*******************************************************
 * Objetivo: arquivo responsável pela validação, consistência de dados das requisições da API de filmes
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/


// IMport das mensagens de erro e configuração do projeto
const message = require ('../modulo/config.js');


// Import do arquivo DAO que fará a comuicação do banco de dados 
const classificacaoDAO = require('../model/DAO/classificacao.js')


//função para retornar todas as classificacoes
const getListarClassificacao = async function(){

    try {

    // Cri o objeto JSON
    let classificacaoJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosClassificacao = await classificacaoDAO.selectAllClassificacao();

    // Validação para verificar s existem dados 
    if (dadosClassificacao){

        if(dadosClassificacao.length > 0){
            // Cria o JSON para devolver para o APP
            classificacaoJSON.classificacao = dadosClassificacao;
            classificacaoJSON.quantidade = dadosClassificacao.length;
            classificacaoJSON.status_code = 200;
        return classificacaoJSON;
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


const setInserirNovaClassificacao = async function (dadosClassificacao, contentType ){

    try{

console.log(contentType);
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let novoClassificacaoJSON = {};
    

    // validação de campos obrigatorios ou com digitação inválida
    if(dadosClassificacao.caracteristicas == ''    || dadosClassificacao.caracteristicas == undefined       ||  dadosClassificacao.caracteristicas == null               || dadosClassificacao.caracteristicas.length > 800 ||
       dadosClassificacao.faixa_etaria == ''  ||   dadosClassificacao.faixa_etaria == undefined  || dadosClassificacao.faixa_etaria == null   || dadosClassificacao.faixa_etaria.length > 2 ||
       dadosClassificacao.classificacao == '' ||  dadosClassificacao.classificacao == undefined || dadosClassificacao.classificacao == null  || dadosClassificacao.classificacao.length > 200 ||  
       dadosClassificacao.icone == '' ||  dadosClassificacao.icone == undefined || dadosClassificacao.icone == null  || dadosClassificacao.icone > 200    
    ){
        
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        let validateStatus = true;

     // validação para verificar se podemos encaminhar os dados para o DA0
     if(validateStatus){

        // Encaminha os dados do filme para o DAO inserir dados
        let novoClassificacao = await classificacaoDAO.insertClassificacao(dadosClassificacao);

        console.log(novoClassificacao);

        // validação para verificar se o DAO inseriu os dados do BD
        if (novoClassificacao)
        {

            let ultimoId = await classificacaoDAO.InsertByIdClassificacao()
            dadosClassificacao.id = ultimoId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            novoClassificacaoJSON.classificacao  = dadosClassificacao
            novoClassificacaoJSON.status = message.SUCESS_CREATED_ITEM.status
            novoClassificacaoJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
            novoClassificacaoJSON.message = message.SUCESS_CREATED_ITEM.message 

            return novoClassificacaoJSON; // 201
        }else{
         
            return message.ERROR_INTERNAL_SERVER_DB // 500
            }
        }   
      }
    } else {
        return message.ERROR_CONTENT_TYPE // 415
    }
} catch(error){
    return message.ERROR_INTERNAL_SERVER // 500
}

}

const setAtualizarClassificacao = async function(id, dadosClassificacao, contentType){
    
    try{
        let idClassificacao = id;

        if(idClassificacao == '' || idClassificacao == undefined || isNaN (idClassificacao)){
            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateClassificacaoJson = {};
            
            if(dadosClassificacao.caracteristicas == ''    || dadosClassificacao.caracteristicas == undefined       ||  dadosClassificacao.caracteristicas == null               || dadosClassificacao.caracteristicas.length > 800 ||
            dadosClassificacao.faixa_etaria == ''  ||   dadosClassificacao.faixa_etaria == undefined  || dadosClassificacao.faixa_etaria == null   || dadosClassificacao.faixa_etaria.length > 2 ||
            dadosClassificacao.classificacao == '' ||  dadosClassificacao.classificacao == undefined || dadosClassificacao.classificacao == null  || dadosClassificacao.classificacao.length > 200 ||  
            dadosClassificacao.icone == '' ||  dadosClassificacao.icone == undefined || dadosClassificacao.icone == null  || dadosClassificacao.icone > 200    
         ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let validateStatus = true;

            let classificacaoById = await classificacaoDAO.selectClassificacaoById(id)

            if(classificacaoById.length > 0){
                if (validateStatus){
                    let uptadeClassificacao = await classificacaoDAO.updateClassificacao(id,dadosClassificacao);
                    console.log(uptadeClassificacao);
    
                    if(uptadeClassificacao){
                      
                        updateClassificacaoJson.classificacao = dadosClassificacao
                        updateClassificacaoJson.status = message.SUCESS_UPTADE_ITEM.status
                        updateClassificacaoJson.status_code = message.SUCESS_UPTADE_ITEM.status_code
                        updateClassificacaoJson.message = message.SUCESS_UPTADE_ITEM.message
    
                        return updateClassificacaoJson;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirClassificacao = async function(id){

    try {

    let idClassificacao = id;

    if(idClassificacao == ''  || idClassificacao == undefined || isNaN (id)){
        return message.ERROR_INVALID_ID //400
    } else {
        let classificacaoById = await classificacaoDAO.selectClassificacaoById(id)
        
        if(classificacaoById.length > 0){
            let deleteClassificacao = await classificacaoDAO.deleteClassificacao(id)

            if (deleteClassificacao){
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

const getBuscarClassificacaoId = async function (id){

    try{

    
    // Recebe o id do genero
    let idClassificacao = id;
    //Cria o objeto JSON
    let classificacaoJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosClassificacao = await classificacaoDAO.selectClassificacaoById(id)

        // verifca se o DAO retornou dados 
        if(dadosClassificacao){

            // Validação para verificar a quantidade de itens retornados
            if(dadosClassificacao.length > 0){
                 // Cria o JSON para retorno 
            classificacaoJSON.classificacao = dadosClassificacao;
            classificacaoJSON.status_code = 200;

            return classificacaoJSON;
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

module.exports = {
    getListarClassificacao,
    setInserirNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getBuscarClassificacaoId
}