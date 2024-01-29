# FIAP SOAT - Grupo 34 - Tech Challenge #02

Repositório do Tech Challenge #01 da FIAP/Alura, no curso SOAT3. Foram utilizadas técnicas Clean Architecture, criação dos arquivos necessários para rodar a aplicação no ambiente Kubernetes e criado integração continua junto com o Github Actions + Dockerhub + AWS.


### Membros

- [Bruno De Masi](github.com/brunodmsi)
- [Gabriel Almeida](github.com/gabrielgqa)
- [Leandro Arzolla Coelho](github.com/leandrocoelho1)
- [Samir El Hassan](github.com/samirelhassann)


# Documentação

Para realizar a documentação do DDD, criamos um documento no [Notion](https://notion.so) para centralizar e organizar melhor os entregáveis e processos envolvidos, é possível realizar o acesso deste documento clicando [aqui](https://samirelhassann.notion.site/Documenta-o-Tech-Challenge-Grupo-3z4-bf92a1a97de5400abfaef9e0b6bcd0e2?pvs=4)

### Desenho da Arquitetura - Clique [aqui](https://link.excalidraw.com/readonly/yOHCwKiHK6bbf3xa3a0i?darkMode=true) para ter acesso ao desenho da arquitetura

### Video explicando a arquitetura - Clique [aqui](https://youtu.be/Mh9W6_oko7Y?si=CobddQXE7XtVRVZG) para ter acesso ao vídeo com a explicação da arquitetura


# Como rodar a aplicação?

### Rodando Localmente

Pré-requisitos:

- Docker instalado e funcional na máquina, para conseguir subir o docker do postgres sem problema.
- NodeJs LTS


Caso queira rodar localmente, sem utilizar o docker:

1. Instale as dependências
```bash
yarn install
```

2. Rode o seguinte comando no root do projeto para subir o docker do postgres:
```bash
docker-compose up -d
```

3. Atualize o prisma
```bash
yarn prisma generate && yarn prisma migrate dev
```

4. Inicialize a aplicação
```bash
yarn dev
```

A aplicação estará disponível, por padrão, na rota [`http://localhost:3333`](http://localhost:3333).


### Rodando com o Kubernetes

1. Entre na pasta deploy
```bash
cd deploy/local
```

2. No arquivo deploy/local/db/pv.yaml mude o local da pasta para ser alocal o PV localmente

3. Em seguigda, comece rodando a camada de banco de dados
```bash
kubectl apply -f db
```

4. Rode a camada de api
```bash
kubectl apply -f api
```

5. Verifique via kubectl se ambos so deployments estão rodando sem problemas:
```bash
kub get pods --watch
```

A aplicação estará disponível, por padrão, na rota [`http://localhost:31100/`](http://localhost:31100/). (Rota definido no svc-deployment-api.yaml)


# Swagger e Redoc

Ao rodar o projeto é possível acessar com o endpoint `/docs` a documentação completa no [Redoc](https://github.com/Redocly/redoc) ou em `/docs-swagger` para a visualização do [Swagger](swagger.io) padrão.

# Collection Postman

Clique [aqui para baixar](https://drive.google.com/file/d/1dYzTnvwMpA8fq6seoTcckjNR7SJJ3oEI/view?usp=sharing) a collection do postman

Internamente na collection possuem todos os endpoints e uma pasta chamada caminho feliz para simular o passo a passo de chamadas



