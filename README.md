# nest-mongo-sql
## Dependências
ter os seguintes softwares instalados seguintes softwares instalados  

```
docker   
docker-compose  
```

## Execução
para iniciar os bancos

 ```docker-compose build```

 e depois

 ```docker-compose up```


-  Infelizmente os servicos nao rodam em docker devido a problema com a compilação do bcrypt, então será necessário subir o docker-compose dos bancos e depois entrar dentro de cada serviço com um novo terminal rode ```npm install``` e depois ```npm run start:dev```

# Swagger

A Api é documentada via OpenAPI (Swagger)
rode a api e acesse a url  http://localhost:10420/swagger
# Observações
## Faltou testes, e auth (que ficou 99% pronto mas ta com bug dando 402 sem motivo)


- Commits seguindo o padrão Conventional Commits

PS: Passei o feriado entrando madrugada adentro para tentar fazer parte da equipe KuantoKusta, por favor, olhem meu teste com carinho.

- Qualquer duvida entrar em contato leonardoflavios@gmail.com ou https://www.linkedin.com/in/leonardo-flavio-santos/
