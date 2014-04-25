var module_defileur = angular.module('defileur', []);



/*/////////////////////////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                 */
/*                                                                                 */
/*                    Controleur associé au défileur                               */
/*                                                                                 */
/*                                                                                 */
///////////////////////////////////////////////////////////////////////////////////*/
/////////////////////////////////////////////////////////////////////////////////////


module_defileur.controller("controleurDefileur", ['$scope', '$q', 'serviceIds',
	function($scope, $q, serviceIds){
		
	$scope.modeDefilement = "";
	$scope.direction = "" ;	

	$scope.serviceIds = serviceIds;


	$scope.$watch("direction", function(newValue, oldValue, scope){
		if (newValue !== oldValue){
			serviceIds.decaleIds(scope.direction);
			//console.log("changement de direction, newValue : ", newValue, ", oldValue : ", oldValue);
			$scope.modeDefilement = $scope.direction;			
		}
	});

	$scope.$on("PANNEAUX.TRANSITION_END", function(event, data){
			//console.log("signal de fin de transition recu");
			if(!$scope.$$phase) 
				$scope.$apply($scope.direction = "");	
	});


}]);




module_defileur.controller("controleurPanneau", ['$scope','serviceIds',
	function($scope, serviceIds){

	$scope.controleur = "controleur panneau "; // DEBUG
	$scope.id = "";
	$scope.actif = "";

	$scope.$on('PANNEAU.DEMANDE_ID', function(event, data){
		$scope.id = serviceIds.getId(data.offset);
		$scope.emplacement = data.nouvel_emplacement;		
		$scope.$broadcast('APPLICATIONS.ENVOI_ID', {'id' : $scope.id});
	});


	$scope.$on('PANNEAU.ACTIF', function(event, data){
			$scope.actif = data.actif;
			$scope.emplacement = data.nouvel_emplacement;
	});

}]);


/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/

//													  DIRECTIVES													 //

/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/


	/*module_defileur.directive('defileur', ['$q', function($q){
 	return {
 		restrict: 'AE',
 		link : function(scope, element, attributes){
 		}
	}
}]);*/





module_defileur.directive('panneauDefileur', ['gestionDesPanneaux', '$timeout', 'serviceIds', 'serviceParametrages',
	function(panneaux, $timeout, serviceIds, serviceParametrages){


	return {
		restrict : 'AE',
		transclude : true,
		template : '<div class = "panneau" mode="modeDefilement" ng-transclude></div>', 
		replace : true, 
		scope : {
			mode : " = "
		},
		link : function(scope, element, attributes){

			/*****************/
			/*Initialisations*/
			/*****************/

			var vitesse, type;
			scope.transitions = serviceParametrages.transitions;
			
			var emplacement = element.attr("emplacement");
			var offset = (emplacement == "droite" ? 1 : (emplacement == 'gauche' ? -1 : 0)); 
			scope.$emit('PANNEAU.DEMANDE_ID', {'nouvel_emplacement' : emplacement, 'offset' : offset});


			
			//element.css({transitionDuration : (11 - ui.value * 200) + 'ms'})	;

			/**********************************/
			/*   Evènements sur la directive  */
			/**********************************/


			scope.$watchCollection('transitions', function(newValue, oldValue){
				vitesse = newValue.vitesse ;
				type = newValue.type ;
				acceleration = newValue.acceleration;

				element.css({transitionTimingFunction : acceleration});

				if (type == "0"){
					element.css({transitionDuration : '1ms'});
				}
				else{
					//console.log(newValue);
					//console.log(((11 - vitesse) * 200) + 'ms');
					element.css({transitionDuration : ((11 - vitesse) * 200) + 'ms'})	;
				}
			});
			/*scope.$on("APPLICATIONS.ENVOI_ID", function(event, data){
				console.log("en tant que panneau principal " + scope.$id + ", j'ai recu un ID : " + data.id);
			});*/	

			element.on("transitionend  webkitTransitionEnd", function(event, data){
				if(element.attr("emplacement") == "centre"){
					//console.log("envoi du signal fin de transition");
					scope.$emit("PANNEAUX.TRANSITION_END", "centre");
				}
				event.stopPropagation();
			});


			scope.$watch("mode", function(newValue, oldValue, scope){
				var emplacement = element.attr("emplacement");
				if (scope.mode == "gauche"){
					if (emplacement == "gauche"){
						scope.$emit('PANNEAU.DEMANDE_ID', {'nouvel_emplacement' : "droite", offset : 1, 'actif' : false});
					}
					else if(emplacement == "droite"){
						scope.$emit('PANNEAU.ACTIF', {'nouvel_emplacement' : 'centre', 'actif' : true});								
					}
					else if(emplacement == "centre"){
						scope.$emit('PANNEAU.ACTIF', {'nouvel_emplacement' : 'gauche', 'actif' : false});								
					}
					//console.log(scope.$id, serviceParametrages.vitesseDefilement);
					panneaux.permuteGaucheTransition(element);	
				}

				else if (scope.mode == "droite"){
					//console.log("changement de mode ! ", scope.mode);					
					if (emplacement == "droite"){
						scope.$emit('PANNEAU.DEMANDE_ID', {'nouvel_emplacement' : 'gauche', offset : -1, 'actif' : false});						
					}
					else if(emplacement == "gauche"){
						scope.$emit('PANNEAU.ACTIF', {'nouvel_emplacement' : 'centre', 'actif' : true});								
					}
					else if(emplacement == "centre"){
						scope.$emit('PANNEAU.ACTIF', {'nouvel_emplacement' :  'droite', 'actif' : false});								
					}					
					//console.log(scope.$id);	
					panneaux.permuteDroiteTransition(element);	
				}
			});

		}

	}

}]);




module_defileur.directive('directionDroite', function(){

	return {
		restrict : 'AE',
		link : function(scope, element, attributes) {

			element.on("click", function(event){	
				if (!scope.direction)
					scope.$apply(scope.direction = "gauche");
			});	
		}	
	}

});


module_defileur.directive('directionGauche', function(){

	return {
		restrict : 'AE',
		link : function(scope, element, attributes) {

			element.on("click", function(event){	
				if (!scope.direction)
					scope.$apply(scope.direction = "droite");
			});	
		}	
	}

});


/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************            LES SERVICES         ***************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/


/*Injection du service qui permet d'obtenir l'ID : à adapter suivant l'application*/
/*Ce dernier service doit être en mesure de proposer un ID en cours, un ID suivant et un ID précédent*/
/*Ici, on rapatrie le service serviceDesDates */
module_defileur.factory('serviceIds', ['serviceDates', function(serviceDates){

	var gestion_des_panneaux_ids = {};
	var tabIds = {};

	/*	gestion_des_panneaux_ids.avance = function(){

	}

	gestion_des_panneaux_ids.recule = function(){

	}

gestion_des_panneaux_ids.setId = function(id){
		serviceDates.setIdDate(id);
	}*/

	gestion_des_panneaux_ids.getId = function(offset){
		if (typeof(offset) === 'undefined') offset = 0;

		return tabIds[offset];
	}

	gestion_des_panneaux_ids.initialise_les_ids = function(){
		serviceDates.initialiseBufferDates();
		synchronise_ids_avec_dates();
	}

	function synchronise_ids_avec_dates(){
		tabIds [-1] = serviceDates.retourneIdDate(-1);		
		tabIds [ 0] = serviceDates.retourneIdDate( 0);
		tabIds [ 1] = serviceDates.retourneIdDate( 1);		
	}

	gestion_des_panneaux_ids.decaleIds = function(direction){
		serviceDates.metAJourBufferDates(direction);
		synchronise_ids_avec_dates();
		//console.log(tabIds);

	}

	return gestion_des_panneaux_ids;
}]);


module_defileur.factory('gestionDesPanneaux',['$q', 'serviceParametrages',
	function($q, serviceParametrages){
	
	var gestion_des_panneaux = {};


	gestion_des_panneaux.permuteGaucheTransition = function(element){
		var emplacement = element.attr('emplacement');		
		var vitesseDefilement = serviceParametrages.transitions.vitesse;	
		//console.log(vitesseDefilement);

		if (emplacement == "gauche"){
			element.addClass("noTransition");
			element.attr("emplacement", "droite");
			element.height();  // hack : indispensable pour forcer le reflow et que la transition "noTransition" soit appliquée ! 
			element.removeClass("noTransition");					
		}
		else if(emplacement == "centre")
			element.attr("emplacement", "gauche");
		else if (emplacement == "droite")
			element.attr("emplacement", "centre");
	}		


	gestion_des_panneaux.permuteDroiteTransition = function(element, vitesseDefilement){
		var emplacement = element.attr('emplacement');	
		var vitesseDefilement = serviceParametrages.transitions.vitesse;

		//console.log(vitesseDefilement);
		
		if (emplacement == "droite"){
			element.addClass("noTransition");
			element.attr("emplacement", "gauche");
			element.height();  // hack : indispensable pour forcer le reflow et que la transition "noTransition" soit appliquée ! 
			element.removeClass("noTransition");
		}
		else if(emplacement == "centre"){
			element.attr("emplacement", "droite");
		}
		else if (emplacement == "gauche"){
			element.attr("emplacement", "centre");

			}
		}



	return gestion_des_panneaux;
}]);


