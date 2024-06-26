/*******************************************************
 * Objetivo: arquivo responsável pelo acesso ao Banco de Dados mySql, aqui faremos o CRUD na tabela de filmes
 * DATA: 01/02/2024
 * Autor: Ricardo Borges
 * Versão: 1.0
*/

// ASYNC OBRIGATORIO
//funcao para inserir um filme no banco de dados


// função que faz o import da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');
const { selectLastId } = require('./diretor');


// Instancia d classe PrismaClient 
const prisma = new PrismaClient();

const insertFilme = async function(dadosFilme){
    
    console.log(dadosFilme);
  
        let sql;

        if (dadosFilme.data_relancamento != '' && 
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != undefined
        ){

         sql = `insert into tbl_filme ( nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario,
                tbl_classificacao_id
    ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                '${dadosFilme.data_relancamento}',
                '${dadosFilme.foto_capa}',
                ${dadosFilme.valor_unitario},
                ${dadosFilme.tbl_classificacao_id}


    )`;        
} else {

            sql = `insert into tbl_filme ( nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario,
                tbl_classificacao_id
        ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                 null,
                '${dadosFilme.foto_capa}',
                ${dadosFilme.valor_unitario},
                ${dadosFilme.tbl_classificacao_id}
        )`;
    }
    console.log(sql);

    let result=await prisma.$executeRawUnsafe(sql)
    if(result){
        let idFilme=await selectLastId()
        //caso chegue até aqui é pq inseriu corretamente os dados da nacionalidade, então só retorna verdadeiro para indicar q deu certo
        return true
    }
    else
        return false 
}
              


const InsertById = async function (){
    try {
        
        let sql = `select cast(last_insert_id() AS DECIMAL) as id from tbl_filme limit 1`;
        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;

    } catch (error) {
        return false        
    }
}

//funcao para atualizar um filme no banco de dados
const updateFilme = async function(id,dadosFilme){
    try{

        let sql;

        if (dadosFilme.data_relancamento != '' && 
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != undefined
        ){

            sql = `UPDATE tbl_filme SET nome = '${dadosFilme.nome}',
                sinopse = '${dadosFilme.sinopse}',
                duracao = '${dadosFilme.duracao}',
                data_lancamento = '${dadosFilme.data_lancamento}',
                data_relancamento = '${dadosFilme.data_relancamento}',
                foto_capa = '${dadosFilme.foto_capa}',
                valor_unitario  = '${dadosFilme.valor_unitario}',
                tbl_classificacao_id = '${dadosFilme.tbl_classificacao_id}'
                where tbl_filme.id = ${id}; `
        } else {
             sql = `UPDATE tbl_filme SET  nome = '${dadosFilme.nome}',
                sinopse = '${dadosFilme.sinopse}',
                duracao = '${dadosFilme.duracao}',
                data_lancamento = '${dadosFilme.data_lancamento}',
                data_relancamento = null,
                foto_capa = '${dadosFilme.foto_capa}',
                valor_unitario  = '${dadosFilme.valor_unitario}',
                tbl_classificacao_id = '${dadosFilme.tbl_classificacao_id}'
                 where tbl_filme.id = ${id}; `
        }

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true
        else
            return false;
        
    } catch (error) {
        
        return false

    }
}


//função para excluir um filme no banco de dodos
const deleteFilme = async function (id){

    try {
        let sql = `DELETE FROM tbl_filme WHERE tbl_filme.id = ${id}`;

        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme

    } catch (error) {
        return false
    }
}


//função para listar todos os filmes do banco de dados
const selectAllFilmes = async function(){

    try {

        let sql = 'select * from tbl_filme';
        //Executa o script SQL no BD e recebe o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);
    
    return rsFilmes;
    } catch (error) {
        console.log(error)
        return false;
    }
 
}
  

const selectByNome = async function (nome){
 
    try {

    let sql = `select * from tbl_filme where nome LIKE "%${nome}%"`
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

        return rsFilmes;
    } catch (error) {
        return false
    }
    
}

// função para buscar um filme no banco de dados filtrando pelo id 
const selectByIdFilme = async function (id){

    try {
        
    //script sql para filtrar pelo id
    let sql = `select * from tbl_filme where id = ${id}`;
    //executa o sql no banco de dados
    let rsFilme = await prisma.$queryRawUnsafe(sql);

    return rsFilme;

    } catch (error) {
        return false
    }
}    


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNome,
    InsertById,
    
}