/**
 * Configuration de l'environnement de production.
 * Utilisé lors du build avec ng build --configuration production.
 * Remplace environment.ts grâce au file replacement dans angular.json.
 */
export const environment = {
  production: true,
  /** URL de base de l'API backend en production (à adapter selon votre déploiement) */
  apiUrl: 'http://192.168.56.10:8085',
};
