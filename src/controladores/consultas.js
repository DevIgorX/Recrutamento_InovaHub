const { query } = require("../banco_de_dados/conexao")

const consultar_por_curso = async (req, res) =>{
    const {curso} = req.body

    if(!curso){
        return res.status(400).json({mensagem: 'por favor informar o curso desejado'})
    }

    try {
        
        listaCursos = await query('select * from Candidatos where curso = $1', [curso])
        if(listaCursos.rowCount <= 0){
            return res.status(400).json({mensagem: 'curso não existe no banco de dados'})
        }

        res.status(200).json(listaCursos.rows)

    } catch (error) {
        return res.status(500).json({mensagem: `Erro interno do Servidor: ${error.message}`})
    }



}
//Total de Alunos por curso
const consultarTotalPorCurso = async (req, res) => {
    try {
      const resultado = await query(`
        SELECT curso, COUNT(*) AS total
        FROM Candidatos
        GROUP BY curso
        ORDER BY total DESC
      `);
  
      return res.status(200).json(resultado.rows);
    } catch (error) {
      return res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
    }
  };
  



//consulta candidato por idade
const consultarPorIdade = async (req, res) => {
    
    const idadeAlvo = Number(req.body.idade)
  
    if (!idadeAlvo || isNaN(idadeAlvo)) {
      return res.status(400).json({ mensagem: 'Envie “idade” como número inteiro.' })
    }
  
    try {
      const sql = `
        SELECT  id,
                nome_completo,
                email,
                data_nascimento,
                date_part('year', age(current_date, data_nascimento)) AS idade
          FROM  Candidatos
         WHERE  date_part('year', age(current_date, data_nascimento)) = $1
      `
  
      const { rows } = await query(sql, [idadeAlvo])
  
      return res.status(200).json(rows)          
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` })
    }
  };



  //consulta quem mais demonstrou interesse
  const consultarMaisInteressados = async (req, res) => {

    try {
      const sql = `
        SELECT id,
               nome_completo,
               email,
               curso,
               length(justificativa_interese) AS tamanho_justificativa 
          FROM Candidatos
         WHERE justificativa_interese IS NOT NULL
         ORDER BY tamanho_justificativa DESC limit 5
      `;
  
      const { rows } = await query(sql);
  
      return res.status(200).json(rows); 
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
    }
  };

  const filtrarPorPeriodo = async (req, res) =>{
        const {periodo} = req.body

    if(!periodo){
        return res.status(400).json({mensagem: 'perido não informado'})
    }

    try {

        const sql = 'select * from Candidatos where periodo >= $1'
        const candidato = await query(sql, [periodo])

        return res.status(200).json(candidato.rows)
        
    } catch (error) {
        return res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
    }


  }

  const consultarCandidatosComIdade = async (req, res) => {
    try {
      const resultado = await query(`
        SELECT *, date_part('year', age(data_nascimento)) AS idade 
        FROM Candidatos 
        ORDER BY idade ASC
      `);
  
      return res.status(200).json(resultado.rows);
    } catch (error) {
      return res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
    }
  };
  





  





  




module.exports = {
    consultar_por_curso ,
    consultarPorIdade, 
    consultarMaisInteressados ,
    filtrarPorPeriodo ,
    consultarTotalPorCurso ,
    consultarCandidatosComIdade
}