app.factory('gestionnaireDonnees', ['$q', '$http', function($q, $http){
	var gestionnaire_donnees = {};


	gestionnaire_donnees.choix_menu_params 		= ['Colles', 'Punitions', 'RDV parents', "Modifications"];
	gestionnaire_donnees.choix_menu 		 	= 0;
	gestionnaire_donnees.choix_classe 			= 0;
	gestionnaire_donnees.choix_eleve			= 0 ;

	gestionnaire_donnees.eleves 				= [] ;
	gestionnaire_donnees.classes 				= {};

	gestionnaire_donnees.emploiDuTemps = [
											[0,0,0,0,0,0,0,0], // Lundi
											[0,0,0,0,0,0,0,0], // Mardi
											[0,0,0,0,0,0,0,0], // Mercredi
											[0,0,0,0,0,0,0,0], // Jeudi
											[0,0,0,0,0,0,0,0], // Vendredi
											[0,0,0,0,0,0,0,0], // Samedi
											[0,0,0,0,0,0,0,0]  // Dimanche
										];

	gestionnaire_donnees.salles_et_matieres = [
											[["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"]], // Lundi
											[["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"]], // Mardi
											[["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"]], // Mercredi
											[["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"]], // Jeudi
											[["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"]], // Vendredi
											[["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"]], // Samedi
											[["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"],["--","--"]]  // Dimanche
										];	




	gestionnaire_donnees.recupereDonneesInitialisation = function(){
		var d = $q.defer();
		$http({
				method : "GET", 
				url : "/initialisation/"
				})
		.success(function (donneesRecuperees, status){
			gestionnaire_donnees.classes = formateObjetRecu(donneesRecuperees);
			//console.log(gestionnaire_donnees.salles_et_matieres);
			d.resolve(donneesRecuperees);	
			})
		.error(function (erreur, status){
			d.reject("---");
			});

		return d.promise;
	}

	function formateObjetRecu(objetJSON){
		var tabFormate = new Array();
		for (i = 0 ; i < objetJSON.length ; i++)
			tabFormate[objetJSON[i].id] = objetJSON[i].fields;/**/
		return tabFormate;
	}

	gestionnaire_donnees.metAJourChamp_EmploiDuTemps= function(journee, heure, champ, valeur_champ){
		gestionnaire_donnees.salles_et_matieres[journee][heure][champ] = valeur_champ;	
		//console.log(gestionnaire_donnees.salles_et_matieres);
		return verifieChampsCompletes(journee, heure);
	};	



	function verifieChampsCompletes(journee, heure){
		var tousLesChampsSontRemplis 	= true;	
		var tousLesChampsSontVides		= true;

		for (i= 0 ; i < 2/*gestionnaire_donnees.salles_et_matieres[journee][heure].length*/ ; i++){
			if 	(gestionnaire_donnees.salles_et_matieres[journee][heure][i] != "--"){
				tousLesChampsSontVides = false;
			}
			else{
				tousLesChampsSontRemplis = false;
			}
		}
		return {'tousLesChampsSontVides' : tousLesChampsSontVides, 'tousLesChampsSontRemplis' : tousLesChampsSontRemplis}
	}

	gestionnaire_donnees.metAJour_EmploiDuTemps = function(journee, heure){
		gestionnaire_donnees.emploiDuTemps[journee][heure] = 1 - gestionnaireDonnees.emploiDuTemps[journee][heure];	
	};	




	return gestionnaire_donnees;
}]);



app.factory('EmploiDuTemps', ['Restangular', 'gestionnaireDonnees', function(Restangular, gestionnaireDonnees){
	
	var les_services_EDT = {};

	les_services_EDT.save = function(emploiDuTemps){
		if (gestionnaireDonnees.choix_classe == 0){
			alert("Vous devez saisir une classe");	
		}
		else {
				donnees_a_envoyer = {
					classe : gestionnaireDonnees.choix_classe, 
					emploidutemps:gestionnaireDonnees.salles_et_matieres
				};
				console.log(gestionnaireDonnees.salles_et_matieres);
				Restangular.all("emploidutemps/classe").
					post(donnees_a_envoyer).
					then(function(donnees){
						//console.log(donnees.emploidutemps)

					}, function(error, status){
						console.log(error.data);
					});
			}
	} 

	les_services_EDT.charge_EDT = function(classeChoisie){
			var promise = Restangular.all("emploidutemps/classe/" + gestionnaireDonnees.choix_classe).
						post().
						then(function(donneesRecues){
							//console.log("données reçues : ");
							//console.log(donneesRecues.emploidutemps[0][0]);
							angular.copy(donneesRecues.emploidutemps, gestionnaireDonnees.salles_et_matieres);
							//console.log("tableau mis à jour ?  : ");
							//console.log(gestionnaireDonnees.salles_et_matieres[0][0]);							
							return gestionnaireDonnees.salles_et_matieres;
						}, function(error, status){
							return error;
							});
			return promise;

	}

	return les_services_EDT;
}]);





app.factory('Classe', ['Restangular', 'gestionnaireDonnees', function(Restangular, gestionnaireDonnees){

	var les_services_classe = {};

	les_services_classe.all = function(){
		var classes  = Restangular.all('classes').getList()
													.then(	function(classes){
															}, 
															function(response){
  																console.log("Error with status code", response.status);
															}
														);
		};


	les_services_classe.recupereElevesClasse = function(classe){
		angular.copy(gestionnaireDonnees.classes[classe].eleves, gestionnaireDonnees.eleves);	
		};

return les_services_classe;
}]);