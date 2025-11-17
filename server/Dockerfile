FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5001
ENV NODE_ENV=development
ENV PORT=5001
ENV PROTOCOL=http
ENV POSTGRES_USER=ganapatih
ENV POSTGRES_PASSWORD=ganapatih
ENV POSTGRES_DB=ganapatih_db
ENV POSTGRES_HOST=127.0.0.1
ENV POSTGRES_PORT=5432
ENV ACCESS_TOKEN_SECRET=ganpaatih_access_token_secret
ENV REFRESH_TOKEN_SECRET=ganapatih_refresh_token_secret
CMD ["npm", "run", "start"]
