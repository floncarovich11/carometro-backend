//routes/router.js
//nesse arquivo estarão todas as rotas 
//no caso de um proj com muitas rotas é possível quebrar as rotas em mais arquivos
const express = require ("express");
const router = express.Router();
const usuarioController = require ("../controllers/usuario")
const turmasController = require ("../controllers/turmas")

//ROTAS USUÁRIOS
//retorna todos usuarios 
router.get("/usuario", usuarioController.getAll)
router.get("/usuario/:id", usuarioController.getByid)
router.put("/usuario/:cpf", usuarioController.updateUsuario)
//cria um usuario passando informação no body 
router.post("/usuario", usuarioController.createUsuario)
router.delete('/usuario/:id', usuarioController.deleteUsuario)


// ROTAS TURMAS
router.get("/turmas", turmasController.getAll)
router.get("/turmas/:id", turmasController.getByid)
//cria um usuario passando informação no body 
router.post ("/turmas", turmasController.createTurma)
//altera uma turma passando o código na url
router.put("/turmas/:codigo", turmasController.updateTurma)

/*router.get("/usuario", usuarioController.listarUsuarios) */



module.exports = router; 