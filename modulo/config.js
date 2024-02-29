/***************************************
 * Objtivo : arquivo responsável pela padronização das variáveis globais utilizadas no projeto
 * Data : 22/02/2024
 * Autor: Ricardo Borges 
 * Versão: 1.0
 */

/*********************** MENSAGENS DE ERRO ************************************/

const ERROR_INVALID_ID = {status : false, status_code: 400, message: 'O ID encaminhado na requisição não é válido'}
const ERROR_NOT_FOUND = {status : false, status_code: 404, message: 'Não foram encontrados itens'}
const ERROR_INTERNAL_SERVER_DB = {status : false, status_code: 500, message: 'Não foi possivel processar a requisição devido a um problema na comunicação com o bando de dados. Contate o administrador'}
const ERROR_REQUIRED_FIELDS = {status : false, status_code: 400, message: 'Existem campos requeridos que não foram preenchidos ou não atendem aos critérios de digitação !!'}


/*********************** MENSAGENS DE SUCESSO ************************************/

const SUCESS_CREATED_ITEM = {status : true, status_code: 201, message: 'Item criado com sucesso'}


module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM
}