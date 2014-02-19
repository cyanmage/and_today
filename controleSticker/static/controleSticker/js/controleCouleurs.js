/*****************************************************************/
/*                  Tests chromoselector                         */
/*****************************************************************/

$(document).ready(function () {



/*$('#testcouleur').css({
        border: '5px ridge gray',
        cursor: 'pointer',
        height: '30px',
        width: '100px',
        'text-indent': '25px',
        padding: 0
    }) .chromoselector({ // Initialise the picker
        create: updatePreview,
        update: updatePreview,
        preview: false,
        resizable : false,
        roundcorners: false,
        speed : 250, 
        autoshow : false
    });*/


});



/****************  Controle couleurs : controleur    ***********/

appli.controller('controleurCouleurs', ['$scope', function($scope){

	$scope.controleurDeploye = true;
	$scope.couleurSelectionnee = "#5054ef";
	$scope.toggleDeployment = function(){
		$scope.controleurDeploye = ! $scope.controleurDeploye;
	}	
}]);


/******//*    directive du composant chromo-selector  *//*******/
appli.directive("chromoSelectorDeploy", ['$timeout', 
	function($timeout){

	return {
		restrict : 'AE', 
		link : function(scope, element, attributes) {
			console.log("chromo");

			$("#myContainer").hide();

			scope.$watch("controleurDeploye", function(newValue, oldValue){
				//console.log(newValue, oldValue);
				if (newValue !== oldValue)
					//$timeout(function() {
						//$('#testcouleur').chromoselector("toggle");
						$("#myContainer").toggle("slide", {direction : 'up'}, 150);
						//$('blah')		 .toggle('drop',  {direction : 'right'}, 150)
					//});

			})/**/
		}
	}
}]);

appli.directive('chromoSelector', function(){

	return {
		restrict : 'AE', 
		priority : 10,
		link : function(scope, element, attributes){
			console.log("creation");

			var updatePreview = function() {
			     var color = $(this).chromoselector('getColor');
			     scope.couleurSelectionnee = color.getHexString();
			     
			     if(!scope.$$phase) {
  						scope.$apply();
				}			     
				console.log(color.getHexString());
			     $(this).css({
			         'background-color': color.getHexString(),
			         'color': color.getTextColor().getHexString(),
			         'text-shadow': '0 1px 0 ' + color.getTextColor().getTextColor().getHexString()/**/
			     });
			 };


			element.chromoselector({ // Initialise the picker
		        //create: updatePreview,
		        update: updatePreview,
		        preview: false,
		        resizable : false,
		        roundcorners: false,
		        speed : 250, 
		        autoshow : false,
		        target : "#myContainer",
		        width : 100,
		        ringwidth : 14
		    });

			element.chromoselector("setColor", scope.couleurSelectionnee);
			element.chromoselector("show");

			element.hide();/*.css({
			        border: '5px ridge gray',
			        cursor: 'pointer',
			        height: '30px',
			        width: '100px',
			        'text-indent': '25px',
			        padding: 0
			        display : none
			    }) */

			//element.bind("update", function(event){
				//console.log($(this).chromoselector("getColor").getHexString());
			//})
		}
	}

})


