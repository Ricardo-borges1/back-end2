CREATE SCHEMA db_acme_filmes_turma_bbbb  ;
USE db_acme_filmes_turma_bbbb;


CREATE TABLE  tbl_classificacao (
  id INT NOT NULL AUTO_INCREMENT,
  caracteristicas VARCHAR(150) NOT NULL,
  faixa_etaria VARCHAR(2) NOT NULL,
  classificacao VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));
  
  desc tbl_classificacao;


insert into tbl_classificacao (caracteristicas, faixa_etaria, classificacao) values 
("Não expõe a criança a nenhum conteúdo possivelmente pertubador", "0", "Livre para os todos os públicos");
select * from tbl_classificacao;

UPDATE tbl_classificacao SET caracteristicas = 'Não expõe a criança a nenhum conteúdo possivelmente pertubador',
                faixa_etaria = '0',
                classificacao = 'Livreee para os todos os públicos',
                icone = ''
                where tbl_classificacao.id = 1;


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
               
               
delete from tbl_classificacao WHERE id = 1;

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
  
  insert into tbl_sexo ( sigla, nome) values (
  
    "M",
    "Masculino"
  ), (
	"F",
    "Feminino"
  );
  
  
  desc tbl_filme;




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
    
    insert into tbl_ator ( 
    nome,
    data_nascimento,
    biografia,
    foto,
    tbl_sexo_id 
    ) values (
		'Sydney Sweeney',
    '1997-09-12',
    'Sydney Bernice Sweeney é uma atriz e produtora estadunidense, indicada duas vezes ao Emmy. Ela é conhecida principalmente por seus papéis como Cassie Howard em Euphoria, Olivia Mossbacher em The White Lotus, Bea em Anyone but You e Julia Carpenter em Madame Web.',
    'https://upload.wikimedia.org/wikipedia/commons/4/4f/Sydney_Sweeney_2019_by_Glenn_Francis.jpg',
    2
),(
'Glen Powell',
    '1988-10-21',
    'Glen Thomas Powell Jr. é um ator, dublê, escritor e produtor norte-americano, conhecido por interpretar Thorn no filme Os Mercenários 3 e retratar o astronauta John Glenn no drama biográfico Hidden Figures, de 2017.',
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Glen_Powell_in_2016.jpg',
    1
),(
'Timothée Chalamet',
    '1995-12-27',
    'Timothée Hal Chalamet, é um ator franco-americano. Começou sua carreira de ator em curtas-metragens, antes de aparecer na série de televisão Homeland, interpretando Finn Walden.',
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Interview_with_Timoth%C3%A9e_Chalamet%2C_2019.png',
    1
),(
'Zendaya',
    '1996-09-01',
    'Zendaya Maree Stoermer Coleman, conhecida como Zendaya, é uma atriz, dançarina, modelo, cantora e compositora norte-americana, que ganhou notoriedade com seu trabalho na Disney Channel, como Rocky Blue na série Shake It Up e K.C. Cooper em K.C. Undercover.',
    'https://br.web.img2.acsta.net/c_310_420/pictures/19/12/26/23/19/0993801.jpg',
    2
);

select * from tbl_diretor;


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
  
  
  insert into tbl_nacionalidade(
  
  nome
) values (

" Brasileiro"
), (
	"Angolano"
) ,(

" Canadense"

) , ( 

"Italiano"

) , ("Espanhol")
;

select * from tbl_nacionalidade;


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
ALTER TABLE tbl_filme_genero
MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;

insert into tbl_filme_genero (tbl_filme_id, tbl_genero_id) values (31, 10);

select * from tbl_genero join tbl_filme_genero on tbl_filme_genero.tbl_genero_id = tbl_genero.id where tbl_filme_genero.tbl_filme_id = 31;
select nome from tbl_genero join tbl_filme_genero on tbl_filme_genero.tbl_genero_id = tbl_genero.id where tbl_filme_genero.tbl_filme_id = 31;

insert into tbl_genero (nome) values ( 'terror' );
select * from tbl_genero;

select * from tbl_filme;

UPDATE tbl_genero SET nome = 'teste'
                where tbl_genero.id = 4;

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

insert into tbl_diretor_nacionalidade (tbl_nacionalidade_id, tbl_diretor_id) values (1, 1);

select * from tbl_ator_nacionalidade;
select * from tbl_nacionalidade;

select tbl_genero.id, tbl_genero.nome from tbl_genero join tbl_filme_genero on tbl_filme_genero.id = tbl_genero.id where tbl_filme_genero.tbl_filme_id = 1;

insert into tbl_classificacao ( 
            caracteristicas,
            faixa_etaria,
            classificacao,
            icone
    ) values (
                'pode apresentar atos de pedofilia, crime de ódio, estupro ou coação sexual, mutilação, suicídio, tortura e violência gratuita ou banalização da violência.',
                '16',
                'Acima de 16 anos',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/DJCTQ_-_16.svg/768px-DJCTQ_-_16.svg.png'
    );

ALTER TABLE `db_acme_filmes_turma_bbbb`.`tbl_classificacao` 
CHANGE COLUMN `caracteristicas` `caracteristicas` VARCHAR(800) NOT NULL ;

select * from tbl_classificacao;
ALTER TABLE `db_acme_filmes_turma_bbbb`.`tbl_diretor` 
ADD COLUMN `data_falecimento` DATE NULL AFTER `tbl_sexo_id`;
select * from tbl_diretor;

SELECT tn.nome AS nacionalidade_do_ator
FROM tbl_ator AS ta
INNER JOIN tbl_ator_nacionalidade AS tan ON ta.id = tan.tbl_ator_id
INNER JOIN tbl_nacionalidade AS tn ON tan.tbl_nacionalidade_id = tn.id
WHERE ta.id = 1;

delete from tbl_ator WHERE id = 14; 

insert into tbl_diretor(
	nome,
    data_nascimento,
    data_falecimento,
    biografia,
    foto,
    tbl_sexo_id
)values(
	'Will Gluck',
    '1978-11-07',
    null,
    'Will Gluck é um diretor de cinema americano, produtor de cinema, roteirista e compositor.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/WGpix.jpg/200px-WGpix.jpg',
    1
),(
	'Denis Villenueve',
    '1967-10-03',
    null,
    'OC CQ Denis Villeneuve é um cineasta franco-canadense. Ele recebeu quatro vezes o Canadian Screen Award de Melhor Direção, vencendo por Maelström em 2001, Polytechnique em 2009, Incendies em 2010 e Enemy em 2013.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Denis_Villeneuve_Cannes_2018.jpg/250px-Denis_Villeneuve_Cannes_2018.jpg',
    1
);

delete from tbl_diretor WHERE id = 2;

insert into tbl_diretor (
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                tbl_sexo_id
            ) values (
                'Denis Villenueve',
                '1967-10-03',
                '1999-10-04',
                'OC CQ Denis Villeneuve é um cineasta franco-canadense. Ele recebeu quatro vezes o Canadian Screen Award de Melhor Direção, vencendo por Maelström em 2001, Polytechnique em 2009, Incendies em 2010 e Enemy em 2013.',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Denis_Villeneuve_Cannes_2018.jpg/250px-Denis_Villeneuve_Cannes_2018.jpg',
                '1'
                );

insert into tbl_ator (
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                tbl_sexo_id
            ) values (
                'Zendaya',
                '1996-09-01',
                null,
                'Zendaya Maree Stoermer Coleman, conhecida como Zendaya, é uma atriz, dançarina, modelo, cantora e compositora norte-americana, que ganhou notoriedade com seu trabalho na Disney Channel, como Rocky Blue na série Shake It Up e K.C. Cooper em K.C. Undercover.',
                'https://br.web.img2.acsta.net/c_310_420/pictures/19/12/26/23/19/0993801.jpg',
                '2'
            );
SELECT tn.nome AS nacionalidade_do_diretor
        FROM tbl_diretor AS ta
        INNER JOIN tbl_diretor_nacionalidade AS tan ON ta.id = tan.tbl_diretor_id
        INNER JOIN tbl_nacionalidade AS tn ON tan.tbl_nacionalidade_id = tn.id
        WHERE ta.id = 1;


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


DELETE FROM tbl_ator WHERE id = 4;
