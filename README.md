# API Bornes de recharge pour véhicules électriques

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Ce projet est un serveur web (API REST) développé avec [NestJS](https://nestjs.com/), permettant de récupérer et d'exposer les données des bornes de recharge pour véhicules électriques issues de l'[API OpenDataSoft](https://data.opendatasoft.com/explore/dataset/bornes-irve%40reseaux-energies-rte/information).

---

## Fonctionnalités

- Récupération des données des bornes à partir de l'API OpenDataSoft.
- Filtrage des bornes par région, département, ou autre paramètre pertinent.
- Recherche des bornes en fonction d'un terme de recherche.
- Gestion des stations favorites.
- Exposition des données via une API REST simple et performante.

---

## Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
- [npm](https://www.npmjs.com/)
- Une connexion Internet pour accéder à l'API externe.

---

## Installation

Cloner ce dépôt puis installer les dépendances :

```bash
# Cloner le projet
git clone <URL_DU_DÉPÔT>
cd <NOM_DU_PROJET>

# Installer les dépendances
npm install
```

---

## Démarrage

Pour démarrer le serveur :

```bash
# Environnement de développement
npm run start

# Mode surveillance (watch)
npm run start:dev

# Environnement de production
npm run start:prod
```

Le serveur sera accessible sur `http://localhost:3000` (par défaut).

---

## Points d'entrée de l'API

### GET `/stations`
Récupère la liste des bornes de recharge.  
**Exemple de requête :**  
`GET http://localhost:3000/stations?region=Île-de-France`

### GET `/stations/:id_station`
Récupère les informations détaillées d'une borne spécifique.  
**Exemple de requête :**  
`GET http://localhost:3000/stations/123456`

### POST `/stations/search`
Effectue une recherche sur les bornes en fonction d'un terme.  
**Exemple de requête :**  
`POST http://localhost:3000/stations/search`  
**Body :**
```json
{
  "term": "charge rapide"
}
```

### GET `/stations/favorites`
Récupère toutes les stations favorites.  
**Exemple de requête :**  
`GET http://localhost:3000/stations/favorites`

### PUT `/stations/favorites/:id`
Ajoute ou retire une borne de la liste des favoris.  
**Exemple de requête :**  
`PUT http://localhost:3000/stations/favorites/123456`  
**Body :**
```json
{
  "isFavorite": true
}
```

---

# Tests
`npm run test:e2e`

---

## Déploiement

Pour déployer l'API sur un serveur de production, nous utiliserons
[Clever Cloud](https://www.clever-cloud.com).

---

## Ressources

- [NestJS Documentation](https://docs.nestjs.com)
- [API OpenDataSoft Bornes IRVE](https://data.opendatasoft.com/explore/dataset/bornes-irve%40reseaux-energies-rte/information/)
- [Discord NestJS](https://discord.gg/G7Qnnhy)

---

## Auteur

Antoine Banchet  
Elliot Galaor
