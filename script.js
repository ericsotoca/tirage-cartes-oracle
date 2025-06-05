document.addEventListener('DOMContentLoaded', () => {
    // alert("DOM chargé."); // Trop tôt, peut être gênant

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

    const cartes = [ // Assurez-vous que cette liste est remplie et correcte
        { nom: "Force Intérieure", image: "images/carte1.jpg", texte: "La force intérieure réside en vous. Faites confiance à votre intuition.", intention: "Cultiver la confiance en soi", mantra: "Aham Brahmasmi (Je suis l'Absolu/Divin)" },
        { nom: "Nouvelles Opportunités", image: "images/carte2.jpg", texte: "Les nouvelles opportunités se présentent à vous. Restez ouvert(e).", intention: "Accueillir le changement", mantra: "Om Gam Ganapataye Namaha (Salutations à Ganesh, qui lève les obstacles)" },
        { nom: "Patience", image: "images/carte3.jpg", texte: "La patience est votre alliée. Tout arrive en son temps.", intention: "Développer la patience", mantra: "Shanti Hum (Je suis la paix)" },
        { nom: "Amour Universel", image: "images/carte4.jpg", texte: "L'amour vous entoure sous toutes ses formes. Ouvrez votre cœur.", intention: "Rayonner l'amour", mantra: "Aham Prema (Je suis l'Amour Divin)" },
        { nom: "Créativité Débordante", image: "images/carte5.jpg", texte: "Votre créativité demande à s'exprimer. Laissez-la libre cours.", intention: "Libérer sa créativité", mantra: "Om Aim Saraswatyai Namaha (Salutations à Saraswati, déesse de la créativité)" },
        // Ajoutez au moins quelques cartes pour tester. Assurez-vous que les images existent et que les chemins sont corrects.
        // Par exemple, pour tester sans dépendre de vos images locales :
        { nom: "Carte Test Online", image: "https://via.placeholder.com/150/0000FF/FFFFFF?Text=ImageOnline", texte: "Texte test.", intention: "Intention test.", mantra: "Mantra test." }
    ];

    if (cartes.length === 0) {
        alert("ERREUR CRITIQUE : Le tableau 'cartes' est vide !");
    }

    let carteActuelle = null;
    let carteRevelee = false;
    // La synthèse vocale est une source fréquente de problèmes sur mobile.
    // Pour ce test, nous allons la désactiver complètement.
    const speechSynth = null; // window.speechSynthesis; // DÉSACTIVÉ POUR CE TEST
    // let voices = []; // DÉSACTIVÉ POUR CE TEST

    // function loadVoices() { ... } // DÉSACTIVÉ POUR CE TEST
    // if (speechSynth) { loadVoices(); } // DÉSACTIVÉ POUR CE TEST

    function drawCardProcess() {
        // alert("drawCardProcess - Début");
        try {
            if (!drawBtn || !loadingDiv || !cardContainer || !resetBtn || !cardElement) {
                alert("Erreur: Éléments DOM manquants au début de drawCardProcess.");
                return;
            }

            drawBtn.disabled = true;
            drawBtn.style.display = 'none';
            loadingDiv.style.display = 'block'; // Affiche "Mélange des cartes..."
            // alert("drawCardProcess - 'Mélange des cartes...' visible.");
            cardContainer.style.display = 'none';
            resetBtn.style.display = 'none';

            if (cardElement.classList.contains('flipped')) {
                cardElement.classList.remove('flipped');
            }
            carteRevelee = false;
            cardElement.setAttribute('aria-label', 'Carte oracle face cachée. Cliquez ou appuyez sur Entrée pour révéler.');

            // alert("drawCardProcess - Préparation du setTimeout.");
            setTimeout(() => {
                alert("setTimeout - Étape 1: Début du timeout.");
                try {
                    if (cartes.length === 0) {
                        alert("setTimeout - ERREUR: Tableau 'cartes' vide !");
                        loadingDiv.style.display = 'none';
                        drawBtn.style.display = 'inline-block';
                        drawBtn.disabled = false;
                        return;
                    }
                    alert("setTimeout - Étape 2: Tableau cartes non vide.");

                    const indexAleatoire = Math.floor(Math.random() * cartes.length);
                    carteActuelle = cartes[indexAleatoire];
                    alert(`setTimeout - Étape 3: Carte sélectionnée: ${carteActuelle ? carteActuelle.nom : 'ERREUR CARTE UNDEFINED'}`);

                    if (!carteActuelle) {
                        alert("setTimeout - ERREUR CRITIQUE: carteActuelle est undefined!");
                        loadingDiv.style.display = 'none';
                        drawBtn.style.display = 'inline-block';
                        drawBtn.disabled = false;
                        return;
                    }
                    alert("setTimeout - Étape 4: carteActuelle est valide.");

                    // ---- ON SAUTE setupCardContent ----
                    // alert("setTimeout - Étape 5: Avant injection HTML test.");
                    if (cardFront) {
                         cardFront.innerHTML = `<div style="padding: 20px; text-align: center; border: 2px solid blue;">
                                                 <h4 style="color: green;">Test Visible</h4>
                                                 <p>Carte: "${carteActuelle.nom}"</p>
                                                 <p>(Contenu normal sauté)</p>
                                                 <img src="${carteActuelle.image}" alt="Test img: ${carteActuelle.nom}" style="width:80px; height:auto; border:1px solid red; margin-top:5px;" onerror="this.alt='Erreur chargement image TEST'; this.style.border='2px dashed red'; alert('Erreur chargement image TEST pour ${carteActuelle.nom} : ${carteActuelle.image}');">
                                                </div>`;
                         alert("setTimeout - Étape 6: HTML de test injecté dans cardFront.");
                    } else {
                        alert("setTimeout - ERREUR: cardFront est null !");
                    }
                    
                    alert("setTimeout - Étape 7: Avant de cacher loadingDiv.");
                    if (loadingDiv) loadingDiv.style.display = 'none';
                    alert("setTimeout - Étape 8: loadingDiv caché.");

                    alert("setTimeout - Étape 9: Avant d'afficher cardContainer.");
                    if (cardContainer) cardContainer.style.display = 'block';
                    alert("setTimeout - Étape 10: cardContainer affiché.");
                    
                    alert("setTimeout - Étape 11: Avant focus sur cardElement.");
                    if (cardElement) {
                        // cardElement.focus(); // Le focus peut être problématique sur mobile, on le commente pour ce test
                        alert("setTimeout - Étape 12: Focus sur cardElement SAUTÉ pour test.");
                    } else {
                       alert("setTimeout - Étape 12: cardElement non trouvé pour focus.");
                    }
                    alert("setTimeout - FIN du bloc try.");

                } catch (e_timeout) {
                    alert(`Erreur DANS setTimeout: ${e_timeout.message}`);
                    if (loadingDiv) loadingDiv.style.display = 'none';
                    if (drawBtn) { drawBtn.style.display = 'inline-block'; drawBtn.disabled = false; }
                }
            }, 1500 + Math.random() * 1000); // Un délai un peu plus long pour avoir le temps de voir les alertes
        } catch (e_main) {
            alert(`Erreur principale DANS drawCardProcess: ${e_main.message}`);
            if (loadingDiv) loadingDiv.style.display = 'none';
            if (drawBtn) { drawBtn.style.display = 'inline-block'; drawBtn.disabled = false; }
        }
    }

    // setupCardContent est gardée mais ne sera pas appelée dans ce test.
    function setupCardContent(carte) {
        // ... (contenu original de setupCardContent, mais on ne l'utilise pas ici)
        // Pourrait être réactivé plus tard.
        // IMPORTANT: si vous réactivez, assurez-vous que `speechSynth` est géré (il est null maintenant)
        // et que les chemins d'images sont corrects.
    }

    function flipCardAction() {
        // alert("flipCardAction - Début");
        if (!cardElement) { alert("flipCardAction - ERREUR: cardElement est null !"); return; }
        if (!carteRevelee && carteActuelle) {
            cardElement.classList.add('flipped');
            carteRevelee = true;
            const nom = carteActuelle.nom || "Inconnu";
            // ... (le reste de la fonction)
            cardElement.setAttribute('aria-label', `Carte révélée: ${nom}.`);
            alert(`flipCardAction - Carte "${nom}" révélée.`);
            setTimeout(() => {
                if (resetBtn) resetBtn.style.display = 'inline-block';
            }, 800);
        }
    }

    function resetDrawProcess() {
        // alert("resetDrawProcess - Début");
        if (!cardContainer || !resetBtn || !drawBtn || !cardElement) { alert("Erreur: Éléments DOM manquants au début de resetDrawProcess."); return; }
        cardContainer.style.display = 'none';
        resetBtn.style.display = 'none';
        drawBtn.style.display = 'inline-block';
        drawBtn.disabled = false;
        if (cardElement.classList.contains('flipped')) { cardElement.classList.remove('flipped'); }
        carteActuelle = null;
        carteRevelee = false;
        // if (speechSynth && speechSynth.speaking) { speechSynth.cancel(); } // Désactivé
        drawBtn.focus();
        alert("resetDrawProcess - Tirage réinitialisé.");
    }

    // speakMantra est gardée mais ne sera pas appelée car speechSynth est null
    function speakMantra(mantraText) {
        alert(`Tentative de lire mantra (désactivé): ${mantraText}`);
        // ... (contenu original, mais ne fonctionnera pas car speechSynth est null)
    }

    window.addEventListener('load', () => {
        // alert("Page chargée.");
        if (document.body) document.body.style.opacity = '1';
    });

    if (drawBtn) {
        drawBtn.addEventListener('click', drawCardProcess);
    } else {
        alert("ERREUR CRITIQUE: drawBtn n'a pas été trouvé!");
    }
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
