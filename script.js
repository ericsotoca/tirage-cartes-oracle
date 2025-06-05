document.addEventListener('DOMContentLoaded', () => {
    // Références aux éléments du DOM
    const drawBtn = document.getElementById('drawBtn');
    const resetBtn = document.getElementById('resetBtn');
    const loadingDiv = document.getElementById('loading');
    const cardContainer = document.getElementById('cardContainer');
    const cardElement = document.getElementById('card');
    const cardFront = document.getElementById('cardFront');
    const currentYearSpan = document.getElementById('currentYear');

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // #############################################################################
    // ## VOS 6 CARTES - À MODIFIER AVEC VOS NOMS DE FICHIERS ET INFOS EXACTS   ##
    // ## ASSUREZ-VOUS QUE LA CASSE DES NOMS DE FICHIERS EST CORRECTE !        ##
    // #############################################################################
    const cartes = [
        {
            nom: "Nom de Carte 1", // REMPLACEZ
            image: "images/carte1.jpg", // REMPLACEZ par le nom exact ex: "images/ForceInterieure.jpg"
            texte: "Texte pour la carte 1...", // REMPLACEZ
            intention: "Intention pour la carte 1...", // REMPLACEZ
            mantra: "Mantra pour la carte 1..." // REMPLACEZ
        },
        {
            nom: "Nom de Carte 2", // REMPLACEZ
            image: "images/carte2.png", // REMPLACEZ, attention à l'extension .png, .jpeg etc.
            texte: "Texte pour la carte 2...", // REMPLACEZ
            intention: "Intention pour la carte 2...", // REMPLACEZ
            mantra: "Mantra pour la carte 2..." // REMPLACEZ
        },
        {
            nom: "Nom de Carte 3", // REMPLACEZ
            image: "images/carte3.jpg", // REMPLACEZ
            texte: "Texte pour la carte 3...", // REMPLACEZ
            intention: "Intention pour la carte 3...", // REMPLACEZ
            mantra: "Mantra pour la carte 3..." // REMPLACEZ
        },
        {
            nom: "Nom de Carte 4", // REMPLACEZ
            image: "images/carte4.jpg", // REMPLACEZ
            texte: "Texte pour la carte 4...", // REMPLACEZ
            intention: "Intention pour la carte 4...", // REMPLACEZ
            mantra: "Mantra pour la carte 4..." // REMPLACEZ
        },
        {
            nom: "Nom de Carte 5", // REMPLACEZ
            image: "images/carte5.jpg", // REMPLACEZ
            texte: "Texte pour la carte 5...", // REMPLACEZ
            intention: "Intention pour la carte 5...", // REMPLACEZ
            mantra: "Mantra pour la carte 5..." // REMPLACEZ
        },
        {
            nom: "Nom de Carte 6", // REMPLACEZ
            image: "images/carte6.jpg", // REMPLACEZ
            texte: "Texte pour la carte 6...", // REMPLACEZ
            intention: "Intention pour la carte 6...", // REMPLACEZ
            mantra: "Mantra pour la carte 6..." // REMPLACEZ
        }
    ];
    // #############################################################################

    if (cartes.length === 0) {
        alert("ERREUR CRITIQUE : Le tableau 'cartes' est vide ! L'application ne peut pas fonctionner.");
        if(drawBtn) drawBtn.disabled = true;
    } else {
        console.log(`Nombre de cartes chargées: ${cartes.length}`);
    }

    let carteActuelle = null;
    let carteRevelee = false;
    const speechSynth = null; // Synthèse vocale DÉSACTIVÉE pour ce test

    function drawCardProcess() {
        console.log("drawCardProcess() appelé.");
        try {
            if (!drawBtn || !loadingDiv || !cardContainer || !resetBtn || !cardElement) {
                alert("Erreur: Éléments DOM manquants pour drawCardProcess.");
                return;
            }

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
                console.log("Dans le setTimeout pour tirer la carte.");
                try {
                    if (cartes.length === 0) {
                        alert("ERREUR : Aucune carte à tirer.");
                        loadingDiv.style.display = 'none';
                        drawBtn.style.display = 'inline-block';
                        drawBtn.disabled = false;
                        return;
                    }

                    const indexAleatoire = Math.floor(Math.random() * cartes.length);
                    carteActuelle = cartes[indexAleatoire];
                    console.log(`Carte sélectionnée: ${carteActuelle ? carteActuelle.nom : 'ERREUR CARTE UNDEFINED'}`);

                    if (!carteActuelle) {
                        alert("ERREUR : Problème lors de la sélection de la carte.");
                        loadingDiv.style.display = 'none';
                        drawBtn.style.display = 'inline-block';
                        drawBtn.disabled = false;
                        return;
                    }

                    setupCardContent(carteActuelle); // Appel pour configurer la carte
                    
                    if (loadingDiv) loadingDiv.style.display = 'none';
                    if (cardContainer) cardContainer.style.display = 'block';
                    
                    if (cardElement) {
                        cardElement.focus(); // Tentative de focus
                    }

                } catch (e_timeout) {
                    console.error(`Erreur DANS setTimeout: ${e_timeout.message}`, e_timeout);
                    alert(`Erreur interne (timeout): ${e_timeout.message}. Vérifiez la console si possible.`);
                    if (loadingDiv) loadingDiv.style.display = 'none';
                    if (drawBtn) { drawBtn.style.display = 'inline-block'; drawBtn.disabled = false; }
                }
            }, 1000); // Délai réduit
        } catch (e_main) {
            console.error(`Erreur principale DANS drawCardProcess: ${e_main.message}`, e_main);
            alert(`Erreur principale: ${e_main.message}. Vérifiez la console si possible.`);
            if (loadingDiv) loadingDiv.style.display = 'none';
            if (drawBtn) { drawBtn.style.display = 'inline-block'; drawBtn.disabled = false; }
        }
    }

    function setupCardContent(carte) {
        console.log(`setupCardContent appelée pour: ${carte.nom}, image: ${carte.image}`);
        if (!cardFront) {
            alert("Erreur critique: cardFront est manquant dans setupCardContent.");
            return;
        }
        // Assurez-vous que CE fichier existe et que le nom est exact : images/fallback-card-image.svg
        const fallbackImage = "images/fallback-card-image.svg";

        cardFront.innerHTML = `
            <h4 class="card-title">${carte.nom}</h4>
            <img src="${carte.image}" alt="Illustration de la carte ${carte.nom}" class="card-image" 
                 onerror="this.onerror=null; this.src='${fallbackImage}'; alert('IMAGE NON TROUVÉE : ${carte.image}. Chemin ou casse incorrecte ? Fallback utilisé. Vérifiez que ${fallbackImage} existe aussi.'); console.error('Erreur chargement image : ${carte.image}');">
            <p class="card-text">${carte.texte}</p>
            <p class="card-intention"><strong>Intention :</strong> ${carte.intention}</p>
            <div class="card-mantra-section">
                <p class="card-mantra"><strong>Mantra :</strong> ${carte.mantra}</p>
                ${'' /* Pas de bouton mantra car speechSynth est null */}
            </div>
        `;
        console.log("Contenu de la carte injecté.");
    }

    function flipCardAction() {
        if (!cardElement) {
            alert("Erreur: cardElement manquant pour flipCardAction.");
            return;
        }
        if (!carteRevelee && carteActuelle) {
            cardElement.classList.add('flipped');
            carteRevelee = true;
            const nom = carteActuelle.nom || "Inconnu";
            const texte = carteActuelle.texte || "Pas de texte";
            const intention = carteActuelle.intention || "Pas d'intention";
            const mantra = carteActuelle.mantra || "Pas de mantra";
            cardElement.setAttribute('aria-label', `Carte révélée: ${nom}. Message: ${texte}. Intention: ${intention}. Mantra: ${mantra}`);
            
            setTimeout(() => {
                if(resetBtn) resetBtn.style.display = 'inline-block';
            }, 800);
        }
    }

    function resetDrawProcess() {
        if (!cardContainer || !resetBtn || !drawBtn || !cardElement) {
            alert("Erreur: Éléments DOM manquants pour resetDrawProcess.");
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
        if (drawBtn) drawBtn.focus();
    }

    window.addEventListener('load', () => {
        if (document.body) document.body.style.opacity = '1';
        console.log("Page chargée.");
    });

    if (drawBtn) {
        drawBtn.addEventListener('click', drawCardProcess);
    } else {
        alert("ERREUR CRITIQUE: drawBtn n'a pas été trouvé lors de l'initialisation!");
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', resetDrawProcess);
    }
    if (cardElement) {
        cardElement.addEventListener('click', flipCardAction);
        cardElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                flipCardAction();
            }
        });
    }
    console.log("Fin de l'initialisation du script.");
});
