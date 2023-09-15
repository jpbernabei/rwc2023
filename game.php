<?php 
require $_SERVER['DOCUMENT_ROOT'].'/rwc/connexion/inc-db-connect.php';
// require './inc-db-connect.php';

// if(!empty($_POST['submit'])){

// 	$pdo = $GLOBALS['pdo'];
// 	$sql = "INSERT INTO participant (nom, prenom, email, confirmation, acceptation) VALUES (:nom, :prenom,:email,:confirmation,:acceptation)";
//     $result = $pdo->exec($sql);

// if ($result !== false) {
//     echo "La requête a été exécutée avec succès.";
// } else {
//     echo "Erreur lors de l'exécution de la requête : " . $pdo->errorInfo()[2];
// }
// }
if (!empty($_POST['submit'])) {
    $pdo = $GLOBALS['pdo'];
    
    // Récupérez les valeurs du formulaire
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];
    $confirmation = isset($_POST['confirmation']) ? 1 : 0;
    $acceptation = isset($_POST['acceptation']) ? 1 : 0;

    // Préparez la requête SQL avec des paramètres liés
    $sql = "INSERT INTO participant (nom, prenom, email, confirmation, acceptation) VALUES (:nom, :prenom, :email, :confirmation, :acceptation)";
    $stmt = $pdo->prepare($sql);

    // Associez les valeurs aux paramètres
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':prenom', $prenom);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':confirmation', $confirmation, PDO::PARAM_INT);
    $stmt->bindParam(':acceptation', $acceptation, PDO::PARAM_INT);

    // Exécutez la requête
    $result = $stmt->execute();

    if ($result !== false) {
        echo "La requête a été exécutée avec succès.";
    } else {
        echo "Erreur lors de l'exécution de la requête : " . $pdo->errorInfo()[2];
    }
	header("Location: /rwc/aurevoir.html");die;
}

	
?>


<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="asset/style.css">
		<script src="https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js"></script>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.5.0/dist/semantic.min.css">

		<title>Document</title>
	</head>
	<body>
		<div class="ui container text center aligned dessus">
			<div class="ui segment flex">
				<h1 class="ui red header">RUGBY WORLD CUP 2023</h1>
				<h2 class="ui blue header">Pour participer au tirage au sort et tenter de gagner des centaines de lots, évite les 15 joueurs de l'équipe adverse en traversant le stade pour marquer un essai !</p>
			</div>
		</div>
		<div class="ui container text center aligned">
			<div class="ui segment flex">
				<div id="win-modal" class="modal">
					<div class="modal-content">
						<span class="close" id="close-btn">&times;</span>
						<h2>Félicitations ! Vous avez gagné !</h2>
						<img class="ui centered tiny image" src="./asset/images/victoire.gif">
						<p>Pour participer au tirage au sort et tenter de gagner des centaines de lots dont 10 000€, veuillez remplir le formulaire :</p>
						<form class="ui form" action="/rwc/game.php" method="post" id="win-form">
							<div class="field">
							<label for="nom">Nom :</label>
							<input type="text" name="nom" placeholder="Votre nom"></div>
							<div class="field">
							<label for="prenom">Prénom :</label>
							<input type="text" name="prenom" placeholder="Votre prénom"></div>
							<div class="field" >
							<label for="email">Email :</label>
							<input type="email" name="email" placeholder="Votre email"></div>
							<div class="field" >
							<label for="">Je confirme avoir pris connaissance des regles du jeu</label>
							<input  type="checkbox" name="confirmation">
							</div>
							<div class="field" >
							<label for="">J’accepte l’usage de mes coordonnées pour l’envoi de courriers électroniques promotionnels</label>
							<input  type="checkbox" name="acceptation">
							</div>
							<input id="bouton" type="submit" name="submit" value="Envoyer" >
							<!-- <button id="bouton" type="submit" name="submit">Envoyer</button> -->
						</form>
					</div>
				</div>
				<h1>Va marquer un essai !</h1>
				<div id="game-container" class="ui raised segment center aligned">
					<!-- Ajout du bouton de démarrage -->

					<div id="player"><img id="player" src="./asset/images/joueur.gif" alt="Joueur"></div>
					
    

				</div>
				
				<button  class="ui inverted green button" id="start-button">GO!</button>
			</div>
		</div>
	</body>
</div><script src="asset/script.js"></script>
</body>
</html>

