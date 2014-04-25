var module_parametrages = angular.module('parametrages', []);




/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/

//													  DIRECTIVES													 //

/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/

module_parametrages.directive('parametrages', ['serviceParametrages',
	function(serviceParametrages){

		return {
			restrict : 'AE',
			link : function(scope, element, attributes){
				//console.log("panneau-parametrages");
				$("panneau-parametrages").hide();
				element.on("click", function() {
					$("panneau-parametrages").toggle("slide", { direction: "up" }, "fast");					
					//$("panneau-parametrages").toggleClass("panneauParametragesDeploye");
					//$("panneau-parametrages").slideDown("fast");										
				})
			}
		}

}]);

module_parametrages.directive('panneauParametrages', ['serviceParametrages',
	function(serviceParametrages){

		return {
			restrict : 'AE',
			controller : function($scope){
				$scope.changeTypeTransition = function(typeTransition){
					serviceParametrages.transitions.type = typeTransition;
					//$scope.$apply();					
					//console.log("coucou ! ", typeTransition);
						//console.log($('#vitesseDefilement').slider("value"));
					/*if (typeTransition == "0"){
						$(".panneau").css({transitionDuration : '1ms'});
					}
					else{
						$(".panneau").css({transitionProperty : '1ms'});
						console.log($('#slider').slider("value");												
					}*/
					//$(".panneau").css({transitionProperty : 'ms'});
				}
					/*scope.$watch("typeTransition", function(newValue, oldValue){
						console.log("changement de transition : ", newValue, " vers ", oldValue);
					})*/
			},
			link : function(scope, element, attributes){

				//$(".panneau").css({transitionDuration : '1200ms', transitionTimingFunction : 'linear'});

				//element.resizable({"handles" : "s"});

				$( "#vitesseDefilement" )
				.slider({
					step : 1, 
					min : 1, 
					max: 10,
					//minHeight : '40%',
					change : function(event, ui) {
						//console.log(ui.value);
						serviceParametrages.transitions.vitesse = ui.value;
						scope.$apply();/**/
						//console.log(serviceParametrages.transitions.vitesse);
						//$(".panneau").css({transform: 'translateY(300px) rotateZ(120deg)'})	
						//transform 			1.2s 	  	linear, 	 opacity   1.2s 	linear
						
						//$(".panneau").css({transitionDuration : (11 - ui.value * 200) + 'ms'})	;				
						//$(".panneau").css({transitionDuration : '1ms'});					

						/*transition 					: 		transform 			1.2s 	  	linear, 	 opacity   1.2s 	linear;						*/
						//console.log(typeof ui.value);
						//
					}
				});

			}

		}

}]);




/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/*******                       LES SERVICES                    ****************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/


module_parametrages.factory('serviceParametrages', ['$q',
	function($q){

	var les_services_parametrages = {};

	les_services_parametrages.transitions = {type : "1", vitesse : 8, acceleration : "linear"};

	/*Initialisations des paramétrages*/
	les_services_parametrages.vitesseDefilement = 1;

	return les_services_parametrages;
}]);

