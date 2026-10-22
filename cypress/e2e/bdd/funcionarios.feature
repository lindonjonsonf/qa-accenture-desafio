# language: pt

Funcionalidade: Cadastro e exclusão de funcionários

  Cenário: Cadastrar e excluir 12 funcionários, um por vez
    Dado que acesso a página Web Tables
    Quando cadastro e excluo 12 funcionários, um por vez
    Então nenhum dos 12 funcionários deve permanecer na tabela
