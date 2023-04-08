# imagem base
FROM node:14-alpine

# diretório de trabalho
WORKDIR /app

# copiar arquivos necessários
COPY package*.json ./

# copiar arquivos de ambiente
# COPY .env ./

# instalar dependências
RUN npm install

# copiar o código-fonte para o diretório de trabalho
COPY . .

# expor a porta 3000
EXPOSE 3000

# comando de inicialização
CMD ["npm", "run", "start:dev"]
