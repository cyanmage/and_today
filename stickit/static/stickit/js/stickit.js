var module_stickit = angular.module('stickit', []);
var contexte = ".centerPanel" || window;


module_stickit.directive('createSticker', [function(){

	return {			
		restrict : 'A',
		link : function(scope, element, attributes){
				element.draggable({
					cursor : 'move', 
					//revert : "valid", 
					containment : element.parents(".container-appli-stickers"),
					helper : function(){
						copie = $("div#motif-sticker").clone(false).removeAttr("id").addClass("creationSticker");
						copie.css({'background-color' : '#00FF00'});
						return copie;
					}
				});	
	


		}
	}


}]);/**/



module_stickit.directive('containerStickers', ['$compile', 'servicesStickit', function($compile, lesServicesStickit){

	return {
		restrict : 'A', 
		link : function(scope, element, attributes){

			element.droppable({
				drop : function(event, ui){

					if (ui.helper.hasClass("creationSticker")){
						var sticker = ui.helper.clone(false).attr("sticker", '').removeClass("creationSticker");
						sticker.addClass("stickerCree");
						$compile(sticker)(scope);
  						element.append(sticker);	
	
										
						//var documentFragment = $(document.createDocumentFragment());

						//var chaine = '<div id="motif-sticker" class="sticker"></div>';
        				//documentFragment.append(chaine);	


						//$compile(documentFragment)(scope);	  						
					}	
				}		
			});

			var grSickers = $("<groupe-stickers />");
			$compile(grSickers)(scope);
			element.prepend(grSickers);
		
		}
	}


}]);



module_stickit.directive('sticker', ['servicesStickit', function(lesServicesStickit){

	return {
		restrict : 'A', 
		//tranclude : true,
		link : function(scope, element, attributes){
				var idSticker = lesServicesStickit.obtientNumeroValide();
				element.attr('id', 'stickerInstance_' + idSticker);

				element
				.draggable({
					cursor : 'move', 
					containment : $(".container-stickers", contexte),//$(".centerPanel").find(".container-stickers"),
					zIndex: 100, 
					stop : function(ui, event){
						var offset = $(this).offset();	
             			//$(this).text('x: ' + offset.left + "\n" + 'y: ' + offset.top);						
						lesServicesStickit.memoriseSticker({top : offset.top, left : offset.left}, idSticker); 
					},
					drag : function(ui, event){
						//var offset = $(this).offset();	
             			//$(this).text('x: ' + offset.left + "\n" + 'y: ' + offset.top);
					}	


				})/**/
				.resizable({
					containment : $(".container-stickers", contexte),					
				})
				;	
				element.html(idSticker);
				
			element.on("mouseover", function(ui, event){
				if (scope.mode == 'creation')
					element.css('cursor', 'move');	
				else
					element.focus();
			});						
  				//element.css({top : 0, left : 0});				
		}
	}

}]);


module_stickit.directive('groupeStickers', ['servicesStickit', function(lesServicesStickit){

	return{
		restrict : 'E',
		template : "<div style='visibility : hidden' id='**" + lesServicesStickit.renvoitIdentifiantGroupeEnCours() +  "**' ></div>",
		//replace : true,
		link : function(scope, element, attributes){
			//console.log(lesServicesStickit.renvoitIdentifiantGroupeEnCours());
		}
	}


}]);



/*/////////////////////////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                 */
/*                                                                                 */
/*                    Controleur associé au conteneur de stickit                   */
/*                                                                                 */
/*                                                                                 */
///////////////////////////////////////////////////////////////////////////////////*/
/////////////////////////////////////////////////////////////////////////////////////

module_stickit.controller("controleurStickit", ['$q', '$scope', function($q, $scope){

	$scope.mode = "creation";

	$scope.libelleBtnAttachDetach = "Attacher/Détacher";

	$scope.changeMode = function() {
		if ($scope.mode == "creation"){
			$(".stickerCree") && $(".stickerCree").draggable('disable');
			$scope.mode = "modification";
			/*if ($(".stickerCree"))
				$(".stickerCree").draggable('disable');*/
		}
		else if ($scope.mode == "modification"){
			$(".stickerCree") && $(".stickerCree").draggable('enable');			
			$scope.mode = "creation";
			/*if ($(".stickerCree"))			
				$(".stickerCree").draggable('enable');*/
		}
		/*$scope.modeCreation = ! $scope.modeCreation;
		$(".")*/
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


module_stickit.factory('servicesStickit', ['$q', function($q){

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
			//console.log("ITEM VARIABLE : " + item +  " ----------" + "DATE A RECHERCHER : " + identifiantGroupe);
			/**/if (item == identifiantGroupe){
				elementPresent = true;
				break;
			}
		}
		
		identifiantGroupe_enCours = identifiantGroupe;

		//console.log("élément présent : " + elementPresent);
		if (!elementPresent){
			clusterOfGroupStickers[identifiantGroupe] = {};
			//console.log("création d'un groupe de stickers " + Object.keys(clusterOfGroupStickers).length);
			//console.log(clusterOfGroupStickers);

		}
		/*else{
			//clusterOfGroupStickers[identifiantGroupe] = {};
			//console.log("modification éventuelle d'un groupe de stickers " + Object.keys(clusterOfGroupStickers).length);
			//console.log(clusterOfGroupStickers);			
		}*/

		//!clusterOfGroupStickers.identifiantGroupe && (clusterOfGroupStickers.identifiantGroupe = {});
	}


	les_services_stickit.renvoitGroupeStickers = function(identifiantGroupe){
		return clusterOfGroupStickers;
	}


	/*On sauvegarde l'état du sticker en local, en lui passant une liste de propriétés sous forme de dictionnaire*/
	les_services_stickit.memoriseSticker = function(valeursAMemoriser, referenceSticker){
		//console.log(valeursAMemoriser);
		//clusterOfGroupStickers[identifiantGroupe_enCours][referenceSticker] = valeursAMemoriser;
	}

	les_services_stickit.renvoitIdentifiantGroupeEnCours = function(){
		return identifiantGroupe_enCours;
	}

	return les_services_stickit;
}]);

