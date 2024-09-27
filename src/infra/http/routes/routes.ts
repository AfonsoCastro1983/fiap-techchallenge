import express from "express";
import ClienteController from "../controllers/ClienteController";
import ItemController from "../controllers/ItemController";
import PedidoController from "../controllers/PedidoController";
import PagamentoController from "../controllers/PagamentoController";
import { MercadoPagoService } from "../../mercadopago/MercadoPagoService";
import { ClienteGateway } from "../../database/gateways/ClienteGateway";
import { ItemGateway } from "../../database/gateways/ItemGateway";
import { PagamentoGateway } from "../../database/gateways/PagamentoGateway";
import { PedidoGateway } from "../../database/gateways/PedidoGateway";

const router = express.Router()

//Clientes
///1ªFase - Entregáveis 2 - i. Cadastro de clientes
router.post("/cliente", async (req, res) => {
    try {
        const controller = new ClienteController(new ClienteGateway());
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
        const controller = new ClienteController(new ClienteGateway());
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
        const controller = new ClienteController(new ClienteGateway());
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
        const controller = new ItemController(new ItemGateway());
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
        const controller = new ItemController(new ItemGateway());
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
        const controller = new ItemController(new ItemGateway());
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
        const controller = new ItemController(new ItemGateway());
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
        const controller = new PagamentoController(new PagamentoGateway(), new MercadoPagoService(req,'pagamento/webhook'));
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
        const controller = new PagamentoController(new PagamentoGateway(), new MercadoPagoService(req,'pagamento/webhook'));
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
        const controller = new PagamentoController(new PagamentoGateway(), new MercadoPagoService(req,'pagamento/webhook'));
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
        console.log(req.body);
        const controller = new PagamentoController(new PagamentoGateway(), new MercadoPagoService(req,'pagamento/webhook'));
        const resposta = await controller.receberStatusPagamentoIntegrador(req.body);
        console.log('respostaWebhook:',resposta);
        return res.status(200).json(resposta);
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
        const controller = new PagamentoController(new PagamentoGateway(), new MercadoPagoService(req,'pagamento/webhook'));
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
        let authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ error: "Cabeçalho de Autorização não encontrado" });
        }
        //Retorna se token é de um cliente válido
        const cliGate = new ClienteGateway();
        const cli = await cliGate.buscarPorToken(authHeader);
        if (cli) {
            req.body.cliente = cli.id;
        }

        console.log("body", req.body);

        const controller = new PedidoController(new PedidoGateway());
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
        let authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ error: "Cabeçalho de Autorização não encontrado" });
        }
        //Retorna se token é de um cliente válido
        const cliGate = new ClienteGateway();
        const cli = await cliGate.buscarPorToken(authHeader);
        if (cli) {
            req.body.cliente = cli.id;
        }
        
        const controller = new PedidoController(new PedidoGateway());
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
router.get("/pedido/listagem/:status", async (req, res) => {
    try {
        const controller = new PedidoController(new PedidoGateway());
        console.log("status",req.params.status);
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
router.get("/pedido/status/", async (req, res) => {
    try {
        const controller = new PedidoController(new PedidoGateway());
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
router.get("/pedido/id/:id", async (req, res) => {
    try {
        const controller = new PedidoController(new PedidoGateway());
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