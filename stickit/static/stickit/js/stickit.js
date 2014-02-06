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

module_stickit.controller("controleurModuleStickit", ['$q', '$scope', 'serviceIds', 'servicesStickit', 'servicesUpdateStickit','servicesCacheStickit', 'servicesInitialisationStickit',/**/ 
	function($q, $scope, serviceIds, servicesStickit, servicesUpdateStickit, servicesCacheStickit, servicesInitialisationStickit /**/){

	/*Options par défaut d'une page : modeDesign(false)*/
	$scope.options = servicesInitialisationStickit.recupereOptionsParDefaut();	
	//console.log($scope.options);
	$scope.libelleBtnAttachDetach = "Attacher/Détacher";
	$scope.nombreStickers = 0;

	//console.log("SCOPE DU CONTROLE STICKIT : ", $scope.$id);

	$scope.toggleModeDesign = function(){
		$scope.options.modeDesign = ! $scope.options.modeDesign;
	}


	$scope.sauverlesStickers = function(){
		//console.log("GROUPE SAUVE : ", $scope.id);
		servicesUpdateStickit
		.sauverStickersDunGroupe($scope.id)
		.then(function(data){
			//console.log(data);
				//console.log("retour dans scope, sauvegarde effectuee");
				$scope.$emit("WARNING_DISPLAY", {
												'message' : "SAUVEGARDE EFFECTUEE POUR LE " + $scope.id,
												'id_groupe' : $scope.id
												}
							);
				$scope.$broadcast("STICKIT.STICKERS_SAUVES", data);
			}, function(error){
				console.log("retour dans scope, echec de la sauvegarde");
				$scope.$emit("WARNING_DISPLAY",  {
												'message' : "ECHEC DE LA SAUVEGARDE POUR LE " + $scope.id,
												'id_groupe' : $scope.id				
												}
							);				
				//console.log(error);
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



	$scope.bold = false;
	$scope.italic = false;
	$scope.fontsize = 12;
	$scope.max_fontsize = 30;	
	$scope.min_fontsize = 0;		
	$scope.stroke = false;
	$scope.underline = false;
	$scope.colortext = "#000000";
	$scope.backgroundcolor = "#ffffff";
	$scope.fontfamily = "Times New Roman";


	$scope.fontfamilies = [
	    {name:'Arial'				,		style:'Arial'			  },
	    {name:"Times New Roman"		,		style:"Times New Roman"   },
	    {name:"Cursive"				,		style:"Cursive"			  },
	    {name:"Fantasy"				,		style:"Fantasy"			  },
	    {name:"Monospace"			,	 	style:"Monospace"		  },
	    {name:"Comfortaa"			,	 	style:"Comfortaa"		  }	    
	  ];
	  $scope.fontfamily = $scope.fontfamilies[2]; 

	$scope.incremente_fontweight = function(){
		//console.log($scope.fontsize)
		if ($scope.fontsize + 1 <= $scope.max_fontsize){
			$scope.fontsize++;
			//console.log($scope.fontsize);
		}
	}
	$scope.decremente_fontweight = function(){
		//console.log($scope.fontsize)		
		if ($scope.fontsize - 1 >= $scope.min_fontsize){
			$scope.fontsize--;
			console.log($scope.fontsize);			
		}
	}



}]);


module_stickit.controller("controleur-sticker", ['$scope',  'servicesUpdateStickit',
	function($scope, servicesUpdateStickit){

		//$scope.data = 'boooooom';
		//$scope.controller = "controller-sticker";



		$scope.sauveSurServeur = false;	
		$scope.destruction = false;

		$scope.supprimerSticker = function(id){
			$scope.destruction = true;
			//console.log("je vais etre supprime , ", id);
		}

		$scope.stickerModified = false; 



	}]);/**/



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
		//scope : {id='id' mode-design='modeDesign' 
			//id : "=", 
			//modeDesign : "="
		//},
		//priority : 10,

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

							var sticker = ui.helper.clone()
										.attr("sticker", '')
										.removeClass("creationSticker")
										.addClass("stickerCree collideEnable")
										.css("z-index", "");

  							var ensemble = $("<div ng-controller='controleur-sticker'></div>").append(sticker);
  							sticker = $compile(ensemble)(scope);

  							ensemble.appendTo(groupeStickers)
  							sticker.find("[sticker]").offset(ui.helper.offset());

  							nombreStickers = groupeStickers.attr("nombrestickers");  							
  							groupeStickers.attr("nombrestickers", ++nombreStickers); 
  							//console.log(nombreStickers);	  							
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

				//console.log("YOUPIIIIII " + element.attr('id_serveur'));
				//console.log(element.parents(".container-stickers"));
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
				  //.dropzone({"url" : "/stickit/sticker/" + id_sticker + "/"});
			});

				/*var	contenant = $(this).find(".contenantSticker");

				element
				.on("mouseenter", function(event, ui){
					contenant.append($("#controle_sticker"));
				})
				.on("mouseleave", function(){
					$("#controle_sticker").detach();
				});*/

			element.find(".contenuSticker")
			.on("mousedown", function (event) {
			    event.stopPropagation();
			    return;
			})
			.on("mouseenter", function(ui, event){
				$(this).focus();
			})
			/*element.get()
			.on("dragover", function(event){
        		event.preventDefault();
        		event.stopPropagation();
			})
			.on("dragenter", function(event){
        		event.preventDefault();
        		event.stopPropagation();
			})
			.on("drop", function(event){
       				if(event.originalEvent.dataTransfer){
       				     if(event.originalEvent.dataTransfer.files.length) {
       				         event.preventDefault();
       				         event.stopPropagation();
       				     }   
       				 }
			});*/
			/*.on("mouseleave", function(ui, event){
				$(this).blur();
			});*/

			//lesServicesStickit.associeActionsAuxBoutons(element, scope);

			/*$(document).on('dragstart', function(event){
				console.log(event.originalEvent);
			         event.originalEvent
			              .dataTransfer
			              .setData('text/plain', 'modified_content_from_iframe');
			       });*//**/

			element.on("drop", function(event){
				//event.preventDefault();
    			console.log(event.originalEvent.dataTransfer.files);
				/*console.log(event.originalEvent.dataTransfer.files.length);
				console.log(event.originalEvent.dataTransfer.items);*/
            	//return false;				
			});

			/*element.on('dragenter', '.sticker', function() {
			            $(this).css('border', '3px dashed red');
			            return false;
			});

			element.on('dragover', '.sticker', function(e){
						e.originalEvent.dataTransfer.dropEffect = "copy";				
			            e.preventDefault();
			            e.stopPropagation();
			            return false;
			});
			 
			element.on('dragleave', '.sticker', function(e) {
			            e.preventDefault();
			            e.stopPropagation();
			            return false;
            			$(this).css('border', '3px dashed #BBBBBB');			            
			});

			element.on("drop", function(event){
				console.log(event.originalEvent.dataTransfer.files.length);
				console.log(event.originalEvent.dataTransfer.items);
            	//return false;				
			});*/
			scope.$watch('stickerModified', function(newValue, oldValue){
				if (newValue){
					//console.log("changement, sticker averti !! " + scope.id);
					servicesUpdateStickit.indiqueAuRegistreModifSticker(scope.id, scope.idSticker);
				}
			});


			scope.$on("STICKIT.STICKERS_SAUVES", function(event, data){
				//console.log(data);
				scope.stickerModified = false;					
				if (data && data[scope.idSticker]){
					var nouvel_id = data[scope.idSticker];	
					scope.idSticker = nouvel_id;

					element 
				  		.attr("id_sticker", nouvel_id)				
				  		.find(".titreSticker").html(nouvel_id);
				
					//console.log("Je suis sauve, je suis rassure ", nouvel_id);
			  
				}
			});



			scope.$watch('destruction', function(newValue, oldValue){
				//console.log(newValue, oldValue);

				if(newValue)
					servicesUpdateStickit
					.supprimerSticker(element, scope.idSticker)
					.then(function(){
									//console.log("retour dans scope, sauvegarde effectuee");
									scope.$emit("WARNING_DISPLAY", {
																	'message' : "SUPPRESSION EFFECTUEE POUR LE " + scope.idSticker,
																	'id_groupe' : scope.idSticker
																	}
												);
								}, function(error){
									console.log("retour dans scope, echec de la sauvegarde");
									scope.$emit("WARNING_DISPLAY",  {
																	'message' : "ECHEC DE LA SUPPRESSION POUR LE " + scope.idSticker,
																	'id_groupe' : scope.idSticker				
																	}
												);				
									//console.log(error);
								});
					

			});

		}
	}

}]);


module_stickit.directive('controleSticker', ['servicesStickit', '$compile',
	function(servicesStickit, $compile){
		//console.log("test");
		return {

			restrict : "AE",
			link : function(scope, element, attributes){
				//console.log("Je créé une directive controle sticker");
				element
				.on("click", function(event, ui){
					//console.log("wizaaaa");
				})
				servicesStickit.associeActionsAuxBoutons(element, scope);

			}

		}


}]);


module_stickit.directive('colonneControle', [ 'servicesStickit', '$compile',
	function(servicesStickit, $compile){
	//console.log("colonne !!! ")		
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
/*******                       LES SERVICES                    ****************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/


module_stickit.factory('servicesStickit', ['$q', 'servicesCacheStickit', '$http', 
	function($q, servicesCacheStickit, $http){

	var les_services_stickit = {};
	var counterStickers = 0;

	//var identifiantGroupe_enCours = "";



	les_services_stickit.recupereStickers = function(id_groupe){
		var deferred = $q.defer();
		//console.log("demande HTTP de recuperation stickers ; envoi imminent, vous etes sur le tarmac : " + id);
		var url = "/stickit/groupe-stickers/" + id_groupe + "/";

		$http.get(url)
		.success(function(data, status){
			//console.log("DONNEES RECUPEREES POUR CETTE DATE : ");
			//console.log(data);
			deferred.resolve(data);
		})
		.error(function(error, status){
			$("html").html(error);
			deferred.reject();
		});

		//console.log("DONNEES RECUPEREES POUR CETTE DATE : ", id_groupe);

		return deferred.promise;

	}


	les_services_stickit.obtientNumeroValide = function(){
		//console.log("nouveau numero");
		return "_" + ++counterStickers;
	}




	les_services_stickit.associeActionsAuxBoutons = function(element, scope){

		var texte_contenu = element.parents(".appli-stickit").find(".contenuSticker");

		scope.$watch('bold', function(newValue, oldValue){

			if (newValue !==  oldValue){
				texte_contenu.css({'font-weight' : (scope.bold ? "bold" : "normal")});
				scope.stickerModified = true;				
			}
		});

		scope.$watch('italic', function(newValue, oldValue){
			if (newValue !==  oldValue){
				texte_contenu.css({'font-style' : (scope.italic ? "italic" : "normal")});
				scope.stickerModified = true;				
			}
		});


		scope.$watch('fontfamily.style', function(newValue, oldValue){
			if (newValue !==  oldValue){
				texte_contenu.css('font-family', newValue);
				scope.stickerModified = true;				
			}
		});

		scope.$watch('fontsize', function(newValue, oldValue){
			//console.log(newValue);
			if (newValue !==  oldValue){
				texte_contenu.css('font-size', newValue);
				scope.stickerModified = true;				
			}
		});

	}



	return les_services_stickit;
}]);



module_stickit.factory('servicesUpdateStickit', ['$q', '$http', 
	function($q, $http){

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
			   });/**/
			   //element.remove();
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