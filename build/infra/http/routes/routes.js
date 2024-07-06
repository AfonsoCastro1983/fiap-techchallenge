"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ClienteController_1 = __importDefault(require("../controllers/ClienteController"));
var CadastrarClienteUseCase_1 = require("../../../application/usecases/cliente/CadastrarClienteUseCase");
var ItemController_1 = __importDefault(require("../controllers/ItemController"));
var CadastrarItemUseCase_1 = require("../../../application/usecases/item/CadastrarItemUseCase");
var PedidoController_1 = __importDefault(require("../controllers/PedidoController"));
var CadastrarPedidoUseCase_1 = require("../../../application/usecases/pedido/CadastrarPedidoUseCase");
var PagamentoController_1 = __importDefault(require("../controllers/PagamentoController"));
var ExecutarPagamentoUseCase_1 = require("../../../application/usecases/pagamento/ExecutarPagamentoUseCase");
var MercadoPagoService_1 = require("../../mercadopago/MercadoPagoService");
var router = express_1.default.Router();
//Clientes
///1ªFase - Entregáveis 2 - i. Cadastro de clientes
router.post("/cliente", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, cliente, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new ClienteController_1.default(new CadastrarClienteUseCase_1.CadastrarClienteUseCase());
                return [4 /*yield*/, controller.salvarCliente(req.body)];
            case 1:
                cliente = _a.sent();
                return [2 /*return*/, res.status(201).send({
                        id: cliente.id,
                        nome: cliente.nome,
                        email: cliente.email,
                        cpf: cliente.cpf,
                    })];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_1.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
///1ªFase - Entregáveis 2 - ii. Identificação do cliente via CPF
router.get("/cliente/cpf/:cpf", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, cliente, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new ClienteController_1.default(new CadastrarClienteUseCase_1.CadastrarClienteUseCase());
                return [4 /*yield*/, controller.buscarCPF(req.params.cpf)];
            case 1:
                cliente = _a.sent();
                return [2 /*return*/, res.status(201).send({ cliente: cliente })];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_2.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
///Identificação do cliente via Email
router.get("/cliente/email/:email", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, cliente, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new ClienteController_1.default(new CadastrarClienteUseCase_1.CadastrarClienteUseCase());
                return [4 /*yield*/, controller.buscarEmail(req.params.email)];
            case 1:
                cliente = _a.sent();
                return [2 /*return*/, res.status(201).send({ cliente: cliente })];
            case 2:
                error_3 = _a.sent();
                if (error_3 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_3.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Item = Produto individual disponível no cardápio da lanchonete (ex: sanduíche, batata frita, refrigerante)
///1ªFase - Entregáveis 2 - iii. Criar
router.post("/item", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, item, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new ItemController_1.default(new CadastrarItemUseCase_1.CadastrarItemUseCase());
                return [4 /*yield*/, controller.salvarNovoItem(req.body)];
            case 1:
                item = _a.sent();
                return [2 /*return*/, res.status(201).send(item)];
            case 2:
                error_4 = _a.sent();
                if (error_4 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_4.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
///1ªFase - Entregáveis 2 - iii. Editar
router.put("/item", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, item, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new ItemController_1.default(new CadastrarItemUseCase_1.CadastrarItemUseCase());
                return [4 /*yield*/, controller.editarItem(req.body)];
            case 1:
                item = _a.sent();
                return [2 /*return*/, res.status(201).send(item)];
            case 2:
                error_5 = _a.sent();
                if (error_5 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_5.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
///1ªFase - Entregáveis 2 - iii. Remover
router.delete("/item/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, resposta, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new ItemController_1.default(new CadastrarItemUseCase_1.CadastrarItemUseCase());
                return [4 /*yield*/, controller.eliminarItem(Number(req.params.id))];
            case 1:
                resposta = _a.sent();
                if (resposta) {
                    return [2 /*return*/, res.status(201).send("Item excluído")];
                }
                else {
                    return [2 /*return*/, res.status(404).send("Item não encontrado")];
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                if (error_6 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_6.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
///1ªFase - Entregáveis 2 - iv. Buscar item por categoria
router.get("/item/:categoria", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, resposta, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new ItemController_1.default(new CadastrarItemUseCase_1.CadastrarItemUseCase());
                return [4 /*yield*/, controller.buscaItemPorCategoria(req.params.categoria)];
            case 1:
                resposta = _a.sent();
                return [2 /*return*/, res.status(200).json(resposta)];
            case 2:
                error_7 = _a.sent();
                if (error_7 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_7.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Pagamento
///1ªFase - Entregáveis 2 - v. Fake checkout
////Iniciar pagamento
router.post("/pagamento/iniciar", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, resposta, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new PagamentoController_1.default(new ExecutarPagamentoUseCase_1.ExecutarPagamentoUseCase(), new MercadoPagoService_1.MercadoPagoService(req, 'webhook'));
                return [4 /*yield*/, controller.iniciarPagamento(req.body)];
            case 1:
                resposta = _a.sent();
                return [2 /*return*/, res.status(200).json(resposta)];
            case 2:
                error_8 = _a.sent();
                if (error_8 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_8.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
////Confirmar pagamento
router.post("/pagamento/confirmar", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, resposta, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new PagamentoController_1.default(new ExecutarPagamentoUseCase_1.ExecutarPagamentoUseCase(), new MercadoPagoService_1.MercadoPagoService(req, 'webhook'));
                return [4 /*yield*/, controller.confirmarPagamento(req.body)];
            case 1:
                resposta = _a.sent();
                return [2 /*return*/, res.status(200).json(resposta)];
            case 2:
                error_9 = _a.sent();
                if (error_9 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_9.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
////Cancelar pagamento
router.post("/pagamento/cancelar", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, resposta, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new PagamentoController_1.default(new ExecutarPagamentoUseCase_1.ExecutarPagamentoUseCase(), new MercadoPagoService_1.MercadoPagoService(req, 'webhook'));
                return [4 /*yield*/, controller.cancelarPagamento(req.body)];
            case 1:
                resposta = _a.sent();
                return [2 /*return*/, res.status(200).json(resposta)];
            case 2:
                error_10 = _a.sent();
                if (error_10 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_10.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
////Webhook de atualização de status de pagamento
router.post("/pagamento/webhook", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mp, resposta;
    return __generator(this, function (_a) {
        try {
            mp = new MercadoPagoService_1.MercadoPagoService(req, 'weebhook');
            resposta = mp.tratarRetorno(req.body);
            return [2 /*return*/, res.status(200).json(resposta)];
        }
        catch (error) {
            if (error instanceof Error) {
                return [2 /*return*/, res.status(500).json({ erro: error.message })];
            }
        }
        return [2 /*return*/];
    });
}); });
///2ªFase - Entregáveis 1 - a.iii Webhook para receber confirmação de pagamento aprovado ou recusado
////2ªFase - Entregáveis 1 - a.ii
router.get("/pagamento/status/:pedido", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, resposta, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new PagamentoController_1.default(new ExecutarPagamentoUseCase_1.ExecutarPagamentoUseCase(), new MercadoPagoService_1.MercadoPagoService(req, 'webhook'));
                return [4 /*yield*/, controller.buscarStatusPedido(Number(req.params.pedido))];
            case 1:
                resposta = _a.sent();
                return [2 /*return*/, res.status(200).json(resposta)];
            case 2:
                error_11 = _a.sent();
                if (error_11 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_11.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Pedido
///2ªFase - Entregáveis 1 - Gravar pedido
router.post("/pedido", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, item, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new PedidoController_1.default(new CadastrarPedidoUseCase_1.CadastrarPedidoUseCase());
                return [4 /*yield*/, controller.cadastrarPedido(req.body)];
            case 1:
                item = _a.sent();
                return [2 /*return*/, res.status(201).send(item)];
            case 2:
                error_12 = _a.sent();
                if (error_12 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_12.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
///2ªFase - Entregáveis 1 - v. Atualizar status do pedido
router.put("/pedido/status", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, item, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new PedidoController_1.default(new CadastrarPedidoUseCase_1.CadastrarPedidoUseCase());
                return [4 /*yield*/, controller.atualizarStatusPedido(req.body)];
            case 1:
                item = _a.sent();
                return [2 /*return*/, res.status(201).send(item)];
            case 2:
                error_13 = _a.sent();
                if (error_13 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_13.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
///1ªFase - Entregáveis 2 - vi. Listar pedidos
router.get("/pedido/listagem/:status", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, resposta, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new PedidoController_1.default(new CadastrarPedidoUseCase_1.CadastrarPedidoUseCase());
                console.log("status", req.params.status);
                return [4 /*yield*/, controller.buscaPorStatus(req.params.status)];
            case 1:
                resposta = _a.sent();
                if (resposta) {
                    return [2 /*return*/, res.status(201).send(resposta)];
                }
                else {
                    return [2 /*return*/, res.status(404).send("Pedido não encontrado")];
                }
                return [3 /*break*/, 3];
            case 2:
                error_14 = _a.sent();
                if (error_14 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_14.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
///2ªFase - Entregáveis 1 - iv. Lista de pedidos deverá retorná-los com sudas descrições ordenados na seguinte regra
////1. Pronto (PRONTO_PARA_ENTREGA) > Em Preparação (EM_PREPARACAO) > Recebido (ENVIADO_PARA_A_COZINHA)
////2. Pedidos mais antigos primeiro e mais novos depois
////3. Pedidos com status Finalizado (ENTREGUE) não devem aparecer na lista
router.get("/pedido/status/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, resposta, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new PedidoController_1.default(new CadastrarPedidoUseCase_1.CadastrarPedidoUseCase());
                return [4 /*yield*/, controller.buscaPorStatusModulo2()];
            case 1:
                resposta = _a.sent();
                if (resposta) {
                    return [2 /*return*/, res.status(201).send(resposta)];
                }
                else {
                    return [2 /*return*/, res.status(404).send("Pedido não encontrado")];
                }
                return [3 /*break*/, 3];
            case 2:
                error_15 = _a.sent();
                if (error_15 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_15.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
///Buscar pedido
router.get("/pedido/id/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var controller, resposta, error_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                controller = new PedidoController_1.default(new CadastrarPedidoUseCase_1.CadastrarPedidoUseCase());
                return [4 /*yield*/, controller.buscaPorId(Number(req.params.id))];
            case 1:
                resposta = _a.sent();
                if (resposta) {
                    return [2 /*return*/, res.status(201).send(resposta)];
                }
                else {
                    return [2 /*return*/, res.status(404).send("Pedido não encontrado")];
                }
                return [3 /*break*/, 3];
            case 2:
                error_16 = _a.sent();
                if (error_16 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({ erro: error_16.message })];
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=routes.js.map