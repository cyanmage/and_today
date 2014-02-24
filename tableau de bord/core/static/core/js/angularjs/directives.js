app.directive('validerEmploiDuTemps', ['gestionnaireDonnees', 'EmploiDuTemps','Classe', function(gestionnaireDonnees, EmploiDuTemps, Classe){
	return {
		restrict : "A",
		scope : {},
		link : function(scope, element, attributes){
			element.on("click", function (event){
				EmploiDuTemps.save(gestionnaireDonnees.emploiDuTemps);	
				//EmploiDuTemps.charge_EDT();
			})
		}
	}
}]);




app.directive('intercepterEvenementGrilleE', ['gestionnaireDonnees', function(gestionnaireDonnees){
	return {
		restrict : "A",
		scope : true,
		link : function(scope, element, attributes){


				element.on("click", "div.heure", function(event){
				var elementCourant 		= $(event.currentTarget);
				var elementTarget		= $(event.target);
				var position_journee 	= elementCourant.attr("position_journee");
				var position_heure   	= elementCourant.attr("position_heure");
				gestionnaireDonnees.emploiDuTemps[position_journee][position_heure] = 1 - gestionnaireDonnees.emploiDuTemps[position_journee][position_heure];				


						
				if (elementTarget.hasClass("menu_salle") || elementTarget.hasClass("menu_matiere")){
					var champ = event.target.innerHTML;
					if (elementTarget.hasClass("menu_salle")){
						elementCourant.find(".salle").text(champ) 	;
						id_champ = 0 ;
					}
					else{
						elementCourant.find(".matiere").text(champ) 	;	
						id_champ = 1 ;
					}
											
					champs_completes = gestionnaireDonnees.metAJourChamp_EmploiDuTemps(position_journee, position_heure, id_champ, champ);
					if(champs_completes['tousLesChampsSontRemplis'] ) 
						elementCourant.toggleClass("heure_selectionnee") ;
				}
	


				//return false;
			})	
		}
	}
}]);