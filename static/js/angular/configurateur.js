var appli = angular.module('appli', ['core', 'defileur', 'stickit', 'chargeurPage'/**/]);

appli.config(['$httpProvider', '$interpolateProvider', function($httpProvider, $interpolateProvider) {
    	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'; 
 		$interpolateProvider.startSymbol('{*');
 		$interpolateProvider.endSymbol('*}'); 

     }
	]);	

appli.run(['serviceIds', function(serviceIds){

	serviceIds.initialise_les_ids();

}]);




