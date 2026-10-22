# Desafio QA - Accenture

Automacao de testes de API e front-end do [DemoQA](https://demoqa.com) com Cypress, Page Object e BDD (Cucumber).

## Como rodar

```bash
npm install
npm test             # todos os testes
npm run test:api    # somente API
npm run test:front  # somente front
npm run test:bdd    # somente BDD
```

## O que foi feito

- **API:** fluxo completo da livraria (usuario, token, autorizacao, livros, reserva e consulta)
- **Front:** Practice Form, Browser Windows, Web Tables, Progress Bar e Sortable
- **BDD (bonus):** cadastro e exclusao de 12 funcionarios

## Estrutura

```
cypress/
├── e2e/
│   ├── api/        # testes de API
│   ├── front/      # testes de interface
│   └── bdd/        # .feature e steps
├── fixtures/       # arquivo .txt do upload
├── paginas/        # Page Objects
├── servicos/       # chamadas da API
└── support/        # configuracoes globais
```