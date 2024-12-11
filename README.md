# API Bornes de recharge pour véhicules électriques

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Ce projet est un serveur web (API REST) développé avec [NestJS](https://nestjs.com/). Il permet de récupérer, filtrer et gérer les données des bornes de recharge pour véhicules électriques issues de l'[API OpenDataSoft](https://data.opendatasoft.com/explore/dataset/bornes-irve@reseaux-energies-rte/information).

---

## Fonctionnalités

- **Récupération des données** : Intégration avec l'API OpenDataSoft pour obtenir des informations sur les bornes de recharge.
- **Recherche** : Recherche avancée sur les bornes en fonction de divers critères (termes, région, département, etc.).
- **Filtrage** : Filtrage des bornes par région, département ou autre paramètre pertinent.
- **Gestion des favoris** : Possibilité d'ajouter et de gérer des bornes favorites.
- **Exposition via API REST** : Une API simple et performante pour interagir avec les données.

---

## Prérequis

Avant de commencer, assurez-vous que les outils suivants sont installés :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
- [npm](https://www.npmjs.com/)
- Une connexion Internet pour accéder à l'API OpenDataSoft.

---

## Installation

Pour installer et configurer le projet, suivez ces étapes :

1. Clonez le dépôt :

    ```bash
    git clone <URL_DU_DÉPÔT>
    cd <NOM_DU_PROJET>
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

---

## Démarrage

Pour démarrer le serveur, utilisez l'une des commandes suivantes :

```bash
# Environnement de développement
npm run start

# Mode surveillance (watch)
npm run start:dev

# Environnement de production
npm run start:prod
```

Le serveur sera accessible à l'adresse `http://localhost:3000` par défaut.

---

## Points d'entrée de l'API

### GET `/stations`
Récupère la liste des bornes de recharge.  
**Exemple de requête :**  
`GET http://localhost:3000/stations?region=Île-de-France`

---

### GET `/stations/:id_station`
Récupère les informations détaillées d'une borne spécifique.  
**Exemple de requête :**  
`GET http://localhost:3000/stations/123456`

---

### POST `/stations/search`
Effectue une recherche avancée sur les bornes.  
**Exemple de requête :**  
`POST http://localhost:3000/stations/search`  
**Body :**
```json
{
  "term": "charge rapide"
}
```

---

### GET `/stations/favorites`
Récupère toutes les bornes marquées comme favorites.  
**Exemple de requête :**  
`GET http://localhost:3000/stations/favorites`

---

### PUT `/stations/favorites/:id`
Ajoute ou retire une borne des favoris.  
**Exemple de requête :**  
`PUT http://localhost:3000/stations/favorites/123456`  
**Body :**
```json
{
  "isFavorite": true
}
```

---

## Tests

Des tests end-to-end sont inclus pour garantir la fiabilité de l'API.  
Pour exécuter les tests :

```bash
npm run test:e2e
```

---

## Déploiement

### Hébergement
Ce projet est déployé sur [Clever Cloud](https://www.clever-cloud.com).

Liens:

- [Eco-chare-web](https://console.clever-cloud.com/organisations/orga_693c81f4-6d20-46f3-901b-29afc84a379d/applications/app_31585253-4bde-43aa-b5cf-8d3816f19d50)
- API: https://eco-charge.cleverapps.io

---

## Ressources

- [NestJS Documentation](https://docs.nestjs.com)
- [API OpenDataSoft Bornes IRVE](https://data.opendatasoft.com/explore/dataset/bornes-irve@reseaux-energies-rte/information/)
- [Discord NestJS](https://discord.gg/G7Qnnhy)
- [Clever Cloud Documentation](https://www.clever-cloud.com/doc/)

---

## Auteur

Ce projet a été développé par :

- **Antoine Banchet**
- **Elliot Galaor**

Pour toute question ou suggestion, n'hésitez pas à nous contacter.
