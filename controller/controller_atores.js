/*******************************************************
 * Objetivo: arquivo responsável pela validação, consistência de dados das requisições da API de filmes
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/


// IMport das mensagens de erro e configuração do projeto
const message = require ('../modulo/config.js');
const sexoDAO = require ('../model/DAO/sexo.js')
const nacionalidadeDAO = require ('../model/DAO/nacionalidadeAtor.js')


// Import do arquivo DAO que fará a comuicação do banco de dados 
const atorDAO = require('../model/DAO/atores.js')


//função para retornar todos os atores
const getListarAtores = async function(){

    try {

    // Cri o objeto JSON
    let atoresJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de atores
    let dadosAtores = await atorDAO.selectAllAtores();
        if (dadosAtores) {
            if(dadosAtores.length > 0){
                for (let ator of dadosAtores){
                    let sexoAtor = await sexoDAO.selectByIdSexo(ator.tbl_sexo_id)
                    delete ator.tbl_sexo_id
                    ator.sexo = sexoAtor
                }
                for (let ator of dadosAtores){
                    let nacionalidadeAtor = await nacionalidadeDAO.selectAtoresNacionalidadeById(ator.id)
                    if(nacionalidadeAtor.length > 0){
                        ator.nacionalidade = nacionalidadeAtor
                    }
                }
                atoresJSON.atores = dadosAtores
                atoresJSON.quantidade = dadosAtores.length
                atoresJSON.status_code = 200
                return atoresJSON
            } else 
            return message.ERROR_NOT_FOUND
        } else 
            return message.ERROR_INTERNAL_SERVER_DB
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
        let dadosAtores = await atorDAO.selectAtoresById(idAtor)

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

 const getBuscarAtorNome = async function (nome){
    try {
        
        let nomeAtor = nome 
        let atoresJSON = {}
        if (nomeAtor == '' ||nomeAtor==undefined||!isNaN(nomeAtor))
        return message.ERROR_INVALID_ID
        else {
            let dadosAtores = await atorDAO.selectByNomeAtor (nomeAtor)
            if (dadosAtores){
                if (dadosAtores.length>0){
                    atoresJSON.atores = dadosAtores
                    atoresJSON.status_code = 200 
                    return atoresJSON
                } else 
                return message.ERROR_NOT_FOUND
            }
            else 
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarAtor = async function (id, dadosAtores, contentType){
    try {
        
        if(String(contentType).toLowerCase()=='application/json'){
             let idAtor=id
             
            if(idAtor==''||idAtor==undefined||isNaN(idAtor))
                return message.ERROR_INVALID_ID
            else{
               
                let atores =await atorDAO.selectAtoresById(idAtor)
                if(atores){
                 
                    let updateAtoresJSON={}
                    let updateAtores=await atorDAO.updateAtores(idAtor, dadosAtores)
                    if(updateAtores){
                        updateAtoresJSON.ator=dadosAtores
                        updateAtores.status=message.SUCESS_UPTADE_ITEM.status
                        updateAtores.status_code=message.SUCESS_UPTADE_ITEM.status_code
                        updateAtores.message=message.SUCESS_UPTADE_ITEM.message
                        return updateAtores
                    }
                    else{
                        return message.ERROR_NOT_FOUND
                    }
                }
                else{
                    return message.ERROR_NOT_FOUND
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setInserirAtor = async function (dadosAtores, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let novoAtorJSON={}
            let ultimoID
            console.log(dadosAtores);
            if(
            dadosAtores.nome==''            ||dadosAtores.nome==undefined            ||dadosAtores.nome==null            ||dadosAtores.nome.length>100            ||
            dadosAtores.data_nascimento=='' ||dadosAtores.data_nascimento==undefined ||dadosAtores.data_nascimento==null ||dadosAtores.data_nascimento.length!=10 ||
            dadosAtores.biografia==''       ||dadosAtores.biografia==undefined       ||dadosAtores.biografia==null       ||dadosAtores.biografia.length>65000     ||
            dadosAtores.foto==''            ||dadosAtores.foto==undefined            ||dadosAtores.foto==null            ||dadosAtores.foto.length>150            ||
            dadosAtores.sexo[0].nome==''     ||dadosAtores.sexo[0].nome==undefined         ||dadosAtores.sexo[0].nome==null         ||dadosAtores.sexo[0].nome.length>20
            ) {
                console.log('aqui');
                return message.ERROR_REQUIRED_FIELDS
            } else{
                let validateStatus=false
                if(dadosAtores.data_falecimento!=null&&dadosAtores.data_falecimento!=''&&dadosAtores.data_falecimento!=undefined){
                    if(dadosAtores.data_falecimento.length!=10){
                        console.log('ali');
                        return message.ERROR_REQUIRED_FIELDS
                    }else{
                        validateStatus=true
                    }
                }else{
                    validateStatus=true
                }
    
                if(validateStatus){
                    let novoAtor=await atorDAO.insertAtores(dadosAtores)
                    console.log(novoAtor);
                    if(novoAtor){
                        console.log('oioioii');
                        novoAtorJSON.ator=dadosAtores
                        novoAtorJSON.status=message.SUCESS_CREATED_ITEM.status
                        console.log('aaaaaaaaaaaa');
                        novoAtorJSON.status_code=message.SUCESS_CREATED_ITEM.status_code
                        novoAtorJSON.message=message.SUCESS_CREATED_ITEM.message

                        console.log(novoAtorJSON);
                        ultimoID=await atorDAO.selectLastId()
                        dadosAtores.id=ultimoID[0].id  
                        
                        return novoAtorJSON
                    }
    
                    else{
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    getListarAtores,
    getBuscarAtorId,
    setExcluirAtor,
    getBuscarAtorNome,
    setAtualizarAtor,
    setInserirAtor
}