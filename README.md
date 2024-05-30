## Pokedex App
<p>Pokedex App é um projeto desenvolvido com Ionic e Angular que consome a API PokeAPI para exibir uma lista de Pokémons.</p>
<p>Os usuários podem favoritar Pokémons, visualizar uma lista de seus Pokémons favoritos e ver detalhes de cada Pokémon.</p>
<hr>

## Funcionalidades

- Página Principal: Exibe uma lista de Pokémons com seus detalhes básicos em forma de cards.
- Favoritar Pokémon: Os usuários podem adicionar ou remover Pokémons de seus favoritos diretamente nos cards.
- Página de Favoritos: Lista todos os Pokémons que foram marcados como favoritos pelo usuário.
- Detalhes do Pokémon: Exibe informações detalhadas sobre um Pokémon específico, como suas habilidades, tipos e estatísticas.
<hr>







# Instruções de uso

Faça o clone do repositório do projeto:
```sh
git clone https://github.com/anakessia/pokedex-app.git
```

Navegue até o diretório do projeto:
```sh
cd pokedex-app
```

Instale as dependências do projeto:
```sh
npm install
```
Inicie o servidor de desenvolvimento: 
```sh
ionic serve
```

Abra o seu navegador e acesse http://localhost:8100/ para visualizar o projeto em execução.
<hr>

## Configuração
<p>Certifique-se de que a PokeAPI está acessível. Este projeto usa a URL pública da API: https://pokeapi.co/api/v2.</p>
<hr>

## Estrutura do Projeto
- src/app/: Contém a estrutura principal do aplicativo.
- components/: Componentes reutilizáveis.
- services/: Serviços para interação com a API e gerenciamento de favoritos.
- src/assets/: Recursos estáticos, como imagens e ícones.
<hr>

## Funcionalidades em Detalhes
<h2>Página Principal</h2>
- Rota: /
- Exibe uma lista de Pokémons em forma de cards.
- Cada card contém o nome do Pokémon, uma imagem e um botão para favoritar/desfavoritar.

<h2>Favoritar Pokémon</h2>
- Usuários podem clicar no ícone de coração em cada card para adicionar ou remover o Pokémon dos favoritos.
- Os favoritos são gerenciados localmente no navegador.

<h2>Página de Favoritos</h2>
Rota: /pokemon-favorite
- Lista todos os Pokémons que foram marcados como favoritos pelo usuário.
- Os usuários podem remover Pokémons da lista de favoritos diretamente nesta página.

<h2>Detalhes do Pokémon</h2>
Rota: /pokemon-detail/:id
- Exibe detalhes completos sobre um Pokémon, incluindo habilidades, tipos e estatísticas.
- A página de detalhes pode ser acessada clicando em um card na página principal ou na página de favoritos.
<hr>

## Dependências
- Ionic Framework: Estrutura principal para desenvolvimento híbrido.
- Angular: Framework para construção de aplicações web.
- ngx-toastr: Biblioteca para notificações de toast.
- PokeAPI: API pública para dados sobre Pokémons.
<hr>

## Contribuição
<p>Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.</p>

<p>Feito com ❤️ por Ana Kessia</p>

<p>Para mais informações, visite a documentação do Ionic e a documentação do Angular.</p>
