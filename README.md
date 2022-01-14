# KONBINI TEST GRAPHQL

L'idée de ce test est de voir ta manière de coder et ta réflexion personelle face à sujet, il n'y par conséquent pas une seule "bonne réponse" mais pleins de manière de faire.

## Pré-requis

- Apollo Server + Express (https://github.com/apollographql/apollo-server/blob/main/docs/source/getting-started.mdx)
- Graphql
- Le fichier datas.json

## Explications

Le but est de créer un mini serveur node avec Apollo afin de simuler une API Graphql.
Il est question ici de retrouver des livres ainsi que des auteurs et exposer des queries pour pouvoir récupérer les datas depuis un front.
Pas besoin de déployer l'api quelque part, un simple envoie du code que je test en local fonctionnera très bien.

Il va donc falloir créer :

- Schémas associés aux données dans le fichier .json,
- Resolvers pour récupérer les données dans le fichier json
- Queries

A noter ici que nous avons seulement des Livres et des Auteurs, il faudra donc créer ici 4 query :

- Une pour récupérer tous les livres
- Une pour récupérer un livre spécifique
- Une pour récupérer tous les auteurs
- Une pour récupérer un auteur spécifique

Attention à bien faire les liens entres livres et auteurs. Lorsque nous allons appelé une query pour récupérer des livres il faut pouvoir voir le nom de l'auteur qui a écrit ce livre et inversement récupérer la liste des livres écrits par un auteur.
Dans le fichier datas.json, les liens sont faits par le champ authorId présent dans le livre, à toi de t'en servir pour faire le lien entre livres et auteurs.

## Bonus

Si tout ça était vraiment trop facile, tu auras remarqué qu'il y a un champ "videoId" présent dans certains livres. C'est une vidéo dailymotion associé au livre. Le but est de récupérer les infos de cette vidéo dans l'API REST publique de dailymotion :
Voilà l'url à appeler : https://api.dailymotion.com/video/[videoId]

Il faudra donc lorsque nous appelons la query pour récupérer un livre, faire cet appel externe et incorporer le titre de la vidéo au livre associé.

## Résultat attendue

### Partie 1 :

```
Book : {
"id": 1,
"title": "Cherub 1",
"description": "Premier volet de la saga",
"date": "2011-01-01",
"Author": {
id: ...
name: ...
}
"authorId": 1,
"videoId": "x3gjlw6"
}

==========================================


Author: {
"id": 1,
"name": "Robert Muchamore",
"Country": "England"
"Books": [
Liste des livres
]
}
```

### PARTIE 2

```
Book : {
"id": 1,
"title": "Cherub 1",
"description": "Premier volet de la saga",
"date": "2011-01-01",
"Author": {
id: ...
name: ...
}
"Video": {
"id": ... ,
"title": ... ,
}
"authorId": 1,
"videoId": "x3gjlw6"
}
```
