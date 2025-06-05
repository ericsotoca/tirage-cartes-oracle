# 🔮 Oracle des Chants de l'Âme

Bienvenue dans l'Oracle des Chants de l'Âme, une application web de tirage de cartes oracle conçue pour offrir guidance spirituelle et pistes de réflexion personnelle.

## Fonctionnalités

*   Tirage d'une carte parmi un jeu de 44 cartes oracle uniques.
*   Chaque carte révèle :
    *   Un **nom de carte** thématique.
    *   Une **image** inspirante.
    *   Un **message** de guidance.
    *   Une **intention** à cultiver.
    *   Un **mantra** à répéter pour ancrer l'énergie de la carte.
*   Possibilité d'écouter le mantra grâce à la synthèse vocale du navigateur (si supportée).
*   Interface responsive et animée pour une expérience utilisateur agréable.
*   Accessible au clavier.

## Comment l'utiliser

1.  Ouvrez `index.html` dans votre navigateur ou visitez le lien GitHub Pages.
2.  Prenez un instant pour vous centrer et formuler une question ou une intention.
3.  Cliquez sur le bouton "✨ Tirer une carte".
4.  Une fois la carte apparue (face cachée), cliquez dessus (ou appuyez sur Entrée/Espace) pour la révéler.
5.  Lisez le message, l'intention et le mantra. Si votre navigateur le supporte, vous pouvez cliquer sur "🔊 Chanter" pour entendre le mantra.
6.  Pour un nouveau tirage, cliquez sur "🔄 Nouveau tirage".

## Structure du Projet

*   `index.html`: Structure principale de la page.
*   `style.css`: Styles pour l'application.
*   `script.js`: Logique de l'application, y compris les données des cartes et la gestion des tirages.
*   `images/`: Contient les images des cartes et une image de secours.
    *   `carte1.jpg` ... `carte44.jpg`
    *   `fallback-card-image.svg`

## Développement

Pour modifier ou étendre ce projet :

*   **Ajouter/Modifier des cartes :** Éditez le tableau `cartes` dans `script.js`. Chaque objet carte doit contenir `nom`, `image` (chemin vers l'image), `texte`, `intention`, et `mantra`.
*   **Modifier les styles :** Éditez `style.css`.
*   **Images :** Placez les nouvelles images de cartes dans le dossier `images/`.

## Hébergement

Ce projet est conçu pour être facilement hébergé sur GitHub Pages.

---

