var appli = angular.module('appli', ['defileur', 'stickit', 'chargeurPage'/**/]);

appli.config(['$interpolateProvider', function($interpolateProvider) {
 		$interpolateProvider.startSymbol('{*');
 		$interpolateProvider.endSymbol('*}'); 

     }
	]);	

appli.run(['serviceIds', function(serviceIds){

	serviceIds.initialise_les_ids();

}]);