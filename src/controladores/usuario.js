const {query} = require('../banco_de_dados/conexao')
//função para cadastrar um novo candidato
const cadastrarUsuario = async (req, res) => {
    const {nome_completo, email, matricula,telefone,data_nascimento,curso,periodo,justificativa_interese} = req.body


    if(!nome_completo || !email || !matricula || !telefone || !data_nascimento || !curso || !periodo || !justificativa_interese){
        return res.status(400).json({mensagem: 'Todos os campos são Obrigatorio!'})
    }

    try {
        
        const usuario = await query('select * from Candidatos where email = $1',[email])

        if(usuario.rowCount > 0){
            return res.status(400).json({mensagem: 'já existe  usuario com e-mail informado'})
        }

        const queryCadastro = 'insert into Candidatos (nome_completo, email, matricula,telefone, data_nascimento,curso, periodo, justificativa_interese) values ($1,$2,$3, $4, $5, $6, $7,$8) returning *'

        const paramCadastro = [nome_completo, email, matricula,telefone,data_nascimento,curso,periodo,justificativa_interese]
        const usuarioCadastro = await query(queryCadastro, paramCadastro)

        if(usuarioCadastro.rowCount <= 0){
            return res.status(500).json({mensagem: `Erro interno do Servidor: não foi cadastrado`})
        }

        return res.status(201).json(usuarioCadastro.rows[0])

        
    } catch (error) {
        
        return res.status(500).json({mensagem: `Erro interno do Servidor: ${error.message}`})

    }

}

//função para consultar candidato
const consultar_Usuario = async (req, res) =>{
        const {id} = req.params


    try {
        
        listaCursos = await query('select * from Candidatos where id = $1', [id])
        if(listaCursos.rowCount <= 0){
            return res.status(400).json({mensagem: 'Candidato não encontrado!'})
        }

        res.status(200).json(listaCursos.rows[0])

    } catch (error) {
        return res.status(500).json({mensagem: `Erro interno do Servidor: ${error.message}`})
    }


}

 //função para atualizar um candidato
const atualizarUsuario = async (req, res)=>{
        const {id} = req.params
        const {nome_completo, email, matricula,telefone,data_nascimento,curso,periodo,justificativa_interese} = req.body
    try {

    if(!nome_completo || !email || !matricula || !telefone || !data_nascimento || !curso || !periodo || !justificativa_interese){
        return res.status(400).json({mensagem: 'Todos os campos são Obrigatorio'})
    }

    const usuarioExistente = await query('select * from Candidatos where id = $1', [id])

    if(usuarioExistente.rowCount == 0){
        return res.status(400).json({mensagem: 'Não existe usuario cadastrado no sistema!'})
    }

    const queryupdate = 'update Candidatos set nome_completo = $1, email =$2 , matricula = $3 ,telefone = $4, data_nascimento = $5 ,curso = $6, periodo = $7, justificativa_interese = $8 where id= $9 returning *'
    const queryParamentros = [ nome_completo, email, matricula,telefone,data_nascimento,curso,periodo,justificativa_interese, id ]
    const update = await query(queryupdate, queryParamentros)


    return res.status(201).json(update.rows[0])

        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({mensagem: `Erro interno do Servidor: ${error.message}`})
        
    }



}


//função para deletar um candidato
const deletarUsuario = async (req, res)=>{
    const {id} = req.params

try {


const usuarioExistente = await query('select * from Candidatos where id = $1', [id])

if(usuarioExistente.rowCount === 0){
    return res.status(400).json({mensagem: 'Não existe usuario cadastrado no sistema!'})
}

const deletar = await query('delete from Candidatos where id = $1 returning *', [id])

const {nome_completo} = deletar.rows[0]

return res.status(201).json({mensagem: `O usuario: ${nome_completo} foi deletado do banco de dados!`})

    
} catch (error) {
    console.log(error.message)
    return res.status(500).json({mensagem: `Erro interno do Servidor: ${error.message}`})
    
}

}




module.exports = {
    cadastrarUsuario ,
    atualizarUsuario ,
    deletarUsuario ,
    consultar_Usuario
}