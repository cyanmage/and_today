var module_stickit = angular.module('stickit', []);


/*/////////////////////////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                 */
/*                                                                                 */
/*                    Controleur associé au conteneur de stickit                   */
/*                                                                                 */
/*                                                                                 */
///////////////////////////////////////////////////////////////////////////////////*/
/////////////////////////////////////////////////////////////////////////////////////

module_stickit.controller("controleurStickit", ['$q', '$scope', 'serviceIds', 'servicesCacheStickit',/**/ 
	function($q, $scope, serviceIds, servicesCacheStickit /**/){

	$scope.mode = "creation";
	$scope.libelleBtnAttachDetach = "Attacher/Détacher";

	//$scope.id = data.id;

	$scope.$on("APPLICATIONS.ENVOI_ID", function(event, data){
		$scope.id = data.id;
		console.log($scope.id);
	});

	$scope.changeMode = function() {
		if ($scope.mode == "creation"){
			$(".stickerCree") && $(".stickerCree").draggable('disable');
			$scope.mode = "modification";
		}
		else if ($scope.mode == "modification"){
			$(".stickerCree") && $(".stickerCree").draggable('enable');			
			$scope.mode = "creation";
		}

	}


}]);















module_stickit.directive('createSticker', [function(){

	return {			
		restrict : 'A',
		link : function(scope, element, attributes){
				element.draggable({
					cursor : 'move',
					helper : function(){
						copie = $("div#motif-sticker").clone()
								.removeAttr("id")
								.addClass("creationSticker")
								.css("z-index", 1000);
						copie.css({'background-color' : '#00FF00'});
						return copie;
					}
				});	
	


		}
	}


}]);/**/



module_stickit.directive('containerStickers', ['$compile', 'servicesCacheStickit',
	function($compile, servicesCacheStickit){

	return {
		restrict : 'AE', 
		scope : {
			id : "="
		},
		replace : true,
		transclude : true,
		template : "<div id='id' ng-transclude><u>{* id *}</u></div>",
		link : function(scope, element, attributes){

			/*************************/
			/*    Initialisations    */
			/*************************/


			element.droppable({
				containment : $("[emplacement='centre']").find(".container-stickers"),
				tolerance : 'fit',
				drop : function(event, ui){

					if (ui.helper.hasClass("creationSticker")){

						var sticker = ui.helper.clone()
									.attr("sticker", '')
									.removeClass("creationSticker")
									.css("z-index", "");
						sticker.addClass("stickerCree collideEnable");
						$compile(sticker)(scope);
  						element.find("groupe-stickers").append(sticker);	

					}//,
				},		

				accept : function(element){
						return (typeof $(".creationSticker").collision(".collideEnable").html() === "undefined");
				}

			});



		
			scope.$watch('id', function(newValue, oldValue, scope){

				if (newValue in servicesCacheStickit.lectureCache()){
					elementARattacher = servicesCacheStickit.recupereDonnees(newValue);
				}
				else{
					elementARattacher = $compile("<groupe-stickers style='{position : relative}' id='gr-stick-" + newValue + "'>" + newValue + "</groupe-stickers>")(scope);
				}
				element.append(elementARattacher);	
				
				if (oldValue !==  newValue){
					elementDetache = element.find("#gr-stick-" + oldValue).detach();
					servicesCacheStickit.stockeDonnees(oldValue, elementDetache);					
				}

			});



		}
	}


}]);







module_stickit.directive('groupeStickers', ['servicesCacheStickit', 
	function(servicesCacheStickit){

	return{
		restrict : 'E',

		link : function(scope, element, attributes){

			/*************************/
			/*      Evènements       */
			/*************************/



		}
	}


}]);


module_stickit.directive('sticker', ['servicesStickit', '$compile', 
	function(lesServicesStickit, $compile){

	return {
		restrict : 'A', 
		link : function(scope, element, attributes){
				var idSticker = lesServicesStickit.obtientNumeroValide();
				element.attr('id', 'stickerInstance_' + idSticker);
				element
				.append("<span> _" + idSticker + "</span>")
				.resizable({
					//handles: "n, e, s, w",
					stop 	: function(event, ui){	$(this).addClass	("collideEnable"); },
					start 	: function(event, ui){	$(this).removeClass	("collideEnable"); },						
					collision : true,
					obstacle : ".obstacles, .collideEnable",					
					containment : $("[emplacement='centre']").find(".container-stickers"),
					minHeight : 80,
					minWidth : 200,
					maxHeight : 160,
					maxWidth: 250,					
				})
				.draggable({
					cursor : 'move', 
					containment : $("[emplacement='centre']").find(".container-stickers"),	
					zIndex: 100, 
					preventCollision : true,
   					obstacle: ".obstacles, .collideEnable",					
					stop 	: function(event, ui){	$(this).addClass	("collideEnable"); },
					start 	: function(event, ui){	$(this).removeClass	("collideEnable"); },					
					drag 	: function(event, ui){
					}	
				});

				
				element.on("mouseover", function(ui, event){
					if (scope.mode == 'creation')
						element.css('cursor', 'move');	
					else
						element.focus();
				});						
	
		}
	}

}]);






/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************LES SERVICES                    ***************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/


module_stickit.factory('servicesStickit', ['$q', 'servicesCacheStickit', function($q, servicesCacheStickit){

	var les_services_stickit = {};
	var counterStickers = 0;
	var identifiantGroupe_enCours = "";



	var sticker = function(){
		var datetime;
		var numeroSticker;	
		var texte, top, width, left, height, bgColor, fontFamily, fontWeight, fontStyle, textDecoration;  
	}

	les_services_stickit.obtientNumeroValide = function(){
		return identifiantGroupe_enCours + "_" + ++counterStickers;
	}

	les_services_stickit.recupereNumeroSticker = function(){
		return counterStickers;
	}



	/*Dans cette appli, l'identifiant est le jour, et il y a plusieurs sticker pour une journée*/
	var groupStickers = {};

	/*Dans cette appli, il y a plusieurs journées, qu'on stocke dans le tableau clusterOfGroupStickers*/
	var clusterOfGroupStickers = new Array();


	/*Dans cette appli, la fonction addSticker ajoute un sticker à une journée, 
	l'identifiant groupe est la journée concernée*/
	les_services_stickit.addSticker = function(identifiantGroupe, numeroSticker){

	}

	/*Dans cette appli, la fonction addOrGetGroupStickers ajoute un groupe de stickers, 
	s'il n'existe pas, puis le retourne. 
	L'identifiant groupe est la journée concernée*/
	les_services_stickit.chargeLesStickers = function(identifiantGroupe){

		var elementPresent = false;	
		for (var item in clusterOfGroupStickers){
			/**/if (item == identifiantGroupe){
				elementPresent = true;
				break;
			}
		}
		
		identifiantGroupe_enCours = identifiantGroupe;

		if (!elementPresent){
			clusterOfGroupStickers[identifiantGroupe] = {};

		}
	}

	/*On sauvegarde l'état du sticker en local, en lui passant une liste de propriétés sous forme de dictionnaire*/
	les_services_stickit.memoriseSticker = function(valeursAMemoriser, referenceSticker){
	}

	les_services_stickit.renvoitIdentifiantGroupeEnCours = function(){
		return identifiantGroupe_enCours;
	}

	return les_services_stickit;
}]);


module_stickit.factory('servicesCacheStickit', [ '$q', function(){

	var les_services_cache = {};
	var cache = {};


	les_services_cache.miseAJour = "";


	les_services_cache.recupereDonnees = function(idRecuperation) {
		return cache[idRecuperation];
	}

	les_services_cache.stockeDonnees = function(idRecuperation, donnees){
		cache[idRecuperation] = donnees;
		console.log("SAUVEGARDE id " + idRecuperation);
	}

	les_services_cache.lectureCache = function(){
		return cache;
	}

	les_services_cache.contientCle = function(cle){
		return (cle in cache);
	}



	return les_services_cache;
}]);