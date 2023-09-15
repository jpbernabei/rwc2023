        // Récupération des éléments HTML
        const gameContainer = document.getElementById('game-container');
        const player = document.getElementById('player');
        const scoreDisplay = document.getElementById('score');
        const startButton = document.getElementById('start-button');

        // Variables pour le jeu
        let score = 0;
        let gameInterval;
        let obstaclesAvoidedCount = 0; // Compteur d'obstacles évités
        let obstaclesGeneratedCount = -1; // Compteur d'obstacles générés

        // Fonction pour déplacer le joueur en fonction de la souris
        function movePlayer(event) {
            const mouseX = event.clientX;
            const containerLeft = gameContainer.getBoundingClientRect().left;
            const containerWidth = gameContainer.offsetWidth;
            const playerWidth = player.offsetWidth;

            const newPosition = mouseX - containerLeft - playerWidth / 2;
            const clampedPosition = Math.min(containerWidth - playerWidth, Math.max(0, newPosition));

            player.style.left = clampedPosition + 'px';
        }

        // Fonction pour créer une ligne
        function createTryLine() {
            // Création de la ligne
            const tryLine = document.createElement('div');
            tryLine.className = 'tryLine';
            // tryLine.style.left = Math.random() * (gameContainer.offsetWidth - 2) + 'px';
            tryLine.style.top = '0';

            // Calcul de la position de la ligne derrière le dernier obstacle
            const lastObstacle = gameContainer.querySelector('.obstacle:last-child');
            const lastObstacleTop = parseFloat(getComputedStyle(lastObstacle).top);
            const lastObstacleHeight = parseFloat(getComputedStyle(lastObstacle).height);
            tryLine.style.top = (lastObstacleTop + lastObstacleHeight) + 'px';

            // Ajout de la ligne
            gameContainer.appendChild(tryLine);

            // Animation de la ligne
            const tryLineInterval = setInterval(() => {
                const topPosition = parseFloat(tryLine.style.top);
                if (topPosition < gameContainer.offsetHeight) {
                    tryLine.style.top = (topPosition + 5) + 'px';
                } else {
                    clearInterval(tryLineInterval);
                    gameContainer.removeChild(tryLine);
                }
            }, 25);
        }

        // Fonction pour créer un nouvel obstacle
        function createObstacle() {
            // Générer l'obstacle uniquement si le nombre actuel d'obstacles générés est inférieur à 15
            if (obstaclesGeneratedCount < 15) {
                // Création de l'élément obstacle
                const obstacle = document.createElement('img');
                obstacle.src = "./asset/images/adv.gif"
                obstacle.className = 'obstacle';
                obstacle.style.left = Math.random() * (gameContainer.offsetWidth - 20) + 'px';
                obstacle.style.top = '0';
                gameContainer.appendChild(obstacle);

                obstaclesGeneratedCount++; // Incrémentation du compteur d'obstacles générés

                // Animation de l'obstacle
                const obstacleInterval = setInterval(() => {
                    const topPosition = parseFloat(obstacle.style.top);
                    if (topPosition < gameContainer.offsetHeight) {
                        obstacle.style.top = (topPosition + 5) + 'px';

                        const playerPosition = parseFloat(player.style.left);
                        const obstaclePosition = parseFloat(obstacle.style.left);

                        // Déplacement horizontal progressif de l'obstacle vers le joueur
                        if (obstaclePosition < playerPosition) {
                            obstacle.style.left = (obstaclePosition + 1) + 'px';
                        } else if (obstaclePosition > playerPosition) {
                            obstacle.style.left = (obstaclePosition - 1) + 'px';
                        }
                    } else {
                        // Suppression de l'obstacle une fois qu'il sort de l'écran
                        clearInterval(obstacleInterval);
                        gameContainer.removeChild(obstacle);
                        obstaclesAvoidedCount++;

                        // Vérifier si le joueur a évité tous les obstacles
                        if (obstaclesAvoidedCount >= 15) {
                            clearInterval(gameInterval); // Arrêt du jeu en cas de victoire
                            // alert('Félicitations ! Vous avez évité tous les obstacles et gagné ! Votre score : ' + score);

                            modal();
                            // Réinitialiser le jeu
                            resetGame();
                        }
                    }

                    // Collision entre le joueur et l'obstacle
                    const playerRect = player.getBoundingClientRect();
                    const obstacleRect = obstacle.getBoundingClientRect();

                    if (
                        playerRect.left < obstacleRect.right &&
                        playerRect.right > obstacleRect.left &&
                        playerRect.bottom > obstacleRect.top &&
                        playerRect.top < obstacleRect.bottom
                    ) {
                        clearInterval(gameInterval); // Arrêt du jeu en cas de collision
                        alert('Game Over! Retentez votre chance !');

                        // Réinitialiser le jeu
                        resetGame();
                    }
                }, 25);
            } else if (obstaclesGeneratedCount === 15) {
                // Création de la ligne après le 15ème obstacle
                createTryLine();
            }
        }

        // Fonction pour démarrer le jeu
        function startGame() {
            // startButton.style.display = 'none'; // Cacher le bouton de démarrage
            gameInterval = setInterval(() => {
                createObstacle();
            }, 300);
        }

        // Ajout d'un gestionnaire d'événement au bouton de démarrage
        startButton.addEventListener('click', startGame);

        // Écouteur d'événement pour déplacer le joueur avec la souris
        document.addEventListener('mousemove', movePlayer);

        // Événement lorsque le joueur évite l'obstacle
        gameContainer.addEventListener('click', () => {
            if (obstaclesAvoidedCount < 15) {
                obstaclesAvoidedCount++;
                score++;
                scoreDisplay.textContent = score;
                if (obstaclesAvoidedCount >= 15) {
                    clearInterval(gameInterval); // Arrêt du jeu en cas de victoire
                    // alert('Félicitations ! Vous avez évité tous les obstacles et gagné ! Votre score : ' + score);

                    // Réinitialiser le jeu
                    resetGame();
                }
            }
        });

        // Fonction pour réinitialiser le jeu
        function resetGame() {
            // Réinitialiser les variables du jeu
            score = 0;
            obstaclesAvoidedCount = 0;
            obstaclesGeneratedCount = -1;

            // Effacer tous les éléments obstacles et lignes
            const obstacles = document.querySelectorAll('.obstacle');
            obstacles.forEach((obstacle) => {
                gameContainer.removeChild(obstacle);
            });

            const tryLines = document.querySelectorAll('.tryLine');
            tryLines.forEach((tryLine) => {
                gameContainer.removeChild(tryLine);
            });

            // Réinitialiser l'affichage du score
            scoreDisplay.textContent = score;

            // Afficher à nouveau le bouton de démarrage
            startButton.style.display = 'inline-block';
        }



        function modal(){
                // Afficher l'arrière-plan gris
    const pageOverlay = document.createElement('div');
    pageOverlay.className = 'page-overlay';
    document.body.appendChild(pageOverlay);

    // Afficher la fenêtre modale
    const winModal = document.getElementById('win-modal');
    winModal.style.display = 'block';

    // Fermer la fenêtre modale et retirer l'arrière-plan gris lorsque le bouton de fermeture est cliqué
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
        winModal.style.display = 'none';
        document.body.removeChild(pageOverlay);
    });
        
    // Écouter le formulaire pour la soumission des données
    const winForm = document.getElementById('win-form');
    winForm.addEventListener('submit', (event) => {
        // Traitez les données du formulaire ici
        // Vous pouvez envoyer les données au serveur ou les stocker localement
        // Ensuite, fermez la fenêtre modale et retirez l'arrière-plan gris
        winModal.style.display = 'none';
        document.body.removeChild(pageOverlay);
    });
        }





//         // Fonction pour récupérer les données du formulaire en format JSON
// function getFormData() {
//     const form = document.getElementById('win-form');
//     const formData = new FormData(form);
//     const formDataObject = {};

//     formData.forEach((value, key) => {
//         formDataObject[key] = value;
//     });

//     return JSON.stringify(formDataObject);
// }

// // Écouter la soumission du formulaire
// const winForm = document.getElementById('win-form');
// winForm.addEventListener('submit', (event) => {
//     event.preventDefault();
    
//     // Récupérer les données du formulaire en format JSON
//     const formDataJSON = getFormData();
    
//     // Vous pouvez envoyer les données au serveur ici ou les utiliser localement
//     console.log(formDataJSON);
//     localStorage.setItem(formDataJSON);
// });