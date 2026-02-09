# ==========================================
# STAGE 1: Build
# ==========================================
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances en premier (pour le cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers source
COPY . .

# Build de l'application Angular en mode production
RUN npm run build -- --configuration production

# ==========================================
# STAGE 2: Production (Nginx)
# ==========================================
FROM nginx:alpine

# Installer curl pour les health checks
RUN apk add --no-cache curl

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis l'étape de build
COPY --from=build /app/dist/sakai-ng /usr/share/nginx/html

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nginx-group && \
    adduser -S nginx-user -u 1001 -G nginx-group

# Changer les permissions
RUN chown -R nginx-user:nginx-group /usr/share/nginx/html && \
    chown -R nginx-user:nginx-group /var/cache/nginx && \
    chown -R nginx-user:nginx-group /var/log/nginx && \
    chown -R nginx-user:nginx-group /etc/nginx/conf.d

# Switch vers l'utilisateur non-root
USER nginx-user

# Exposer le port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
