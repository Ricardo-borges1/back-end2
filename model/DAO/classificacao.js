/*******************************************************
 * Objetivo: arquivo responsável pelo acesso ao Banco de Dados mySql, aqui faremos o CRUD na tabela de classificacao
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*/



// função que faz o import da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');


// Instancia d classe PrismaClient 
const prisma = new PrismaClient();


const selectAllClassificacao = async function(){

    try {
        let sql = 'select * from tbl_classificacao order by id desc'; 

    let rsClassificacao = await prisma.$queryRawUnsafe(sql)

    if(rsClassificacao.length > 0 )
    return rsClassificacao
    } catch (error) {
        return false 
    };    
}

const deleteClassificacao = async function (id) {
    try {
        let sql = `delete from tbl_classificacao WHERE id = ${id}`

        let rsClassificacao = await prisma.$queryRawUnsafe(sql);

        return rsClassificacao
    } catch (error) {
        return false
    }
}

const selectClassificacaoById = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_classificacao where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);

            return rsClassificacao;
    
        } catch (error) {
            return false;
            
        }
}

const insertClassificacao = async function(dadosClassificao){
    
    try {
    
        let sql;

         sql = `insert into tbl_classificacao ( 
            caracteristicas,
            faixa_etaria,
            classificacao,
            icone
    ) values (
                '${dadosClassificao.caracteristicas}',
                '${dadosClassificao.faixa_etaria}',
                '${dadosClassificao.classificacao}',
                '${dadosClassificao.icone}'
    )`;

    console.log(sql);
        //$executeRawUnsafe serve para executar scripts sem retorno de dados
            //(insert, update e delete)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (select)
        let result = await prisma.$executeRawUnsafe(sql);
        

        if (result)
            return true
        else
            return false;

        } catch (error) {
            return false 
        }

}

const InsertByIdClassificacao = async function (){
    try {
        
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_classificacao limit 1`;
        let rsClassificacao = await prisma.$queryRawUnsafe(sql);

        return rsClassificacao;

    } catch (error) {
        return false        
    }
}

const updateClassificacao = async function(id,dadosClassificao){
    try{
        let sql;

        
            sql = `UPDATE tbl_classificacao SET caracteristicas = '${dadosClassificao.caracteristicas}',
                faixa_etaria = '${dadosClassificao.faixa_etaria}',
                classificacao = '${dadosClassificao.classificacao}',
                icone = '${dadosClassificao.icone}'
                where tbl_classificacao.id = ${id};`
        
                console.log(sql);

        let result = await prisma.$executeRawUnsafe(sql);
        

        if (result)
            return result
        else
            return false;
        
    } catch (error) {
        return false

    }
}



module.exports = {
    selectAllClassificacao,
    deleteClassificacao,
    selectClassificacaoById,
    insertClassificacao,
    InsertByIdClassificacao,
    updateClassificacao

}