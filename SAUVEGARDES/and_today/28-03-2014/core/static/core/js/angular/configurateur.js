var appli = angular.module('appli', ['core', 'defileur', 'chargeurPage', 'stickit','warningMessages',  'ngAnimate'/**/]);

appli.config(['$httpProvider', '$interpolateProvider', function($httpProvider, $interpolateProvider) {

    	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'; 
 		$interpolateProvider.startSymbol('{*');
 		$interpolateProvider.endSymbol('*}'); 

}]);	

/*window.console = window.console || {};
window.console.log = window.console.log || function() {};*/


appli.config(['$provide', function($provide){

    $provide.decorator('$rootScope', ['$delegate', function($delegate){

        Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
            value: function(name, listener, scope){
                var unsubscribe = $delegate.$on(name, function(event, data){
                	//console.log(scope.actif);
                	if (scope.actif){
                		listener.call(this, event, data);                		
                		//console.log("DEDANS !! ", scope.$id);                 	
                	}
                });
                this.$on('$destroy', unsubscribe);

                //console.log(this);
            },
            enumerable: false
        });

        return $delegate;
    }]);

}]);/**/



appli.run(['serviceIds', function(serviceIds){

	serviceIds.initialise_les_ids();

}]);

document.onkeydown = function (e) {
        if(e.which == 9){
                return false;
        }
}

var saveSelection = function() {
	  if(window.getSelection) { //non IE Browsers
	 		var range = window.getSelection().getRangeAt(0);
	 		if (range)
	 			savedRange = window.getSelection().getRangeAt(0);
	  } 
	  else if(document.selection) { //IE
	    	savedRange = document.selection.createRange();  
	  } 
}


$( document ).ready(function() {
		/*$("#motif-background-cadre")
		.draggable({
			cursor : 'move'
		})*/

	/*$(document.body).on("click", function(e) {
	            saveSelection();
	            return false;
	       });*/

	$(document.body).on("dragover", function(e) {
	            e.preventDefault();
	            return false;
	       });

	$(document.body).on("drop", function(e){
	     e.preventDefault();
	     return false;
	 });

});

$( window ).load(function() {
	//console.log($(".container-stickers"));
	$(".container-stickers").css("display", "block");
});

/*
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
*/