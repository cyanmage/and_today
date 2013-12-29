var module_chargeurPage = angular.module('chargeurPage', []);

module_chargeurPage.factory('chargeurPage', ['', function(){


		var les_services_chargeur_page = {};

		//les_services_chargeur_page.

		return les_services_chargeur_page;
}]);




/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************LES SERVICES                    ****************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/

module_chargeurPage.factory('serviceDates', ['$q', function($q){
	var les_services_dates = {};


	var tableau_des_dates = les_services_dates.tableau_des_dates = new Array();

	var nbJoursDecalage = 1;

	var calculeDates = function(position, debutSemaine){
		var finSemaine = new Date(debutSemaine);
		finSemaine.setDate(debutSemaine.getDate() + 6) ;
		tableau_des_dates[position] = [debutSemaine, finSemaine];
	}

	/*Retourne une date formatée sous la forme yyyymmjj, qui servira d'ID*/
	les_services_dates.retourneIdDate = function(date, offset){
		if(typeof(offset)==='undefined') offset = 0;
		var date = tableau_des_dates[1 + offset][0];
		return "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
 	}

	les_services_dates.initialiseBufferDates = function(){
		var dateAvant = new Date(), dateMaintenant = new Date(), dateApres = new Date();
		diff = 0;

		var day = dateMaintenant.getDay();
		//diff = dateMaintenant.getDate() - day + (day == 0 ? -6:1); Utilisé pour semaine à semaine
		diff = dateMaintenant.getDate()

		calculeDates(0, new Date(dateAvant.setDate(diff - nbJoursDecalage)));			
		calculeDates(1, new Date(dateMaintenant.setDate(diff)));
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