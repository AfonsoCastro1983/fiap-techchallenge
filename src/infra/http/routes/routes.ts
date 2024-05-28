import express from "express";
import ClienteController from "../controllers/ClienteController";
import { CadastrarClienteUseCase } from "../../../core/usecases/cliente/CadastrarClienteUseCase";
import ItemController from "../controllers/ItemController";
import { CadastrarItemUseCase } from "../../../core/usecases/item/CadastrarItemUseCase";
import PedidoController from "../controllers/PedidoController";
import { CadastrarPedidoUseCase } from "../../../core/usecases/pedido/CadastrarPedidoUseCase";
import PagamentoController from "../controllers/PagamentoController";
import { ExecutarPagamentoUseCase } from "../../../core/usecases/pagamento/ExecutarPagamentoUseCase";


const router = express.Router()

//Clientes
///i. Cadastro de clientes
router.post("/cliente", async (req, res) => {
    try {
        const controller = new ClienteController(new CadastrarClienteUseCase());
        const cliente = await controller.salvarEmail(req.body);

        return res.status(201).send({
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cliente.cpf,
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

///ii. Identificação do cliente via CPF
router.post("/cliente/cpf", async (req, res) => {
    try {
        const controller = new ClienteController(new CadastrarClienteUseCase());
        const cliente = await controller.salvarCPF(req.body);

        return res.status(201).send({cliente});
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

//Item = Produto individual disponível no cardápio da lanchonete (ex: sanduíche, batata frita, refrigerante)
///iii. Criar
router.post("/item", async (req, res) => {
    try {
        const controller = new ItemController(new CadastrarItemUseCase());
        const item = await controller.salvarNovoItem(req.body);

        return res.status(201).send(item);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});
///iii. Editar
router.put("/item", async (req, res) => {
    try {
        const controller = new ItemController(new CadastrarItemUseCase());
        const item = await controller.editarItem(req.body);

        return res.status(201).send(item);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }

});
///iii. Remover
router.delete("/item/:id", async (req, res) => {
    try {
        const controller = new ItemController(new CadastrarItemUseCase());
        const resposta = await controller.eliminarItem(Number(req.params.id));

        if (resposta) {
            return res.status(201).send("Item excluído");
        }
        else {
            return res.status(404).send("Item não encontrado");
        }        
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});
///iv. Buscar item por categoria
router.get("/item/:categoria", async (req, res) => {
    try {
        const controller = new ItemController(new CadastrarItemUseCase());
        const resposta = await controller.buscaItemPorCategoria(req.params.categoria);

        return res.status(200).json(resposta);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

//Pagamento
///v. Fake checkout
////Iniciar pagamento
router.post("/pagamento/iniciar", async (req, res) => {
    try {
        const controller = new PagamentoController(new ExecutarPagamentoUseCase());
        const resposta = await controller.iniciarPagamento(req.body);

        return res.status(200).json(resposta);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

////Confirmar pagamento
router.post("/pagamento/confirmar", async (req, res) => {
    try {
        const controller = new PagamentoController(new ExecutarPagamentoUseCase());
        const resposta = await controller.confirmarPagamento(req.body);

        return res.status(200).json(resposta);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

////Cancelar pagamento
router.post("/pagamento/cancelar", async (req, res) => {
    try {
        const controller = new PagamentoController(new ExecutarPagamentoUseCase());
        const resposta = await controller.cancelarPagamento(req.body);

        return res.status(200).json(resposta);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

//Pedido
///Gravar pedido
router.post("/pedido", async (req, res) => {
    try {
        const controller = new PedidoController(new CadastrarPedidoUseCase());
        const item = await controller.cadastrarPedido(req.body);

        return res.status(201).send(item);        
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});
///Atualizar status do pedido
router.put("/pedido/status", async (req, res) => {
    try {
        const controller = new PedidoController(new CadastrarPedidoUseCase());
        const item = await controller.atualizarStatusPedido(req.body);

        return res.status(201).send(item); 
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
})
///vi. Listar pedidos
router.get("/pedido/:status", async (req, res) => {
    try {
        const controller = new PedidoController(new CadastrarPedidoUseCase());
        const resposta = await controller.buscaPorStatus(req.params.status);

        if (resposta) {
            return res.status(201).send(resposta);
        }
        else {
            return res.status(404).send("Pedido não encontrado");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

///buscar pedido
router.get("/pedido/:id", async (req, res) => {
    try {
        const controller = new PedidoController(new CadastrarPedidoUseCase());
        const resposta = await controller.buscaPorId(Number(req.params.id));

        if (resposta) {
            return res.status(201).send(resposta);
        }
        else {
            return res.status(404).send("Pedido não encontrado");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

export default router;