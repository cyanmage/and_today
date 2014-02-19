appli.controller('controleurOnglets', ['$scope', 
	function($scope){

	$scope.ongletSelectionne = 1;
	$scope.ongletSurvole = -1;	

	$scope.selectLayer = function(numeroOnglet){
		console.log("selectionne : ", numeroOnglet);
		$scope.ongletSelectionne = numeroOnglet;
	}

	$scope.testLayer = function(numeroOnglet){
		//console.log("a tester : ", numeroOnglet);		
		return numeroOnglet !== $scope.ongletSelectionne; 
	}


	$scope.survolOnglet = function(numeroOnglet){
		//console.log("survole : ", numeroOnglet);
		$scope.ongletSurvole = numeroOnglet;
	}

	$scope.finSurvolOnglet = function(numeroOnglet){
		$scope.ongletSurvole = -1;
	}

	//$scope.selectLayer(1);

	/*$scope.$watch("ongletSurvole", function(newValue, oldValue){
		console.log(newValue);
	});*/

}]);





appli.directive('controleJ', ['$q', '$timeout', function($q, $timeout){

	return {
		restrict : 'AE',
		link: function(scope, element, attributs){


			$("#layer1").show();
			$("#layer2").hide();			
			$("#layer3").hide();
			$("#layer4").hide();

			element.find(".layer")
			.on("click", 		function(event)	{event.stopPropagation();	})
			.on("mouseover", 	function(event)	{event.stopPropagation();	})					
			//$timeout(function() {			}, 1);


			scope.$watch("ongletSurvole", function(newValue, oldValue){
				console.log("survol : ", newValue, ", selectionnee : ", scope.ongletSelectionne);
				
				if (newValue !== oldValue){
					if (newValue === - 1){
						if(oldValue !== scope.ongletSelectionne){
							console.log("SORTIE, ", newValue, ", ", oldValue, ", ", scope.ongletSelectionne);
							$("#layer" + oldValue).fadeTo(750, 0).css("z-index", 10).hide();
							$("#layer" + scope.ongletSelectionne).css("z-index", 0).fadeTo(750, 1);								
							/*$(".layer-j:not(#layer" + newValue + ")").addClass("nonSurvole");
							$(".layer-j#layer" + newValue).removeClass("survole");								*/
						}
					}
					else if(newValue !== scope.ongletSelectionne){
						console.log("ENTREE, valeur survolee : ", newValue, ", valeur selectionnee : ", scope.ongletSelectionne);
						$("#layer" + newValue).css("z-index", 10).show().fadeTo(750, 0.8);
						$("#layer" + scope.ongletSelectionne).css("z-index", 0).fadeTo(750, 0.2);						
						/*$(".layer-j:not(#layer" + oldValue + ")").removeClass("nonSurvole");
						$(".layer-j#layer" + oldValue).addClass("survole");	*/
				
					}					
				}

				//console.log(newValue);
			});

			element
			.on("click", function(event){
				$(".layer-j:not(#layer" + scope.ongletSelectionne + ")").hide();
				$(".layer-j#layer" + scope.ongletSelectionne).show();				
			})
		}
	}

}]);/**/












