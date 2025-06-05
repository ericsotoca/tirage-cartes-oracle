document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM entièrement chargé et analysé.");

    // Références aux éléments du DOM
    const drawBtn = document.getElementById('drawBtn');
    const resetBtn = document.getElementById('resetBtn');
    const loadingDiv = document.getElementById('loading');
    const cardContainer = document.getElementById('cardContainer');
    const cardElement = document.getElementById('card');
    const cardFront = document.getElementById('cardFront');
    const currentYearSpan = document.getElementById('currentYear');

    // Vérification des éléments DOM
    console.log("drawBtn:", drawBtn ? "Trouvé" : "NON TROUVÉ");
    console.log("resetBtn:", resetBtn ? "Trouvé" : "NON TROUVÉ");
    console.log("loadingDiv:", loadingDiv ? "Trouvé" : "NON TROUVÉ");
    console.log("cardContainer:", cardContainer ? "Trouvé" : "NON TROUVÉ");
    console.log("cardElement:", cardElement ? "Trouvé" : "NON TROUVÉ");
    console.log("cardFront:", cardFront ? "Trouvé" : "NON TROUVÉ");
    console.log("currentYearSpan:", currentYearSpan ? "Trouvé" : "NON TROUVÉ");


    // Mettre à jour l'année dans le footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
        console.log("Année mise à jour dans le footer.");
    }

    // Base de données des cartes
    // Assurez-vous que cette liste est correcte et que les chemins d'images sont exacts (casse sensible!)
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
    console.log(`Nombre de cartes chargées: ${cartes.length}`);

    const NOMBRE_CARTES_REQUIS = 44;
    if (cartes.length === 0) {
        console.error("ERREUR CRITIQUE : Le tableau 'cartes' est vide ! L'application ne peut pas fonctionner.");
        alert("ERREUR : Aucune carte n'est définie. L'application ne peut pas continuer.");
    } else if (cartes.length < NOMBRE_CARTES_REQUIS) {
        console.warn(`Attention : Seulement ${cartes.length} cartes définies sur les ${NOMBRE_CARTES_REQUIS} requises. Veuillez compléter la liste.`);
    } else if (cartes.length > NOMBRE_CARTES_REQUIS) {
         console.warn(`Attention : ${cartes.length} cartes définies. Le concept initial était de ${NOMBRE_CARTES_REQUIS} cartes.`);
    }

    let carteActuelle = null;
    let carteRevelee = false;
    const speechSynth = window.speechSynthesis; // On le garde pour l'instant, mais il pourrait être une source de problème
    let voices = [];

    function loadVoices() {
        if (!speechSynth) {
            console.warn("Synthèse vocale non supportée par ce navigateur.");
            return;
        }
        try {
            voices = speechSynth.getVoices();
            console.log(`Nombre de voix initialement chargées: ${voices.length}`);
            if (speechSynth.onvoiceschanged !== undefined) {
                speechSynth.onvoiceschanged = () => {
                    voices = speechSynth.getVoices();
                    console.log(`Voix mises à jour. Nombre de voix: ${voices.length}`);
                };
            }
        } catch (e) {
            console.error("Erreur lors du chargement des voix de synthèse:", e);
        }
    }
    loadVoices(); // Appel direct

    // Fonction pour tirer une carte
    function drawCardProcess() {
        console.log("drawCardProcess() appelé.");
        try {
            if (!drawBtn || !loadingDiv || !cardContainer || !resetBtn || !cardElement) {
                console.error("Un ou plusieurs éléments DOM majeurs sont manquants au début de drawCardProcess.");
                alert("Erreur: Problème d'initialisation des éléments de l'interface.");
                return;
            }

            drawBtn.disabled = true;
            drawBtn.style.display = 'none';
            loadingDiv.style.display = 'block'; // Affiche "Mélange des cartes..."
            console.log("'Mélange des cartes...' devrait être visible maintenant.");
            cardContainer.style.display = 'none';
            resetBtn.style.display = 'none';

            if (cardElement.classList.contains('flipped')) {
                cardElement.classList.remove('flipped');
            }
            carteRevelee = false;
            cardElement.setAttribute('aria-label', 'Carte oracle face cachée. Cliquez ou appuyez sur Entrée pour révéler.');

            console.log("Préparation du setTimeout pour tirer la carte.");
            setTimeout(() => {
                console.log("Dans le setTimeout pour tirer la carte.");
                try {
                    if (cartes.length === 0) {
                        console.error("ERREUR dans setTimeout: Le tableau 'cartes' est vide !");
                        alert("ERREUR : Aucune carte à tirer.");
                        // Réinitialisation pour permettre une nouvelle tentative si l'utilisateur corrige le problème
                        loadingDiv.style.display = 'none';
                        drawBtn.style.display = 'inline-block';
                        drawBtn.disabled = false;
                        return;
                    }

                    const indexAleatoire = Math.floor(Math.random() * cartes.length);
                    carteActuelle = cartes[indexAleatoire];
                    console.log(`Index aléatoire: ${indexAleatoire}`);

                    if (!carteActuelle) {
                        console.error("ERREUR CRITIQUE dans setTimeout: carteActuelle est undefined!", "Index généré:", indexAleatoire, "Taille du tableau cartes:", cartes.length);
                        alert("Une erreur critique est survenue lors de la sélection de la carte. L'application pourrait ne pas fonctionner. Vérifiez la console.");
                        loadingDiv.style.display = 'none';
                        drawBtn.style.display = 'inline-block';
                        drawBtn.disabled = false;
                        return;
                    }
                    console.log(`Carte sélectionnée: ${carteActuelle.nom}`);

                    // ---- MODIFICATION POUR TEST : ON SAUTE setupCardContent ----
                    console.log("TEST: On va sauter setupCardContent pour ce test.");
                    if (cardFront) {
                         cardFront.innerHTML = `<div style="padding: 20px; text-align: center;">
                                                 <h4 style="color: blue;">Test en cours</h4>
                                                 <p>La carte "${carteActuelle.nom}" a été tirée.</p>
                                                 <p>Le contenu normal (setupCardContent) est sauté.</p>
                                                 <img src="${carteActuelle.image}" alt="Test image pour ${carteActuelle.nom}" style="width:100px; height:auto; border:1px solid red; margin-top:10px;" onerror="this.style.display='none'; console.error('Erreur de chargement image TEST: ${carteActuelle.image}'); alert('Erreur image test: ${carteActuelle.image}');">
                                                </div>`;
                         console.log("Message de test injecté dans cardFront.");
                    } else {
                        console.error("ERREUR dans setTimeout: cardFront est null ! Impossible d'afficher le message de test.");
                        alert("Erreur critique : l'élément pour afficher la carte est manquant.");
                    }
                    // ---- FIN DE LA MODIFICATION POUR TEST ----
                    // setupCardContent(carteActuelle); // Ligne originale commentée pour le test


                    if (loadingDiv) loadingDiv.style.display = 'none';
                    console.log("loadingDiv caché.");

                    if (cardContainer) cardContainer.style.display = 'block';
                    console.log("cardContainer affiché.");

                    if (cardElement) {
                        cardElement.focus();
                        console.log("Focus mis sur cardElement.");
                    } else {
                        console.warn("cardElement non trouvé pour le focus.");
                    }
                    console.log("Fin du bloc try dans setTimeout.");

                } catch (e_timeout) {
                    console.error("Erreur DANS le setTimeout de drawCardProcess:", e_timeout.message, e_timeout.stack, e_timeout);
                    alert("Une erreur interne (timeout) est survenue pendant le chargement de la carte. Détails: " + e_timeout.message);
                    if (loadingDiv) loadingDiv.style.display = 'none';
                    if (drawBtn) {
                        drawBtn.style.display = 'inline-block';
                        drawBtn.disabled = false;
                    }
                    if (cardContainer) cardContainer.style.display = 'none';
                    if (resetBtn) resetBtn.style.display = 'none';
                }
            }, 1500 + Math.random() * 1000);
        } catch (e_main) {
            console.error("Erreur principale DANS drawCardProcess:", e_main.message, e_main.stack, e_main);
            alert("Une erreur principale est survenue avant le chargement de la carte. Détails: " + e_main.message);
            if (loadingDiv) loadingDiv.style.display = 'none';
            if (drawBtn) {
                drawBtn.style.display = 'inline-block';
                drawBtn.disabled = false;
            }
        }
    }

    // Fonction pour configurer le contenu de la carte (NON UTILISÉE DANS CE TEST SPÉCIFIQUE, MAIS GARDÉE POUR PLUS TARD)
    function setupCardContent(carte) {
        console.log(`setupCardContent appelée pour la carte: ${carte.nom}`);
        if (!cardFront) {
            console.error("ERREUR dans setupCardContent: cardFront est null !");
            alert("Erreur critique: impossible de préparer la carte.");
            return;
        }
        if (!carte || typeof carte.nom === 'undefined') {
            console.error("Tentative de configurer une carte invalide ou incomplète:", carte);
            cardFront.innerHTML = `<p style="color:red; padding:20px;">Erreur: Données de carte invalides.</p>`;
            return;
        }

        const fallbackImage = "images/fallback-card-image.svg"; // Assurez-vous que ce fichier existe ET que le chemin est correct (casse!)
        const mantraToSpeak = carte.mantra && carte.mantra.includes('(') ? carte.mantra.substring(0, carte.mantra.indexOf('(')).trim() : (carte.mantra || "");

        // ATTENTION: Vérifiez que TOUTES les images dans votre tableau `cartes` existent
        // et que les chemins sont corrects (ex: "images/carte1.jpg")
        // Une image manquante peut causer des problèmes sur mobile si onerror n'est pas géré parfaitement ou si le fallback lui-même manque.
        console.log(`Image pour la carte ${carte.nom}: ${carte.image}`);

        cardFront.innerHTML = `
            <h4 class="card-title">${carte.nom}</h4>
            <img src="${carte.image}" alt="Illustration de la carte ${carte.nom}" class="card-image" onerror="this.onerror=null; this.src='${fallbackImage}'; console.warn('Image ${carte.image} non trouvée, fallback utilisé.');">
            <p class="card-text">${carte.texte}</p>
            <p class="card-intention"><strong>Intention :</strong> ${carte.intention}</p>
            <div class="card-mantra-section">
                <p class="card-mantra"><strong>Mantra :</strong> ${carte.mantra}</p>
                ${speechSynth && mantraToSpeak ? `<button class="play-mantra-button" data-mantra="${mantraToSpeak}" aria-label="Écouter le mantra ${mantraToSpeak}">🔊 Chanter</button>` : ''}
            </div>
        `;
        console.log(`Contenu HTML injecté pour ${carte.nom}`);

        const playMantraBtn = cardFront.querySelector('.play-mantra-button');
        if (playMantraBtn) {
            console.log("Bouton 'Chanter' trouvé, ajout de l'écouteur.");
            playMantraBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                speakMantra(event.target.dataset.mantra);
            });
        } else if (speechSynth && mantraToSpeak) {
            console.warn("Bouton 'Chanter' aurait dû être créé mais n'est pas trouvé.");
        }
    }

    // Fonction pour retourner la carte
    function flipCardAction() {
        console.log("flipCardAction() appelée.");
        if (!cardElement) {
            console.error("ERREUR dans flipCardAction: cardElement est null !");
            return;
        }
        if (!carteRevelee && carteActuelle) {
            cardElement.classList.add('flipped');
            carteRevelee = true;
            console.log(`Carte ${carteActuelle.nom} révélée.`);
            const nom = carteActuelle.nom || "Inconnu";
            const texte = carteActuelle.texte || "Pas de texte";
            const intention = carteActuelle.intention || "Pas d'intention";
            const mantra = carteActuelle.mantra || "Pas de mantra";
            cardElement.setAttribute('aria-label', `Carte révélée: ${nom}. Message: ${texte}. Intention: ${intention}. Mantra: ${mantra}`);

            setTimeout(() => {
                if (resetBtn) {
                    resetBtn.style.display = 'inline-block';
                    console.log("Bouton Reset affiché.");
                } else {
                    console.warn("resetBtn non trouvé pour l'affichage.");
                }
            }, 800);
        } else {
            console.log("flipCardAction: Condition non remplie (carte déjà révélée ou pas de carte actuelle).");
        }
    }

    // Fonction pour réinitialiser le tirage
    function resetDrawProcess() {
        console.log("resetDrawProcess() appelé.");
        if (!cardContainer || !resetBtn || !drawBtn || !cardElement) {
            console.error("Un ou plusieurs éléments DOM majeurs sont manquants au début de resetDrawProcess.");
            return;
        }
        cardContainer.style.display = 'none';
        resetBtn.style.display = 'none';
        drawBtn.style.display = 'inline-block';
        drawBtn.disabled = false;

        if (cardElement.classList.contains('flipped')) {
            cardElement.classList.remove('flipped');
        }
        carteActuelle = null;
        carteRevelee = false;
        console.log("État du tirage réinitialisé.");

        if (speechSynth && speechSynth.speaking) {
            try {
                speechSynth.cancel();
                console.log("Synthèse vocale arrêtée.");
            } catch (e) {
                console.error("Erreur lors de l'arrêt de la synthèse vocale:", e);
            }
        }
        drawBtn.focus();
    }

    // Fonction pour lire le mantra
    function speakMantra(mantraText) {
        console.log(`speakMantra() appelé avec: "${mantraText}"`);
        if (!speechSynth) {
            console.warn("Tentative de lire un mantra, mais la synthèse vocale n'est pas supportée.");
            alert("La synthèse vocale n'est pas supportée par votre navigateur.");
            return;
        }
        if (!mantraText) {
            console.warn("Tentative de lire un mantra, mais le texte du mantra est vide.");
            return;
        }

        try {
            if (speechSynth.speaking) {
                speechSynth.cancel();
                console.log("Synthèse vocale en cours annulée avant nouvelle lecture.");
            }

            const utterance = new SpeechSynthesisUtterance(mantraText);
            let voiceToUse = voices.find(voice => voice.lang === 'fr-FR' && voice.localService);
            if (!voiceToUse) voiceToUse = voices.find(voice => voice.lang.startsWith('fr') && voice.localService);
            if (!voiceToUse) voiceToUse = voices.find(voice => voice.lang === 'fr-FR');
            if (!voiceToUse) voiceToUse = voices.find(voice => voice.lang.startsWith('fr'));

            if (voiceToUse) {
                utterance.voice = voiceToUse;
                console.log(`Utilisation de la voix: ${voiceToUse.name} (${voiceToUse.lang})`);
            } else {
                utterance.lang = 'fr-FR';
                console.warn("Aucune voix française spécifique trouvée, utilisation de la voix par défaut du navigateur pour 'fr-FR'.");
            }

            utterance.pitch = 1;
            utterance.rate = 0.8;
            utterance.volume = 1;

            utterance.onstart = () => console.log("Début de la lecture du mantra.");
            utterance.onend = () => console.log("Fin de la lecture du mantra.");
            utterance.onerror = (event) => {
                console.error("Erreur de synthèse vocale:", event.error);
                alert(`Erreur lors de la lecture du mantra: ${event.error}`);
            };
            
            speechSynth.speak(utterance);

        } catch (e) {
            console.error("Erreur dans speakMantra:", e);
            alert("Une erreur s'est produite avec la synthèse vocale.");
        }
    }

    // Animation d'entrée au chargement de la page
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        console.log("Page chargée, opacité du body à 1.");
    });

    // Écouteurs d'événements
    if (drawBtn) {
        drawBtn.addEventListener('click', drawCardProcess);
        console.log("Écouteur d'événement ajouté à drawBtn.");
    } else {
        console.error("ERREUR CRITIQUE: drawBtn n'a pas été trouvé, impossible d'ajouter l'écouteur de clic.");
        alert("Erreur: Le bouton principal de l'application est manquant.");
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetDrawProcess);
        console.log("Écouteur d'événement ajouté à resetBtn.");
    } else {
        console.warn("resetBtn non trouvé, écouteur non ajouté (sera affiché plus tard).");
    }

    if (cardElement) {
        cardElement.addEventListener('click', flipCardAction);
        cardElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                flipCardAction();
            }
        });
        console.log("Écouteurs d'événements (click, keydown) ajoutés à cardElement.");
    } else {
        console.error("ERREUR CRITIQUE: cardElement n'a pas été trouvé, impossible d'ajouter les écouteurs.");
        // Pas d'alerte ici car l'élément n'est pas visible au début.
    }

    console.log("Fin de l'initialisation du script.");
});
