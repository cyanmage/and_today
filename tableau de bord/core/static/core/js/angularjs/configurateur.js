var app = angular.module('my_app', ['ngResource','restangular']);

app.config(['$httpProvider', '$interpolateProvider', function($httpProvider, $interpolateProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'; 
  	$interpolateProvider.startSymbol('{*');
  	$interpolateProvider.endSymbol('*}');    
       }
]);
