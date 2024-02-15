/*******************************************************
 * Objetivo: arquivo responsável pelo acesso ao Banco de Dados mySql, aqui faremos o CRUD na tabela de filmes
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*/

// ASYNC OBRIGATORIO
//funcao para inserir um filme no banco de dados


// função que faz o import da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');


// Instancia d classe PrismaClient 
const prisma = new PrismaClient();

const insertFilme = async function(){

}

//funcao para atualizar um filme no banco de dados
const updateFilme = async function(){

}

//função para excluir um filme no banco de dodos
const deleteFilme = async function (){

}


//função para listar todos os filmes do banco de dados
const selectAllFilmes = async function(){

    let sql = 'select * from tbl_filme';

    //$queryRawUnsafe(sql)
    //$queryRaw (select * from tbl_filme')

    //Executa o script SQL no BD e recebe o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    //validação para retornar os dados
    if(rsFilmes.length > 0)
        return rsFilmes;
    else
        return false;

}
  

const selectByNome = async function (nome){

    
    let sql = 'select * from tbl_filme where nome LIKE' + nome
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    if(rsFilmes.length>0)
        return rsFilmes;
    else
        return false
}

// função para buscar um filme no banco de dados filtrando pelo id 
const selectByIdFilme = async function (){

}


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNome
}