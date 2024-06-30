import { Cliente } from '../../../domain/entities/Cliente';
import { ClienteRepository } from '../../../infra/database/repositories/Cliente';
import { CadastrarClienteDto } from './CadastrarClienteDto';
import { Email } from '../../../shared/valueobjects/Email';
import { CPF } from '../../../shared/valueobjects/CPF';
import { AppDataSource } from '../../../infra/database/data-source';

export class CadastrarClienteUseCase {
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

        let clienteRepository = new ClienteRepository();
        const repCliente = AppDataSource.getRepository(ClienteRepository);

        if (cpf) {
            const cliPesqCPF = await this.buscarPorCPF(cpf)
            if (cliPesqCPF) {
                return cliPesqCPF;
            }
        }
        else if (email && email != "") {
            const cliEmail = await this.buscarPorEmail(email)
            if (cliEmail) {
                return cliEmail
            }
        }

        console.log('Entrou para gravar');
        let novo = new ClienteRepository();
        novo.cpf = cpf || "";
        novo.email = email || "";
        novo.nome = nome;
        novo.ultima_modificacao = new Date();
        clienteRepository = await repCliente.save(novo);
        console.log(clienteRepository);

        const cliente = new Cliente(clienteRepository.id, clienteRepository.nome, emailObj, cpfObj);

        return cliente;
    }

    async buscarPorCPF(cpf: string): Promise<Cliente> {
        const repCliente = await AppDataSource.getRepository(ClienteRepository).findOneBy({ cpf: cpf });
        if (repCliente) {
            return this.gerarClientePorRepositorio(repCliente);
        }
        else {
            return new Cliente(0, "");
        }
    }

    private gerarClientePorRepositorio(repCliente: ClienteRepository): Cliente {
        return new Cliente(repCliente.id, repCliente.nome, new Email(repCliente.email), new CPF(repCliente.cpf));
    }

    async buscarPorEmail(email: string): Promise<Cliente> {
        const repCliente = await AppDataSource.getRepository(ClienteRepository).findOneBy({ email: email });
        if (repCliente) {
            return this.gerarClientePorRepositorio(repCliente);
        }
        else {
            return new Cliente(0, "");
        }
    }

    async get(id: number): Promise<Cliente> {
        const repCliente = await AppDataSource.getRepository(ClienteRepository).findOneBy({ id: id });
        if (repCliente) {
            return new Cliente(repCliente.id, repCliente.nome, new Email(repCliente.email), new CPF(repCliente.cpf));
        }
        else {
            return new Cliente(0, "");
        }
    }
}