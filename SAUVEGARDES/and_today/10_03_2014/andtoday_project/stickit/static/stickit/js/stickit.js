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

	$scope.servicesStickit = servicesStickit;

	$scope.$watch("servicesStickit.stickerSelectionne", function (newValue, oldValue) {
		//console.log(newValue, oldValue);
	}); 

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




module_stickit.controller("controleur-sticker", ['$scope',  'servicesUpdateStickit', 'servicesStickit',
	function($scope, servicesUpdateStickit, servicesStickit){

		/*DEBUG*/$scope.controller = "controller-sticker";

		$scope.sauveSurServeur = false;	
		$scope.stickerModified = false; 		
		$scope.destruction = false;

		$scope.servicesStickit = servicesStickit; 

		$scope.supprimerSticker = function(id){
			$scope.destruction = true;
		}


		$scope.boiteAOutils = function () {
			servicesStickit.stickerSelectionne = $scope.boiteAOutils_deploye ? -1 : parseInt($scope.idSticker, 10);
			$scope.boiteAOutils_deploye = ! $scope.boiteAOutils_deploye;
		}

		/*$scope.$watch("servicesStickit.stickerSelectionne", function(newValue, oldValue){
								console.log("AVANT TEST : ", oldValue, newValue);
			if (newValue !== -1  && oldValue === parseInt($scope.idSticker, 10)){
					$scope.boiteAOutils_deploye = ! $scope.boiteAOutils_deploye;
					//element.focus();				
			}
		});*/

	
}]);


module_stickit.controller("controleur-backgroundCadre", ['$scope', 
	function($scope){

		$scope.sauveSurServeur = false;	
		$scope.destruction = false;

		$scope.bgCadreVisible =  false; 
		$scope.$watch(function(){
			return ! $scope.options.modeDesign || $scope.options.modeModifCadres;
		}, function(newValue, oldValue){
			//console.log($scope.options.modeDesign, $scope.options.modeModifCadres, newValue, oldValue);
			$scope.bgCadreVisible = newValue;
			//console.log($scope.bgCadreVisible);
		})

		$scope.supprimerCadre = function(id){
			$scope.destruction = true;
		}

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
					}
					/*stop : function(event, ui){

					}*/
				})
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

				element.droppable({
					//containment : $("[emplacement='centre']").find(".container-stickers"),
					tolerance : 'fit',
					drop : function(event, ui){
	
						if (ui.helper.hasClass("creationSticker")){
  							var groupeStickers = element.find("groupe-stickers-cadres");
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

  							var groupeBackgroundCadres = element.find("groupe-stickers-cadres");	

  							/*var backgroundCadre = ui.helper.clone()
  							      					.removeClass('ui-draggable-dragging helperBackgroundCadre')
      												.css({'position' : 'absolute', 'z-index' : '', 'left' : '0px', 'top' : '0px'});*/
  							
  							var ensembleContenant = $("#motif-background-cadre").clone()
  													.attr("background-cadre", '')
  													.attr("ng-class", "{visible : bgCadreVisible, hidden : ! bgCadreVisible}")
  													.attr("id", "")
  													//.css({'left' : '0px', 'top' : '0px'})
  													.attr("ng-controller", 'controleur-backgroundCadre')
  													
													.attr("modedesign", '{*options.modeDesign*}')  													

  													//.attr("contenteditable", '');
													//.addClass("backgroundCadreContenant")
  											//.append(backgroundCadre);
  							ensembleContenant.find(".transparencyField")
  													.attr("transparency-background-cadre", ''); 
  							ensembleContenant.find(".backgroundCadreImage")
  													.attr("default", 'default');   													
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
					elementARattacher = servicesCacheStickit.recupereDonnees(newValue);
					deferred.resolve(elementARattacher);
				}
				else{
					if (oldValue !== newValue){
						//console.log("===================================", newValue);							
						servicesStickit.recupereElements(newValue)
							.then(function(data){
								//on a récupéré les stickers d'une page depuis le serveur juste au départ du défilement
								data = $compile(data)(scope);									
								deferred.resolve(data);
								//console.log("-----RECUP STICKERS DEPUIS LE SERVEUR");	
								//console.log(promise);															
							}, function(error){
								// Par défaut, on créé un groupe stickers, on passe donc en resolve la promise, pas en reject
								data = "<groupe-stickers-cadres style='visibility  : hidden' id='gr-stick-cadre-" + newValue + "'>" + newValue + "</groupe-stickers-cadres>";
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
							var _elementDetache = element.find("#gr-stick-cadre-" + oldValue).detach();
							servicesCacheStickit.stockeDonnees(oldValue, _elementDetache);
							/*var _elementDetache = element.find("#gr-cadre-" + oldValue).detach();
							servicesCacheStickit.stockeDonnees(oldValue, _elementDetache);*/

							//console.log(newValue);
							//console.log(_elementARattacher);
							element.append(_elementARattacher);	
				});
			});
		}
	}


}]);



module_stickit.directive("backgroundCadre", ['$timeout', '$compile', 'servicesStickit', 'servicesUpdateStickit',
 	function($timeout, $compile, servicesStickit, servicesUpdateStickit){

	return {
		restrict : 'AE', 
		link : function(scope, element, attributes){

			var id_backgroundCadre = element.attr('id_backgroundCadre');
			if (id_backgroundCadre){
				scope.sauveSurServeur = true;
			}	
			else{
				id_backgroundCadre = '_bg_' + servicesStickit.obtientNumeroValideCadre();
				element.attr('id_backgroundCadre', id_backgroundCadre);	
			}
			scope.idBackgroundCadre = id_backgroundCadre;				
			servicesUpdateStickit.ajouteAuRegistre(scope.id,  id_backgroundCadre);/**/
			var backgroundImage , parent , recipiendaireFichier , controleTransparence, boutonSupprimerCadre;

			$timeout(function(){
  				/*element
  					.attr("ng-class", "{visible : bgCadreVisible, hidden : ! bgCadreVisible}")
  					.attr("id", "");*/
  				/*element

  					.attr("ng-controller", 'controleur-backgroundCadre')
					.attr("modedesign", '{*options.modeDesign*}')
				.find(".transparencyField")
  					.attr("transparency-background-cadre", '')
					.end() 
  				.find(".backgroundCadreImage")
  					.attr("default", 'default')												
					.end() ;*/  				
  				//$compile(element[0])(scope);

				backgroundImage 		= element.find(".backgroundCadreImage");
				parent 					= element.parents(".container-stickers");
				recipiendaireFichier 	= element.find(".recipiendaireFichier");
				controleTransparence 	= element.find(".controleTransparence");				
				boutonSupprimerCadre 	= element.find(".boutonSupprimerCadre");


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
						//console.log("entre, ", scope.options.modeDesign);					
						recipiendaireFichier.addClass("recipiendaireFichierSurvol");
						controleTransparence.addClass("controleTransparenceSurvol");
						boutonSupprimerCadre.addClass("boutonSupprimerCadreSurvol");
					}
				})
				.on("mouseleave", function(event, ui){
					if (scope.options.modeDesign){
						//console.log("sorti, ", scope.options.modeDesign);	
						recipiendaireFichier.removeClass("recipiendaireFichierSurvol");
						controleTransparence.removeClass("controleTransparenceSurvol");						
						boutonSupprimerCadre.removeClass("boutonSupprimerCadreSurvol");			
					}
				})
				.on("mouseover", function(event, ui){
					if (scope.options.modeDesign){
						element.css("cursor", "move");
					}					
				})/*
				.on("click", function(event, ui){
					if (scope.options.modeDesign){

					}
				})*/

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
				


			scope.$on("STICKIT.STICKERS_SAUVES", function(event, data){

				var associationsIdsClientServeur = data.associationsCadres;					
				if (associationsIdsClientServeur && associationsIdsClientServeur[scope.idBackgroundCadre]){
					var nouvel_id = associationsIdsClientServeur[scope.idBackgroundCadre];	
					scope.idBackgroundCadre = nouvel_id;

					element 
				  		.attr("id_backgroundCadre", nouvel_id);				
			  	}
			});

			scope.$watch('destruction', function(newValue, oldValue){
				if(newValue){
					$('#myModal').modal();

					servicesUpdateStickit
					.supprimer(element, scope.idBackgroundCadre )
					.then(	function(){
								var message = "SUPPRESSION EFFECTUEE POUR LE " + scope.idBackgroundCadre;
								scope.$emit("WARNING_DISPLAY", { 'message' : message, 'id_groupe' : scope.idBackgroundCadre });
							}, 
							function(error){
								var message = "ECHEC DE LA SUPPRESSION POUR LE " + scope.idBackgroundCadre;								
								scope.$emit("WARNING_DISPLAY",  { 'message' : message, 'id_groupe' : scope.idBackgroundCadre });				
							});
				}

			});/**/




		}
	}


}]);




module_stickit.directive('transparencyBackgroundCadre', ['$q', 
	function($q){
	
	return {
		restrict : 'AE', 
		link : function(scope, element, attributes){
			var conteneur = element.parent(".backgroundCadreContenant").find(".controleTransparence");

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
						backgroundImage
							.attr('src', association[id_blob])
							.removeAttr('default');
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
				/*.on("drag", function(event){
					event.stopPropagation();
				})*/
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
								backgroundImage
									.attr('src', association[id_blob])
									.removeAttr('default');
								window.URL.revokeObjectURL(id_blob);								
							});	
	    				}	
					}
				});	

			}
		}


}]);

module_stickit.directive('groupeStickersCadres', ['servicesCacheStickit', '$timeout',
	function(servicesCacheStickit, $timeout){

	return{
		restrict : 'E',
		link : function(scope, element, attributes){

			$timeout(function(){
				scope.$watch("options.modeDesign", function(newValue, oldValue){
					var children = element.find("[background-cadre]");
					newValue ? 
						children.draggable("enable") .resizable("enable")/*console.log("true") : */:
						children.draggable("disable").resizable("disable");
				});	
			})

		}

	}

}]);



module_stickit.directive('sticker', ['servicesStickit', '$compile',  '$timeout', 'servicesUpdateStickit', 'servicesControlesStickit',
	function(servicesStickit, $compile, $timeout, servicesUpdateStickit, servicesControlesStickit){

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
					id_sticker = '_st_' + servicesStickit.obtientNumeroValide();
					element.attr('id_sticker', id_sticker);	
				}
				scope.idSticker = id_sticker;				
				servicesUpdateStickit.ajouteAuRegistre(scope.id,  id_sticker);

				element				
				  .find(".titreSticker").html(id_sticker).end()
				  //.attr("stickerVisible")
				  .on("focusout", function(event, ui){
				  	//console.log("perte de focus", document.activeElement);
				  	//console.log("evenement :", event )
				  	//servicesStickit.stickerSelectionne = -1;
				  	//console.log(servicesStickit.stickerSelectionne);				  	
				  	//scope.$apply();				  	
				  })
				  .on("focusin", function(event, ui){
				  	//console.log("gain de focus", document.activeElement);
				  	//servicesStickit.stickerSelectionne  = scope.idSticker;
				  	//console.log(servicesStickit.stickerSelectionne);
				  	//scope.$apply();
				  })				  
				  .draggable({
					    cursor : 'move', 
					    containment : element.parents(".container-stickers"),	
					    zIndex: 100, 
					    preventCollision : true,
					    /*collisionVisualDebug: true,*/
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
				 /*.on("precollision", function(event, ui){
				  	console.log("pre-collision !! ");
				  })
				  .on("collision", function(event, ui){
				  	console.log("collision !! ");
				  })				  
				  .on("postcollision", function(event, ui){
				  	console.log("post-collision !! ");
				  }) */				  
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
					    /*resize : function(event, ui){
					    	console.log(ui.size);
					    },*/
					    /*preventCollision : true,
					    collisionVisualDebug: true,  
   					    obstacle: ".collideEnable",	*/
					   	collision : true,
					    obstacle : ".collideEnable", /**/				
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


			/*scope.$watch('servicesStickit.stickerSelectionne', function(newValue, oldValue){
				newValue == -1 ?
			}*/

		}
	}

}]);



module_stickit.directive('contenuSticker', ['servicesStickit', 'servicesControlesStickit', 'servicesUpdateStickit',
	function(servicesStickit, servicesControlesStickit, servicesUpdateStickit){

		return {
			restrict : 'AE', 
			link : function(scope, element, attributes){
				//alert("dans le link");
				element
				.on('click', function(event){
					//console.log("test click");
					if (scope.options.modeDesign){
						servicesStickit.stickerSelectionne = scope.idSticker;
						//console.log("text", element.text());
						element.text() ? 
							scope.$apply(servicesControlesStickit.optionsCurseur())			:							
							scope.$apply(servicesControlesStickit.optionsCurseurParDefaut ());	
					}
				})
				.on("keyup", function(event){
					//console.log(servicesControlesStickit.optionsCurseur());
					if (scope.options.modeDesign){
						scope.$apply(servicesControlesStickit.optionsCurseur());
					}
				})
				.on("focusout", function(event){
					servicesControlesStickit.saveSelection();
					//console.log()
				})		
				.on("mousedown", function (event) {
				    event.stopPropagation();
				})
				.on("mouseenter", function(ui, event){
					//console.log(servicesControlesStickit.stickerEnCours, ", ", scope.idSticker);
					if (scope.options.modeDesign && (servicesStickit.stickerEnCours == scope.idSticker)){
						//console.log("verif mouseenter : ", servicesStickit.stickerEnCours);
						$(this).focus();						
					}
			
				})
				.on('dragenter', function(event){
					//.log("evenement deplacable entrant ");
					if (scope.options.modeDesign){
						//$(this).focus();						
					}					
				})
				.on('drop', function(event){

					var files = event.originalEvent.dataTransfer.files; 
					
					if (files.length){
						//element.focus;
						var position = window.getSelection().getRangeAt(0).startOffset;
						//console.log( "focus : ", window.getSelection().getRangeAt(0), ", caret : ", position);
						event.preventDefault();
						event.stopPropagation();
						var html, node, id_blob, range = window.getSelection().getRangeAt(0); 

						for (var i=0 ; i <files.length ; i++) {
								id_blob = window.URL.createObjectURL(files[i]); 
								html = "<img src ='" + id_blob + "' id='" + id_blob + "' />"
								node = range.createContextualFragment(html);
							   	range.insertNode(node);

							    servicesUpdateStickit
							    .uploadFiles(files[i], id_blob)
							    .then(function(association){
							   		var image = $("[id='" + id_blob + "' ]");
   		               				image.attr("src", association[image.attr("src")]).removeAttr("id");	
   		               				window.URL.revokeObjectURL(id_blob);
							    });

    					}	
					}
				});


				scope.$watch("servicesStickit.stickerSelectionne", function(newValue, oldValue){
					//console.log("AVANT TEST : ", oldValue, newValue);
					if (parseInt(newValue, 10) !== -1  && oldValue == parseInt(scope.idSticker, 10)){
							//console.log("DE-SELECTION : ", oldValue, newValue);
							scope.boiteAOutils_deploye = ! scope.boiteAOutils_deploye;
							//scope.$apply();
							//console.log(oldValue, newValue);
			
					}
					else if (newValue == parseInt(scope.idSticker, 10)){
							//console.log("AVANT TEST : ", oldValue, newValue, parseInt(scope.idSticker, 10));						
							scope.boiteAOutils_deploye = true;
							//scope.$apply();
							element.focus();							
							//servicesStickit.setEndOfContenteditable(element.get(0));
					}
				});/**/


			}
		}


}]);


module_stickit.directive("boutonParametrages", function(){

	return {
		restrict : "AE",
		link : function (scope, element, attributes) {
			
			var fenetreParametrages = $("#modalParametrages");
			var btnCloseParametrages = $('#modalParametrages').find("#closeParametrages");

			element.on("click", function(event, ui){
				//console.log("clic");
				fenetreParametrages.modal();
			});

			btnCloseParametrages.on("click", function(){
				fenetreParametrages.modal('hide');				
				//console.log("mise a jour des parametrages");
			})

		/*var fenetreConfirmation = $('#modalConfirmation');
		var btn_confirmer = $('#modalConfirmation').find(".confirmer");
		var btn_infirmer = $('#modalConfirmation').find(".infirmer");	

		var deferred = $q.defer();
		$('#modalConfirmation').modal();	

		btn_confirmer.on("click", function(){ deferred.resolve(); fenetreConfirmation.modal('hide'); })

		btn_infirmer .on("click", function(){ deferred.reject() ; fenetreConfirmation.modal('hide'); })

		return deferred.promise;	*/			

		}
	}

});/**/

/*module_stickit.directive("modalConfirmation", function(){

	return {
		restrict : 'AE',
		link : function (scope, element, attributes) {
			element.find(" go-back-button")
			.on() 


			okay-button
		}
	}

});*/


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


	les_services_stickit.setEndOfContenteditable = function(contentEditableElement)
	{
	    var range,selection;
	    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
	    {
	        range = document.createRange();//Create a range (a range is a like the selection but invisible)
	        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
	        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
	        selection = window.getSelection();//get the selection object (allows you to change selection)
	        selection.removeAllRanges();//remove any selections already made
	        selection.addRange(range);//make the range you have just created the visible selection
	    }
	    else if(document.selection)//IE 8 and lower
	    { 
	        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
	        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
	        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
	        range.select();//Select the range (make it the visible selection
	    }
	}


 


/*
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
*/

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

	
	/*les_services_stickit_update.supprimerSticker = function(element, idSticker){
		//console.log("SUPPRESSION EN PREPARATION SUR LE CLIENT");


		var deferred = $q.defer();

		if(idSticker.substring(0, 4) == "_st_"){

			element
			  .addClass("transitionVersSuppressionSticker")
			  .addClass("suppressionSticker")
			  .on("transitionend", function(){			console.log(idSticker);
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
	}*/

	
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

		//console.log(idGroupe);
		//console.log(registreStickers[id].listeStickersModifies.filter(function(element){return element = id}));
		//var listeStickersModifies = registreStickers[idGroupe].listeStickersModifies;
		//console.log(listeStickersModifies);


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