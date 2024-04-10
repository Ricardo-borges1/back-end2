/*******************************************************
 * Objetivo: arquivo responsável pelo acesso ao Banco de Dados mySql, aqui faremos o CRUD na tabela de atores
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


const selectAllAtores = async function(){

    try {
        let sql = 'select * from tbl_atores order by id desc'; 

    let rsAtores = await prisma.$queryRawUnsafe(sql)

    if(rsAtores.length > 0 )
    return rsAtores
    } catch (error) {
        return false 
    };
    
  
    
}

const deleteAtores = async function (id) {
    try {
        let sql = `delete from tbl_atores WHERE id = ${id}`

        let rsAtores = await prisma.$queryRawUnsafe(sql);

        return rsAtores
    } catch (error) {
        return false
    }
}


module.exports = {
    selectAllAtores,
    deleteAtores
}