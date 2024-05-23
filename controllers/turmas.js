const { where } = require("sequelize");
const Turmas = require("../models/turmas");

//busca todas as turmas
exports.getAll = async (req, res) => {
    const turmas = await Turmas.findAll();
    res.json(turmas)
};

//busca turma pelo id
exports.getByid = async (req, res) => {
    const IdDoParam = req.parms.id;
    const turmaEncontrada = await Turmas.findOne({ where: { idTurmas: IdDoParam } });
    res.json(turmaEncontrada)
};

//cria a turma
exports.createTurma = async (req, res) => {
    //verificação duplicada de usuario cadastrado
    const turmaCadastrada = await Turmas.findOne({ where: { codigo: req.body.codigo } });
    if (turmaCadastrada) {
        return res.send("Já existe uma turma cadastrada com este código.")
    }

    const turmaCriada = await Turmas.create(req.body)
    console.log("turmaCriada", turmaCriada)
    return res.send("Turma cadastrada com sucesso")
};

exports.updateTurma = async (req, res) => {
    const codigoTurma = req.params.updateTurma;

    try {
        const turmaCadastrada = await Turmas.findOne({ where: { codigo: req.body.codigo } });

        if (turmaCadastrada) {
            delete req.body.codigo;

            const [numRowsUpdated] = await Turmas.update(req.body, {
                where: { código: codigoTurma }
            });

            if (numRowsUpdated > 0) {
                const turmaAtualizada = await Turmas.findOne({ where: { codigo: codigoTurma } });
                return res.send({ message: "Turma Atualizada com sucesso", turmacomdadosnovos: turmaAtualizada })
            }
            else {
                return res.send("Turma encontrada, porem sem novos dados para realizar")
            }
        }
        else {
            return res.status(404).send("Não existe uma turma cadastrada com este código.");
        }
    }
    catch(error){
        console.error ("Erro ao atualizar turma:", error);
        return res.status(500).send("Ocorreu um erro ao atualizar a turma.");
    }
}