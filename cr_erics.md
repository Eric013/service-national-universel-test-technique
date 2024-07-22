# CR du developpement SNU test

## Propositions

- Proposition de basculer sur du typescript
- Ajouter la configuration eslint + prettier sur le projet avec l'editeur.
  Par exemple

```json
{
    "editor.formatOnSave": true,
    "typescript.tsdk": "node_modules/typescript/lib", // With typescript
    "editor.tabSize": 4,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.fixAll.prettier": "explicit"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "eslint.workingDirectories": [{ "mode": "auto" }, "./src"],
    "eslint.validate": ["javascript", "typescript"]
}
```

- Revoir l'architecture du projet, découper plus finement les composants, séparation des responsabilités en unités plus petites (Single Responsibility cf. principes SOLID)
- Une fois l'architecture et les composants mieux structurés, ajouter les tests par niveau de priorité (feature critique, impact utilisateur, fréquence d'utilisation, complexité...)
- Partager les règles de validation communes entre l'app et l'API dans un projet monorepository "shared" et ainsi éviter les duplications et les différences de règles (par exemple pour la règle du password signup)
- Pas de sanitizers malgré l'utilisation du package "validator"
- Beaucoup d'erreurs ESLint à corriger, c'est important de respecter des standards et des bonnes pratiques afin de garantir un code propre, lisible et maintenable. Cela facilite également la collaboration entre les développeurs, réduit les risques de bugs et améliore la qualité générale du projet.
- Uniformiser et imposer des guidelines (par exemple, utilisation réelle des composants Formik pour les formulaires <Field /> et non avoir pour certains le composant Field et pour d'autres <input />)
- Ajouter les schémas de validation sur les routes (Joi + express-validation, celebrate...)
- Meilleure gestion des erreurs et surtout de manière centralisée (répétition des messages d'erreurs...)
- Suppression des retours de la propriété password pour la partie user (corrigé)

## Bugs trouvés

- Quand on crée un "new user" :
  - le username n'est pas enregistré => changement de l'input username to name (bug corrigé)
  - si le name est obligatoire, il n'y a pas de gestion d'erreur sur ce champ
  - le champ email n'est pas vérifié (feature ajoutée)
  - on peut créer un user avec le même nom / email / pwd (feature partiellement ajoutée pour vérifier si un user avec le même name et email existe => Créer un script de migration Mongo pour db.collection('users').createIndex({ name: 1 }, { unique: true }) et db.collection('users').createIndex({ email: 1 }, { unique: true }))
  - pas de schéma de validation pour protéger la route (et pareil pour les autres routes)
  - si l'API ne répond pas, l'utilisateur n'a aucun retour => Ajouter une gestion des erreurs réseau et/ou ajouter un timeout (corrigé avec un timeout à titre d'exemple)
- Règles de validation différentes entre l'API et l'app :
  - Field password sur l'app : on vérifie seulement s'il n'est pas vide, alors que sur l'API, on demande à avoir au minimum 6 caractères et au maximum 100 caractères (bug corrigé)
- Gestion de l'api.js étrange (async avec des try/catch...) (corrigé)
- Sur le formulaire d'édition d'un utilisateur, le bouton Update a un event onChange à la place d'un onClick (bug corrigé)
- Sur la création d'un projet, la liste n'est pas mise à jour, reprise du même comportement que sur la liste des users (history.push project/res.data._id) (bug corrigé)
- Correction sur la vue d'un projet : on souhaite retourner le seul project par son ID dans la route, donc il faut utiliser GET("/project/:ID").findOne (bug corrigé)
- Une fois sur le dasboard quand on lance une recherche cela plante l'app

## Points a voir

- L'accès à la route `http://localhost:8082/auth` possède une erreur network dès le départ:
Request URL: `http://localhost:8080/user/signin_token`
Request Method: GET
Status Code: 401 Unauthorized
- Si je supprime mon compte l'application part en sucette => manque le redirecte ou une UX mieux définie
- Depuis le dasboard je peux créer un user avec le même nom / email / pwd => pas de contrainte db sur l'email ? (ajouté)
- Sur l'edition d'un user, le champ Name n'est pas modifiable (input attr disabled):
  - pas UI/UX montrant ce champs comme disabled (corrigé ajout d'un cursor-not-allowed)
  - un event enregistré onChange={handleChange} => pas corréhent si disabled (conditionner l'ajout du onChange en fonction du status disabled)
