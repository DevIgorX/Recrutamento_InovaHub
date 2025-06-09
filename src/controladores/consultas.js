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

const consultarPorIdade = async (req, res) => {
    // você está recebendo a idade no body; converta para número
    const idadeAlvo = Number(req.body.idade);
  
    if (!idadeAlvo || isNaN(idadeAlvo)) {
      return res
        .status(400)
        .json({ mensagem: 'Envie “idade” como número inteiro.' });
    }
  
    try {
      /*  A função age(current_date, data_nascimento) devolve um INTERVAL.
          date_part('year', …) extrai só o componente “anos”.
          Assim o filtro pega exatamente quem possui a idade solicitada.          */
      const sql = `
        SELECT  id,
                nome_completo,
                email,
                data_nascimento,
                date_part('year', age(current_date, data_nascimento)) AS idade
          FROM  Candidatos
         WHERE  date_part('year', age(current_date, data_nascimento)) = $1
      `;
  
      const { rows } = await query(sql, [idadeAlvo]);
  
      return res.status(200).json(rows);           
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ mensagem: `Erro interno do servidor: ${error.message}` });
    }
  };


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
  
      return res.status(200).json(rows); // Lista ordenada do maior pro menor interesse
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ mensagem: `Erro interno do servidor: ${error.message}` });
    }
  };
  





  




module.exports = {
    consultar_por_curso ,
    consultarPorIdade, 
    consultarMaisInteressados
}