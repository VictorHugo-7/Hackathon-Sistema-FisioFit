<!--TÍTULO-->
# Sistema FisioFit


<!--DESCRIÇÃO-->
> Sistema desenvolvido no 1º Hackathon entre o Instituto Mauá de Tecnologia e o Centro Universitário São Camilo.<br/>
> O sistema consiste em um mecanismo de lembretes que incentiva a prática de exercícios físicos e o cuidado com a saúde mental, promovendo hábitos saudáveis por meio de notificações periódicas e personalizadas.<br/>


<!--STATUS-->
## Status
> ✔ Concluído.


<!--FUNCIONALIDADES-->
## Funcionalidades 
````
Usuário:
    . Administrar Perfil
    . Administrar Lembretes
````


<!--TECNOLOGIAS-->
## Tecnologias
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="40"/> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="40"/> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" width="40"/> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="40"/> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" width="40"/> | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" width="40"/> |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| React                                                                                                      | Tailwind CSS                                                                                                            | Vite                                                                                                         | Node.js                                                                                                      | MongoDB                                                                                                        | Figma                                                                                                      |


<!--PROTÓTIPO-->
## Protótipo
[![](https://img.shields.io/badge/Figma--5C5C5C?logo=figma&logoColor=white)](https://www.figma.com/design/xuVpanGxgkrNNxsRLi7Iqj/Hackathon-Sistema-FisioFit?node-id=2-2&t=yAbqZzgEM8IxewNx-1)


<!--PARTICIPANTES-->
## Participantes
| Nome                            |
|---------------------------------|
| Alvaro Nogueira Junqueira Souza	|
| Lucas Novaes de Sá Ferreira     |
| Victor Hugo Pinho               | 


<!--DEPENDÊNCIAS-->
## Dependências
````
@tailwindcss/vite         | ^4.1.11  | Plugin Vite para integração com Tailwind CSS           
bcrypt                    | ^6.0.0   | Hashing de senhas (mais comum que bcryptjs em backend) 
cors                      | ^2.8.5   | Habilita CORS para requisições entre origens           
date-fns                  | ^4.1.0   | Utilitários modernos para manipulação de datas         
dotenv                    | ^17.2.1  | Gerenciamento de variáveis de ambiente                 
express                   | ^5.1.0   | Framework para criação de servidores web e APIs        
lucide-react              | ^0.539.0 | Biblioteca de ícones SVG para React                    
mongoose                  | ^7.8.7   | ODM para MongoDB                                       
mongoose-unique-validator | ^4.0.1   | Validação de campos únicos no Mongoose                 
react                     | ^19.1.1  | Biblioteca para construção de interfaces               
react-dom                 | ^19.1.1  | Renderização do React no DOM                           
react-router              | ^7.8.0   | Roteamento para aplicações React                       
tailwindcss               | ^4.1.11  | Framework CSS utilitário                               
````


<!--COMO UTILIZAR-->
## Como Utilizar
```
Requisitos:
    . Node.js 18+ (recomendado) para executar frontend (Vite) e backend
    . npm como gerenciador de pacotes
    . MongoDB 5.0+ para banco de dados NoSQL
    . IDE (VS Code recomendado)

Execução:
    1. Clone o repositório                | git clone https://github.com/VictorHugo-7/Hackathon-Sistema-FisioFit
    
    2. Navegue até o diretório do projeto | cd Hackathon-Sistema-FisioFit
    
    3. Instale as dependências            | npm install
    
    4. Configure as variáveis de ambiente | PORT=3000
                                          | MONGO_URI=mongodb://localhost:27017/nome-do-banco
    
    5. Inicie o backend                   | npm run backend
    
    6. Inicie o frontend                  | npm run frontend
```


<!--CONTRIBUIÇÃO-->
## Contribuição
````
1. Fork               | Crie uma cópia do repositório no seu perfil

2. Clone              | git clone https://github.com/VictorHugo-7/Hackathon-Sistema-FisioFit

3. Crie uma Branch    | git checkout -b minha-branch

4. Faça as Alterações | Edite os arquivos e teste.

5. Commit e Push      | git add .
                      |	git commit -m "Descrição das alterações" 
                      |	git push origin minha-branch

6. Pull Request       | Solicite a inclusão de suas mudanças no repositório original.
````


<!--ESTRUTURA DE PASTAS-->
## Estrutura de Pastas
````
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── lembreteController.js
│   ├── models/
│   │   ├── Lembrete.js
│   │   └── Usuario.js
│   └── routes/
│       ├── authRoutes.js
│       └── lembreteRoutes.js
├── frontend/
│   └── src/
│       ├── index.css
│       ├── main.jsx
│       ├── components/
│       │   ├── ProfileModal.jsx
│       │   └── ProtectedRoute.jsx
│       └── pages/
│           ├── Cadastro.jsx
│           ├── Login.jsx
│           └── Sistema.jsx
├── .gitignore
├── LICENSE
├── README.md
├── eslint.config.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── vite.config.js
````


<!--ESTATÍSTICAS-->
## Estatísticas
![](https://visitor-badge.laobi.icu/badge?page_id=VictorHugo-7.Hackathon-Sistema-FisioFit)
![Tamanho do Repositório](https://img.shields.io/github/repo-size/VictorHugo-7/Hackathon-Sistema-FisioFit)
![Linguagens](https://img.shields.io/github/languages/top/VictorHugo-7/Hackathon-Sistema-FisioFit)


<!--LICENÇA-->
## Licença
[Veja a licença](https://github.com/VictorHugo-7/Hackathon-Sistema-FisioFit?tab=License-1-ov-file)




