//funcao importa filmes

var filmesAcme = require ('../modulo/filmes')

const filmes = () => {
    let filmes = filmesAcme.filmes
    let filmesArray = []

    filmes.filmes.forEach((filmes1) => {
        
       let filmesInfo = {
            id:filmes1.id,
            nome:filmes1.nome,
            sinopse:filmes1.sinopse,
            duracao:filmes1.duracao,
            data_lancamento:filmes1.data_lancamento,
            data_relancamento:filmes1.data_relancamento,
            foto_capa:filmes1.foto_capa,
            valor_unitario:filmes1.valor_unitario
        }

       filmesArray.push(filmesInfo)
    });

    let filmesJSON = {filmesArray}
    return filmesJSON
}


    const filme = (id) => {
    let filmesJ = filmesAcme.filmes
    let arrayteste = filmesJ.filmes
    let filmesArray = []
    let idFilmes = id
    let status = false

    arrayteste.forEach((filme) => {
        if(filme.id == idFilmes){
             let filmesJSON = {
                id:filme.id,
                nome:filme.nome,
                sinopse:filme.sinopse,
                duracao:filme.duracao,
                data_lancamento:filme.data_lancamento,
                data_relancamento:filme.data_relancamento,
                foto_capa:filme.foto_capa,
                valor_unitario:filme.valor_unitario
                }

                status=true
                filmesArray.push(filmesJSON)
        }
    })

    let filmesJSON = {filmesArray}

    if (status){
        return filmesJSON
    } else {
        return false
    }
}


console.log(filme(1));
console.log(filmes());

module.exports ={
    filmes,
    filme
}