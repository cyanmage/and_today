console.log("me voila");
var module_core = angular.module('core', []);

module_core.directive('dateDuJour', ['$timeout', function($timeout){

	return {
		scope : {
			date : "="
		},
		template : "<div></div>",
		replace : true,
		restrict : 'AE',
		link : function(scope, element, attributes){
			//console.log("dans la directive date du jour ");
			scope.$watch('date', function(newValue, oldValue){
				//console.log("a change !! ", oldValue, "--->", newValue);
				element.html(newValue);
			});
		}
	}

}]);


