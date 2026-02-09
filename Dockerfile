# -----------------------------
# Étape 1 : builder l'application Angular
# -----------------------------
FROM node:20 AS builder

WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste du projet
COPY . .

# Builder l'application pour production
RUN npm run build -- --output-path=dist --configuration=production

# -----------------------------
# Étape 2 : servir avec Nginx
# -----------------------------
FROM nginx:alpine

# Supprimer le contenu par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier le build Angular (le bon sous-dossier "browser")
COPY --from=builder /app/dist/browser /usr/share/nginx/html

# Exposer le port
EXPOSE 80

# Lancer Nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
