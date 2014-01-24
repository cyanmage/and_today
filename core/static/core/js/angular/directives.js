var module_core = angular.module('core', []);

module_core.directive('dateDuJour', ['$timeout', function($timeout){

	return {
		scope : {
			date : "="
		},
		template : "<span ng-transclude></span>",
		//replace : true,
		restrict : 'AE',
		transclude : true,
		link : function(scope, element, attributes){
			//console.log("dans la directive date du jour ");
			scope.$watch('date', function(newValue, oldValue){
					//console.log("a change !! ", oldValue, "--->", newValue);
				if (newValue !== oldValue){
					element.html(newValue);					
				}
			});
		}
	}

}]);


