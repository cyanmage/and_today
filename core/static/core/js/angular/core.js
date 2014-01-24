var module_core = angular.module('core', []);




/*/////////////////////////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                 */
/*                                                                                 */
/*                    Controleur associé à l'application globale core              */
/*                                                                                 */
/*                                                                                 */
///////////////////////////////////////////////////////////////////////////////////*/
/////////////////////////////////////////////////////////////////////////////////////

module_defileur.controller("controleurPanneau", ['$scope', '$q', 'serviceIds',
	function($scope, $q, serviceIds){

	$scope.controleur = "controleur panneau ";
	$scope.id = "";

	$scope.$on('PANNEAU.DEMANDE_ID', function(event, data){
		$scope.id = serviceIds.getId(data.offset);
		//console.log("emplacement : " + data.emplacement  + ",  offset : " + data.offset + ", date associee : " + serviceIds.getId(data.offset));
		$scope.$broadcast('APPLICATIONS.ENVOI_ID', {'id' : $scope.id});
	});

}]);



/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/

//													  DIRECTIVES													 //

/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/

module_core.directive('dateDuJour', ['$timeout', function($timeout){

	return {
		scope : {
			date : "="
		},
		template : "<span ng-transclude date= 'id'></span>",
		//replace : true,
		restrict : 'AE',
		transclude : true,
		link : function(scope, element, attributes){
			//console.log("dans la directive date du jour ");
			scope.$watch('date', function(newValue, oldValue){
					//console.log("a change !! ", oldValue, "--->", newValue);
				if (newValue !== oldValue){
					element.html(newValue);					
				}
			});
		}
	}

}]);





