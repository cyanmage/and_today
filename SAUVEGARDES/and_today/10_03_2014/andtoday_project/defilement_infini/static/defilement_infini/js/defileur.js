var module_defileur = angular.module('defileur', []);


module_defileur.config(['$provide', function($provide){

    $provide.decorator('$rootScope', ['$delegate', function($delegate){

        Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
            value: function(name, listener, scope){
                var unsubscribe = $delegate.$on(name, function(event, data){
                	//console.log(scope.actif);
                	if (scope.actif){
                		listener.call(this, event, data);                		
                		//console.log("DEDANS !! ", scope.$id);                 	
                	}
                });
                this.$on('$destroy', unsubscribe);

                //console.log(this);
            },
            enumerable: false
        });

        return $delegate;
    }]);

}]);
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




module_defileur.controller("controleurPanneau", ['$scope', '$q', 'serviceIds',
	function($scope, $q, serviceIds){

	$scope.controleur = "controleur panneau ";
	$scope.id = "";
	$scope.actif = "";

	/*$scope.$watch("panneau", function(newValue, oldValue){
		console.log(newValue, oldValue);	
	})*/


	/*$scope.$watch("emplacement", function(newValue, oldValue){
		console.log(newValue, oldValue);	
	})*/

	$scope.$on('PANNEAU.DEMANDE_ID', function(event, data){
		//console.log('PANNEAU.DEMANDE_ID');
		$scope.id = serviceIds.getId(data.offset);
		$scope.emplacement = data.nouvel_emplacement;		
		//console.log("MISE A JOUR ID, ", data.emplacement, ", ", $scope.id);
		//console.log("nouvel emplacement : ", data);			
		//console.log("emplacement : " + data.emplacement  + ",  offset : " + data.offset + ", date associee : " + serviceIds.getId(data.offset));
		$scope.$broadcast('APPLICATIONS.ENVOI_ID', {'id' : $scope.id});
	});


	$scope.$on('PANNEAU.ACTIF', function(event, data){
			//console.log('PANNEAU.ACTIF');
			//console.log("nouvel emplacement : ", data);			
			//console.log("signal de fin de transition recu");
			//console.log(data);
			//console.log("AVANT", $scope.id, $scope.actif);
			//console.log("ACTIF-INACTIF, ", $scope.id,", ",   data.actif);				
			//if(!$scope.$$phase) 
			$scope.actif = data.actif;
			$scope.emplacement = data.nouvel_emplacement;
				//$scope.$apply($scope.actif = data.actif);	
		
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
			scope.$emit('PANNEAU.DEMANDE_ID', {'nouvel_emplacement' : emplacement, 'offset' : offset});

			//var jquery = true;	
			var jquery = false;	
			/*attributes.$observe("emplacement", function(value){
				console.log("changement d'attribut " + value);
			});*/

			/**********************************/
			/*   Evènements sur la directive  */
			/**********************************/
			element.on("transitionend  webkitTransitionEnd", function(event, data){
				console.log("fin de transitionend");
				if(element.attr("emplacement") == "centre"){
					//scope.$apply(scope.mode = "defilementTermine");
					//console.log("signal de fin de transition emis");
					scope.$emit("PANNEAUX.TRANSITION_END", "centre");
				}
				event.stopPropagation();
			});


			/*scope.$on("APPLICATIONS.ENVOI_ID", function(event, data){
				console.log("en tant que panneau principal " + scope.$id + ", j'ai recu un ID : " + data.id);
			});*/	

			scope.$watch("mode", function(newValue, oldValue, scope){
				//console.log("mode : ", newValue, oldValue);
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
					//jquery ? 										
					//panneaux.permuteGaucheJquery(scope) ;		//VERSION JQUERY				
					panneaux.permuteGaucheTransition(element);	//VERSION TRANSITION*/
					//panneaux.permuteGauche(element)// 			//VERSION TRANSITION*/	
					//panneaux.permuteGaucheJqueryOpacity(scope);
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
					//jquery ? 										
					//panneaux.permuteDroiteJquery(scope) ;		//VERSION JQUERY DEFIL				
					panneaux.permuteDroiteTransition(element);	//VERSION TRANSITION DEFIL*/
					//panneaux.permuteDroite(element);// 			//VERSION TRANSITION*/
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


module_defileur.factory('gestionDesPanneaux',['$q', function($q){
	var gestion_des_panneaux = {};

	/**/
	gestion_des_panneaux.permuteGaucheTransition = function(element){
		console.log("Permutation gauche transition");			
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
		console.log("PERMUTATION TERMINEE");
	}		

	gestion_des_panneaux.permuteDroiteTransition = function(element){
		var emplacement = element.attr('emplacement');	
		console.log("Permutation droite transition");		
		
		if (emplacement == "droite"){
			element.addClass("noTransition");
			element.attr("emplacement", "gauche");
			element.height();  // hack : indispensable pour forcer le reflow et que la transition "noTransition" soit appliquée ! 
			element.removeClass("noTransition");
			console.log("droite vers gauche");							
		}
		else if(emplacement == "centre"){
			element.attr("emplacement", "droite");
			console.log("centre vers droite");	
		}
		else if (emplacement == "gauche"){
			element.attr("emplacement", "centre");
			console.log("gauche vers centre");			
			}
		}

	var animation_en_cours = false;	
	/*var t_rightShift  = [1, 2, 0];
	var t_leftShift   = [2, 0, 1];	*/
	var rapidite = 1100;

	gestion_des_panneaux.permuteGaucheJquery = function(scope){
		console.log("Permutation gauche jquery");
			if (! animation_en_cours){
					animation_en_cours = true ;

				$(".centerPanel").animate(	{"left" : "-=100%"},	rapidite);

				$(".rightPanel").animate(	{"left" : "-=100%"},	rapidite)
	 			/*.queue(function(){
					//serviceDates.metAJourBufferDates("shiftRight");
					//console.log("vers la droite");
					//gestion_des_panneaux.champ_gauche = t_leftShift[gestion_des_panneaux.champ_gauche];
					//gestion_des_panneaux.champ_centre = t_leftShift[gestion_des_panneaux.champ_centre];
					//scope.$apply();
					//$(this).dequeue();	 				
	 			})		*/		
				.queue(function(){
	
					$(".leftPanel").css("left", "100%");

					var centre = $(".centerPanel"), droite = $(".rightPanel"), gauche = $(".leftPanel");	
		
					centre.removeClass("centerPanel");
					droite.removeClass("rightPanel").addClass("centerPanel");
					gauche.removeClass("leftPanel").addClass("rightPanel");
					centre.addClass("leftPanel");

					scope.$emit("PANNEAUX.TRANSITION_END", "centre");	
					animation_en_cours = false ;				
					$(this).dequeue();
				});
			}
	}		




	gestion_des_panneaux.permuteDroiteJquery= function(scope){
		console.log(animation_en_cours);
			if (! animation_en_cours){
				animation_en_cours = true ;

				$(".centerPanel")
				.animate({'opacity' : 0},	rapidite)
				.queue(function(){
					$(this).css("left", "+100%")
				});

				$(".leftPanel").css("left", "0%")
				.animate(	{'opacity' : 1},	rapidite)
	 			.queue(function(){
					/*//serviceDates.metAJourBufferDates("shiftLeft");
					//gestion_des_panneaux.champ_gauche = t_rightShift[gestion_des_panneaux.champ_gauche];
					//gestion_des_panneaux.champ_centre = t_rightShift[gestion_des_panneaux.champ_centre];
					//gestion_des_panneaux.champ_droite = t_rightShift[gestion_des_panneaux.champ_droite];	*/				 				
			console.log("-----------------");
					//scope.$apply();
					console.log("panel !!!!");
					$(".rightPanel").css("left", "-100%");
					$(this).dequeue();	 				
	 			})
	 			.queue(function(){
/**/

					var centre = $(".centerPanel"), droite = $(".rightPanel"), gauche = $(".leftPanel");	
			console.log('FIN !');
					centre.removeClass("centerPanel");
					droite.removeClass("rightPanel").addClass("leftPanel");
					gauche.removeClass("leftPanel").addClass("centerPanel");
					centre.addClass("rightPanel");

					scope.$emit("PANNEAUX.TRANSITION_END", "centre");
					animation_en_cours = false ;		
					$(this).dequeue();
				});
			}
	}




	gestion_des_panneaux.permuteGaucheJqueryOpacity = function(scope){
		console.log("Permutation gauche jquery avec opcite");
			if (! animation_en_cours){
					animation_en_cours = true ;

				$(".centerPanel").animate(	{/*"left" : "-=100%",*/ 'opacity' : 0},	rapidite);

				$(".rightPanel").animate(	{/*"left" : "-=100%",*/ 'opacity' : 1},	rapidite)
	 			/*.queue(function(){
					//serviceDates.metAJourBufferDates("shiftRight");
					//console.log("vers la droite");
					//gestion_des_panneaux.champ_gauche = t_leftShift[gestion_des_panneaux.champ_gauche];
					//gestion_des_panneaux.champ_centre = t_leftShift[gestion_des_panneaux.champ_centre];
					//scope.$apply();
					//$(this).dequeue();	 				
	 			})		*/		
				.queue(function(){
	
					$(".leftPanel");/*.css("left", "100%");.css('opacity', 1);*/

					var centre = $(".centerPanel"), droite = $(".rightPanel"), gauche = $(".leftPanel");	
		
					centre.removeClass("centerPanel");
					droite.removeClass("rightPanel").addClass("centerPanel");
					gauche.removeClass("leftPanel").addClass("rightPanel");
					centre.addClass("leftPanel");

					scope.$emit("PANNEAUX.TRANSITION_END", "centre");	
					animation_en_cours = false ;				
					$(this).dequeue();
				});
			}
	}	





	/*gestion_des_panneaux.permuteGauche = function(element){
		console.log("Permutation gauche sans transition");			
		var emplacement = element.attr('emplacement');		
		if (emplacement == "gauche")
			element.attr("emplacement", "droite");
		else if(emplacement == "centre")
			element.attr("emplacement", "gauche");
		else if (emplacement == "droite")
			element.attr("emplacement", "centre");
		//console.log("PERMUTATION TERMINEE");
	}		

	gestion_des_panneaux.permuteDroite = function(element){
		var emplacement = element.attr('emplacement');	
		console.log("Permutation droite  sans transition");		
		
		if (emplacement == "droite"){
			element.attr("emplacement", "gauche");
		}
		else if(emplacement == "centre"){
			element.attr("emplacement", "droite");
		}
		else if (emplacement == "gauche"){
			element.attr("emplacement", "centre");
			}
		}*/




	return gestion_des_panneaux;
}]);


