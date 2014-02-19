var appli = angular.module("appli", []);

appli.config(['$httpProvider', '$interpolateProvider', function($httpProvider, $interpolateProvider) {

    	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'; 
 		$interpolateProvider.startSymbol('{*');
 		$interpolateProvider.endSymbol('*}'); 

}]);	

//$("#myContainer").draggable();