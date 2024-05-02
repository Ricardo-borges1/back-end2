const {PrismaClient} = require('@prisma/client');


// Instancia d classe PrismaClient 
const prisma = new PrismaClient();


const selectGeneroFilmeById = async function(id){
    try {
        // Realiza a busca do filme pelo ID
        let sql = `select nome from tbl_genero join tbl_filme_genero on tbl_filme_genero.tbl_genero_id = tbl_genero.id where tbl_filme_genero.tbl_filme_id = ${id};`
        
        // Executa no banco de dados o script sql
        let rsGenero = await prisma.$queryRawUnsafe(sql);

            return rsGenero;
    
        } catch (error) {
            return false;
            
        }
}


module.exports = {
    selectGeneroFilmeById
}