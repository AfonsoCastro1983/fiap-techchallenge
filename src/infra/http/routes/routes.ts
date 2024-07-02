import express from "express";
import ClienteController from "../controllers/ClienteController";
import { CadastrarClienteUseCase } from "../../../application/usecases/cliente/CadastrarClienteUseCase";
import ItemController from "../controllers/ItemController";
import { CadastrarItemUseCase } from "../../../application/usecases/item/CadastrarItemUseCase";
import PedidoController from "../controllers/PedidoController";
import { CadastrarPedidoUseCase } from "../../../application/usecases/pedido/CadastrarPedidoUseCase";
import PagamentoController from "../controllers/PagamentoController";
import { ExecutarPagamentoUseCase } from "../../../application/usecases/pagamento/ExecutarPagamentoUseCase";
import { MercadoPagoService } from "../../mercadopago/MercadoPagoService";

const router = express.Router()

//Clientes
///1ªFase - Entregáveis 2 - i. Cadastro de clientes
router.post("/cliente", async (req, res) => {
    try {
        const controller = new ClienteController(new CadastrarClienteUseCase());
        const cliente = await controller.salvarCliente(req.body);

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

///1ªFase - Entregáveis 2 - ii. Identificação do cliente via CPF
router.get("/cliente/cpf/:cpf", async (req, res) => {
    try {
        const controller = new ClienteController(new CadastrarClienteUseCase());
        const cliente = await controller.buscarCPF(req.params.cpf);

        return res.status(201).send({ cliente });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

///Identificação do cliente via Email
router.get("/cliente/email/:email", async (req, res) => {
    try {
        const controller = new ClienteController(new CadastrarClienteUseCase());
        const cliente = await controller.buscarEmail(req.params.email);

        return res.status(201).send({ cliente });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

//Item = Produto individual disponível no cardápio da lanchonete (ex: sanduíche, batata frita, refrigerante)
///1ªFase - Entregáveis 2 - iii. Criar
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
///1ªFase - Entregáveis 2 - iii. Editar
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
///1ªFase - Entregáveis 2 - iii. Remover
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
///1ªFase - Entregáveis 2 - iv. Buscar item por categoria
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
///1ªFase - Entregáveis 2 - v. Fake checkout
////Iniciar pagamento
router.post("/pagamento/iniciar", async (req, res) => {
    try {
        const controller = new PagamentoController(new ExecutarPagamentoUseCase(), new MercadoPagoService());
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
        const controller = new PagamentoController(new ExecutarPagamentoUseCase(), new MercadoPagoService());
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
        const controller = new PagamentoController(new ExecutarPagamentoUseCase(), new MercadoPagoService());
        const resposta = await controller.cancelarPagamento(req.body);

        return res.status(200).json(resposta);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

////Webhook de atualização de status de pagamento
router.post("/pagamento/webhook", async (req, res) => {
    try {

    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

///2ªFase - Entregáveis 1 - a.iii Webhook para receber confirmação de pagamento aprovado ou recusado

////2ªFase - Entregáveis 1 - a.ii
router.get("/pagamento/status/:pedido", async (req, res) => {
    try {
        const controller = new PagamentoController(new ExecutarPagamentoUseCase(), new MercadoPagoService());
        const resposta = await controller.buscarStatusPedido(Number(req.params.pedido));

        return res.status(200).json(resposta);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ erro: error.message });
        }
    }
});

//Pedido
///2ªFase - Entregáveis 1 - Gravar pedido
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
///2ªFase - Entregáveis 1 - v. Atualizar status do pedido
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
///1ªFase - Entregáveis 2 - vi. Listar pedidos
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

///2ªFase - Entregáveis 1 - iv. Lista de pedidos deverá retorná-los com sudas descrições ordenados na seguinte regra
////1. Pronto (PRONTO_PARA_ENTREGA) > Em Preparação (EM_PREPARACAO) > Recebido (ENVIADO_PARA_A_COZINHA)
////2. Pedidos mais antigos primeiro e mais novos depois
////3. Pedidos com status Finalizado (ENTREGUE) não devem aparecer na lista
router.get("/pedido/status", async (req, res) => {
    try {
        const controller = new PedidoController(new CadastrarPedidoUseCase());
        const resposta = await controller.buscaPorStatusModulo2();

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

///Buscar pedido
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