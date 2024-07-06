import { Cliente } from '../../../domain/entities/Cliente';
import { ClienteRepository } from '../../../infra/database/repositories/Cliente';
import { CadastrarClienteDto } from '../../../domain/dtos/CadastrarClienteDto';
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

        if (cpf && cpf != "") {
            console.log('CPF',cpf);
            const cliPesqCPF = await this.buscarPorCPF(cpf)
            if (cliPesqCPF && cliPesqCPF.id != 0) {
                console.log('CPF',cliPesqCPF);
                return cliPesqCPF;
            }
        }
        if (email && email != "") {
            const cliEmail = await this.buscarPorEmail(email)
            if (cliEmail && cliEmail.id != 0) {
                console.log('CPF',cliEmail);
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

        const cliente = this.gerarClientePorRepositorio(clienteRepository);

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

    public gerarClientePorRepositorio(repCliente: ClienteRepository): Cliente {
        let emailObj: Email | undefined;
        if (repCliente.email != "") {
            emailObj = new Email(repCliente.email);
        }

        let cpfObj: CPF | undefined;
        if (repCliente.cpf != "") {
            cpfObj = new CPF(repCliente.cpf);
        }
        return new Cliente(repCliente.id, repCliente.nome, emailObj, cpfObj);
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