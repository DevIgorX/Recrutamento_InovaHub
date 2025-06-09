const express = require('express') //importação da biblioteca express
const { consultar_por_curso, consultarPorIdade, consultarMaisInteressados, filtrarPorPeriodo, consultarTotalPorCurso, consultarCandidatosComIdade } = require('./controladores/consultas')
const { cadastrarUsuario, atualizarUsuario, deletarUsuario, consultar_Usuario } = require('./controladores/usuario')

const rotas = express() //cria uma nova instancia do express e atribui a variavel app

rotas.post('/usuario', cadastrarUsuario)
rotas.get('/consultar/candidato/:id', consultar_Usuario)
rotas.put('/usuario/atualizar/:id', atualizarUsuario)
rotas.delete('/usuario/deletar/:id', deletarUsuario)

//consultas


rotas.get('/consultar/curso', consultar_por_curso)
rotas.get('/consultar/idade', consultarPorIdade)
rotas.get('/consultar/interese', consultarMaisInteressados )
rotas.get('/consultar/periodo', filtrarPorPeriodo)
rotas.get('/consultar/Contagem/Curso', consultarTotalPorCurso)
rotas.get('/consultar/Ordenacao/idade', consultarCandidatosComIdade)






module.exports = rotas