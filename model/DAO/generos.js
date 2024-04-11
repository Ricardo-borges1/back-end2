/*******************************************************
 * Objetivo: arquivo responsável pelo acesso ao Banco de Dados mySql, aqui faremos o CRUD na tabela de generos
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*/

// ASYNC OBRIGATORIO


// função que faz o import da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');


// Instancia d classe PrismaClient 
const prisma = new PrismaClient();


const selectAllGeneros = async function(){

    try {
        let sql = 'select * from tbl_genero order by id desc'; 

    let rsGenero = await prisma.$queryRawUnsafe(sql)

    if(rsGenero.length > 0 )
    return rsGenero
    } catch (error) {
        return false 
    };    
}


const deleteGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero WHERE id = ${id}`

        let rsGenero = await prisma.$queryRawUnsafe(sql);

        return rsGenero
    } catch (error) {
        return false
    }
}


const selectGeneroById = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_genero where id = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsGenero = await prisma.$queryRawUnsafe(sql);

            return rsGenero;
    
        } catch (error) {
            return false;
            
        }
}


const insertGenero = async function(dadosGenero){
    
    try {
    
        let sql;

         sql = `insert into tbl_genero ( 
            nome
    ) values (
                '${dadosGenero.nome}'
    )`;

        //$executeRawUnsafe serve para executar scripts sem retorno de dados
            //(insert, update e delete)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (select)
        let result = await prisma.$executeRawUnsafe(sql);
        console.log(result);

        if (result)
            return true
        else
            return false;

        } catch (error) {
            return false 
        }

}


const InsertByIdGenero = async function (){
    try {
        
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_genero limit 1`;
        let rsGenero = await prisma.$queryRawUnsafe(sql);

        return rsGenero;

    } catch (error) {
        return false        
    }
}


//funcao para atualizar um genero no banco de dados
const updateGenero = async function(id,dadosGenero){
    try{

        let sql;

        
            sql = `UPDATE tbl_genero SET nome = '${dadosGenero.nome}'
                where tbl_genero.id = ${id};`
        

        let result = await prisma.$executeRawUnsafe(sql);
        console.log(result)

        if (result)
            return result
        else
            return false;
        
    } catch (error) {
        return false

    }
}




module.exports = {
    selectAllGeneros,
    deleteGenero,
    selectGeneroById,
    insertGenero,
    InsertByIdGenero,
    updateGenero
}