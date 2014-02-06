var module_busEvent = angular.module('busEvent', []);



module_busEvent.factory('servicesBusEvent', ['$q', '$rootScope',
	function($q, $rootScope){

	var les_services_bus_event = {};

	les_services_bus_event.envoitMessage = function(ID_message, message){
		$rootScope.$emit(ID_message, message);
		console.log("envoyé , ", ID_message, ", ", message);
	};

	les_services_bus_event.attendMessage = function(ID_message){
	
	//les_services_bus_event.recoitMessage = function(ID_message, message){
		$rootScope.$on(ID_message, function(message){
			//les_services_bus_event.ID_message = message;
			return message;
			console.log("reçu");
		});


	}////

	return les_services_bus_event;
}]);