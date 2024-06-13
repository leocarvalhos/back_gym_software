# Sistema de Gerenciamento de Academia
[Assista ao vídeo](https://www.youtube.com/watch?v=49uxnc1f7KY&ab_channel=LeandroCarvalho)
<p align="center">
  <a href="https://www.youtube.com/watch?v=49uxnc1f7KY&ab_channel=LeandroCarvalho">
    <img src="https://img.youtube.com/vi/49uxnc1f7KY/0.jpg" alt="Assista ao vídeo no YouTube" style="width:80%;"/>
  </a>
</p>

## Sumário

1. [Visão Geral](#visão-geral)
2. [Funcionalidades](#funcionalidades)
3. [Ferramentas Utilizadas](#ferramentas-utilizadas)
4. [Arquitetura do Sistema](#arquitetura-do-sistema)
5. [Configuração do Ambiente](#configuração-do-ambiente)
6. [Documentação com Swagger](#documentação-com-swagger)
7. [Deploy](#deploy)

# Visão Geral

O Sistema de Gerenciamento de Academia é uma solução completa para a administração de academias de ginástica. Este projeto oferece funcionalidades essenciais para gerenciar membros, treinadores e atividades da academia. Desenvolvido utilizando as tecnologias mais modernas, o sistema garante eficiência, segurança e escalabilidade.

## Funcionalidades

- Gestão de Usuários: Controle completo sobre membros, treinadores e administradores da academia, com funcionalidades de registro, autenticação e autorização.

- Gerenciamento de Atividades: Criação, atualização e exclusão de atividades físicas e treinos personalizados para os membros.

- Relatórios e Análises: Geração de relatórios detalhados sobre o desempenho dos membros, frequência de uso da academia e outras métricas importantes.

- Integração com Pagamentos: Suporte para integração com sistemas de pagamento para gerenciar assinaturas e mensalidades dos membros.

- Notificações: Sistema de notificações para manter a equipe e os membros informados sobre eventos, novos treinos e atualizações.

- Envio de E-mails ao suporte: Funcionalidade para envio de e-mails por funcionários para a equipe de suporte, permitindo relatar problemas, bugs ou solicitações de ajuda.

## Ferramentas Utilizadas

- **TypeScript**: Linguagem de programação utilizada para desenvolvimento do projeto.
- **Nest.js**: Framework para construção de aplicações Node.js eficientes, confiáveis e escaláveis.
- **TypeORM**: ORM utilizado para interagir com o banco de dados PostgreSQL.
- **Swagger**: Ferramenta para documentação e teste dos endpoints da API.
- **Redis**: Utilizado como cache para otimização de performance.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados.
- **AWS/BackBlaze**: Bucket para gerenciamento de mídias.

## Arquitetura do Sistema

#### A arquitetura do sistema é composta por uma aplicação back-end que provê uma API RESTful em JSON. Os principais componentes são:

- ##### Users: Responsável por todas as operações relacionadas aos usuários do sistema, incluindo registro, autenticação, atualização de perfil e exclusão de conta.

- ##### Notifications: Este componente gerencia o envio de notificações para os usuários, fornecendo funcionalidades para enviar mensagens, alertas e lembretes sobre eventos importantes.

- ##### Plans: Aqui reside a lógica para o gerenciamento de planos de assinatura ou mensalidades dos usuários. Implementa operações CRUD para criar, atualizar, visualizar e excluir planos.

- ##### Students: Responsável por todas as operações relacionadas aos alunos da academia, incluindo registro, matrícula em planos, histórico de treinos e informações pessoais.

- ##### Training_Workout: Este componente gerencia os treinos dos alunos, fornecendo funcionalidades para criar e modificar rotinas de treino personalizadas.

- ##### Training: Similar ao componente Training_Workout, este é responsável por gerenciar os treinos dos alunos, fornecendo funcionalidades para agendar, cancelar e visualizar sessões de treino.

- ##### Workouts: Aqui reside a lógica para a manipulação de exercícios e rotinas de treino. Implementa operações CRUD para criar, atualizar, visualizar e excluir exercícios e planos de treino.

- ##### Auth: Contém os controladores e serviços responsáveis pela autenticação do usuário. Aqui fica a lógica para lidar com o login e outras operações relacionadas à autenticação, como registro, recuperação de senha, etc.

#### Além disso, o sistema utiliza os serviços da AWS (Amazon Web Services) e do Backblaze para upload e armazenamento de fotos. Na AWS, é utilizado o Amazon S3 para armazenamento seguro e escalável de fotos, enquanto no Backblaze, o B2 Cloud Storage é aproveitado para armazenamento de backups e arquivos de grande volume. Essa combinação de provedores de nuvem oferece uma solução confiável e eficiente para o gerenciamento de fotos no sistema.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software!

```
- Git
- TypeScript
- Node.JS

```

### Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone git@github.com:leocarvalhos/back_gym_software.git
   cd <back_gym_software>
   ```

2. Crie um banco de dados local ou use algum conhecido como por exemplo: [ElephantSQL](https://www.elephantsql.com/), [Supabase](https://www.supabase.com). Faça a mesma coisa para o Mailer e Bucket: [SendGrid](https://sendgrid.com/), [BackBlaze](https://www.backblaze.com/)

3. Crie e configure com as variáveis de ambiente no arquivo `.env` com os dados abaixo:

   ```bash
    MAILER_HOST=
    MAILER_PORT=
    MAILER_USER=
    MAILER_PASS=
    DB_HOST=
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_PORT=
    DB_TYPE=
    BB_ENDPOINT=
    BB_KEY_ID=
    BB_SECRET_KEY=
    BB_NAME=
    JWT_PASS=
   ```

4. Inicie o projeto com o comando

   ```bash
      npm run dev
   ```

5. Agora o projeto estará disponível na porta 3000
   ```bash
      http://localhost:3001/
   ```

#### PS: É necessário criar planos e usuários antes de começar a cadastrar os alunos.
