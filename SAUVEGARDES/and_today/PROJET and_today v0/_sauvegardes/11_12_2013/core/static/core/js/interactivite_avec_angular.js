var appli = angular.module('mon_appli', []);


appli.config(['$interpolateProvider', function($interpolateProvider) {
  	$interpolateProvider.startSymbol('{*');
  	$interpolateProvider.endSymbol('*}');    
       }
]);

appli.factory('serviceDates', ['$q', function($q){
	var les_services_dates = {};


	var tableau_des_dates = les_services_dates.tableau_des_dates = new Array();

	var nbJoursDecalage = 1;

	function calculeDates(position, debutSemaine){
		var finSemaine = new Date(debutSemaine);
		finSemaine.setDate(debutSemaine.getDate() + 6) ;
		tableau_des_dates[position] = [debutSemaine, finSemaine];
	}

	les_services_dates.initialiseBufferDates = function(){
		var dateAvant = new Date(), dateMaintenant = new Date(), dateApres = new Date();
		var day = dateMaintenant.getDay();
		diff = dateMaintenant.getDate() - day + (day == 0 ? -6:1); 
		calculeDates(1, new Date(dateMaintenant.setDate(diff)));
		calculeDates(0, new Date(dateAvant.setDate(diff - nbJoursDecalage)));		
		calculeDates(2, new Date(dateApres.setDate(diff + nbJoursDecalage)));
	}

 	les_services_dates.metAJourBufferDates = function(decalage){
		if (decalage == "shiftRight"){
			angular.copy(tableau_des_dates[1],tableau_des_dates[0]) ;
			angular.copy(tableau_des_dates[2],tableau_des_dates[1]) ;			
			var d = new Date(tableau_des_dates[2][0]);
			calculeDates(2, new Date(d.setDate(d.getDate() + nbJoursDecalage)));	
		}
		else 
		if (decalage == "shiftLeft"){
			angular.copy(tableau_des_dates[1],tableau_des_dates[2]) ;
			angular.copy(tableau_des_dates[0],tableau_des_dates[1]) ;				
			var d = new Date(tableau_des_dates[0][0]);
			calculeDates(0, new Date(d.setDate(d.getDate() - nbJoursDecalage)));	

		}
	
}
	return les_services_dates;
}]);



appli.factory('gestionDesPanneaux',[ 'serviceDates', '$q', function(serviceDates, $q){
var gestion_des_panneaux = {};

	var animation_en_cours = false;	
	var t_rightShift  = [1, 2, 0];
	var t_leftShift   = [2, 0, 1];

	gestion_des_panneaux.champ_gauche = 0, gestion_des_panneaux.champ_centre = 1, gestion_des_panneaux.champ_droite = 2;
	


	gestion_des_panneaux.initialisePanneaux = function(){
		serviceDates.initialiseBufferDates();
	}


	gestion_des_panneaux.defilementVersLaDroite = function(scope){

			if (! animation_en_cours){
					animation_en_cours = true ;

					
					$(".centerPanel").animate(
									{"left" : "-=100%"},
									"slow"
						);
					$(".rightPanel").animate(
									{"left" : "-=100%"},
									"slow"
						)
	 			.queue(function(){
					serviceDates.metAJourBufferDates("shiftRight");
		
					gestion_des_panneaux.champ_gauche = t_leftShift[gestion_des_panneaux.champ_gauche];
					gestion_des_panneaux.champ_centre = t_leftShift[gestion_des_panneaux.champ_centre];
					gestion_des_panneaux.champ_droite = t_leftShift[gestion_des_panneaux.champ_droite];
			
					scope.$apply();
					$(this).dequeue();	 				
	 			})				
				.queue(function(){
	
					$(".leftPanel").css("left", "100%");

					var centre = $(".centerPanel"), droite = $(".rightPanel"), gauche = $(".leftPanel");	
		
					centre.removeClass("centerPanel");
					droite.removeClass("rightPanel").addClass("centerPanel");
					gauche.removeClass("leftPanel").addClass("rightPanel");
					centre.addClass("leftPanel");
	
					animation_en_cours = false ;				
					$(this).dequeue();
				});
			}
	}		


	gestion_des_panneaux.defilementVersLaGauche = function(scope){

			if (! animation_en_cours){
				animation_en_cours = true ;
	
	 			$(".centerPanel").animate(
	 							{"left" : "+=100%"},
	 							"slow"
	 				);
	 			$(".leftPanel").animate(
	 							{"left" : "+=100%"},
	 							"slow"
	 				)
	 			.queue(function(){
					serviceDates.metAJourBufferDates("shiftLeft");

					gestion_des_panneaux.champ_gauche = t_rightShift[gestion_des_panneaux.champ_gauche];
					gestion_des_panneaux.champ_centre = t_rightShift[gestion_des_panneaux.champ_centre];
					gestion_des_panneaux.champ_droite = t_rightShift[gestion_des_panneaux.champ_droite];					 				
		
					scope.$apply();
					$(this).dequeue();	 				
	 			})
	 			.queue(function(){
					$(".rightPanel").css("left", "-100%");

					var centre = $(".centerPanel"), droite = $(".rightPanel"), gauche = $(".leftPanel");	
		
					centre.removeClass("centerPanel");
					droite.removeClass("rightPanel").addClass("leftPanel");
					gauche.removeClass("leftPanel").addClass("centerPanel");
					centre.addClass("rightPanel");

					animation_en_cours = false ;		
					$(this).dequeue();
				});
			}
	}

	return gestion_des_panneaux;
}]);





appli.directive('defileur', ['$q','gestionDesPanneaux', function($q, panneaux){
 	return {
 		restrict: 'A',
 		link : function(scope, element, attributes){
 			panneaux.initialisePanneaux();	
 		}
	}
}]);




appli.directive('directionDroite', ['gestionDesPanneaux', 'serviceDates', function(panneaux, serviceDates){

	return {
		restrict : 'A',
		link : function(scope, element, attributes) {
			element.on("click", function(event){
				panneaux.defilementVersLaDroite(scope);
			});	
		}	

	}

}]);

appli.directive('directionGauche', ['gestionDesPanneaux', function(panneaux){

	return {
		restrict : 'A',
		link : function(scope, element, attributes) {
			element.on("click", function(event){
				panneaux.defilementVersLaGauche(scope);
			});	
		}	

	}

}]);


appli.controller("controleur", ['$q', 'serviceDates', 'gestionDesPanneaux', '$scope', function($q, serviceDates, gestionDesPanneaux, $scope){

 	$scope.dates_a_afficher = serviceDates.tableau_des_dates;
 	$scope.gestionDesPanneaux = gestionDesPanneaux;


 	/*$scope.$watch('dates_a_afficher', function(newValue, oldValue) {
 		if (newValue !== oldValue){
 			console.log(newValue);
 		}

 	}, true);*/


/*$scope.$watch('gestionDesPanneaux.champ_gauche', function(newValue, oldValue) {
 		//if (newValue !== oldValue){
 			console.log("champ gauche change : " + newValue);
 		//}

 	}, true);*/



}]);



