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

module_stickit.controller("controleurStickit", ['$q', '$scope', 'serviceIds', 'servicesStickit', 'servicesCacheStickit',/**/ 
	function($q, $scope, serviceIds, servicesStickit, servicesCacheStickit /**/){

	$scope.mode = "creation";
	$scope.libelleBtnAttachDetach = "Attacher/Détacher";

	$scope.sauverlesStickers = function(){

		console.log("NOUS ALLONS LES SAUVER ! ");
		servicesStickit.sauverGroupeStickers($scope.id);
	}

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
						//copie.css({'background-color' : '#00FF00'});
						return copie;
					}
					, stop : function(event, ui){
						//console.log("DRAGGABLE : 1) position ", ui.position, ", 2) offset : ", ui.offset);
						//console.log(ui.helper.attr("style"));
					}/**//*, ", type : ", ui.helper*/
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
			//scope._scope = "groupe_stickers";

			element.droppable({
				containment : $("[emplacement='centre']").find(".container-stickers"),
				tolerance : 'fit',
				drop : function(event, ui){

					if (ui.helper.hasClass("creationSticker")){
					
						var 	offsetHelper = ui.helper.offset(), 	
								offsetContainer = element.offset();
						var 	x = offsetHelper.left - offsetContainer.left, 
								y = offsetHelper.top - offsetContainer.top;						

						/*var 	coordonnees = {
												left  	: offsetHelper.left,// - offsetContainer.left , 
												top		: offsetHelper.top// - offsetContainer.top
											};  
						console.log(coordonnees);*/	
						
						var sticker = ui.helper.clone()
									.attr("sticker", '')
									.removeClass("creationSticker")
									.css("z-index", "");
						sticker.addClass("stickerCree collideEnable");
						$compile(sticker)(scope);
  						//element.find("groupe-stickers").append(sticker);
  						//element.find("groupe-stickers").append(sticker.offset(ui.helper.offset()));
  						console.log(sticker.offset());
  						element.find("groupe-stickers").append(sticker); 						
  						sticker.offset(ui.helper.offset());
  						console.log(sticker.offset());
  						//sticker.appendTo(element.find("groupe-stickers")).offset(ui.helper.offset());
					}
				},		

				accept : function(element){
						return (typeof $(".creationSticker").collision(".collideEnable").html() === "undefined");
				},

			});



			scope.$watch('id', function(newValue, oldValue, scope){

				if (newValue in servicesCacheStickit.lectureCache()){
					elementARattacher = servicesCacheStickit.recupereDonnees(newValue);
				}
				else{
					elementARattacher = $compile("<groupe-stickers style='visibility  : hidden' id='gr-stick-" + newValue + "'>" + newValue + "</groupe-stickers>")(scope);
				}

				
				if (oldValue !==  newValue){
					elementDetache = element.find("#gr-stick-" + oldValue).detach();
					servicesCacheStickit.stockeDonnees(oldValue, elementDetache);
					element.append(elementARattacher);	
				}

			});


		
			/*scope.$watch('id', function(newValue, oldValue, scope){

				if (newValue in servicesCacheStickit.lectureCache()){
					elementARattacher = servicesCacheStickit.recupereDonnees(newValue);
				}
				else{
					elementARattacher = $compile("<groupe-stickers style='visibility  : hidden' id='gr-stick-" + newValue + "'>" + newValue + "</groupe-stickers>")(scope);
				}
				element.append(elementARattacher);	
				
				if (oldValue !==  newValue){
					elementDetache = element.find("#gr-stick-" + oldValue).detach();
					servicesCacheStickit.stockeDonnees(oldValue, elementDetache);					
				}

			});*/



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
		scope : {

		},

		link : function(scope, element, attributes){
				var idSticker = lesServicesStickit.obtientNumeroValide();

				if (!element.attr('id_serveur'))	
					element.attr('id_client', 'stickerInstance_' + idSticker);

				element				
				.find(".titreSticker").html(idSticker).end()
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
				})
				.resizable({
					handles: "e, s",
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


				/*var	contenant = $(this).find(".contenantSticker");

				element
				.on("mouseenter", function(event, ui){
					contenant.append($("#controle_sticker"));
				})
				.on("mouseleave", function(){
					$("#controle_sticker").detach();
				});*/

				element.find(".contenuSticker")
				.on("mousedown", function (e) {
				    e.stopPropagation();
				    return;
				})
				.on("mouseenter", function(ui, event){
					$(this).focus();
				})
				.on("mouseleave", function(ui, event){
					$(this).blur();
				});

				lesServicesStickit.associeActionsAuxBoutons(element, scope);

		}
	}

}]);


module_stickit.directive('controle-sticker', ['servicesStickit', '$compile',
	function(servicesStickit, $compile){
		//console.log("test");
		return {
			restrict : "AE",
			link : function(scope, element, attributes){
				//console.log("Je créé une directive controle sticker");
				element.find()
				on("click", function(event, ui){
					//console.log("wizaaaa");
				})
			}

		}


}]);


module_stickit.directive('colonneControle', [ 'servicesStickit', '$compile',
	function(servicesStickit, $compile){
	console.log("colonne !!! ")		
	return {
		restrict : 'AE', 
		link : function(scope, element, attributes){
			//console.log(element.find("deployeur"));
			//console.log(element.find("deployable"));	
			var deployeur = 	element.find(".deployeur");
			var deployable = 	element.find(".deployable .imageControleSticker");	
			deployable.hide();

			deployeur
			.on("click", function(){
				//console.log(deployable);
				deployable.slideToggle(400);
			})

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


module_stickit.factory('servicesStickit', ['$q', 'servicesCacheStickit', '$http', 
	function($q, servicesCacheStickit, $http){

	var les_services_stickit = {};
	var counterStickers = 0;
	var identifiantGroupe_enCours = "";





	les_services_stickit.sauverGroupeStickers  = function(id){

		var url = "/stickit/groupe-stickers/" + id + "/";
		var stickersASauver  = $("#gr-stick-" + id).children();

		var elementsJSON = $.map(stickersASauver, function(elementDOMSticker, cle){
			contenuSticker = $(elementDOMSticker).find(".contenuSticker")
			return  donnees = {
				'style' 	: contenuSticker.attr("style"),
				contenu 	: contenuSticker.html(),
				id_client 	: $(elementDOMSticker).attr("id_client"),
				id_serveur 	: $(elementDOMSticker).attr("id_serveur")
			}
		});
//id_client="stickerInstance__2"

		var donneesEnvoyees = {'id_groupe' : id, 'donnees' : elementsJSON};
		console.log(donneesEnvoyees);	

		$http.post(url, donneesEnvoyees)
		.success(function(data, status){
			var associations = data.associations
			for (id_client in associations){
				//console.log($("[id_client='" + id_client + "']"));
				$("[id_client='" + id_client + "']")
				.attr("id_client", "")
				.attr("id_serveur", associations[id_client]); 
				console.log("id_client : ", id_client, "   ;   id_serveur : ", associations[id_client]);				
			}
			console.log(data.msg);
			//console.log(stickersASauver);
		})
		.error(function(error, status){
			$("html").html(error);
			//console.log(error);
		});

	}




	les_services_stickit.obtientNumeroValide = function(){
		return identifiantGroupe_enCours + "_" + ++counterStickers;
	}



	/*var sticker = function(){
		var datetime;
		var numeroSticker;	
		var texte, top, width, left, height, bgColor, fontFamily, fontWeight, fontStyle, textDecoration;  
	}*/
	/*les_services_stickit.recupereNumeroSticker = function(){
		return counterStickers;
	}*/



	/*Dans cette appli, l'identifiant est le jour, et il y a un groupe de stickers pour une journée
	var groupStickers = {};*/

	/*Dans cette appli, il y a plusieurs journées, qu'on stocke dans le tableau clusterOfGroupStickers
	var clusterOfGroupStickers = new Array();*/


	/*Dans cette appli, la fonction addSticker ajoute un sticker à une journée, 
	l'identifiant groupe est la journée concernée
	les_services_stickit.addSticker = function(identifiantGroupe, numeroSticker){

	}*/

	/*Dans cette appli, la fonction addOrGetGroupStickers ajoute un groupe de stickers, 
	s'il n'existe pas, puis le retourne. 
	L'identifiant groupe est la journée concernée
	les_services_stickit.chargeLesStickers = function(identifiantGroupe){

		var elementPresent = false;	
		for (var item in clusterOfGroupStickers){
			if (item == identifiantGroupe){
				elementPresent = true;
				break;
			}
		}
		
		identifiantGroupe_enCours = identifiantGroupe;

		if (!elementPresent){
			clusterOfGroupStickers[identifiantGroupe] = {};

		}
	}*/

	/*On sauvegarde l'état du sticker en local, en lui passant une liste de propriétés sous forme de dictionnaire*/
	/*les_services_stickit.memoriseSticker = function(valeursAMemoriser, referenceSticker){
	}*/
	/*
	les_services_stickit.renvoitIdentifiantGroupeEnCours = function(){
		return identifiantGroupe_enCours;
	}*/

	les_services_stickit.associeActionsAuxBoutons = function(element, scope){

		scope.bold = false;
		scope.italic = false;
		scope.fontsize = 12;
		scope.stroke = false;
		scope.underline = false;
		scope.colortext = "#000000";
		scope.backgroundcolor = "#ffffff";
		scope.fontfamily = "Times New Roman";

		var texte_contenu = element.find(".contenuSticker");
		var bouton_bold = element.find(".b_bold");
		var bouton_italic = element.find(".b_italic");

		bouton_bold 
		.on("click", function(event, ui){
			scope.bold = !scope.bold;
			var style = scope.bold ? "bold" : "normal";
			texte_contenu.css({'font-weight' : style});
			//texte_contenu.html({'font-weight' : style});
		});

		bouton_italic
		.on("click", function(event, ui){
			scope.italic = !scope.italic;
			var style = scope.italic ? "italic" : "normal";			
			texte_contenu.css({'font-style' : style});
			//texte_contenu.html({'font-style' : style});		
		});

	}



	return les_services_stickit;
}]);







module_stickit.factory('servicesCacheStickit', [ '$q', function(){

	var les_services_cache = {};
	var cache = {};

	function ObjetStocke(){
		this.donnees = "";
		this.modifsNonSauvees = false;
	}


	les_services_cache.miseAJour = "";


	les_services_cache.recupereDonnees = function(idRecuperation) {
		//console.log("DESTOCKAGE : ", idRecuperation);		
		//console.log(cache);
		return cache[idRecuperation].donnees;
		//return cache[idRecuperation];
	}

	les_services_cache.stockeDonnees = function(idRecuperation, donnees){
		console.log("STOCKAGE : ", idRecuperation);
		var obj = new ObjetStocke();
		obj.donnees = donnees;		
		cache[idRecuperation] = obj;
		//console.log(cache);	
		//cache[idRecuperation] = donnees;*/		
		//console.log("SAUVEGARDE id " + idRecuperation);
	}

	les_services_cache.lectureCache = function(){
		return cache;
	}

	les_services_cache.contientCle = function(cle){
		return (cle in cache);
	}



	return les_services_cache;
}]);