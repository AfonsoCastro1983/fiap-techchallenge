import { Cliente } from '../../domain/entities/Cliente';
import { ClienteRepository } from '../../../infra/database/repositories/Cliente';
import { CadastrarClienteDto } from './CadastrarClienteDto';
import { Email } from '../../domain/valueobjects/Email';
import { CPF } from '../../domain/valueobjects/CPF';
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
            const cliPesqCPF = await repCliente.findOneBy({ cpf: cpf })
            if (cliPesqCPF) {
                clienteRepository = cliPesqCPF;
            }
        }
        else if (email != "") {
            const cliPesqEmail = await repCliente.findOneBy({ email: email })
            if (cliPesqEmail) {
                clienteRepository = cliPesqEmail;
            }
        }

        if (!Reflect.has(clienteRepository, 'id')) {
            console.log('Entrou para gravar');
            let novo = new ClienteRepository();
            novo.cpf = cpf || "";
            novo.email = email || "";
            novo.nome = nome;
            novo.ultima_modificacao = new Date();
            clienteRepository = await repCliente.save(novo);
            console.log(clienteRepository);
        }

        const cliente = new Cliente(clienteRepository.id, clienteRepository.nome, emailObj, cpfObj);

        return cliente;
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