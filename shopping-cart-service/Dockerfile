# imagem base
FROM node:14-alpine

# diretório de trabalho
WORKDIR /app

# copiar arquivos necessários
COPY package*.json ./

# instalar dependências
RUN npm install

# copiar o código-fonte para o diretório de trabalho
COPY . .

# expor a porta 10422
EXPOSE 10422

# comando de inicialização
CMD ["npm", "run", "start:docker"]
