/*******************************************************
 * Objetivo: arquivo responsável pelo acesso ao Banco de Dados mySql, aqui faremos o CRUD na tabela de atores
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*/

// ASYNC OBRIGATORIO



// função que faz o import da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');


// Instancia d classe PrismaClient 
const prisma = new PrismaClient();


const selectAllAtores = async function(){

    try {
        let sql = 'select * from tbl_ator order by id desc'; 

    let rsAtores = await prisma.$queryRawUnsafe(sql)

    if(rsAtores.length > 0 )
    return rsAtores
    } catch (error) {
        return false 
    };

    
}

const deleteAtores = async function (id) {
    try {
        let sql = `delete from tbl_ator WHERE id = ${id}`

        let rsAtores = await prisma.$queryRawUnsafe(sql);

        return rsAtores
    } catch (error) {
        return false
    }
}

const selectAtoresById = async function(id){
    try {
        // Realiza a busca do filme pelo ID
        let sql = `select * from tbl_ator where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsAtores = await prisma.$queryRawUnsafe(sql);

            return rsAtores;
    
        } catch (error) {
            return false;
            
        }
}


module.exports = {
    selectAllAtores,
    deleteAtores,
    selectAtoresById
}