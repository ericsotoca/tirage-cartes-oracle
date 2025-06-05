document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('drawBtn');
    const loadingDiv = document.getElementById('loading');

    // Vérification minimale des éléments
    if (!drawBtn) {
        // Si cette alerte ne s'affiche pas au chargement, index.html ou l'ID du bouton est le problème.
        alert("ERREUR FATALE : Bouton 'drawBtn' INTROUVABLE au chargement !");
        return;
    }
    if (!loadingDiv) {
        alert("ERREUR FATALE : Div 'loading' INTROUVABLE au chargement !");
        return;
    }
    // alert("Script initialisé. Bouton et loading div trouvés."); // Optionnel

    function testDrawProcess() {
        // Pas d'alertes ici pour ne pas interférer avec le test principal
        console.log("testDrawProcess appelé"); // Pour info si la console était dispo

        if (drawBtn) {
            drawBtn.style.display = 'none';
        }
        if (loadingDiv) {
            loadingDiv.innerHTML = '<p>Mélange en cours (Test Alerte)...</p>'; // Message modifié
            loadingDiv.style.display = 'block';
        }

        // Test crucial : setTimeout avec une seule alerte
        setTimeout(() => {
            // Si cette alerte ne s'affiche JAMAIS après avoir vu "Mélange en cours (Test Alerte)...",
            // il y a un problème très profond avec l'exécution JS asynchrone sur votre mobile
            // ou une erreur qui bloque tout avant même que le callback du setTimeout ne soit appelé.
            alert("ALERTE TEST DANS setTimeout : Si vous voyez ceci, le callback du setTimeout s'exécute !");

            // On essaie de cacher le loading et de remettre le bouton pour pouvoir retester
            if (loadingDiv) {
                loadingDiv.style.display = 'none';
            }
            if (drawBtn) {
                drawBtn.style.display = 'inline-block';
            }

        }, 1500); // Délai fixe pour simplifier
    }

    drawBtn.addEventListener('click', testDrawProcess);
});
