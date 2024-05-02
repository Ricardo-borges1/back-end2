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


const selectAllDiretores = async function(){

    try {
        let sql = 'select * from tbl_diretor order by id desc'; 

    let rsDiretores = await prisma.$queryRawUnsafe(sql)

    if(rsDiretores.length > 0 )
    return rsDiretores
    } catch (error) {
        return false 
    };    
}


const deleteDiretores = async function (id) {
    try {
        let sql = `delete from tbl_diretor WHERE id = ${id}`

        let rsDiretores = await prisma.$queryRawUnsafe(sql);

        return rsDiretores
    } catch (error) {
        return false
    }
}

const selectDiretoresById = async function(id){
    try {
        // Realiza a busca do filme pelo ID
        let sql = `select * from tbl_diretor where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsDiretores = await prisma.$queryRawUnsafe(sql);

            return rsDiretores;
    
        } catch (error) {
            return false;
            
        }
}

const insertDiretores = async function (dadosDiretores){
    try {
        let sql 
        if (dadosDiretores.data_falecimento == '' ||
        dadosDiretores.data_falecimento == null || 
        dadosDiretores.data_falecimento == undefined){
            
            sql = `insert into tbl_diretor (
                nome,
                data_nascimento,
                biografia,
                foto,
                tbl_sexo_id
            ) values (
                '${dadosDiretores.nome}',
                '${dadosDiretores.data_nascimento}',
                '${dadosDiretores.biografia}',
                '${dadosDiretores.foto}',
                '${dadosDiretores.sexo[0].id}'
            );`
        } else {
            sql = `insert into tbl_diretor (
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                tbl_sexo_id
            ) values (
                '${dadosDiretores.nome}',
                '${dadosDiretores.data_nascimento}',
                '${dadosDiretores.data_falecimento}',
                '${dadosDiretores.biografia}',
                '${dadosDiretores.foto}',
                '${dadosDiretores.sexo[0].id}'
            )`
        }
        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        console.log(result);
        if (result)
            return result
        else
            return false

    } catch (error) {
        return error
    }
}


const updateDiretores = async function (id, dadosDiretores){
    try {
        
        let sql 

        if(dadosDiretores.data_falecimento!=''&&
        dadosDiretores.data_falecimento!=null&&
        dadosDiretores.data_falecimento!=undefined){

            sql = `update tbl_diretor set 

            nome = '${dadosDiretores.nome}',
            data_nascimento = '${dadosDiretores.data_nascimento}',
            data_falecimento = '${dadosDiretores.data_falecimento}',
            biografia = '${dadosDiretores.biografia}',
            foto = '${dadosDiretores.foto}',
            tbl_sexo_id = '${dadosDiretores.sexo[0].id}' where tbl_diretor.id = '${id}'
            `
        } else {

            sql = `update tbl_diretor set 
                nome =  '${dadosDiretores.nome}',
                data_nascimento = '${dadosDiretores.data_nascimento}',
                data_falecimento =  null,
                biografia =  '${dadosDiretores.biografia}',
                foto = '${dadosDiretores.foto}',
                tbl_sexo_id = '${dadosDiretores.sexo[0].id}' where tbl_diretor.id = '${id}'`
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

const selectByNomeDiretor = async function (nome) {
    try {
        let sql = `select * from tbl_diretor where nome like "%${nome}%"`
        let rsDiretores = await prisma.$queryRawUnsafe(sql)
        return rsDiretores
    } catch (error) {
        return false
    }
}

const selectLastId = async function () {
    try {
        
        let sql ='select cast(last_insert_id() as decimal) as id from tbl_diretor limit 1;'
        let rsLastID = await prisma.$queryRawUnsafe(sql)
        return rsLastID
    } catch (error) {
        return false
    }
}

const selectFilmeByDiretor = async function(id){
    try {
        let sql = `SELECT tbl_diretor.id, tbl_diretor.nome, tbl_diretor.data_nascimento, tbl_diretor.data_falecimento, tbl_diretor.biografia, tbl_diretor.foto
        FROM tbl_diretor
        INNER JOIN tbl_filme_diretor ON tbl_diretor.id = tbl_filme_diretor.tbl_diretor_id
        WHERE tbl_filme_diretor.tbl_filme_id = ${id};
`
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}

module.exports ={
    selectAllDiretores,
    deleteDiretores,
    selectDiretoresById,
    insertDiretores,
    updateDiretores,
    selectByNomeDiretor,
    selectLastId,
    selectFilmeByDiretor
}