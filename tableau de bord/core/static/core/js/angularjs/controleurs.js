app.controller('panneauControleur', ['$scope', 'gestionnaireDonnees', 'Classe', 'EmploiDuTemps'/**/,
 function($scope, gestionnaireDonnees, Classe, EmploiDuTemps/**/){

	gestionnaireDonnees.recupereDonneesInitialisation();

	$scope.toto = function(journee, heure){ return journee + "--" + heure ;}

	$scope.intitule_menu			= gestionnaireDonnees.choix_menu_params[0];
	$scope.choix_classe 			= "---"							 		;
	$scope.eleves 					= gestionnaireDonnees.eleves 			;
	$scope.emploiDuTemps			= gestionnaireDonnees.salles_et_matieres;


$scope.safeApply = function(fn) {
  var phase = this.$root.$$phase;
  if(phase == '$apply' || phase == '$digest') {
    if(fn && (typeof(fn) === 'function')) {
      fn();
    }
  } else {
    this.$apply(fn);
  }
};	

	$scope.choixClasse = function(classeChoisie){
		gestionnaireDonnees.choix_classe = classeChoisie;
		//console.log('mise a jour');
		$scope.intitule_classe 	= gestionnaireDonnees.classes[classeChoisie].abbreviation_classe;
		Classe.recupereElevesClasse(classeChoisie);
		EmploiDuTemps.charge_EDT(classeChoisie).then(function(edt){
			console.log("dans le controleur : " );
			console.log($scope.emploiDuTemps[0][0]);	
			console.log(edt[0][0]);	
			$scope.safeApply(function() {
  					console.log('Now I\'m wrapped for protection!');
				});
			});

		}

/*$scope.safeApply(function() {
  alert('Now I'm wrapped for protection!');
});*/

	$scope.$watchCollection('emploiDuTemps', function (newVal, oldVal, scope) {
			console.log("changement dans le service");
    		console.log(gestionnaireDonnees.salles_et_matieres);
    });/**/

	$scope.$watch('intitule_classe', function(new_value, old_value){
		$scope.intitule_eleve = "---";
	});
	
	$scope.choixEleve = function(eleveChoisi){
		gestionnaireDonnees.choix_eleve = eleveChoisi;
		$scope.intitule_eleve = eleveChoisi.nom_eleve + "  " + eleveChoisi.prenom_eleve ;
	}

	$scope.choixMenu = function(menuChoisi){
		gestionnaireDonnees.choix_menu =  menuChoisi;
		$scope.intitule_menu = gestionnaireDonnees.choix_menu_params[menuChoisi];
	}/**/

	compteEvenements($scope);

}]);


function compteEvenements(scope){
console.log(Node.prototype);
var listenerCount = 0;
 /*   var ael = Node.prototype.addEventListener;
    Node.prototype.addEventListener = function() {
         listenerCount++;
         ael.apply(this, arguments);
         scope.numberEvents = listenerCount;
    }
    var rel = Node.prototype.removeEventListener;
    Node.prototype.removeEventListener = function() {
         listenerCount--;
         rel.apply(this, arguments);
         scope.numberEvents = listenerCount;         
    }*/

}