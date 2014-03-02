var appli = angular.module('appli', ['core', 'defileur', 'stickit', 'chargeurPage', 'ngAnimate', 'warningMessages'/**/]);

appli.config(['$httpProvider', '$interpolateProvider', function($httpProvider, $interpolateProvider) {

    	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'; 
 		$interpolateProvider.startSymbol('{*');
 		$interpolateProvider.endSymbol('*}'); 

}]);	




appli.run(['serviceIds', function(serviceIds){

	serviceIds.initialise_les_ids();

}]);

document.onkeydown = function (e) {
        if(e.which == 9){
                return false;
        }
}


$( document ).ready(function() {
		/*$("#motif-background-cadre")
		.draggable({
			cursor : 'move'
		})*/


	$(document.body).on("dragover", function(e) {
	            e.preventDefault();
	            return false;
	       });

	$(document.body).on("drop", function(e){
	     e.preventDefault();
	     return false;
	 });

});

appli.directive("activeElement", ['$interval', function($interval){

	return {
		restrict : 'AE', 
		link : function (scope, element, attributes) {
			//element.text("zorro");
			var i = 0;
			$interval(function() {
				//element.text(i++);
				//console.log(document.activeElement);
				if(element.parents("[emplacement=centre]").length > 0)
					//console.log(element.parents("[emplacement=centre]"));
					console.log(document.activeElement);
			}, 1500);
		}
	}

}]);
