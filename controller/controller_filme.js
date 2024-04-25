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
const setInserirNovoFilme = async function (dadosFilme, contentType ){

    try{

    // validação para aplicação do contentType
    if(String(contentType).toLowerCase() == 'application/json'){

    // cria o objeto JSON para devolver os dados criados na requisição
    let novoFilmeJSON = {};
    

    // validação de campos obrigatorios ou com digitação inválida
    if(dadosFilme.nome == ''                      || dadosFilme.nome == undefined               ||  dadosFilme.nome == null               || dadosFilme.nome.length > 80             || 
        dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined            ||  dadosFilme.sinopse == null            || dadosFilme.sinopse.length > 65000       ||
        dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined            ||  dadosFilme.duracao ==  null           || dadosFilme.duracao.length > 8           ||
        dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined    ||  dadosFilme.data_lancamento == null    || dadosFilme.data_lancamento.length != 10 ||
        dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined          ||  dadosFilme.foto_capa ==  null         || dadosFilme.foto_capa.length > 200       ||
        dadosFilme.valor_unitario.length > 6 || 
        dadosFilme.tbl_classificacao_id == '' || dadosFilme.tbl_classificacao_id == undefined || dadosFilme.tbl_classificacao_id == null   
    ){
        
        // return do status code 400
        return message.ERROR_REQUIRED_FIELDS
    
    } else {

        let validateStatus = false;

        // validação da data de relancamento ja que ela não é obrigatória
        if(dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != '' &&
            dadosFilme.data_relancamento != undefined){

            // validação para verificar se a data está com a quantidade de digitos corretos 
            if (dadosFilme.data_relancamento.length != 10) {
                
                return message.ERROR_REQUIRED_FIELDS; //400
            }else{
                validateStatus = true;
            }
        }else{
            validateStatus = true
        }


     // validação para verificar se podemos encaminhar os dados para o DA0
     if(validateStatus){

        // Encaminha os dados do filme para o DAO inserir dados
        let novoFilme = await filmeDAO.insertFilme(dadosFilme);

        // validação para verificar se o DAO inseriu os dados do BD
        if (novoFilme)
        {

            let ultimoId = await filmeDAO.InsertById ()
            dadosFilme.id = ultimoId[0].id
        
            // se inseriu cria o JSON dos dados (201)
            novoFilmeJSON.filme  = dadosFilme
            novoFilmeJSON.status = message.SUCESS_CREATED_ITEM.status
            novoFilmeJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
            novoFilmeJSON.message = message.SUCESS_CREATED_ITEM.message 

            return novoFilmeJSON; // 201
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
  
//função para validar e atualizar um filme
const setAtualizarFilme = async function(id, dadosFilme, contentType){
    
    console.log("aaaaaaa");
    try{
        let idFilme = id;

        if(idFilme == '' || idFilme == undefined || isNaN (idFilme)){
            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateFilmeJson = {};
            
            console.log("aaaaaaa");
            if(dadosFilme.nome == ''                      || dadosFilme.nome == undefined               ||  dadosFilme.nome == null               || dadosFilme.nome.length > 80             || 
            dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined            ||  dadosFilme.sinopse == null            || dadosFilme.sinopse.length > 65000       ||
            dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined            ||  dadosFilme.duracao ==  null           || dadosFilme.duracao.length > 8           ||
            dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined    ||  dadosFilme.data_lancamento == null    || dadosFilme.data_lancamento.length != 10 ||
            dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined          ||  dadosFilme.foto_capa ==  null         || dadosFilme.foto_capa.length > 200       ||
            dadosFilme.valor_unitario.length > 6      || 
            dadosFilme.tbl_classificacao_id == '' || dadosFilme.tbl_classificacao_id == undefined || dadosFilme.tbl_classificacao_id == null   
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let validateStatus = false;

            if (dadosFilme.data_relancamento != null &&
                dadosFilme.data_relancamento != '' &&
                dadosFilme.data_relancamento != undefined){

                if (dadosFilme.data_relancamento.length != 10){
                    return message.ERROR_REQUIRED_FIELDS;
                }else{
                    validateStatus = true;
                }
            } else {
                validateStatus = true 
            }

            let filmeById = await filmeDAO.selectByIdFilme(id)
           
            console.log(filmeById);
            if(filmeById.length > 0){
                if (validateStatus){
                    let uptadeFilme = await filmeDAO.updateFilme(id,dadosFilme);
    
                    if(uptadeFilme){
                      
                        updateFilmeJson.filme = dadosFilme
                        updateFilmeJson.status = message.SUCESS_UPTADE_ITEM.status
                        updateFilmeJson.status_code = message.SUCESS_UPTADE_ITEM.status_code
                        updateFilmeJson.message = message.SUCESS_UPTADE_ITEM.message
    
                        return updateFilmeJson;
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
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }

}

//funcção para excluir um filme
const setExcluirFilme = async function(id){

        try {

        let idFilme = id;

        if(idFilme == ''  || idFilme == undefined || isNaN (id)){
            return message.ERROR_INVALID_ID //400
        } else {
            let filmeById = await filmeDAO.selectByIdFilme(id)
            
            if(filmeById.length > 0){
                let deleteFilme = await filmeDAO.deleteFilme(id)

                if (deleteFilme){
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

//função para retornar todos os filmes
const getListarFilmes = async function(){

    try {

    
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

} catch (error) {
    
    return message.ERROR_INTERNAL_SERVER;
}
}

const getBuscarFilmeNome = async(nome) => {
     // Cria o objeto JSON

     try{

     
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
  } catch (error){
    return message.ERROR_INTERNAL_SERVER
  }
}

//função para buscar filme pelo ID
const getBuscarFilme = async function (id){

    try{

    
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
} catch (error) {
    return message.ERROR_INTERNAL_SERVER
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
