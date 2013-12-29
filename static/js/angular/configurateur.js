var appli = angular.module('appli', ['defileur', 'stickit', 'chargeurPage']);

appli.config(['$interpolateProvider', function($interpolateProvider) {
 		$interpolateProvider.startSymbol('{*');
 		$interpolateProvider.endSymbol('*}');    
     }
	]);	