var module_warning = angular.module('warningMessages', []);



/*/////////////////////////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                 */
/*                                                                                 */
/*  Controleur associé à l'afficheur de messages d'avertissement                   */
/*                                                                                 */
/*                                                                                 */
///////////////////////////////////////////////////////////////////////////////////*/
/////////////////////////////////////////////////////////////////////////////////////

module_warning.controller("controleurModuleAfficheurWarning", ['$scope', '$q', 'servicesWarningMessages', '$rootScope',
	function($scope, $q, servicesWarningMessages, $rootScope){

		$scope.warning_message = "";
		$scope.show_message =  false;

		/*APPEL AU SERVICE $rootScope dans la signature du controleur ci-dessus  
		qui délègue au décorateur $onRootScope ci-dessous, fourni dans le module module_defileur*/
		$scope.$onRootScope("WARNING_DISPLAY", function(event, data){
			//console.log("RECU");
			$scope.warning_message = data.message;
			$scope.show_message = true;
		}, $scope);

	}]); 


/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/

//													  DIRECTIVES													 //

/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/

module_warning.directive('panneauWarningMessages', ['$q', '$timeout',
	function($q, $timeout){

		return {
			restrict : 'AE',
			link : function(scope, element, attributes){

				var contenu_message = element.find(".warning-message");

				scope.$watch("warning_message", function(newValue, oldValue){
					//console.log(newValue);
					if (newValue && newValue!== oldValue){
						//console.log("L'AFFICHAGE VA ETRE MIS A JOUR ,", newValue, ", ", oldValue);
						//
						//scope.warning_message = true ;						
						contenu_message.html(newValue);
						$timeout(function() {
							//contenu_message.html("");
							scope.warning_message = "";							
							scope.show_message = false;
						}, 1500);


					}
				}); 
			}
		}

}]);



/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************               SERVICES          ***************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/

module_warning.factory('servicesWarningMessages', [ '$q',
	function($q){

		var les_services_warning_messages = {};

		les_services_warning_messages.affiche = "";

		les_services_warning_messages.afficherMessage = function(message){
			les_services_warning_messages.affiche = message;
		} 

		return les_services_warning_messages;
	}]);