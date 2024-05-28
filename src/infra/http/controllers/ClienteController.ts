import { Body, Post, Route, Tags } from "tsoa";
import { CadastrarClienteDto } from "../../../core/usecases/cliente/CadastrarClienteDto";
import { CadastrarClienteUseCase } from "../../../core/usecases/cliente/CadastrarClienteUseCase";

export interface ClienteRequest {
    nome: string;
    email: string;
}

export interface ClienteCPFRequest {
    cpf: string;
}

interface ClienteResponse {
    id: number;
    nome: string;
    cpf: string;
    email: string;
}

@Route("cliente")
@Tags("Cliente")
export default class ClienteController {
    private cadastrarClienteUseCase: CadastrarClienteUseCase;

    constructor(cadastrarClientUseCase: CadastrarClienteUseCase) {
        this.cadastrarClienteUseCase = cadastrarClientUseCase;
    }
    /**
     * Cadastro do cliente: nome e e-mail
     */
    @Post("/")
    public async salvarEmail(@Body() body: ClienteRequest): Promise<ClienteResponse> {
        const dto: CadastrarClienteDto = {
            nome: body.nome,
            email: body.email,
        }

        const cliente = await this.cadastrarClienteUseCase.execute(dto);

        return {
            id: cliente.id,
            nome: cliente.nome,
            cpf: cliente.cpf?.value || "",
            email: cliente.email?.value || "",
        }
    }
    /**
     * Cadastro do cliente: apenas CPF
     */
    @Post("/cpf")
    public async salvarCPF(@Body() body: ClienteCPFRequest): Promise<ClienteResponse> {
        const dto: CadastrarClienteDto = {
            nome: body.cpf,
            cpf: body.cpf,
        }

        const cliente = await this.cadastrarClienteUseCase.execute(dto);

        return {
            id: cliente.id,
            nome: cliente.nome,
            cpf: cliente.cpf?.value || "",
            email: cliente.email?.value || "",
        }

    }
}