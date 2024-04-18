/*******************************************************
 * Objetivo: arquivo responsável pelo acesso ao Banco de Dados mySql, aqui faremos os gets do sexo
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*/


// função que faz o import da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');


// Instancia d classe PrismaClient 
const prisma = new PrismaClient();


//função para listar todos os sexos do banco de dados
const selectAllNacionalidade = async function(){

    try {

        let sql = 'select * from tbl_nacionalidade';
        //Executa o script SQL no BD e recebe o retorno dos dados
    let rsNacionalidade = await prisma.$queryRawUnsafe(sql);
    
    return rsNacionalidade;
    } catch (error) {
        return false;
    }
}

// função para buscar um sexo no banco de dados filtrando pelo id 
const selectByIdNacionalidade = async function (id){

    try {
        
    //script sql para filtrar pelo id
    let sql = `select * from tbl_nacionalidade where id = ${id}`;
    //executa o sql no banco de dados
    let rsNacionalidade = await prisma.$queryRawUnsafe(sql);

    return rsNacionalidade;

    } catch (error) {
        return false
    }
}    

module.exports = {
    selectAllNacionalidade,
    selectByIdNacionalidade

}