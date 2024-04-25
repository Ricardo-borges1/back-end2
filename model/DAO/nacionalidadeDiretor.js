const {PrismaClient} = require('@prisma/client');


// Instancia d classe PrismaClient 
const prisma = new PrismaClient();


const selectDiretoresNacionalidadeById = async function(id){
    try {
        // Realiza a busca do filme pelo ID
        let sql = `SELECT tn.nome AS nacionalidade_do_diretor
        FROM tbl_diretor AS ta
        INNER JOIN tbl_diretor_nacionalidade AS tan ON ta.id = tan.tbl_diretor_id
        INNER JOIN tbl_nacionalidade AS tn ON tan.tbl_nacionalidade_id = tn.id
        WHERE ta.id = ${id}`;
        console.log(sql)
        // Executa no banco de dados o script sql
        let rsAtores = await prisma.$queryRawUnsafe(sql);

            return rsAtores;
    
        } catch (error) {
            return false;
            
        }
}


module.exports = {
    selectDiretoresNacionalidadeById
}