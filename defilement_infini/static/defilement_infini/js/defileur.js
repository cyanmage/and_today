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


module_defileur.controller("controleurDefileur", ['$scope', '$q',	function($scope, $q){
		
		//$scope.direction = "aa";

}]);



/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/

//													  DIRECTIVES

/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/


module_defileur.directive('defileur', ['$q', function($q){
 	return {
 		restrict: 'AE',
 		link : function(scope, element, attributes){
 		scope : {

 			}		
 		}
	}
}]);


//console.log();


module_defileur.directive('panneauDefileur', ['gestionDesPanneaux', function(panneaux){

	return {
		restrict : 'AE',
		transclude : true,
		template : '<div class = "panneau" direction="direction"><div ng-transclude></div><div>Direction : {*direction*}</div></div>', 
		replace : true, 
		scope : {
			direction : " = "
		},
		link : function(scope, element, attributes){

			scope.$watch('direction', function(newValue, oldValue, scope){
				if (newValue !== oldValue){
					if (scope.direction == "gauche")
						panneaux.permuteGauche(element);
					else if (scope.direction == "droite")
						panneaux.permuteDroite(element);	
				}

			});

			element.on("transitionend", function(event, data){
				if(element.attr("emplacement") == "centre")
					scope.$apply(scope.direction = "");
				event.stopPropagation();
			});
		}

	}

}]);



module_defileur.directive('directionDroite', function(){

	return {
		restrict : 'AE',
		template : "<div direction='direction'></div>",
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
		template : "<div direction = 'direction'></div>",
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

module_defileur.factory('gestionDesPanneaux',['$q', function($q){
	var gestion_des_panneaux = {};

	var animation_en_cours = false;	


	gestion_des_panneaux.permuteDroite = function(element){
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

	gestion_des_panneaux.permuteGauche = function(element){
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

	gestion_des_panneaux.finDefilement = function(scope, element){
		if(element.attr("emplacement") == "centre")
			scope.$emit("transitionPanneauTerminee");
	}


	return gestion_des_panneaux;
}]);


