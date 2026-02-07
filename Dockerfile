# Étape 1 : Builder l'application Angular
FROM node:16 AS builder

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste du code
COPY . .

# Builder l'application pour production
RUN npm run build -- --output-path=dist --configuration=production

# Étape 2 : Serveur Nginx
FROM nginx:alpine

# Supprimer les fichiers par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers build Angular dans Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
