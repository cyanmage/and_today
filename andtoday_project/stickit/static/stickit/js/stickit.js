var module_stickit = angular.module('stickit', []);


/*/////////////////////////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                 */
/*                                                                                 */
/*                                 Controleurs                                     */
/*                                                                                 */
/*                                                                                 */
///////////////////////////////////////////////////////////////////////////////////*/
/////////////////////////////////////////////////////////////////////////////////////


module_stickit.controller("controleurModuleStickit", ['$q', '$scope', 'serviceIds', 'servicesStickit', 'servicesUpdateStickit','servicesCacheStickit', 'servicesInitialisationStickit', 'servicesControlesStickit', 
	function($q, $scope, serviceIds, servicesStickit, servicesUpdateStickit, servicesCacheStickit, servicesInitialisationStickit, servicesControlesStickit /**/){

	/*Options par défaut d'une page : modeDesign(false)*/
	$scope.options = servicesInitialisationStickit.recupereOptionsParDefaut();	
	$scope.servicesStickit = servicesStickit;
	$scope.controles  =  {'stickit' : servicesControlesStickit};
	$scope.libelleBtnAttachDetach = "Attacher/Détacher";

	
	$scope.toggleModeDesign = function(){
		$scope.options.modeDesign = ! $scope.options.modeDesign;
	}

	$scope.togglemodeModifStickers = function(){
		$scope.options.modeModifStickers = ! $scope.options.modeModifStickers;
	}

	$scope.toggleModeModifCadres = function(){
		$scope.options.modeModifCadres = ! $scope.options.modeModifCadres;
	}

	
	/*$scope.toggleModeModifBackground = function(){
		$scope.options.modeModifBackground = ! $scope.options.modeModifBackground;
	}


	$scope.sauvegarder = function(){
		servicesUpdateStickit
		.sauvegarder($scope.id)
		.then(function(data){
				var message = "SAUVEGARDE EFFECTUEE POUR LE " + $scope.id;
				$scope.$emit("WARNING_DISPLAY",  {	'message' : message, 'id_groupe' : $scope.id });
				$scope.$broadcast("STICKIT.STICKERS_SAUVES", data);
			}, function(error){
				var message = "ECHEC DE LA SAUVEGARDE POUR LE " + $scope.id;
				$scope.$emit("WARNING_DISPLAY",  {	'message' : message, 'id_groupe' : $scope.id });				
			});
	}*/


	$scope.$on("APPLICATIONS.ENVOI_ID", function(event, data){
		var ancien_id = $scope.id;
		$scope.id = nouvel_id = data.id;

		if(ancien_id !== nouvel_id){
			servicesCacheStickit.stockeOptions(ancien_id, $scope.options);	

			if (servicesCacheStickit.contient(nouvel_id) ){
				$scope.options = servicesCacheStickit.recupereOptions(nouvel_id);
			}
			else{
				$scope.options = servicesInitialisationStickit.recupereOptionsParDefaut();	
			}
		}
	});



}]);









/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/

//													  DIRECTIVES													 //

/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/
/*#############################             ###############################          ################################*/



module_stickit.directive('createSticker', [function(){

	return {			
		restrict : 'A',
		link : function(scope, element, attributes){
				element.draggable({
					cursor 		: 'move',

					containment : $(".defileur"),

					helper 		: function(){
									copie = $("div#motif-sticker").clone()
											.removeAttr("id")
											.addClass("creationSticker")
											.css("z-index", 200)
											.css("visibility", "visible");
									return copie;
									}

				});	
		}
	}


}]);










module_stickit.directive('containerStickers', ['$compile', 'servicesCacheStickit', 'servicesStickit', '$q', '$timeout',
	function($compile, servicesCacheStickit, servicesStickit, $q, $timeout){

	return {
		restrict : 'AE', 		
		replace : true,
		transclude : true,
		template : "<div ng-transclude></div>",


		link : function(scope, element, attributes){

			/*************************/
			/*    Initialisations    */
			/*************************/
			//scope._scope = "groupe_stickers-cadres";
			/*console.log("création containerStickers");
			element.droppable({
				drop : function (event, ui) {
						console.log("un sticker va tomber");
										}
			});*/ 
			var groupeStickers = element.find("groupe-stickers-cadres");
			element.droppable({
				//containment : $("[emplacement='centre']").find(".container-stickers"),
				tolerance : 'fit',
				drop : function(event, ui){

					if (ui.helper.hasClass("creationSticker")){

  						//console.log(scope.options.modeDesign);
  						//console.log("helper", ui.helper );
						/*var copie = ui.helper.clone()
									.attr("sticker", '');*/

  						//console.log("avant", copie);
						sticker = $compile("<div sticker  class='sticker'></div>")(scope);

					//console.log(sticker.find(".contenuSticker"));
						//sticker.find(".contenuSticker").attr("contenteditable", "{*options.modeDesign*}")										

  						//var ensemble = $("<div ></div>").append(sticker);//ng-controller='controleur-sticker'
  						//sticker = $compile(ensemble)(scope);
  						//console.log("apres", sticker);
  						sticker.appendTo(groupeStickers).offset(ui.helper.offset());;
  						//console.log(sticker);
  						
  						//sticker.find("[sticker]")

  						var nombreStickers = groupeStickers.attr("nombrestickers");  							
  						groupeStickers.attr("nombrestickers", ++nombreStickers); 
  						
					}

				
				}/*,		
				accept : function(element){
						//return (typeof $(".creationSticker").collision(".collideEnable").html() === "undefined");
				}*/
	
			});


		}
	}


}]);






module_stickit.directive('sticker', ['servicesStickit', '$compile',  '$timeout', 'servicesUpdateStickit', 'servicesControlesStickit',
	function(servicesStickit, $compile, $timeout, servicesUpdateStickit, servicesControlesStickit){

	var templateURL = '/stickit/partials/motif_sticker.html';	
	
	/*var templateString = '<div class="titreSticker"  ng-class="{stickerModified : stickerModified}"></div>'
	+ '<div class="contenantSticker">'
 	+ '<contenu-sticker class="contenuSticker" contenteditable="{*options.modeDesign*}" style="{{sticker.style}}"  ng-class="{visible : options.modeDesign && options.modeModifStickers,  hidden : ! options.modeDesign || ! options.modeModifStickers}" ></contenu-sticker>'
	+ '<img src="/static/stickit/images/controles_stickit/supprimer.png" class="boutonSupprimerSticker" ng-click="supprimerSticker(idSticker)" />'
	+ '<img src="/static/stickit/images/controles_stickit/boite_a_outils.png" class="boutonBoiteAOutils" ng-click="boiteAOutils()" ng-class="{\'boiteAOutilsDeploye\' : boiteAOutils_deploye}" />'
	+ '</div>';*/

	return {
		restrict : 'A', 
		//transclude : true,
		//template : templateString, 
		 templateUrl : templateURL,

		link : function(scope, element, attributes){
			var id_sticker;

			element.css("visibility", "visible").css("position", "absolute");
			/*element
				.css("z-index", "")							
				.attr("ng-class", '{visible : options.modeDesign && options.modeModifStickers, hidden : ! options.modeDesign || ! options.modeModifStickers}')
				.attr("modedesign", '{*options.modeDesign*}')
				.attr("modeModifSticker", '{*options.modeModifStickers*}')	
				.css("visibility", "")																											
				.removeClass("creationSticker")
				.addClass("collideEnable")*/

			$timeout(function(){

				//console.log("je passe dans la link function");

				id_sticker = element.attr('id_sticker');
				if (id_sticker){
					//scope.sauveSurServeur = true; INUTILE ?
				}	
				else{
					id_sticker = '_st_' + servicesStickit.obtientNumeroValide();
					element.attr('id_sticker', id_sticker);	
				}
				scope.idSticker = id_sticker;				
				servicesUpdateStickit.ajouteAuRegistre(scope.id,  id_sticker);

			element				
				  .find(".titreSticker").html(id_sticker).end()
				  .draggable({
					    cursor : 'move', 
					    containment : element.parents(".container-stickers"),	
					    zIndex: 100, 
					    preventCollision : true,
   					    obstacle: ".collideEnable",					
					    stop 	: function(event, ui){	
											$(this).addClass	("collideEnable"); 
										},
					    start 	: function(event, ui){	
											$(this).removeClass	("collideEnable"); 
					    }				
					    /*drag 	: function(event, ui){
					    }*/
				})
				.resizable({
					    stop 	: function(event, ui){	
					    					$(this).addClass	("collideEnable"); 
					    					},
					    start 	: function(event, ui){	
					    					$(this).removeClass	("collideEnable"); 
					    },	
					   	//collision : true,
					    //obstacle : ".collideEnable", 				
					    containment : element.parents(".container-stickers"),
					    minHeight : 80,
					    minWidth : 200
		
				})	/**/	
			});
/*

			scope.$watch('stickerModified', function(newValue, oldValue){
				if (newValue){
					servicesUpdateStickit.indiqueAuRegistreModifSticker(scope.id, scope.idSticker);
				}
			});


			scope.$on("STICKIT.STICKERS_SAUVES", function(event, data){
				scope.stickerModified = false;	
				var associationsIdsClientServeur = data.associationsStickers;				
				if (associationsIdsClientServeur && associationsIdsClientServeur[scope.idSticker]){
					var nouvel_id = associationsIdsClientServeur[scope.idSticker];	
					scope.idSticker = nouvel_id;

					element 
				  		.attr("id_sticker", nouvel_id)				
				  		.find(".titreSticker").html(nouvel_id);
			  	}
			});

			scope.$watch('destruction', function(newValue, oldValue){
				//console.log("demande de suppression", newValue);
				if(newValue){
					servicesUpdateStickit
					.demanderConfirmation("suppression", {})
					.then(	function(result){ 
						servicesUpdateStickit.supprimer(element, scope.idSticker)
						})
					.then(	function(){
							var message = "SUPPRESSION EFFECTUEE POUR LE " + scope.idSticker;
							scope.$emit("WARNING_DISPLAY", { 'message' : message, 'id_groupe' : scope.idSticker });
						}, 
						function(error){
							if(error == "echec_suppression"){
								var message = "ECHEC DE LA SUPPRESSION POUR LE " + scope.idSticker;								
								scope.$emit("WARNING_DISPLAY",  { 'message' : message, 'id_groupe' : scope.idSticker });									
							}
							scope.destruction = false ;
						});	

				}
			});


			scope.$watch('servicesStickit.stickerSelectionne', function(newValue, oldValue){
				newValue == -1 ?
			}*/

		}
	}

}]);






/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/*******                       LES SERVICES                    ****************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/


module_stickit.factory('servicesStickit', ['$q', '$http', 
	function($q, $http){

	var les_services_stickit = {};
	var counterStickers = 0;
	var counterBackgroundCadres = 0;

	les_services_stickit.stickerSelectionne = -1;


	les_services_stickit.recupereElements = function(id_groupe){
		var deferred = $q.defer();
		var url = "/stickit/groupe-elements/" + id_groupe + "/";

		$http.get(url)
		.success(function(data, status){
			deferred.resolve(data);
		})
		.error(function(error, status){
			$("html").html(error);
			deferred.reject();
		});

		return deferred.promise;
	}

	les_services_stickit.obtientNumeroValide = function(){
		return "_" + ++counterStickers;
	}

	les_services_stickit.obtientNumeroValideCadre = function(){
		return "_" + ++counterBackgroundCadres;
	}

	return les_services_stickit;
}]);







module_stickit.factory('servicesCacheStickit', [ '$q', 
	function($q){

	var les_services_cache = {};
	var cache = {};

	les_services_cache.miseAJour = "";

	les_services_cache.stockeOptions = function(idRecuperation, options){
		if ( ! les_services_cache.contient(idRecuperation)){
			cache[idRecuperation] = {};
		}
		cache[idRecuperation].options =	options;		
	}
	les_services_cache.recupereOptions = function(idRecuperation) {
		return cache[idRecuperation].options;
	}
	
	les_services_cache.stockeDonnees = function(idRecuperation, donnees){
		if ( ! les_services_cache.contient(idRecuperation)){
			cache[idRecuperation] = {};
		}
		cache[idRecuperation].donnees =	donnees;
	}
	les_services_cache.recupereDonnees = function(idRecuperation) {
		return cache[idRecuperation].donnees;
	}


	les_services_cache.lectureCache = function(){
		return cache;
	}

	les_services_cache.contient = function(cle){
		return (cle in cache);
	}


	return les_services_cache;
}]);






module_stickit.factory('servicesInitialisationStickit', function(){

	var les_services_stickit_initialisation = {};

	les_services_stickit_initialisation.recupereOptionsParDefaut = function(){
		var options_par_defaut = {
			'modeDesign' 			: false,
			'modeModifStickers' 	: true,
			'modeModifCadres' 		: true,
			'modeModifBackground' 	: false
		}
		return options_par_defaut;
	}

	return les_services_stickit_initialisation;

});











module_stickit.factory('servicesUpdateStickit', ['$q', '$http', '$compile',
	function($q, $http, $compile){

	var les_services_stickit_update = {};
	var registreStickers = {};	

	les_services_stickit_update.modificationEnregistree = false;


	les_services_stickit_update.ajouteAuRegistre = function(idGroupeStickers, idSticker){
		//console.log(idGroupeStickers, idSticker);
		if (! (idGroupeStickers in registreStickers)){
			registreStickers[idGroupeStickers] = {	nbStickersCrees 		: 1, 
													nbStickersModifies 		: 0, 
													listeStickersCrees 		: [idSticker],
													listeStickersModifies 	: []/*,*/													
												};
		}
		else{
			registreStickers[idGroupeStickers].nbStickersCrees++;
			registreStickers[idGroupeStickers].listeStickersCrees.push(idSticker);			 
		}
		//console.log(registreStickers);
	};



	les_services_stickit_update.indiqueAuRegistreModifSticker = function(idGroupeStickers, idSticker){
		registreStickers[idGroupeStickers].nbStickersModifies++;
		registreStickers[idGroupeStickers].listeStickersModifies.push(idSticker);
		//console.log(registreStickers);
	};


	
	les_services_stickit_update.demanderConfirmation = function(typeDemande, options){
		var fenetreConfirmation = $('#modalConfirmation');
		var btn_confirmer = $('#modalConfirmation').find(".confirmer");
		var btn_infirmer = $('#modalConfirmation').find(".infirmer");	

		var deferred = $q.defer();
		$('#modalConfirmation').modal();	

		btn_confirmer.on("click", function(){ deferred.resolve(); fenetreConfirmation.modal('hide'); })

		btn_infirmer .on("click", function(){ deferred.reject() ; fenetreConfirmation.modal('hide'); })

		return deferred.promise;
	}/**/


	les_services_stickit_update.supprimer = function(element, idElement){
		//console.log("SUPPRESSION EN PREPARATION SUR LE CLIENT");
		var deferred = $q.defer();

		var prefixe = idElement.substring(0, 4);
		if(prefixe == "_bg_" || prefixe == "_st_"){
			//console.log("suppression ??? ");
			element
			  .addClass("transitionVersSuppression")
			  .addClass("suppression")
			  .on("transitionend", function(){
			  		element.remove();
			   	  	deferred.resolve();			  		
			  });	
		}
		else{
			var url ;	
			if (typeof element.attr('sticker') !== 'undefined')
				url = "/stickit/sticker/" + idElement + "/";
			else if (typeof element.attr('background-cadre') !== 'undefined')
				url = "/stickit/backgroundcadre/" + idElement + "/";

			var donneesEnvoyees = { 'idElement' : idElement };
			//console.log(url);
			//$http({method: 'DELETE', url: '/someUrl'}).
			$http['delete'](url, donneesEnvoyees) /// FUCKING HACK FOR IE SHIT ... $http.delete() ...
			.success(function(data, status){
			   	//console.log(data.msg);
			   	element
			   		.addClass("transitionVersSuppression")
			   		.addClass("suppression")		
			   	  .on("transitionend", function(){
			   	  		//console.log(data.msg);
			   	  		element.remove();
			   	  		deferred.resolve();
			   	  });				
			   })
			   .error(function(error, status){
			   	$("html").html(error);
			   	deferred.reject("echec_suppression");
			   });

		}

		return deferred.promise;
	}



	les_services_stickit_update.sauvegarder  = function(idGroupe){

		var stickersASauver  = $("#gr-stick-cadre-" + idGroupe).find("[sticker]");
		var elementsJSON = $.map(stickersASauver, function(elementDOMSticker, cle){
			var	elementSticker = $(elementDOMSticker);
			var id_sticker = elementSticker.attr("id_sticker");
			//if (listeStickersModifies.indexOf(id_sticker) !== -1){
			if(true){
				//console.log(id_sticker);
				var contenuSticker = elementSticker.find(".contenuSticker");

				return  donnees = {
					'style' 		: contenuSticker.attr("style"),
					'contenu' 		: contenuSticker.html(),
					'top' 			: elementSticker.position().top,
					'left' 			: elementSticker.position().left,
					'width'			: elementSticker.width(),	
					'height'		: elementSticker.height(),				
	
					'id_sticker' 	: id_sticker
				}					
			}
		});


		var cadresASauver  = $("#gr-stick-cadre-" + idGroupe).find("[background-cadre]");
		//console.log(cadresASauver );
		var elementsJSONCadre = $.map(cadresASauver, function(elementDOMCadre, cle){
			var	elementCadre = $(elementDOMCadre);
			var id_cadre = elementCadre.attr("id_backgroundCadre");
			//if (listeCadresModifies.indexOf(id_cadre) !== -1){
			if(true){
				//console.log(id_cadre);
				var backgroundCadreImage = elementCadre.find(".backgroundCadreImage");
				//console.log(backgroundCadreImage.attr("default"), parseFloat(backgroundCadreImage.css("opacity"), 10).toFixed(2));
				return  donnees = {
					'opacity' 		: parseFloat(backgroundCadreImage.css("opacity"), 10).toFixed(2),
					'filename' 		: (backgroundCadreImage.attr("default") || backgroundCadreImage.attr("src")),
					'top' 			: elementCadre.position().top,
					'left' 			: elementCadre.position().left,
					'width'			: elementCadre.width(),	
					'height'		: elementCadre.height(),				
	
					'id_backgroundCadre' 		: id_cadre
				}					
			}
		});

		//console.log(elementsJSONCadre);

		var url = "/stickit/groupe-elements/" + idGroupe+ "/";
		var deferred = $q.defer();
		var donneesEnvoyees = {'id_groupe' : idGroupe, 'donnees' : elementsJSON, 'donneesCadres' : elementsJSONCadre};
		//console.log(donneesEnvoyees);	

		$http
		.post(url, donneesEnvoyees)
		.success(function(data, status){
			//console.log(data);
			deferred.resolve(data);
		})
		.error(function(error, status){
			$("html").html(error);/**/
			deferred.reject(error);
		});

		return deferred.promise;
	}



	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}


	les_services_stickit_update.uploadFiles  = function(file, id_blob){

    	var formData = new FormData();		
		var deferred = $q.defer();

        formData.append(id_blob, file);    
   		var xhr = new XMLHttpRequest();
   		var url = "/stockeImage/";    
		var csrftoken = getCookie('csrftoken');

   		 xhr.open("POST", url);
   		 xhr.setRequestHeader("X-CSRFToken", csrftoken);
   		 xhr.overrideMimeType('image/*; charset=x-user-defined-binary');    
   		 xhr.onreadystatechange = function() {
   		     if (xhr.readyState == 4) {
   		           if(xhr.status == 200){

   		               var associations = JSON.parse(xhr.responseText); 
   		               //console.log(associations);
   		               deferred.resolve(associations);
   		               //console.log(xhr.responseText);

   		           }
   		          else{
   		               $("html").html(xhr.responseText);    
   		               deferred.reject(false);           
   		           }
   		     }
   		 }
   		 xhr.send(formData);  
   		 return deferred.promise;		
	}




	return les_services_stickit_update;
}]);

