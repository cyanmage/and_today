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

	$scope.controles  =  {'stickit' : servicesControlesStickit};

	/*$scope.$watch('controles', function(newValue, oldValue){
		//console.log(newValue);
	}, true);*/

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

	
	$scope.toggleModeModifBackground = function(){
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


module_stickit.controller("controleur-backgroundCadre", ['$scope', 
	function($scope){

		$scope.bgCadreVisible =  false; 
		$scope.$watch(function(){
			return ! $scope.options.modeDesign || $scope.options.modeModifCadres;
		}, function(newValue, oldValue){
			//console.log($scope.options.modeDesign, $scope.options.modeModifCadres, newValue, oldValue);
			$scope.bgCadreVisible = newValue;
			//console.log($scope.bgCadreVisible);
		})

		$scope.opacity = 1;

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
					//containment : $("[emplacement='centre']").find(".limitesEcran"),
					containment : $(".defileur"),
					helper : function(){
						copie = $("div#motif-sticker").clone()
								.removeAttr("id")
								.addClass("creationSticker")
								.css("z-index", 200)
								.css("visibility", "visible");
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




module_stickit.directive('createBackgroundImage', [function(){

	return {			
		restrict : 'A',
		link : function(scope, element, attributes){
				element.draggable({
					cursor : 'move',
					containment : $(".defileur"),
					helper : function(){
						//copie = $("div#motif-sticker").clone()
						copie = $("div#motif-background-cadre .backgroundCadreImage").clone()
								.removeAttr("id")
								.addClass("helperBackgroundCadre")
								.css("z-index", 200);
						return copie;
					}, 
					/*stop : function(event, ui){

					}*/
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
					//containment : $("[emplacement='centre']").find(".container-stickers"),
					tolerance : 'fit',
					drop : function(event, ui){
	
						if (ui.helper.hasClass("creationSticker")){
  							var groupeStickers = element.find("groupe-stickers");
  							//console.log(scope.options.modeDesign);
							var sticker = ui.helper.clone()
										.css("z-index", "")							
										.attr("sticker", '')
										.attr("ng-class", '{visible : options.modeDesign && options.modeModifStickers, hidden : ! options.modeDesign || ! options.modeModifStickers}')
										.attr("modedesign", '{*options.modeDesign*}')
										.attr("modeModifSticker", '{*options.modeModifStickers*}')	
										.css("visibility", "")																											
										.removeClass("creationSticker")
										.addClass("collideEnable");


							//console.log(sticker.find(".contenuSticker"));
							sticker.find(".contenuSticker").attr("contenteditable", "{*options.modeDesign*}")										

  							var ensemble = $("<div ng-controller='controleur-sticker'></div>").append(sticker);
  							sticker = $compile(ensemble)(scope);

  							ensemble.appendTo(groupeStickers);
  							sticker.find("[sticker]").offset(ui.helper.offset());

  							var nombreStickers = groupeStickers.attr("nombrestickers");  							
  							groupeStickers.attr("nombrestickers", ++nombreStickers); 
  							
						}

						else if (ui.helper.hasClass("helperBackgroundCadre")){
  							var groupeBackgroundCadres = element.find("groupe-background-cadres");	

  							/*var backgroundCadre = ui.helper.clone()
  							      					.removeClass('ui-draggable-dragging helperBackgroundCadre')
      												.css({'position' : 'absolute', 'z-index' : '', 'left' : '0px', 'top' : '0px'});*/
  							
  							var ensembleContenant = $("#motif-background-cadre").clone()
  													.attr("id", "")
  													//.css({'left' : '0px', 'top' : '0px'})
  													.attr("ng-controller", 'controleur-backgroundCadre')
  													.attr("background-cadre", '')
  													.attr("ng-class", "{visible : bgCadreVisible, hidden : ! bgCadreVisible}")
  													//.attr("contenteditable", '');
													//.addClass("backgroundCadreContenant")
  											//.append(backgroundCadre);
  							ensembleContenant.find(".transparencyField")
  													.attr("transparency-background-cadre", ''); 
  							//console.log(ensembleContenant.find("input"));
  							 
  							var backgroundCadreContenant = $compile(ensembleContenant)(scope);

							backgroundCadreContenant
									.appendTo(groupeBackgroundCadres)
									.offset(ui.helper.offset());



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

module_stickit.directive("groupeBackgroundCadres", function(){

	return  {
		restrict : 'AE', 
		link : function(scope, element, attributes){
			scope.$watch("options.modeDesign", function(newValue, oldValue){
					var children = element.children("[background-cadre]");
					newValue ? 
						children.draggable("enable") .resizable("enable") : 
						children.draggable("disable").resizable("disable");
					});
		}
	}


}) 

module_stickit.directive("backgroundCadre", ['$timeout', '$compile', 'servicesStickit', 'servicesUpdateStickit',
 	function($timeout, $compile, lesServicesStickit, servicesUpdateStickit){

	return {
		restrict : 'AE', 
		link : function(scope, element, attributes){

			var id_backgroundCadre = element.attr('id_backgroundCadre');
			if (id_backgroundCadre){
				scope.sauveSurServeur = true;
			}	
			else{
				id_backgroundCadre = '_bg_' + lesServicesStickit.obtientNumeroValideCadre();
				element.attr('id_backgroundCadre', id_backgroundCadre);	
			}
			scope.idBackgroundCadre = id_backgroundCadre;				
			servicesUpdateStickit.ajouteAuRegistre(scope.id,  id_backgroundCadre);/**/

			var backgroundImage, parent, recipiendaireFichier;
			
			$timeout(function(){
				backgroundImage = element.find(".backgroundCadreImage");
				parent = element.parents(".container-stickers");
				recipiendaireFichier = element.find(".recipiendaireFichier");
				console.log(recipiendaireFichier);

				element
				.draggable({
					   containment : parent,	
					   cursor : 'move'
				})
				.resizable({
					containment : parent,
					handlers : "e, s, se"				
				});

				element.on("mouseenter", function(event, ui){
					if (scope.options.modeDesign){
						console.log("entre, ", scope.options.modeDesign);						
						recipiendaireFichier.addClass("recipiendaireFichierSurvol");
					}
				})
				.on("mouseleave", function(event, ui){
					if (scope.options.modeDesign){
						console.log("sorti, ", scope.options.modeDesign);	
						recipiendaireFichier.removeClass("recipiendaireFichierSurvol");
					}
				})

				;

				/*scope.$watch("options.modeDesign", function(newValue, oldValue){
					newValue ? 
						element.draggable("enable") .resizable("enable") : 
						element.draggable("disable").resizable("disable");
					});*/


			});


			/*
				console.log(newValue, oldValue);
				if (newValue !== oldValue){
					//console.log(newValue);
					newValue ? element.draggable("enable") : element.draggable("disable");
				}
				//if (newValue) 
			})*/

			scope.$watch("opacity", function(newValue, oldValue){
				if (newValue !== oldValue){
					//console.log("opacite : ", newValue, "oldVlue : ", oldValue, ", scope : ", scope.$id);
					backgroundImage.css("opacity", newValue);					
				}

			})
//{*opacity*}
				//$compile(element)(scope);
		}
	}


}]);




module_stickit.directive('transparencyBackgroundCadre', ['$q', 
	function($q){
	
	return {
		restrict : 'AE', 
		link : function(scope, element, attributes){
			var conteneur = element.parent(".backgroundCadreContenant").find(".controleTransparency");

			/*conteneur.on("dragstart", function(event, ui){
				event.stopPropagation();
				console.log("clique");
				event.preventDefault();
			})*/

			//console.log(conteneur);

			function rgba2alpha(rgba){
					rgba = rgba.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+.\d+)\)$/);
					if (rgba)
						return  parseFloat(rgba[4]);
				}

			var updatePreview = function() {
			     	var color = $(this).chromoselector('getColor').getRgbaString();
					//console.log(color);			/**/
					//scope.opacity = 1 - scope.opacity; 
					scope.opacity = rgba2alpha(color);
					scope.$apply();
					//console.log("couleur : ", rgba2alpha(color), ", scope : ", scope.$id);
					//scope.opacity = color;
			};

			element.chromoselector({ // Initialise the picker
		        //create: createPreview,
		        update: updatePreview,
		        preview: false,
		        resizable : false,
		        roundcorners: false,
		        panelAlpha: true,
		        panelChannelWidth: 10,
		        /*speed : 250, */
		        autoshow : false,
		        target : conteneur,
		        //target : $("#testbcgk", elemHorizParent),
		        width : 100,
		        ringwidth : 14
		    });
			//element.chromoselector("show");

		}		
	}

}]);

module_stickit.directive('recipiendaireFichier', ['servicesUpdateStickit',
	function(servicesUpdateStickit){

		return {
			restrict : 'AE',
			link : function (scope, element, attributes){
				var parent = element.parents(".backgroundCadreContenant");
				var backgroundImage = parent.find(".backgroundCadreImage");
				var selecteurFichiers = parent.find(".selectFiles");

				selecteurFichiers
				.on("change", function(event){
					//console.log("SELECTEUR");
					var file = event.target.files[0];
					var id_blob = window.URL.createObjectURL(file); 

					servicesUpdateStickit
					.uploadFiles(file, id_blob)
					.then(function(association){
						backgroundImage.attr('src', association[id_blob]);
						window.URL.revokeObjectURL(id_blob);
					});	

				});

				element
				.on("click", function(event){
					event.preventDefault();
					event.stopPropagation();
					//console.log(element.find(".selectFiles"));
					selecteurFichiers.click();
				})
				.on('dragenter', function(event){
					//element.addClass("fichierEntre");					
					//console.log("un fichier entre ");
					/*if (scope.options.modeDesign){
						$(this).focus();						
					}			*/		
				})				
				.on('dragleave', function(event){
					//element.removeClass("fichierEntre");
					//console.log("un fichier sort ");
				})
				.on('drop', function(event){

					var files = event.originalEvent.dataTransfer.files;
					console.log("DnD FICHIER"); 
					//console.log("un fichier est tombe , ", files.length);
					if (files.length){
						event.preventDefault();
						event.stopPropagation();

						for (var i=0 ; i <files.length ; i++) {
							var id_blob = window.URL.createObjectURL(files[i]); 

							servicesUpdateStickit
							.uploadFiles(files[i], id_blob)
							.then(function(association){
								backgroundImage.attr('src', association[id_blob]);
								window.URL.revokeObjectURL(id_blob);								
							});	
	    				}	
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
				servicesUpdateStickit.ajouteAuRegistre(scope.id,  id_sticker);

				element				
				  .find(".titreSticker").html(id_sticker).end()
				  //.attr("stickerVisible")
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
	var counterBackgroundCadres = 0;

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

	les_services_stickit.obtientNumeroValideCadre = function(){
		return "_" + ++counterBackgroundCadres;
	}


	les_services_stickit.associeActionsAuxBoutons = function(element, scope){

		//var texte_contenu = element.parents(".appli-stickit").find(".contenuSticker");
		//var texte_contenu = element; 

		scope.$watch('controles.bold', function(newValue, oldValue){

			if (newValue !==  oldValue){
				//texte_contenu.css({'font-weight' : (scope.bold ? "bold" : "normal")});
				//console.log(document.queryCommandState("bold", false, null));
				//document.queryCommandState("bold", false, null);
				scope.stickerModified = true;				
			}
		});

		scope.$watch('controles.italic', function(newValue, oldValue){
			if (newValue !==  oldValue){
				//texte_contenu.css({'font-style' : (scope.italic ? "italic" : "normal")});
				scope.stickerModified = true;				
			}
		});


		scope.$watch('controles.fontname', function(newValue, oldValue){
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

		scope.$watch('controles.fontcolor', function(newValue, oldValue){
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

	
	les_services_stickit_update.supprimerSticker = function(element, idSticker){
		//console.log("SUPPRESSION EN PREPARATION SUR LE CLIENT");


		var deferred = $q.defer();

		if(idSticker.substring(0, 2) == "__"){
			element
			  .addClass("transitionVersSuppressionSticker")
			  .addClass("suppressionSticker")
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
			   		.addClass("transitionVersSuppressionSticker")
			   		.addClass("suppressionSticker")		
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


	les_services_stickit_update.sauvegarder  = function(idGroupe){

		//console.log(idGroupe);
		//console.log(registreStickers[id].listeStickersModifies.filter(function(element){return element = id}));
		//var listeStickersModifies = registreStickers[idGroupe].listeStickersModifies;
		//console.log(listeStickersModifies);


		var stickersASauver  = $("#gr-stick-" + idGroupe).find("[sticker]");
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


		var cadreASauver  = $("#gr-cadre-" + idGroupe).find("[sticker]");
		var elementsJSONCadre = $.map(cadreASauver, function(elementDOMCadre, cle){
			var	elementcadre = $(elementDOMCadre);
			var id_cadre = elementSticker.attr("id_cadre");
			//if (listeStickersModifies.indexOf(id_sticker) !== -1){
			if(true){
				//console.log(id_sticker);
				contenuSticker = elementSticker.find(".backgroundCadreContenant");

				return  donnees = {
					'opacity' 		: contenuSticker.attr("style"),
					'filename' 		: contenuSticker.html(),
					'top' 			: elementCadre.position().top,
					'left' 			: elementCadre.position().left,
					'width'			: elementCadre.width(),	
					'height'		: elementCadre.height(),				
	
					'id_cadre' 		: id_cadre
				}					
			}
		});



		var url = "/stickit/groupe-stickers/" + idGroupe+ "/";
		var deferred = $q.defer();
		var donneesEnvoyees = {'id_groupe' : idGroupe, 'donnees' : elementsJSON};
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
			'modeDesign' 			: false,
			'modeModifStickers' 	: true,
			'modeModifCadres' 		: true,
			'modeModifBackground' 	: false
		}
		return options_par_defaut;
	}

	return les_services_stickit_initialisation;

});