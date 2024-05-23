const { where } = require('sequelize');
const Usuario = require('../models/usuario');  
const UsuariosTurmas = require('../models/usuarios_turmas')

exports.getAll = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios)
};

exports.getByid = async (req, res) => {
    // no router id é o que vem depois do usuario
    const IdDoPaam = req.parms.id;
    const usuarioEncontrado = await Usuario.findOne({ idUsuarios:idDoparam});
    res.json(usuarioEncontrado)
};

// Cadastro um usuário
exports.createUsuario = async (req, res) => {

    const usuarioCadastrado = await Usuario.findOne({ where: { cpf: req.body.cpf } });
    // Verificação duplicidade do usuario cadastrado
    if (usuarioCadastrado) {
        return res.send("Já existe um usuario cadastrado com esse CPF.")
    }
    const usuarioCriado = await Usuario.create(req.body)

    if (usuarioCriado.idUsuarios && req.body.Turmas_idTurmas) {
        await UsuariosTurmas.create({

            Turmas_idTurmas: req.body.Turmas_idTurmas, //idturma vem do front commo informação de seleção de turma
            Usuarios_idUsuarios: usuarioCriado.idUsuarios,
        })
    } else {
        return res.send("Erro ao cadastrar o usuario!")
    }
    return res.send("Usuário Cadastrado!");
    // res.json(usuario)
}

exports.updateUsuario = async (req, res) => {
    const cpfUsuario = req.params.cpf;

    try {
        const usarioCadastrado = await Usuario.findOne({ where: { cpf: cpfUsuario } });

        if (usarioCadastrado) {
            delete req.body.cpf;

            const [numRowsUpdated] = await Usuario.update(req.body, {
                where: { cpf: cpfUsuario }
            });

            if (numRowsUpdated > 0) {
                const usuarioAtualizado = await Usuario.findOne({ where: { cpf: cpfUsuario } });
                return res.send({ message: "Usuario Atualizado com sucesso", usuariocomdadosnovos: usuarioAtualizado })
            }
            else {
                return res.send("Usuário encontrado, porem sem novos dados para realizar")
            }
        }
        else {
            return res.status(404).send("Não existe um usuário cadastrado com este código.");
        }
    }
    catch(error){
        console.error ("Erro ao atualizar usuário:", error);
        return res.status(500).send("Ocorreu um erro ao atualizar o usuário.");
    }
}

// Deletar um usuario 

exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }

        const desvincular = await UsuariosTurmas.findOne({ where: {Usuarios_idUsuarios: usuario.idUsuarios } });
        if (desvincular) {
            await desvincular.destroy();
        }
        await usuario.destroy();

        return res.send('Usuário deletado com sucesso');
    } catch (error) {
        console.error('Erro ao deletar usuário', error);
        return res.status(500).send('Erro ao deletar usuário');
    }
};