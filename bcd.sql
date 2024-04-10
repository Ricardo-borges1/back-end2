create database db_acme_filmes_turma_bbb;
use db_acme_filmes_turma_bbb;

create table tbl_filmes(
   id int not null auto_increment primary key,
   nome varchar(80) not null,
   sinopse text not null,
   duracao time not null,
   data_lancamento date not null,
   data_relancamento date,
   foto_capa varchar(200) not null,
   valor_unitario float,
   
   unique key(id),
   unique index(id)
   
   );
   
show tables;

desc tbl_filmes;
describe tbl_filmes;

insert into tbl_filmes(
                  nome,
                  sinopse, 
                  duracao,
                  data_lancamento,
				  data_relancamento,
                  foto_capa,
                  valor_unitario
			)values(
            'Harry Potter e a Pedra Filosofal',
            'Harry Potter (Daniel Radcliffe) é um garoto órfão de 10 anos que vive infeliz com seus tios, os Dursley. Até que, repentinamente, ele recebe uma carta contendo um convite para ingressar em Hogwarts, uma famosa escola especializada em formar jovens bruxos. Inicialmente Harry é impedido de ler a carta por seu tio Válter (Richard Griffiths), mas logo ele recebe a visita de Hagrid (Robbie Coltrane), o guarda-caça de Hogwarts, que chega em sua casa para levá-lo até a escola. A partir de então Harry passa a conhecer um mundo mágico que jamais imaginara, vivendo as mais diversas aventuras com seus mais novos amigos, Rony Weasley (Rupert Grint) e Hermione Granger (Emma Watson).',
            '02:32:00',
            '2001-01-23',
            null,
            'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/95/59/60/20417256.jpg',
            '30.00'
		   ),
	      ( 
           'Invocação do Mal 2',
           'Em Invocação do Mal 2, os investigadores paranormais Ed (Patrick Wilson) e Lorraine (Vera Farmiga) desembarcam em Londres, Inglaterra, para ajudar uma família atormentada. Peggy (Frances O Connor), uma mãe solteira, acredita que tenha algo maligno em sua casa.',
           '02:14:00',
           '2016-06-14',
           null,
           'https://br.web.img2.acsta.net/c_310_420/pictures/16/04/18/20/43/025084.jpg',
           '35.00'
            );
            
select * from tbl_filmes;