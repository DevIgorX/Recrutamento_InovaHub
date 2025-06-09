--criação do banco
create database bd_inovaHub;


--criação da entidade(tabela) Candidatos
create table Candidatos (
 id serial primary key, 
  nome_completo text not null, 
  email text  unique not null,  
  matricula char(12), 
  telefone varchar(15), 
  data_nascimento date,
  curso varchar(50), 
  periodo integer, 
  justificativa_interese text, 
  data_inscricao timestamp default current_timestamp
);

