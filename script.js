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

    const cartes = [
        { nom: "Force Intérieure", image: "images/carte1.jpg", texte: "La force intérieure réside en vous. Faites confiance à votre intuition.", intention: "Cultiver la confiance en soi", mantra: "Aham Brahmasmi (Je suis l'Absolu/Divin)" },
        { nom: "Nouvelles Opportunités", image: "images/carte2.jpg", texte: "Les nouvelles opportunités se présentent à vous. Restez ouvert(e).", intention: "Accueillir le changement", mantra: "Om Gam Ganapataye Namaha (Salutations à Ganesh, qui lève les obstacles)" },
        { nom: "Patience", image: "images/carte3.jpg", texte: "La patience est votre alliée. Tout arrive en son temps.", intention: "Développer la patience", mantra: "Shanti Hum (Je suis la paix)" },
        { nom: "Amour Universel", image: "images/carte4.jpg", texte: "L'amour vous entoure sous toutes ses formes. Ouvrez votre cœur.", intention: "Rayonner l'amour", mantra: "Aham Prema (Je suis l'Amour Divin)" },
        { nom: "Créativité Débordante", image: "images/carte5.jpg", texte: "Votre créativité demande à s'exprimer. Laissez-la libre cours.", intention: "Libérer sa créativité", mantra: "Om Aim Saraswatyai Namaha (Salutations à Saraswati, déesse de la créativité)" },
        { nom: "Équilibre Sacré", image: "images/carte6.jpg", texte: "L'équilibre est la clé. Harmonisez tous les aspects de votre vie.", intention: "Trouver l'équilibre", mantra: "YAM (Bija Mantra du chakra du cœur, pour l'équilibre)" },
        { nom: "Gratitude Infinie", image: "images/carte7.jpg", texte: "La gratitude transforme votre réalité. Appréciez ce que vous avez.", intention: "Pratiquer la gratitude", mantra: "Dhanyavad (Merci en Hindi/Sanskrit)" },
        { nom: "Guérison Douce", image: "images/carte8.jpg", texte: "Votre guérison intérieure est en cours. Soyez doux avec vous-même.", intention: "Permettre la guérison", mantra: "Ra Ma Da Sa Sa Say So Hung (Mantra de guérison Kundalini)" },
        { nom: "Sagesse Ancestrale", image: "images/carte9.jpg", texte: "La sagesse ancestrale vous guide. Écoutez les signes.", intention: "Honorer la sagesse", mantra: "Om Namo Bhagavate Vasudevaya (Hommage à la conscience divine intérieure)" },
        { nom: "Lumière Rayonnante", image: "images/carte10.jpg", texte: "Votre lumière brille plus fort que jamais. Partagez-la avec le monde.", intention: "Rayonner sa lumière", mantra: "Lumen de Lumine (Lumière issue de la Lumière)" },
        { nom: "Confiance Rayonnante", image: "images/placeholder.jpg", texte: "Tu possèdes en toi toutes les ressources nécessaires. Fais confiance à ta lumière intérieure, elle est ton guide le plus sûr.", intention: "Aujourd'hui, j'accueille et je rayonne ma confiance avec aisance.", mantra: "So Hum (Je suis Cela/Je suis Lui)" },
        { nom: "Le Chemin s'Éclaire", image: "images/placeholder.jpg", texte: "N'aie crainte de l'inconnu, chaque pas en avant révèle la suite. L'intuition est ta boussole.", intention: "Je marche avec intuition et clarté.", mantra: "Sat Nam (La Vérité est mon identité)" },
        { nom: "Ancrage Profond", image: "images/placeholder.jpg", texte: "Reviens à la Terre, à ton centre. C'est dans l'immobilité que tu trouveras la force et la paix.", intention: "Je suis ancré(e), stable et en paix.", mantra: "LAM (Bija Mantra du Chakra Racine)" },
        { nom: "Nouveau Commencement", image: "images/carte44.jpg", texte: "Le cycle se complète et un nouveau chapitre commence. Accueillez-le avec espoir.", intention: "Célébrer les nouveaux commencements", mantra: "Om Purnamadah Purnamidam (Tout est plénitude, ceci est plénitude)" }
    ];

    const NOMBRE_CARTES_REQUIS = 44;
    if (cartes.length < NOMBRE_CARTES_REQUIS) {
        console.warn(`Attention : Seulement ${cartes.length} cartes définies sur les ${NOMBRE_CARTES_REQUIS} requises. Veuillez compléter la liste.`);
    } else if (cartes.length > NOMBRE_CARTES_REQUIS) {
         console.warn(`Attention : ${cartes.length} cartes définies. Le concept initial était de ${NOMBRE_CARTES_REQUIS} cartes.`);
    }

    let carteActuelle = null;
    let carteRevelee = false;
    // const speechSynth = window.speechSynthesis; // DÉSACTIVÉ
    // let voices = []; // DÉSACTIVÉ

    // function loadVoices() { // DÉSACTIVÉ
    //     voices = speechSynth.getVoices();
    //     if (speechSynth.onvoiceschanged !== undefined) {
    //         speechSynth.onvoiceschanged = () => {
    //             voices = speechSynth.getVoices();
    //         };
    //     }
    // }
    // if (speechSynth) { // DÉSACTIVÉ
    //     loadVoices();
    // }

    function drawCardProcess() {
        drawBtn.disabled = true;
        drawBtn.style.display = 'none';
        loadingDiv.style.display = 'block';
        cardContainer.style.display = 'none';
        resetBtn.style.display = 'none';
        
        if (cardElement.classList.contains('flipped')) {
            cardElement.classList.remove('flipped');
        }
        carteRevelee = false;
        cardElement.setAttribute('aria-label', 'Carte oracle face cachée. Cliquez ou appuyez sur Entrée pour révéler.');

        setTimeout(() => {
            const indexAleatoire = Math.floor(Math.random() * cartes.length);
            carteActuelle = cartes[indexAleatoire];
            setupCardContent(carteActuelle);

            loadingDiv.style.display = 'none';
            cardContainer.style.display = 'block';
            cardElement.focus();
        }, 1500 + Math.random() * 1000);
    }

    function setupCardContent(carte) {
        const fallbackImage = "images/fallback-card-image.svg";
        // const mantraToSpeak = carte.mantra.includes('(') ? carte.mantra.substring(0, carte.mantra.indexOf('(')).trim() : carte.mantra; // DÉSACTIVÉ

        cardFront.innerHTML = `
            <h4 class="card-title">${carte.nom}</h4>
            <img src="${carte.image}" alt="Illustration de la carte ${carte.nom}" class="card-image" onerror="this.onerror=null; this.src='${fallbackImage}';">
            <p class="card-text">${carte.texte}</p>
            <p class="card-intention"><strong>Intention :</strong> ${carte.intention}</p>
            <div class="card-mantra-section">
                <p class="card-mantra"><strong>Mantra :</strong> ${carte.mantra}</p>
                ${'' /* Ancien bouton pour synthèse vocale: speechSynth ? `<button class="play-mantra-button" data-mantra="${mantraToSpeak}" aria-label="Écouter le mantra ${mantraToSpeak}">🔊 Chanter</button>` : '' */}
            </div>
        `;

        // const playMantraBtn = cardFront.querySelector('.play-mantra-button'); // DÉSACTIVÉ
        // if (playMantraBtn) { // DÉSACTIVÉ
        //     playMantraBtn.addEventListener('click', (event) => {
        //         event.stopPropagation();
        //         // speakMantra(event.target.dataset.mantra); // DÉSACTIVÉ
        //     });
        // }
    }

    function flipCardAction() {
        if (!carteRevelee && carteActuelle) {
            cardElement.classList.add('flipped');
            carteRevelee = true;
            cardElement.setAttribute('aria-label', `Carte révélée: ${carteActuelle.nom}. Message: ${carteActuelle.texte}. Intention: ${carteActuelle.intention}. Mantra: ${carteActuelle.mantra}`);
            
            setTimeout(() => {
                resetBtn.style.display = 'inline-block';
            }, 800);
        }
    }

    function resetDrawProcess() {
        cardContainer.style.display = 'none';
        resetBtn.style.display = 'none';
        drawBtn.style.display = 'inline-block';
        drawBtn.disabled = false;
        
        if (cardElement.classList.contains('flipped')) {
            cardElement.classList.remove('flipped');
        }
        carteActuelle = null;
        carteRevelee = false;
        
        // if (speechSynth && speechSynth.speaking) { // DÉSACTIVÉ
        //     speechSynth.cancel();
        // }
        drawBtn.focus();
    }

    // function speakMantra(mantraText) { // DÉSACTIVÉ
    //     if (!speechSynth || !mantraText) {
    //         if(!speechSynth) console.warn("La synthèse vocale n'est pas supportée par votre navigateur.");
    //         return;
    //     }

    //     if (speechSynth.speaking) {
    //         speechSynth.cancel();
    //     }

    //     const utterance = new SpeechSynthesisUtterance(mantraText);
        
    //     let voiceToUse = voices.find(voice => voice.lang === 'fr-FR' && voice.localService);
    //     if (!voiceToUse) voiceToUse = voices.find(voice => voice.lang.startsWith('fr') && voice.localService);
    //     if (!voiceToUse) voiceToUse = voices.find(voice => voice.lang === 'fr-FR');
    //     if (!voiceToUse) voiceToUse = voices.find(voice => voice.lang.startsWith('fr'));
        
    //     if (voiceToUse) {
    //         utterance.voice = voiceToUse;
    //     } else {
    //         utterance.lang = 'fr-FR';
    //         console.warn("Aucune voix française spécifique trouvée, utilisation de la voix par défaut du navigateur pour 'fr-FR'.");
    //     }

    //     utterance.pitch = 1;
    //     utterance.rate = 0.8;
    //     utterance.volume = 1;
        
    //     speechSynth.speak(utterance);
    // }

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    if (drawBtn) drawBtn.addEventListener('click', drawCardProcess);
    if (resetBtn) resetBtn.addEventListener('click', resetDrawProcess);
    
    if (cardElement) {
        cardElement.addEventListener('click', flipCardAction);
        cardElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                flipCardAction();
            }
        });
    }
});
