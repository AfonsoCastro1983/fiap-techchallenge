import { Cliente } from '../../../domain/entities/Cliente';
import { CadastrarClienteDto } from '../../../domain/dtos/CadastrarClienteDto';
import { Email } from '../../../shared/valueobjects/Email';
import { CPF } from '../../../shared/valueobjects/CPF';
import { ClienteGateway } from '../../../infra/database/gateways/ClienteGateway';

export class CadastrarClienteUseCase {
    private clienteGateway: ClienteGateway;

    constructor (clienteGateway: ClienteGateway) {
        this.clienteGateway = clienteGateway;
    }

    async execute(dto: CadastrarClienteDto): Promise<Cliente> {
        const { nome, email, cpf } = dto;

        let emailObj: Email | undefined;
        if (email) {
            emailObj = new Email(email);
        }

        let cpfObj: CPF | undefined;
        if (cpf) {
            cpfObj = new CPF(cpf);
        }

        const cliente = new Cliente(0,nome,emailObj,cpfObj);

        return this.clienteGateway.salvar(cliente);
    }

    async buscarPorCPF(cpf: string): Promise<Cliente> {
        return this.clienteGateway.buscarPorCPF(cpf);
    }

    async buscarPorEmail(email: string): Promise<Cliente> {
        return this.clienteGateway.buscarPorEmail(email);
    }

    async get(id: number): Promise<Cliente> {
        return this.clienteGateway.buscarPorID(id);
    }
}