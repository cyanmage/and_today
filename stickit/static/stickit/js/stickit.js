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

	//$scope.servicesIds =  servicesIds;
	$scope.mode = "creation";
	$scope.libelleBtnAttachDetach = "Attacher/Détacher";

	$scope.$on("APPLICATIONS.ENVOI_ID", function(event, data){
		//console.log("en tant qu'appli stickit, je dois me mettre a jour avec l'id recu : " + data.id + ", n° scope : " + $scope.$id);
		//servicesIds.id = 
		$scope.id = data.id;
		var signal;
		if (servicesCacheStickit.contientCle(data.id)){
			signal = "STICKIT.REMPLACE_GROUPE_STICKERS";
		}
		else {
			signal =  "STICKIT.CREE_GROUPE_STICKERS";
		}/**/

		//(servicesCacheStickit.contientCle(data.id)) ? signal = "STICKIT.REMPLACE_GROUPE_STICKERS" : "STICKIT.CREE_GROUPE_STICKERS";
		console.log("type de signal : " + signal  + ", id : " + data.id);
		$scope.$broadcast(signal, {'id' : data.id });

		//servicesCacheStickit.miseAJour = "OK";
		//console.log(servicesCacheStickit.miseAJour);
		//$scope.essai.id = data.id;
	});	


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

	var rattache = true;
	var cache = {};
	/*$scope.attacheDetacheStickers = function(){
		//console.log('je clique,  ' +  rattache);
		//console.log( $("[emplacement='centre']").find(".container-stickers"));
		if (rattache){
			servicesCacheStickit.stockeDonnees($scope.id, $("[emplacement='centre']").find("groupe-stickers").detach());
		}
		else{
			//console.log(servicesCacheStickit.lectureCache());
			var donnees = servicesCacheStickit.recupereDonnees($scope.id);			
			$("[emplacement='centre']").find(".container-stickers").append(donnees);
		}
		console.log(servicesCacheStickit.lectureCache());		
		rattache = !rattache; 
	}*/


				/*if (newValue in cache){
					cache[oldValue] = element.detach("groupe-stickers");
				}
				else{
					var grStickers = angular.element("<groupe-stickers ></groupe-stickers>");
					element.prepend(grStickers);			
					$compile(grStickers)(scope);		
					cache[newValue] = grStickers;			
				}*/

}]);















module_stickit.directive('createSticker', [function(){

	return {			
		restrict : 'A',
		link : function(scope, element, attributes){
				element.draggable({
					cursor : 'move', 
					//revert : "valid", 
					//containment : element.parents(".appli-stickers").find(".container-stickers"),	
					helper : function(){
						copie = $("div#motif-sticker").clone(false).removeAttr("id").addClass("creationSticker");
						copie.css({'background-color' : '#00FF00'});
						return copie;
					}
				});	
	


		}
	}


}]);/**/



module_stickit.directive('containerStickers', ['$compile', 'servicesCacheStickit',
	function($compile, servicesCacheStickit){

	//var cache = {};

	return {
		restrict : 'AE', 
		scope : {
			id : "="
		},
		replace : true,
		template : "<div id='id'>{* id *}</div>",
		link : function(scope, element, attributes){
			/*************************/
			/*    Initialisations    */
			/*************************/
			element.droppable({
				//containment : element.parents(".appli-stickers").find(".container-stickers"),	
				containment : $("[emplacement='centre']").find(".container-stickers"),
				drop : function(event, ui){

					if (ui.helper.hasClass("creationSticker")){
						var sticker = ui.helper.clone(false).attr("sticker", '').removeClass("creationSticker");
						sticker.addClass("stickerCree");
						$compile(sticker)(scope);
  						element.find("groupe-stickers").append(sticker);	

						//var documentFragment = $(document.createDocumentFragment());
						//var chaine = '<div id="motif-sticker" class="sticker"></div>';
        				//documentFragment.append(chaine);	
						//$compile(documentFragment)(scope);	  						
					}	
				}		
			});

			scope.servicesCacheStickit = servicesCacheStickit;

			/*scope.$watch('servicesCacheStickit.miseAJour', function(newValue, oldValue, scope){
				console.log("DEMANDE DE MISE A JOUR DETECTEE " + newValue + ", " +  oldValue);
			}, true); */



			scope.$on("STICKIT.REMPLACE_GROUPE_STICKERS", function(event, data){
				//element.append(servicesCacheStickit.recupereDonnees(data.id));
				console.log("recuperation de l'ID n°" + data.id + " depuis le cache et rattachement au CONTAINER");				
			});

			scope.$on("STICKIT.CREE_GROUPE_STICKERS", function(event, data){
				console.log("creation d'un groupe_stickers et stockage de l'ID n°" + data.id + " dans le cache depuis le CONTAINER");				
				/*var grStickers = angular.element("<groupe-stickers ></groupe-stickers>");
				element.prepend(grStickers);			
				$compile(grStickers)(scope);*/		
				servicesCacheStickit.stockeDonnees(data.id,  data.id);
			});

			/*scope.$watch('ida', function(newValue, oldValue, scope){
				//console.log("CONTAINER: newValue : " + newValue + ", oldValue : " + oldValue);

				if (!servicesCacheStickit.contientCle(newValue)){
					var grStickers = angular.element("<groupe-stickers ></groupe-stickers>");
					element.prepend(grStickers);			
					$compile(grStickers)(scope);		
					servicesCacheStickit.stockeDonnees(newValue,  grStickers);

					//console.log("DEPUIS LE CONTAINER, ID AJOUTE : " + newValue + "(ancien id : " + oldValue + ")");
					//console.log(servicesCacheStickit.lectureCache());					
					//cache[newValue] = grStickers;			
				}
				else{
					//if (newValue !== oldValue){
						servicesCacheStickit.stockeDonnees(oldValue,  $("groupe-stickers").detach());						
						element.append(servicesCacheStickit.recupereDonnees(newValue));

						console.log("DEPUIS LE CONTAINER, ID MISE A JOUR : " + newValue + "(ancien id : " + oldValue + ")");					
						//console.log(servicesCacheStickit.lectureCache());	
					//}				
				}
			});*/


			/*element.html(grSickers);			
			$compile(element.contents())(scope);*/

			/*servicesCacheStickit.stockeDonnees($scope.id, $("[emplacement='centre']").find("groupe-stickers").detach());
			$("[emplacement='centre']").find(".container-stickers").append(donnees);*/
		}
	}


}]);







module_stickit.directive('groupeStickers', ['servicesCacheStickit', 
	function(servicesCacheStickit){

	return{
		restrict : 'E',
		//template : "<div ></div>",
		//replace : true,
		link : function(scope, element, attributes){

			/*************************/
			/*      Evènements       */
			/*************************/

			scope.$on("STICKIT.REMPLACE_GROUPE_STICKERS", function(event, data){
				console.log("sauvegarde de l'ID n°" + data.id + " dans le cache et detachement AUTONOME du groupe-stickers !");					
				//servicesCacheStickit.stockeDonnees(data.id,  element.detach());	
			});

			/*scope.$watch('id', function(newValue, oldValue, scope){
					console.log("GROUPE : newValue : " + newValue + ", oldValue : " + oldValue + ", scope " + scope.$id);
				if (newValue !== oldValue){

					if (servicesCacheStickit.contientCle(newValue)){
						servicesCacheStickit.stockeDonnees(oldValue,  element.detach());						
						//cache[oldValue] = element.detach();
						console.log("ON DETACHE le numero " + oldValue +  " DEPUIS LE GROUPE");
						console.log(servicesCacheStickit.lectureCache());
					}
					else 
						console.log("ON NE FAIT RIEN DANS LE GROUPE");	
				}

			});*/

		}
	}


}]);


module_stickit.directive('sticker', ['servicesStickit', function(lesServicesStickit){

	return {
		restrict : 'A', 
		//transclude : true,
		link : function(scope, element, attributes){
				var idSticker = lesServicesStickit.obtientNumeroValide();
				element.attr('id', 'stickerInstance_' + idSticker);

				element
				.draggable({
					cursor : 'move', 
					//containment : element.parents(".appli-stickers").find(".container-stickers"),//$(".centerPanel").find(".container-stickers"),
					//containment : $("#panel1").find(".container-stickers"),	
					containment : $("[emplacement='centre']").find(".container-stickers"),	
					zIndex: 100, 
					stop : function(ui, event){
						var offset = $(this).offset();	
             			//$(this).text('x: ' + offset.left + "\n" + 'y: ' + offset.top);						
						lesServicesStickit.memoriseSticker({top : offset.top, left : offset.left}, idSticker); 
						//console.log( element.parents("#panel1").find(".container-stickers"));
					},
					drag : function(ui, event){
						//var offset = $(this).offset();	
             			//$(this).text('x: ' + offset.left + "\n" + 'y: ' + offset.top);
					}	


				})/**/
				.resizable({
					//containment : $(".container-stickers", contexte),//element.parents(".appli-stickers").find(".container-stickers")					
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


module_stickit.factory('servicesCacheStickit', [ '$q', function(){

	var les_services_cache = {};
	var cache = {};


	les_services_cache.miseAJour = "";


	les_services_cache.recupereDonnees = function(idRecuperation) {
		return cache[idRecuperation];
	}

	les_services_cache.stockeDonnees = function(idRecuperation, donnees){
		cache[idRecuperation] = donnees;
	}

	les_services_cache.lectureCache = function(){
		return cache;
	}

	les_services_cache.contientCle = function(cle){
		return (cle in cache);
	}

	return les_services_cache;
}]);