document.addEventListener('DOMContentLoaded', () => {
    // Références aux éléments du DOM
    const drawBtn = document.getElementById('drawBtn');
    const resetBtn = document.getElementById('resetBtn');
    const loadingDiv = document.getElementById('loading');
    const cardContainer = document.getElementById('cardContainer');
    const cardElement = document.getElementById('card');
    const cardFront = document.getElementById('cardFront');
    const currentYearSpan = document.getElementById('currentYear');

    // Mettre à jour l'année dans le footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Base de données des cartes
    // IMPORTANT: Assurez-vous que les chemins d'images sont corrects
    // Si votre dossier images est à la racine, "images/nom_image.jpg" est correct.
    // Ajoutez un champ "nom" pour le titre de la carte et "mantra"
    const cartes = [
        {
            nom: "Force Intérieure",
            image: "images/carte1.jpg", // Assurez-vous d'avoir ces images
            texte: "La force intérieure réside en vous. Faites confiance à votre intuition.",
            intention: "Cultiver la confiance en soi",
            mantra: "Aham Brahmasmi (Je suis Divin)"
        },
        {
            nom: "Nouvelles Opportunités",
            image: "images/carte2.jpg",
            texte: "Les nouvelles opportunités se présentent à vous. Restez ouvert(e).",
            intention: "Accueillir le changement",
            mantra: "Om Gam Ganapataye Namaha (Salutations à Ganesh, qui lève les obstacles)"
        },
        {
            nom: "Patience",
            image: "images/carte3.jpg",
            texte: "La patience est votre alliée. Tout arrive en son temps.",
            intention: "Développer la patience",
            mantra: "Shanti Hum (Je suis la paix)"
        },
        // ... Ajoutez vos 41 autres cartes ici avec nom et mantra
        // Exemple pour les 44 cartes (à compléter avec vos données réelles)
        // ... (copiez-collez vos cartes existantes et ajoutez nom et mantra)
        {
            nom: "Confiance Rayonnante",
            image: "images/placeholder.jpg", // Mettez vos vraies images
            texte: "Tu possèdes en toi toutes les ressources nécessaires. Fais confiance à ta lumière intérieure, elle est ton guide le plus sûr.",
            intention: "Aujourd'hui, j'accueille et je rayonne ma confiance avec aisance.",
            mantra: "So Hum (Je suis Cela)"
        },
        {
            nom: "Le Chemin s'Éclaire",
            image: "images/placeholder.jpg",
            texte: "N'aie crainte de l'inconnu, chaque pas en avant révèle la suite. L'intuition est ta boussole.",
            intention: "Je marche avec intuition.",
            mantra: "Sat Nam (La Vérité est mon identité)"
        },
        {
            nom: "Ancrage Profond",
            image: "images/placeholder.jpg",
            texte: "Reviens à la Terre, à ton centre. C'est dans l'immobilité que tu trouveras la force.",
            intention: "Je suis ancré, stable et en paix.",
            mantra: "Lam (Bija Mantra du Chakra Racine)"
        },
         // Assurez-vous d'avoir 44 cartes au total
        {
            nom: "Fin de Cycle",
            image: "images/carte44.jpg",
            texte: "Le cycle se complète et un nouveau chapitre commence.",
            intention: "Célébrer les nouveaux commencements",
            mantra: "Om Purnamadah Purnamidam (Tout est plénitude)"
        }
    ];

    // Vérifiez que vous avez 44 cartes
    if (cartes.length < 5) { // Mettez 44 quand vous aurez tout
        console.warn(`Attention: Seulement ${cartes.length} cartes définies. Il en faut 44.`);
    }


    let carteActuelle = null;
    let carteRevelee = false;
    let speechSynth = window.speechSynthesis; // Pour la synthèse vocale

    // Fonction pour tirer une carte
    function drawCardProcess() {
        drawBtn.disabled = true;
        drawBtn.style.display = 'none';
        loadingDiv.style.display = 'block';
        cardContainer.style.display = 'none'; // Cacher l'ancienne carte si elle était visible
        resetBtn.style.display = 'none';
        cardElement.classList.remove('flipped');
        carteRevelee = false;
        cardElement.setAttribute('aria-label', 'Carte oracle face cachée. Cliquez ou appuyez sur Entrée pour révéler.');


        setTimeout(() => {
            const indexAleatoire = Math.floor(Math.random() * cartes.length);
            carteActuelle = cartes[indexAleatoire];
            setupCardContent(carteActuelle);

            loadingDiv.style.display = 'none';
            cardContainer.style.display = 'block';
            // Mettre le focus sur la carte pour la navigation clavier
            cardElement.focus();

        }, 1500 + Math.random() * 1000); // Temps de chargement un peu variable
    }

    // Fonction pour configurer le contenu de la carte
    function setupCardContent(carte) {
        // Image de secours si l'image de la carte n'est pas trouvée
        const fallbackImage = "images/fallback-card-image.svg"; // Créez ce fichier SVG ou un PNG/JPG

        cardFront.innerHTML = `
            <h4 class="card-title">${carte.nom}</h4>
            <img src="${carte.image}" alt="Illustration de la carte ${carte.nom}" class="card-image" onerror="this.onerror=null; this.src='${fallbackImage}';">
            <p class="card-text">${carte.texte}</p>
            <p class="card-intention"><strong>Intention :</strong> ${carte.intention}</p>
            <div class="card-mantra-section">
                <p class="card-mantra"><strong>Mantra :</strong> ${carte.mantra}</p>
                ${speechSynth ? `<button class="play-mantra-button" data-mantra="${carte.mantra.split('(')[0].trim()}">🔊 Chanter</button>` : ''}
            </div>
        `;

        // Ajouter un écouteur d'événement pour le bouton "Chanter" s'il existe
        const playMantraBtn = cardFront.querySelector('.play-mantra-button');
        if (playMantraBtn) {
            playMantraBtn.addEventListener('click', (event) => {
                event.stopPropagation(); // Empêche la carte de se retourner si on clique sur le bouton
                speakMantra(event.target.dataset.mantra);
            });
        }
    }

    // Fonction pour retourner la carte
    function flipCardAction() {
        if (!carteRevelee) {
            cardElement.classList.add('flipped');
            carteRevelee = true;
            cardElement.setAttribute('aria-label', `Carte révélée: ${carteActuelle.nom}. ${carteActuelle.texte}`);
            setTimeout(() => {
                resetBtn.style.display = 'inline-block';
            }, 800); // Délai pour que l'animation de flip se termine
        }
    }

    // Fonction pour réinitialiser le tirage
    function resetDrawProcess() {
        cardContainer.style.display = 'none';
        resetBtn.style.display = 'none';
        drawBtn.style.display = 'inline-block';
        drawBtn.disabled = false;
        cardElement.classList.remove('flipped');
        carteActuelle = null;
        carteRevelee = false;
        if (speechSynth && speechSynth.speaking) { // Arrêter la parole si elle est en cours
            speechSynth.cancel();
        }
        drawBtn.focus(); // Remettre le focus sur le bouton de tirage
    }

    // Fonction pour lire le mantra
    function speakMantra(mantraText) {
        if (speechSynth && mantraText) {
            if (speechSynth.speaking) { // Si quelque chose est déjà en train d'être dit
                speechSynth.cancel(); // L'arrêter
            }
            const utterance = new SpeechSynthesisUtterance(mantraText);
            // Tenter de trouver une voix française ou sanskrite si possible
            const voices = speechSynth.getVoices();
            let voiceToUse = voices.find(voice => voice.lang === 'fr-FR');
            if (!voiceToUse) voiceToUse = voices.find(voice => voice.lang.startsWith('fr')); // n'importe quelle variante de fr
            // Pour le sanskrit, c'est plus rare :
            // if (!voiceToUse) voiceToUse = voices.find(voice => voice.lang === 'sa-IN' || voice.lang === 'hi-IN');
            
            if (voiceToUse) {
                utterance.voice = voiceToUse;
            } else {
                 utterance.lang = 'fr-FR'; // Défaut si aucune voix FR trouvée mais que le navigateur le supporte
            }
            utterance.pitch = 1;
            utterance.rate = 0.9;
            speechSynth.speak(utterance);
        } else if (!speechSynth) {
            alert("Désolé, la synthèse vocale n'est pas supportée par votre navigateur.");
        }
    }
    // Charger les voix (nécessaire pour certains navigateurs)
    if (speechSynth && speechSynth.onvoiceschanged !== undefined) {
        speechSynth.onvoiceschanged = () => speechSynth.getVoices();
    }


    // Animation d'entrée au chargement de la page
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Écouteurs d'événements
    drawBtn.addEventListener('click', drawCardProcess);
    resetBtn.addEventListener('click', resetDrawProcess);
    cardElement.addEventListener('click', flipCardAction);
    cardElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Empêche le défilement de la page pour la barre d'espace
            flipCardAction();
        }
    });
});
