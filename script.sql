

CREATE SCHEMA db_acme_filmes_turma_bbbb  ;
USE db_acme_filmes_turma_bbbb;


CREATE TABLE  tbl_classificacao (
  id INT NOT NULL AUTO_INCREMENT,
  caracteristicas VARCHAR(150) NOT NULL,
  faixa_etaria VARCHAR(2) NOT NULL,
  classificacao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));

insert into tbl_classificacao (caracteristicas, faixa_etaria, classificacao) values 
("Não expõe a criança a nenhum conteúdo possivelmente pertubador", "0", "Livre para os todos os públicos");
select * from tbl_classificacao;

CREATE TABLE tbl_filme (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(80) NOT NULL,
  sinopse TEXT NOT NULL,
  duracao TIME NOT NULL,
  data_lancamento DATE NOT NULL,
  data_relancamento DATE NOT NULL,
  valor_unitario FLOAT NOT NULL,
  foto_capa VARCHAR(145) NOT NULL,
  tbl_classificacao_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_tbl_filme_tbl_classificacao_idx (tbl_classificacao_id ASC),
  CONSTRAINT fk_tbl_filme_tbl_classificacao
    FOREIGN KEY (tbl_classificacao_id)
    REFERENCES tbl_classificacao (id));
   
insert into tbl_filme ( nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario,
                tbl_classificacao_id
    ) values (
                'teste2',
                'teste',
                '01:02:00',
                '2024-04-11',
                null,
                'url add',
                '20',
               1);   
               
               

select * from tbl_filme;

CREATE TABLE  tbl_genero (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));



CREATE TABLE  tbl_sexo (
  id INT NOT NULL AUTO_INCREMENT,
  sigla VARCHAR(1) NOT NULL,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));




CREATE TABLE  tbl_ator (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(200) NOT NULL,
  biografia TEXT NULL,
  data_nascimento DATE NOT NULL,
  tbl_sexo_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_tbl_ator_tbl_sexo1_idx (tbl_sexo_id ASC),
  CONSTRAINT fk_tbl_ator_tbl_sexo1
    FOREIGN KEY (tbl_sexo_id)
    REFERENCES tbl_sexo (id));



CREATE TABLE  tbl_diretor (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(200) NOT NULL,
  biografia TEXT NULL,
  data_nascimento DATE NOT NULL,
  tbl_diretorcol VARCHAR(45) NULL,
  tbl_sexo_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_tbl_diretor_tbl_sexo1_idx (tbl_sexo_id ASC),
  CONSTRAINT fk_tbl_diretor_tbl_sexo1
    FOREIGN KEY (tbl_sexo_id)
    REFERENCES tbl_sexo (id));



CREATE TABLE  tbl_nacionalidade (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));




CREATE TABLE  tbl_filme_genero (
  id INT NOT NULL,
  tbl_filme_id INT NOT NULL,
  tbl_genero_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_tbl_filme_genero_tbl_filme1_idx (tbl_filme_id ASC) VISIBLE,
  INDEX fk_tbl_filme_genero_tbl_genero1_idx (tbl_genero_id ASC) VISIBLE,
  CONSTRAINT fk_tbl_filme_genero_tbl_filme1
    FOREIGN KEY (tbl_filme_id)
    REFERENCES tbl_filme (id),
  CONSTRAINT fk_tbl_filme_genero_tbl_genero1
    FOREIGN KEY (tbl_genero_id)
    REFERENCES tbl_genero (id)
);


CREATE TABLE  tbl_filme_ator (
  id INT NOT NULL AUTO_INCREMENT,
  tbl_filme_id INT NOT NULL,
  tbl_ator_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_tbl_filme_ator_tbl_filme1_idx (tbl_filme_id ASC) ,
  INDEX fk_tbl_filme_ator_tbl_ator1_idx (tbl_ator_id ASC) ,
  CONSTRAINT fk_tbl_filme_ator_tbl_filme1
    FOREIGN KEY (tbl_filme_id)
    REFERENCES tbl_filme (id),
  CONSTRAINT fk_tbl_filme_ator_tbl_ator1
    FOREIGN KEY (tbl_ator_id)
    REFERENCES tbl_ator (id));



CREATE TABLE  tbl_filme_diretor (
  id INT NOT NULL AUTO_INCREMENT,
  tbl_filme_id INT NOT NULL,
  tbl_diretor_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_tbl_filme_diretor_tbl_filme1_idx (tbl_filme_id ASC),
  INDEX fk_tbl_filme_diretor_tbl_diretor1_idx (tbl_diretor_id ASC),
  CONSTRAINT fk_tbl_filme_diretor_tbl_filme1
    FOREIGN KEY (tbl_filme_id)
    REFERENCES tbl_filme (id),
  CONSTRAINT fk_tbl_filme_diretor_tbl_diretor1
    FOREIGN KEY (tbl_diretor_id)
    REFERENCES tbl_diretor (id));


CREATE TABLE  tbl_ator_nacionalidade (
  id INT NOT NULL AUTO_INCREMENT,
  tbl_nacionalidade_id INT NOT NULL,
  tbl_ator_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_tbl_ator_nacionalidade_tbl_nacionalidade1_idx (tbl_nacionalidade_id ASC),
  INDEX fk_tbl_ator_nacionalidade_tbl_ator1_idx (tbl_ator_id ASC),
  CONSTRAINT fk_tbl_ator_nacionalidade_tbl_nacionalidade1
    FOREIGN KEY (tbl_nacionalidade_id)
    REFERENCES tbl_nacionalidade (id),
  CONSTRAINT fk_tbl_ator_nacionalidade_tbl_ator1
    FOREIGN KEY (tbl_ator_id)
    REFERENCES tbl_ator (id));



CREATE TABLE  tbl_diretor_nacionalidade (
  id INT NOT NULL AUTO_INCREMENT,
  tbl_nacionalidade_id INT NOT NULL,
  tbl_diretor_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_tbl_diretor_nacionalidade_tbl_nacionalidade1_idx (tbl_nacionalidade_id ASC),
  INDEX fk_tbl_diretor_nacionalidade_tbl_diretor1_idx (tbl_diretor_id ASC),
  CONSTRAINT fk_tbl_diretor_nacionalidade_tbl_nacionalidade1
    FOREIGN KEY (tbl_nacionalidade_id)
    REFERENCES tbl_nacionalidade (id),
  CONSTRAINT fk_tbl_diretor_nacionalidade_tbl_diretor1
    FOREIGN KEY (tbl_diretor_id)
    REFERENCES tbl_diretor (id));


