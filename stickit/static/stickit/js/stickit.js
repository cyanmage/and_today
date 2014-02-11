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
	//console.log($scope.options);
	//$scope.options.controles = servicesControlesStickit.options;
	$scope.controles  = servicesControlesStickit;

	/*$scope.$watch('controles', function(newValue, oldValue){
		//console.log(newValue);
	}, true);*/

	$scope.libelleBtnAttachDetach = "Attacher/Détacher";


	$scope.toggleModeDesign = function(){
		$scope.options.modeDesign = ! $scope.options.modeDesign;
	}


	$scope.sauverlesStickers = function(){
		servicesUpdateStickit
		.sauverStickersDunGroupe($scope.id)
		.then(function(data){
				var message = "SAUVEGARDE EFFECTUEE POUR LE " + $scope.id;
				$scope.$emit("WARNING_DISPLAY",  {	'message' : message, 'id_groupe' : $scope.id });
				$scope.$broadcast("STICKIT.STICKERS_SAUVES", data);
			}, function(error){
				var message = "ECHEC DE LA SAUVEGARDE POUR LE " + $scope.id;
				$scope.$emit("WARNING_DISPLAY",  {	'message' : message, 'id_groupe' : $scope.id });				
			});
	}


	$scope.$on("APPLICATIONS.ENVOI_ID", function(event, data){
		//console.log('nouvel id : ' + data.id);

		var ancien_id = $scope.id;
		$scope.id = nouvel_id = data.id;
		//console.log(ancien_id, nouvel_id);

		if(ancien_id !== nouvel_id){
			servicesCacheStickit.stockeOptions(ancien_id, $scope.options);	
						//console.log("\nVALEURS SAUVEGARDEES DANS LE CACHE ", ancien_id);
						//console.log($scope.options);
			/*$scope.options = servicesCacheStickit.contient(nouvel_id) ? 
												servicesCacheStickit.recupereOptions(nouvel_id) : 
												servicesInitialisationStickit.recupereOptionsParDefaut();*/
					if ($scope.options = servicesCacheStickit.contient(nouvel_id) ){
						$scope.options = servicesCacheStickit.recupereOptions(nouvel_id);
						//console.log("VALEURS RECUPEREES DU CACHE ", nouvel_id);
						//console.log($scope.options);						
					}
					else{
						$scope.options = servicesInitialisationStickit.recupereOptionsParDefaut();	
						//console.log("VALEURS PAR DEFAUT ", nouvel_id);
						//console.log($scope.options);						
					}

												
		}
	});

	$scope.handlerControles =  function(optionControle){

		if (optionControle == "bold"){
			document.execCommand('bold', false, null);
			servicesControlesStickit.curseur.bold = ! servicesControlesStickit.curseur.bold ;
		}

		if (optionControle == "italic"){
			document.execCommand('italic', false, null);
			servicesControlesStickit.curseur.italic = ! servicesControlesStickit.curseur.italic ;
		}

		if (optionControle == "underline"){
			document.execCommand('underline', false, null);
			servicesControlesStickit.curseur.underline = ! servicesControlesStickit.curseur.underline ;
		}
			//console.log($scope.controles.curseur.fontname);
		if (optionControle == "fontname"){
			console.log($scope.controles.curseur.fontname);
			document.execCommand('fontname', false, $scope.controles.curseur.fontname.name);
			//servicesControlesStickit.curseur.underline = ! servicesControlesStickit.curseur.underline ;
			//
		}

	}

	$scope.etatControle = function(optionControle){
		return $scope.controles.curseur[optionControle];
	}/**/


	$scope.incremente_fontsize = function(){
		//console.log("incrementation");
		if ($scope.controles.curseur.fontsize + 1 <= $scope.controles.parametrages.max_fontsize){
			$scope.controles.curseur.fontsize++;
			document.execCommand('fontsize', false, $scope.controles.curseur.fontsize);			
		}
	}

	$scope.decremente_fontsize = function(){
		if ($scope.controles.curseur.fontsize - 1 >= $scope.controles.parametrages.min_fontsize){
			$scope.controles.curseur.fontsize--;
			document.execCommand('fontsize', false, $scope.controles.curseur.fontsize);					
		}
	}



}]);


module_stickit.controller("controleur-sticker", ['$scope',  'servicesUpdateStickit',
	function($scope, servicesUpdateStickit){

		/*DEBUG*/$scope.controller = "controller-sticker";

		$scope.sauveSurServeur = false;	
		$scope.destruction = false;

		$scope.supprimerSticker = function(id){
			$scope.destruction = true;
		}

		$scope.stickerModified = false; 


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
					cursor : 'move',
					containment : $("[emplacement='centre']").find(".limitesEcran"),
					helper : function(){
						copie = $("div#motif-sticker").clone()
								.removeAttr("id")
								.addClass("creationSticker")
								.css("z-index", 200);
						//copie.css({'background-color' : '#00FF00'});
						return copie;
					}
					, stop : function(event, ui){
						//console.log("DRAGGABLE : 1) position ", ui.position, ", 2) offset : ", ui.offset);
						//console.log(ui.helper.attr("style"));
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
			//scope._scope = "groupe_stickers";

				element.droppable({
					containment : $("[emplacement='centre']").find(".container-stickers"),
					tolerance : 'fit',
					drop : function(event, ui){
	
						if (ui.helper.hasClass("creationSticker")){
  							groupeStickers = element.find("groupe-stickers");
  							console.log(scope.options.modeDesign);
							var sticker = ui.helper.clone()
										.attr("sticker", '')
										.removeClass("creationSticker")
										.addClass("stickerCree collideEnable")
										.css("z-index", "");
							console.log(sticker.find(".contenuSticker"));
							sticker.find(".contenuSticker").attr("contenteditable", "{*options.modeDesign*}")										

  							var ensemble = $("<div ng-controller='controleur-sticker'></div>").append(sticker);
  							sticker = $compile(ensemble)(scope);

  							ensemble.appendTo(groupeStickers)
  							sticker.find("[sticker]").offset(ui.helper.offset());

  							var nombreStickers = groupeStickers.attr("nombrestickers");  							
  							groupeStickers.attr("nombrestickers", ++nombreStickers); 
  							
						}
					},		
					accept : function(element){
							return (typeof $(".creationSticker").collision(".collideEnable").html() === "undefined");
					}
	
				});

			scope.$watch('id', function(newValue, oldValue, scope){
				//console.log("changement d'ID, newValue : ", newValue, ", oldValue : ", oldValue );
				var elementARattacher = "";
				var deferred = $q.defer();
				//console.log(scope.modeDesign, "++++", scope.id);
				if (servicesCacheStickit.contient(newValue)){
					//on a récupéré les stickers d'une page depuis le cache client juste au départ du défilement
					//console.log("*****RECUP STICKERS DEPUIS LE CACHE CLIENT");
					var elementARattacher = servicesCacheStickit.recupereDonnees(newValue);
					deferred.resolve(elementARattacher);
				}
				else{
					if (oldValue !== newValue){
						//console.log("===================================", newValue);							
						servicesStickit.recupereStickers(newValue)
							.then(function(data){
								//on a récupéré les stickers d'une page depuis le serveur juste au départ du défilement
								data = $compile(data)(scope);									
								deferred.resolve(data);
								//console.log("-----RECUP STICKERS DEPUIS LE SERVEUR");	
								//console.log(promise);															
							}, function(error){
								// Par défaut, on créé un groupe stickers, on passe donc en resolve la promise, pas en reject
								data = "<groupe-stickers style='visibility  : hidden' id='gr-stick-" + newValue + "'>" + newValue + "</groupe-stickers>";
								data = $compile(data)(scope);									
								deferred.resolve(data);
								//console.log("+++++REMPLISSAGE PAR DEFAUT");									
								//A AMELIORER POUR PRENDRE EN COMPTE LE CAS OU IL Y A UN REEL PROBLEME 
							});

					}
					else {
						//console.log("####################################", newValue);						
						deferred.reject();  //la page est chargée pour la première fois, le serveur a déjà chargé les stickers
						//console.log("~~~~~~ON CHARGE DEPUIS LA PREMIERE FOIS", newValue);						
					}
				}

				deferred.promise
				.then(function(_elementARattacher){
							//console.log("XXXXXXXXXXXXXX DETACH  : ", oldValue, " ATTACH : ", newValue, " XXXXXXXXXXXXXX");
							_elementDetache = element.find("#gr-stick-" + oldValue).detach();
							servicesCacheStickit.stockeDonnees(oldValue, _elementDetache);

							//console.log(newValue);
							//console.log(_elementARattacher);
							element.append(_elementARattacher);	
				});
			});
		}
	}


}]);





module_stickit.directive('groupeStickers', ['servicesCacheStickit', 
	function(servicesCacheStickit){

	return{
		restrict : 'E',
		link : function(scope, element, attributes){
		}

	}

}]);



module_stickit.directive('sticker', ['servicesStickit', '$compile',  '$timeout', 'servicesUpdateStickit',
	function(lesServicesStickit, $compile, $timeout, servicesUpdateStickit){

	return {
		restrict : 'A', 
		link : function(scope, element, attributes){
			var id_sticker;


			$timeout(function(){

				id_sticker = element.attr('id_sticker');
				if (id_sticker){
					scope.sauveSurServeur = true;
				}	
				else{
					id_sticker = '__' + lesServicesStickit.obtientNumeroValide();
					element.attr('id_sticker', id_sticker);	
				}
				scope.idSticker = id_sticker;				
				servicesUpdateStickit.ajouteStickerAuRegistre(scope.id,  id_sticker);

				element				
				  .find(".titreSticker").html(id_sticker).end()
				  .addClass("stickerVisible")
				  .draggable({
					    cursor : 'move', 
					    containment : element.parents(".container-stickers"),	
					    zIndex: 100, 
					    preventCollision : true,
   					    obstacle: ".obstacles, .collideEnable",					
					    stop 	: function(event, ui){	
											$(this).addClass	("collideEnable"); 
										},
					    start 	: function(event, ui){	
						$(this).removeClass	("collideEnable"); 
					    },					
					    drag 	: function(event, ui){
					    }	
				})
				  .resizable({
					//handles: "e, s, n, w, nw, ne, sw, se",
					    stop 	: function(event, ui){	
					    						$(this).addClass	("collideEnable"); 
					    						//servicesUpdateStickit.avertirModificationSticker(element);
					    						//element.find(":not(.contenuSticker)").hide();
					    					},
					    start 	: function(event, ui){	
					    	$(this).removeClass	("collideEnable"); 
					    	//console.log(element.parent("[espace-stickers]").find(".container-stickers"));						
					    },						
					    collision : true,
					    obstacle : ".obstacles, .collideEnable",					
					    containment : element.parents(".container-stickers"),
					    minHeight : 80,
					    minWidth : 200
					    /*maxHeight : 300,
					    maxWidth : 300	*/				
				})
			});


			scope.$watch('stickerModified', function(newValue, oldValue){
				if (newValue){
					servicesUpdateStickit.indiqueAuRegistreModifSticker(scope.id, scope.idSticker);
				}
			});


			scope.$on("STICKIT.STICKERS_SAUVES", function(event, data){
				scope.stickerModified = false;					
				if (data && data[scope.idSticker]){
					var nouvel_id = data[scope.idSticker];	
					scope.idSticker = nouvel_id;

					element 
				  		.attr("id_sticker", nouvel_id)				
				  		.find(".titreSticker").html(nouvel_id);
			  	}
			});

			scope.$watch('destruction', function(newValue, oldValue){
				if(newValue)
					servicesUpdateStickit
					.supprimerSticker(element, scope.idSticker)
					.then(	function(){
								var message = "SUPPRESSION EFFECTUEE POUR LE " + scope.idSticker;
								scope.$emit("WARNING_DISPLAY", { 'message' : message, 'id_groupe' : scope.idSticker });
							}, 
							function(error){
								var message = "ECHEC DE LA SUPPRESSION POUR LE " + scope.idSticker;								
								scope.$emit("WARNING_DISPLAY",  { 'message' : message, 'id_groupe' : scope.idSticker });				
							});
			});


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

	les_services_stickit.recupereStickers = function(id_groupe){
		var deferred = $q.defer();
		var url = "/stickit/groupe-stickers/" + id_groupe + "/";

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




	les_services_stickit.associeActionsAuxBoutons = function(element, scope){

		//var texte_contenu = element.parents(".appli-stickit").find(".contenuSticker");
		//var texte_contenu = element; 

		scope.$watch('controles.bold', function(newValue, oldValue){

			if (newValue !==  oldValue){
				//texte_contenu.css({'font-weight' : (scope.bold ? "bold" : "normal")});
				console.log(document.queryCommandState("bold", false, null));
				//document.execCommand("bold");
				document.queryCommandState("bold", false, null);
				scope.stickerModified = true;				
			}
		});

		scope.$watch('controles.italic', function(newValue, oldValue){
			if (newValue !==  oldValue){
				document.execCommand("italic");				
				//texte_contenu.css({'font-style' : (scope.italic ? "italic" : "normal")});
				scope.stickerModified = true;				
			}
		});


		scope.$watch('controles.fontfamily.style', function(newValue, oldValue){
			if (newValue !==  oldValue){
				//texte_contenu.css('font-family', newValue);
				scope.stickerModified = true;				
			}
		});

		scope.$watch('controles.fontsize', function(newValue, oldValue){
			//console.log(newValue);
			if (newValue !==  oldValue){
				//texte_contenu.css('font-size', newValue);
				scope.stickerModified = true;				
			}
		});

	}



	return les_services_stickit;
}]);



module_stickit.factory('servicesUpdateStickit', ['$q', '$http', '$compile',
	function($q, $http, $compile){

	var les_services_stickit_update = {};
	var registreStickers = {};	

	les_services_stickit_update.modificationEnregistree = false;


	
	les_services_stickit_update.ajouteStickerAuRegistre = function(idGroupeStickers, idSticker){
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

	
	les_services_stickit_update.supprimerSticker = function(element, idSticker){
		//console.log("SUPPRESSION EN PREPARATION SUR LE CLIENT");

		var deferred = $q.defer();

		if(idSticker.substring(0, 2) == "__"){
			element
			  .addClass("stickerSupprime")
			  .on("transitionend", function(){
			  		element.remove();
			   	  	deferred.resolve();			  		
			  });	
		}
		else{	
			var url = "/stickit/sticker/" + idSticker + "/";
			var donneesEnvoyees = { 'idSticker' : idSticker};

			$http.delete(url, donneesEnvoyees)
			   .success(function(data, status){
			   	//console.log(data.msg);
			   	element
			   	  .addClass("stickerSupprime")			
			   	  .on("transitionend", function(){
			   	  		element.remove();
			   	  		deferred.resolve();
			   	  });				
			   })
			   .error(function(error, status){
			   	$("html").html(error);
			   	deferred.reject();
			   });

		}

		return deferred.promise;
	}


	les_services_stickit_update.sauverStickersDunGroupe  = function(idGroupeStickers){
		var deferred = $q.defer();
		//console.log(idGroupeStickers);
		//console.log(registreStickers[id].listeStickersModifies.filter(function(element){return element = id}));

		var url = "/stickit/groupe-stickers/" + idGroupeStickers+ "/";
		var stickersASauver  = $("#gr-stick-" + idGroupeStickers).find("[sticker]");

		var listeStickersModifies = registreStickers[idGroupeStickers].listeStickersModifies;
		//console.log(listeStickersModifies);

		var elementsJSON = $.map(stickersASauver, function(elementDOMSticker, cle){
			var	elementSticker = $(elementDOMSticker);
			var id_sticker = elementSticker.attr("id_sticker");


			//if (listeStickersModifies.indexOf(id_sticker) !== -1){
			if(true){
				//console.log(id_sticker);
				contenuSticker = elementSticker.find(".contenuSticker");

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


		var donneesEnvoyees = {'id_groupe' : idGroupeStickers, 'donnees' : elementsJSON};
		//console.log(donneesEnvoyees);	

		$http
		.post(url, donneesEnvoyees)
		.success(function(data, status){
			deferred.resolve(data.associations);
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


	les_services_stickit_update.uploadFiles  = function(file, range){

		var html, node, id_blob;
    	var formData = new FormData();		

    	//console.log(file);
    	id_blob = window.URL.createObjectURL(file); 
    	html = "<img src ='" + id_blob + "' id='" + id_blob + "' />"
    	node = range.createContextualFragment(html);
        range.insertNode(node);

        formData.append(id_blob, file);    
   		var xhr = new XMLHttpRequest();
   		var url = "/stockeImage/";    
		var csrftoken = getCookie('csrftoken');
			console.log(csrftoken);
   		 xhr.open("POST", url);
   		 xhr.setRequestHeader("X-CSRFToken", csrftoken);
   		 xhr.overrideMimeType('image/*; charset=x-user-defined-binary');    
   		 xhr.onreadystatechange = function() {
   		     if (xhr.readyState == 4) {
   		           if(xhr.status == 200){
   		               console.log(xhr.responseText);
   		               var associations = JSON.parse(xhr.responseText);
   		               var image = $("[id='" + id_blob + "' ]");
   		               image.attr("src", associations[image.attr("src")]).removeAttr("id");
   		           }
   		          else{
   		               $("html").html(xhr.responseText);               
   		           }
   		     }
   		 }
   		 xhr.send(formData);  		
	}




	return les_services_stickit_update;
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
	

	les_services_cache.recupereDonnees = function(idRecuperation) {
		return cache[idRecuperation].donnees;
	}

	les_services_cache.stockeDonnees = function(idRecuperation, donnees){
		if ( ! les_services_cache.contient(idRecuperation)){
			cache[idRecuperation] = {};
		}

		cache[idRecuperation].donnees =	donnees;
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
			'modeDesign' : false
		}
		return options_par_defaut;
	}

	return les_services_stickit_initialisation;

});