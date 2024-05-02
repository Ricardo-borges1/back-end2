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

const insertAtores = async function (dadosAtores){
    try {
        
        let sql 

        if (dadosAtores.data_falecimento != '' &&
        dadosAtores.data_falecimento != null && 
        dadosAtores.data_falecimento != undefined){
            
            sql = `insert into tbl_ator (
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                tbl_sexo_id
            ) values (
                '${dadosAtores.nome}',
                '${dadosAtores.data_nascimento}',
                '${dadosAtores.data_falecimento}',
                '${dadosAtores.biografia}',
                '${dadosAtores.foto}',
                '${dadosAtores.sexo[0].id}'
            )`

            let result = await prisma.$executeRawUnsafe(sql)
            if (result)
            return true
            else
            return false

        } else {
            sql = `insert into tbl_ator (
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                tbl_sexo_id
            ) values (
                '${dadosAtores.nome}',
                '${dadosAtores.data_nascimento}',
                null,
                '${dadosAtores.biografia}',
                '${dadosAtores.foto}',
                '${dadosAtores.sexo[0].id}'
            )`
            

            let result = await prisma.$executeRawUnsafe(sql)
            if (result)
            return true
            else
            return false
        }

    } catch (error) {
        return false
    }
}

const updateAtores = async function (id, dadosAtores){
    try {
        
        let sql 

        if(dadosAtores.data_falecimento!=''&&
        dadosAtores.data_falecimento!=null&&
        dadosAtores.data_falecimento!=undefined){

            sql = `update tbl_ator set 

            nome = '${dadosAtores.nome}',
            data_nascimento = '${dadosAtores.data_nascimento}',
            data_falecimento = '${dadosAtores.data_falecimento}',
            biografia = '${dadosAtores.biografia}',
            foto = '${dadosAtores.foto}',
            tbl_sexo_id = '${dadosAtores.sexo[0].id}' where tbl_ator.id = '${id}'
            `
        } else {

            sql = `update tbl_ator set 
                nome =  '${dadosAtores.nome}',
                data_nascimento = '${dadosAtores.data_nascimento}',
                data_falecimento =  null,
                biografia =  '${dadosAtores.biografia}',
                foto = '${dadosAtores.foto}',
                tbl_sexo_id = '${dadosAtores.sexo[0].id}' where tbl_ator.id = '${id}'`
        }
        
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else 
            return false
    } catch (error) {
        return false
    }
}

const selectByNomeAtor = async function (nome) {
    try {
        let sql = `select * from tbl_ator where nome like "%${nome}%"`
        let rsAtores = await prisma.$queryRawUnsafe(sql)
        return rsAtores
    } catch (error) {
        return false
    }
}

const selectLastId = async function () {
    try {
        
        let sql ='select cast(last_insert_id() as decimal) as id from tbl_ator limit 1;'
        let rsLastID = await prisma.$queryRawUnsafe(sql)
        return rsLastID
    } catch (error) {
        return false
    }
}


const selectFilmeByAtor = async function(id){
    try {
        let sql = `SELECT tbl_ator.id, tbl_ator.nome, tbl_ator.data_nascimento, tbl_ator.data_falecimento, tbl_ator.biografia, tbl_ator.foto
        FROM tbl_ator
        INNER JOIN tbl_filme_ator ON tbl_ator.id = tbl_filme_ator.tbl_ator_id
        WHERE tbl_filme_ator.tbl_filme_id = ${id};
`
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllAtores,
    deleteAtores,
    selectAtoresById,
    insertAtores,
    updateAtores,
    selectByNomeAtor,
    selectLastId,
    selectFilmeByAtor
}