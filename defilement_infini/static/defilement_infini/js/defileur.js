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
	//$scope.ids = { precedent : serviceIds.getId(-1), enCours :  serviceIds.getId(0), suivant : serviceIds.getId(1)};
	//console.log($scope.ids);

	//console.log ('precedent : ' + $scope.idPrecedent + " , en cours  :  " + $scope.idEnCours + ", suivant : " + $scope.idSuivant );

	$scope.$watch("direction", function(newValue, oldValue, scope){
		if (newValue !== oldValue){
			//console.log("changement de direction");
			serviceIds.decaleIds(scope.direction);
			$scope.modeDefilement = $scope.direction;

		}
	});

	$scope.$on("PANNEAUX.TRANSITION_END", function(event, data){
			//console.log("signal de fin de transition recu");
			if(!$scope.$$phase) 
				$scope.$apply($scope.direction = "");	
	});

}]);



/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/

//													  DIRECTIVES													 //

/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/


module_defileur.directive('defileur', ['$q', function($q){
 	return {
 		restrict: 'AE',
 		/*scope : {

 			},	*/
 		link : function(scope, element, attributes){

 		}
	}
}]);





module_defileur.directive('panneauDefileur', ['gestionDesPanneaux', '$timeout', 'serviceIds', '$rootScope',
	function(panneaux, $timeout, serviceIds, $rootScope){

	return {
		restrict : 'AE',
		transclude : true,
		template : '<div class = "panneau" mode="modeDefilement"><div ng-transclude></div></div>', 
		replace : true, 
		scope : {
			mode : " = "
		},
		link : function(scope, element, attributes){

			/*****************/
			/*Initialisations*/
			/*****************/
			//console.log(element.attr("emplacement") );
			var emplacement = element.attr("emplacement");
			var offset = (emplacement == "droite" ? 1 : (emplacement == 'gauche' ? -1 : 0)); 
			scope.$emit('PANNEAU.DEMANDE_ID', {'emplacement' : emplacement, 'offset' : offset});

			/*attributes.$observe("emplacement", function(value){
				console.log("changement d'attribut " + value);
			});*/

			/**********************************/
			/*   Evènements sur la directive  */
			/**********************************/
			element.on("transitionend", function(event, data){
				if(element.attr("emplacement") == "centre"){
					//scope.$apply(scope.mode = "defilementTermine");
					//console.log("signal de fin de transition emis");
					scope.$emit("PANNEAUX.TRANSITION_END", element.attr("emplacement"));
				}
				event.stopPropagation();
			});


			/*scope.$on("APPLICATIONS.ENVOI_ID", function(event, data){
				console.log("en tant que panneau principal " + scope.$id + ", j'ai recu un ID : " + data.id);
			});*/	

			scope.$watch("mode", function(newValue, oldValue, scope){
				//console.log("changement de mode ! ");

				var emplacement = element.attr("emplacement");
				if (scope.mode == "gauche"){
					if (emplacement == "gauche"){
						scope.$emit('PANNEAU.DEMANDE_ID', {'emplacement' : "gauche", offset : 1});
					}					
					panneaux.permuteGauche(element);
				}
				else if (scope.mode == "droite"){
					if (emplacement == "droite"){
						scope.$emit('PANNEAU.DEMANDE_ID', {'emplacement' : "droite", offset : -1});						
					}					
					panneaux.permuteDroite(element);
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

	gestion_des_panneaux_ids.avance = function(){

	}

	gestion_des_panneaux_ids.recule = function(){

	}

	/*gestion_des_panneaux_ids.setId = function(id){
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


module_defileur.factory('gestionDesPanneaux',['$q', function($q){
	var gestion_des_panneaux = {};

	gestion_des_panneaux.permuteGauche = function(element){
		var emplacement = element.attr('emplacement');		
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

	gestion_des_panneaux.permuteDroite = function(element){
		var emplacement = element.attr('emplacement');			
		if (emplacement == "droite"){
			element.addClass("noTransition");
			element.attr("emplacement", "gauche");
			element.height();  // hack : indispensable pour forcer le reflow et que la transition "noTransition" soit appliquée ! 
			element.removeClass("noTransition");								
		}
		else if(emplacement == "centre")
			element.attr("emplacement", "droite");
		else if (emplacement == "gauche")
			element.attr("emplacement", "centre");
	}		

	return gestion_des_panneaux;
}]);


