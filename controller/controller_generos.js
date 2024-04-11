/*******************************************************
 * Objetivo: arquivo responsável pela validação, consistência de dados das requisições da API de filmes
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/

// IMport das mensagens de erro e configuração do projeto
const message = require ('../modulo/config.js');


// Import do arquivo DAO que fará a comuicação do banco de dados 
const generoDAO = require('../model/DAO/generos.js')


//função para retornar todos os generos
const getListarGeneros = async function(){

    try {

    // Cri o objeto JSON
    let generosJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de filmes
    let dadosGenero = await generoDAO.selectAllGeneros();

    // Validação para verificar s existem dados 
    if (dadosGenero){

        if(dadosGenero.length > 0){
            // Cria o JSON para devolver para o APP
        generosJSON.generos = dadosGenero;
        generosJSON.quantidade = dadosGenero.length;
        generosJSON.status_code = 200;
        return generosJSON;
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

//função para validar e inserir um novo genero
const setInserirNovoGenero = async function (dadosGenero, contentType ){

    try{

console.log(contentType);
    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let novoGeneroJSON = {};
    

    
    // validação de campos obrigatorios ou com digitação inválida
    if(dadosGenero.nome == ''    || dadosGenero.nome == undefined       ||  dadosGenero.nome == null               || dadosGenero.nome.length > 45         
    ){
        
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        let validateStatus = true;

     // validação para verificar se podemos encaminhar os dados para o DA0
     if(validateStatus){

        // Encaminha os dados do filme para o DAO inserir dados
        let novoGenero = await generoDAO.insertGenero(dadosGenero);

        console.log(novoGenero);

        // validação para verificar se o DAO inseriu os dados do BD
        if (novoGenero)
        {

            let ultimoId = await generoDAO.InsertByIdGenero ()
            dadosGenero.id = ultimoId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            novoGeneroJSON.genero  = dadosGenero
            novoGeneroJSON.status = message.SUCESS_CREATED_ITEM.status
            novoGeneroJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
            novoGeneroJSON.message = message.SUCESS_CREATED_ITEM.message 

            return novoGeneroJSON; // 201
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

//função para validar e atualizar um genero
const setAtualizarGenero = async function(id, dadosGenero, contentType){
    
    try{
        let idGenero = id;

        if(idGenero == '' || idGenero == undefined || isNaN (idGenero)){
            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateGeneroJson = {};
            
            if(dadosGenero.nome == ''                      || dadosGenero.nome == undefined               ||  dadosGenero.nome == null               || dadosGenero.nome.length > 40
            
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let validateStatus = true;

            let generoById = await generoDAO.selectGeneroById(id)

            if(generoById.length > 0){
                if (validateStatus){
                    let uptadeGenero = await generoDAO.updateGenero(id,dadosGenero);
                    console.log(uptadeGenero);
    
                    if(uptadeGenero){
                      
                        updateGeneroJson.genero = dadosGenero
                        updateGeneroJson.status = message.SUCESS_UPTADE_ITEM.status
                        updateGeneroJson.status_code = message.SUCESS_UPTADE_ITEM.status_code
                        updateGeneroJson.message = message.SUCESS_UPTADE_ITEM.message
    
                        return updateGeneroJson;
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

//funcção para excluir um genero
const setExcluirGenero = async function(id){

    try {

    let idGenero = id;

    if(idGenero == ''  || idGenero == undefined || isNaN (id)){
        return message.ERROR_INVALID_ID //400
    } else {
        let generoById = await generoDAO.selectGeneroById(id)
        
        if(generoById.length > 0){
            let deleteGenero = await generoDAO.deleteGenero(id)

            if (deleteGenero){
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

//função para buscar genero pelo ID
const getBuscarGeneroId = async function (id){

    try{

    
    // Recebe o id do genero
    let idGenero = id;
    //Cria o objeto JSON
    let generoJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idGenero == '' || idGenero == undefined || isNaN(idGenero)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosGenero = await generoDAO.selectGeneroById(id)

        // verifca se o DAO retornou dados 
        if(dadosGenero){

            // Validação para verificar a quantidade de itens retornados
            if(dadosGenero.length > 0){
                 // Cria o JSON para retorno 
            generoJSON.genero = dadosGenero;
            generoJSON.status_code = 200;

            return generoJSON;
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
    getListarGeneros,
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getBuscarGeneroId
}