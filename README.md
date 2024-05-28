```markdown
# Lanchonete API - Pós-Tech FIAP - Arquitetura de Software

Este repositório contém o código-fonte para a API backend de uma lanchonete, desenvolvido durante o primeiro módulo da Pós-Tech FIAP de Arquitetura de Software. O projeto foi criado utilizando a metodologia Domain Driven Design (DDD) e princípios de Arquitetura Hexagonal (Ports and Adapters), com o objetivo de criar um sistema escalável e testável.

## Tecnologias Utilizadas

- **TypeScript**: Linguagem de programação.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados.
- **Docker**: Ferramenta de virtualização e orquestração de containers.
- **Docker Compose**: Ferramenta para orquestrar múltiplos serviços Docker.
- **Swagger**: Ferramenta de documentação de APIs.
- **Sequelize**: ORM (Object-Relational Mapping) para PostgreSQL.

## Estrutura do Projeto

A estrutura de pastas e arquivos do projeto segue a arquitetura hexagonal (Ports and Adapters), separando a lógica de negócio da infraestrutura:

- **core**: Contém a lógica de negócio da aplicação, independente de frameworks e detalhes de implementação.
- **infra**: Camada de infraestrutura, responsável pela comunicação com tecnologias externas.

## Domínios e Entidades

O sistema inclui as seguintes classes de domínio:

- **Cliente**: Representa um cliente da lanchonete.
- **Item**: Representa um item do cardápio.
- **Pedido**: Representa um pedido realizado pelo cliente.
- **Pagamento**: Representa o pagamento de um pedido.
- **Ingrediente**: Representa um ingrediente utilizado nos itens do cardápio.
- **PesquisaSatisfacao**: Representa um formulário de pesquisa de satisfação do cliente.

## Comandos para Inicializar o Serviço

1. **Clonar o repositório:**
    ```bash
    git clone https://github.com/[seu-username]/lanchonete-api.git
    ```

2. **Instalar as dependências:**
    ```bash
    cd lanchonete-api
    npm install
    ```

3. **Iniciar os serviços Docker:**
    ```bash
    docker-compose up -d
    ```

4. **Acessar a documentação da API Swagger:**
    [http://localhost:8000/api-docs](http://localhost:8000/api-docs)

## Link para o Miro - DDD e Event Storming

Para mais detalhes sobre a modelagem e o design do sistema, acesse o quadro do Miro:
[Link para o Miro](https://miro.com/app/board/uXjVKJNKqKg=/?share_link_id=577001495836)

## Observações

- Este projeto foi desenvolvido para fins educacionais e demonstrativos.
- O código pode ser adaptado e expandido para atender às necessidades de um sistema real de lanchonete.
- Para mais informações sobre o código e a arquitetura do projeto, consulte os arquivos de código-fonte e a documentação interna.
```
