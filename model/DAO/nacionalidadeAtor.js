const {PrismaClient} = require('@prisma/client');


// Instancia d classe PrismaClient 
const prisma = new PrismaClient();


const selectAtoresNacionalidadeById = async function(id){
    try {
        // Realiza a busca do filme pelo ID
        let sql = `select tn.id, tn.nome from tbl_ator_nacionalidade as tan inner join tbl_nacionalidade as tn on tan.tbl_nacionalidade_id = tn.id where tan.id = ${id}`;
        console.log(sql)
        // Executa no banco de dados o script sql
        let rsAtores = await prisma.$queryRawUnsafe(sql);

            return rsAtores;
    
        } catch (error) {
            return false;
            
        }
}


module.exports = {
    selectAtoresNacionalidadeById
}