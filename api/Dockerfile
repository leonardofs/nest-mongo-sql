# imagem base
FROM node:14-alpine


# compile options for bcrypt works fine
# show
# https://stackoverflow.com/questions/70852805/bcrypt-error-in-docker-container-error-path-to-local-module-node-modules-bcry


# diretório de trabalho
WORKDIR /app

# copiar arquivos necessários
COPY package*.json ./

RUN apk add –no-cache make gcc g++ python && \
npm install && \
npm rebuild bcrypt –build-from-source && \
apk del make gcc g++ python
# instalar dependências


# copiar o código-fonte para o diretório de trabalho
COPY . .

# expor a porta 10420
EXPOSE 10420

# comando de inicialização
CMD ["npm", "run", "start:docker"]
