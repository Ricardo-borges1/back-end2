/*******************************************************
 * Objetivo: arquivo responsável pela validação, consistência de dados das requisições da API de filmes
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*******************************************************/


// IMport das mensagens de erro e configuração do projeto
const message = require ('../modulo/config.js');
const sexoDAO = require ('../model/DAO/sexo.js')
const nacionalidadeDAO = require ('../model/DAO/nacionalidadeDiretor.js')


// Import do arquivo DAO que fará a comuicação do banco de dados 
const diretorDAO = require('../model/DAO/diretor.js')

//função para retornar todos os diretores
const getListarDiretores = async function(){

    try {

    // Cri o objeto JSON
    let diretoresJSON = {};

    //Chama a funcão do DAO para retornar os dados da tabela de atores
    let dadosDiretores = await diretorDAO.selectAllDiretores();
        if (dadosDiretores) {
            if(dadosDiretores.length > 0){
                for (let diretor of dadosDiretores){
                    let sexoDiretor = await sexoDAO.selectByIdSexo(diretor.tbl_sexo_id)
                    delete diretor.tbl_sexo_id
                    diretor.sexo = sexoDiretor
                }
                for (let diretor of dadosDiretores){
                    let nacionalidadeDiretor = await nacionalidadeDAO.selectDiretoresNacionalidadeById(diretor.id)
                    if(nacionalidadeDiretor.length > 0){
                        diretor.nacionalidade = nacionalidadeDiretor
                    }
                }
                diretoresJSON.diretor = dadosDiretores
                diretoresJSON.quantidade = dadosDiretores.length
                diretoresJSON.status_code = 200
                return diretoresJSON
            } else 
            return message.ERROR_NOT_FOUND
        } else 
            return message.ERROR_INTERNAL_SERVER_DB
} catch (error) {
    return message.ERROR_INTERNAL_SERVER;
}
}

//função para buscar ator pelo ID
const getBuscarDiretorId = async function (id){

    try{

    
    // Recebe o id do filme
    let idDiretor = id;
    //Cria o objeto JSON
    let diretorJSON = {};

    //tratamento do ID para verificar se o ID é válido(vazio, indefinido ou não numerico)
    if(idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)){
        return message.ERROR_INVALID_ID //400
    } else {

        // encaminha o id para o DAO buscar no banco de dados 
        let dadosDiretores = await diretorDAO.selectDiretoresById(idDiretor)

        // verifca se o DAO retornou dados 
        if(dadosDiretores){

            // Validação para verificar a quantidade de itens retornados
            if(dadosDiretores.length > 0){
                 // Cria o JSON para retorno 
            diretorJSON.diretor = dadosDiretores;
            diretorJSON.status_code = 200;

            return diretorJSON;
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
const setExcluirDiretor = async function(id){

    try {

    let idDiretor = id;

    if(idDiretor == ''  || idDiretor == undefined || isNaN (id)){
        return message.ERROR_INVALID_ID //400
    } else {
        let diretorById = await diretorDAO.selectDiretoresById(id)
        
        if(diretorById.length > 0){
            let deleteDiretores = await diretorDAO.deleteDiretores(id)

            if (deleteDiretores){
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

const getBuscarDiretorNome = async function (nome){
    try {
        
        let nomeDiretor = nome 
        let diretorJSON = {}
        if (nomeDiretor == '' ||nomeDiretor==undefined||!isNaN(nomeDiretor))
        return message.ERROR_INVALID_ID
        else {
            let dadosDiretores = await diretorDAO.selectByNomeDiretor (nomeDiretor)
            if (dadosDiretores){
                if (dadosDiretores.length>0){
                    diretorJSON.diretor = dadosDiretores
                    diretorJSON.status_code = 200 
                    return diretorJSON
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


const setAtualizarDiretor = async function (id, dadosDiretores, contentType){
    try {
        
        if(String(contentType).toLowerCase()=='application/json'){
             let idDiretor=id
             
            if(idDiretor==''||idDiretor==undefined||isNaN(idDiretor))
                return message.ERROR_INVALID_ID
            else{
               
                let diretores =await diretorDAO.selectDiretoresById(idDiretor)
                if(diretores){
                 
                    let updateDiretoresJSON={}
                    let updateDiretores=await diretorDAO.updateDiretores(idDiretor, dadosDiretores)
                    if(updateDiretores){
                        updateDiretoresJSON.diretor=dadosDiretores
                        updateDiretores.status=message.SUCESS_UPTADE_ITEM.status
                        updateDiretores.status_code=message.SUCESS_UPTADE_ITEM.status_code
                        updateDiretores.message=message.SUCESS_UPTADE_ITEM.message
                        return updateDiretores
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


const setInserirDiretor = async function (dadosDiretores, contentType){
    try {
        
        if(String(contentType).toLowerCase()=='application/json'){
            let novoDiretorJSON={}
            let ultimoID
            
            if(
            dadosDiretores.nome==''            ||dadosDiretores.nome==undefined            ||dadosDiretores.nome==null            ||dadosDiretores.nome.length>100            ||
            dadosDiretores.data_nascimento=='' ||dadosDiretores.data_nascimento==undefined ||dadosDiretores.data_nascimento==null ||dadosDiretores.data_nascimento.length!=10 ||
            dadosDiretores.biografia==''       ||dadosDiretores.biografia==undefined       ||dadosDiretores.biografia==null       ||dadosDiretores.biografia.length>65000     ||
            dadosDiretores.foto==''            ||dadosDiretores.foto==undefined            ||dadosDiretores.foto==null            ||dadosDiretores.foto.length>150            ||
            dadosDiretores.sexo==''     ||dadosDiretores.sexo==undefined         ||dadosDiretores.sexo==null         
            ) {
                
                return message.ERROR_REQUIRED_FIELDS
            } else{
                let validateStatus=false
                if(dadosDiretores.data_falecimento!=null&&dadosDiretores.data_falecimento!=''&&dadosDiretores.data_falecimento!=undefined){
                    if(dadosDiretores.data_falecimento.length!=10){
                        
                        return message.ERROR_REQUIRED_FIELDS
                    }else{
                        validateStatus=true
                    }
                }else{
                    validateStatus=true
                }
    
                if(validateStatus){
                    let novoDiretor=await diretorDAO.insertDiretores(dadosDiretores)
                    console.log(novoDiretor);
                    if(novoDiretor){
                       
                        novoDiretorJSON.diretor=dadosDiretores
                        novoDiretorJSON.status=message.SUCESS_CREATED_ITEM.status
                        novoDiretorJSON.status_code=message.SUCESS_CREATED_ITEM.status_code
                        novoDiretorJSON.message=message.SUCESS_CREATED_ITEM.message

                        
                        ultimoID=await diretorDAO.selectLastId()
                        dadosDiretores.id=ultimoID[0].id  
                        
                        return novoDiretorJSON
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
    getListarDiretores,
    getBuscarDiretorId,
    setExcluirDiretor,
    getBuscarDiretorNome,
    setAtualizarDiretor,
    setInserirDiretor

}