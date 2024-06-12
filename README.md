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
    [http://localhost:8000/docs](http://localhost:8000/docs)

## Endpoints

### Sessão Cliente

O sistema pode iniciar com um cliente ou não. Os endpoints para gerenciamento de clientes são:

- **POST /cliente**: Criação de um novo cliente.
- **POST /cliente/cpf**: Criação de um novo cliente utilizando CPF.

### Sessão Item

Gerencie os itens do cardápio da lanchonete através dos seguintes endpoints:

- **POST /item**: Criação de novos itens.
  - Exemplos de JSON para criação:
    ```json
    {
      "nome": "Hambúrguer Clássico",
      "descricao": "Hambúrguer com queijo, alface e tomate.",
      "preco": 18.50,
      "ingredientes": "Pão, carne, queijo, alface, tomate",
      "categoria": "LANCHE"
    }
    {
      "nome": "Refrigerante",
      "descricao": "Refrigerante gelado de 350ml.",
      "preco": 5.00,
      "ingredientes": "Água, açúcar, gás carbônico",
      "categoria": "BEBIDA"
    }
    {
      "nome": "Batata Frita",
      "descricao": "Batata frita crocante e salgada.",
      "preco": 10.00,
      "ingredientes": "Batata, óleo, sal",
      "categoria": "ACOMPANHAMENTO"
    }
    {
      "nome": "Sorvete",
      "descricao": "Sorvete de chocolate com calda.",
      "preco": 12.00,
      "ingredientes": "Leite, açúcar, cacau",
      "categoria": "SOBREMESA"
    }
    {
      "nome": "Sanduíche Natural",
      "descricao": "Sanduíche natural com frango e salada.",
      "preco": 15.00,
      "ingredientes": "Pão integral, frango, alface, tomate",
      "categoria": "LANCHE"
    }
    {
      "nome": "Suco de Laranja",
      "descricao": "Suco de laranja natural de 300ml.",
      "preco": 8.00,
      "ingredientes": "Laranja",
      "categoria": "BEBIDA"
    }
    {
      "nome": "Anéis de Cebola",
      "descricao": "Anéis de cebola fritos e crocantes.",
      "preco": 12.00,
      "ingredientes": "Cebola, farinha, óleo",
      "categoria": "ACOMPANHAMENTO"
    }
    {
      "nome": "Brownie",
      "descricao": "Brownie de chocolate com nozes.",
      "preco": 9.00,
      "ingredientes": "Chocolate, farinha, ovos, nozes",
      "categoria": "SOBREMESA"
    }
    {
      "nome": "Cheeseburger",
      "descricao": "Cheeseburger com queijo cheddar.",
      "preco": 20.00,
      "ingredientes": "Pão, carne, queijo cheddar, alface",
      "categoria": "LANCHE"
    }
    {
      "nome": "Milkshake",
      "descricao": "Milkshake de morango de 400ml.",
      "preco": 14.00,
      "ingredientes": "Leite, sorvete, morango",
      "categoria": "BEBIDA"
    }
    ```

- **PUT /item**: Alteração de um item.
- **GET /item/{id}**: Busca de um item pelo identificador.
- **GET /item/{categoria}**: Busca de itens por categoria. As categorias são: LANCHE, BEBIDA, ACOMPANHAMENTO e SOBREMESA.

### Sessão Pedido

Gerencie os pedidos da lanchonete através dos seguintes endpoints:

- **GET /pedido/{id}**: Busca de um pedido específico pelo identificador.
- **GET /pedido/{status}**: Busca de pedidos por status. Os status são: NOVO, ENVIAR_PARA_PAGAMENTO, CANCELADO, ENVIADO_PARA_A_COZINHA, EM_PREPARACAO, PREPARADO, PRONTO_PARA_ENTREGA, ENTREGUE.
- **POST /pedido**: Criação de um novo pedido. É possível não preencher o número do cliente para casos em que o cliente não quis se identificar. O preço é passado no payload porque o preço pode mudar ao longo da criação do pedido e deve-se manter o preço inicialmente acordado.
- **PUT /pedido/status**: Mudança do status do pedido. Os status são: NOVO, ENVIAR_PARA_PAGAMENTO, CANCELADO, ENVIADO_PARA_A_COZINHA, EM_PREPARACAO, PREPARADO, PRONTO_PARA_ENTREGA, ENTREGUE.

### Sessão Pagamento

Gerencie os pagamentos dos pedidos através dos seguintes endpoints:

- **POST /pagamento/iniciar**: Inicia o pagamento para um pedido e muda o status do pedido para ENVIAR_PARA_PAGAMENTO.
- **POST /pagamento/confirmar**: Confirma o pagamento para um pedido e muda o status do pedido para ENVIADO_PARA_A_COZINHA.
- **POST /pagamento/cancelar**: Cancela o pagamento para um pedido e muda o status do pedido para CANCELADO.


## Link para o Miro - DDD e Event Storming

Para mais detalhes sobre a modelagem e o design do sistema, acesse o quadro do Miro:
[Link para o Miro](https://miro.com/app/board/uXjVKJNKqKg=/?share_link_id=577001495836)

## Observações

- Este projeto foi desenvolvido para fins educacionais e demonstrativos.
- O código pode ser adaptado e expandido para atender às necessidades de um sistema real de lanchonete.
- Para mais informações sobre o código e a arquitetura do projeto, consulte os arquivos de código-fonte e a documentação interna.
```
