var mon_appli = angular.module('mon_appli', ['defileur', 'stickit']);

mon_appli.config(['$interpolateProvider', function($interpolateProvider) {
 		$interpolateProvider.startSymbol('{*');
 		$interpolateProvider.endSymbol('*}');    
     }
	]);	