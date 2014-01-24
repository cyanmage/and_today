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

module_stickit.controller("controleurModuleStickit", ['$q', '$scope', 'serviceIds', 'servicesStickit', 'servicesUpdateStickit','servicesCacheStickit',/**/ 
	function($q, $scope, serviceIds, servicesStickit, servicesUpdateStickit, servicesCacheStickit /**/){

	$scope.mode = "creation";
	$scope.libelleBtnAttachDetach = "Attacher/Détacher";
	$scope.listeStickersModifies = {};
	$scope.nombreStickers = 0;

	//console.log("SCOPE DU CONTROLE STICKIT : ", $scope.$id);

	$scope.sauverlesStickers = function(){
		//console.log("GROUPE SAUVE : ", $scope.id);
		servicesUpdateStickit.sauverStickersDunGroupe($scope.id);
	}

	/*$scope.$on("STICKIT.STICKER_MODIFIE", function(event, data){
		$scope.listeStickersModifies[data] = true;
		console.log("DANS LE CONTROLEUR DU STICKIT CREE : ", $scope.listeStickersModifies);
	});

	$scope.$on("STICKIT.STICKER_CREE", function(event, data){
		//$scope.listeStickerASauver[data] = true;
		$scope.nombreStickers++;
		console.log("DANS LE CONTROLEUR DU STICKIT MODIFIE : ", $scope.nombreStickers, ", id_client : ", data);
	});*/

	$scope.$on("APPLICATIONS.ENVOI_ID", function(event, data){
		console.log('nouvel id : ' + data.id);
		$scope.id = data.id;
	});

}]);


module_stickit.controller("controleur-sticker", ['$scope',  'servicesUpdateStickit',
	function($scope, servicesUpdateStickit){

		//$scope.data = 'boooooom';
		//$scope.controller = "controller-sticker";

		$scope.sauveSurServeur = false;	

		$scope.supprimerSticker = function(id){
			console.log("je vais etre supprime " + id);
		}

		$scope.stickerModified = false; 

		$scope.bold = false;
		$scope.italic = false;
		$scope.fontsize = 12;
		$scope.stroke = false;
		$scope.underline = false;
		$scope.colortext = "#000000";
		$scope.backgroundcolor = "#ffffff";
		$scope.fontfamily = "Times New Roman";

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
								.css("z-index", 1000);
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
		template : "<div id='{{id}}' ng-transclude></div>",
		scope : {
			id : "@"
		},
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
					},
	
				});

			scope.$watch('id', function(newValue, oldValue, scope){
				//console.log("changement d'ID, newValue : ", newValue, ", oldValue : ", oldValue );
				var elementARattacher = "";
				var deferred = $q.defer();

				if (servicesCacheStickit.contient(newValue)){
					//on a récupéré les stickers d'une page depuis le cache client juste au départ du défilement
					//console.log("*****RECUP STICKERS DEPUIS LE CACHE CLIENT");
					elementARattacher = servicesCacheStickit.recupereDonnees(newValue);
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
		//scope : {},

		link : function(scope, element, attributes){
			/*console.log("SCOPE DU GROUPE STICKERS : ", scope.$id);

			scope.$on("STICKIT.STICKER_MODIFIE", function(event, data){
				scope.listeStickersModifies[data] = true;
				console.log("DANS LE GROUPE ", scope.$id," DU STICKIT CREE : ", scope.listeStickersModifies);
			});
			//scope.$emit("STICKIT.STICKER_CREE", idStickerClient);		
			scope.$on("STICKIT.STICKER_CREE", function(event, data){
				//$scope.listeStickerASauver[data] = true;
				scope.nombreStickers++;
				console.log("DANS LE GROUPE ", scope.$id," DU STICKIT MODIFIE : ", scope.nombreStickers, ", id_client : ", data);
			});*/



		}
	}


}]);


module_stickit.directive('sticker', ['servicesStickit', '$compile',  '$timeout', 'servicesUpdateStickit',
	function(lesServicesStickit, $compile, $timeout, servicesUpdateStickit){

	return {
		restrict : 'A', 
		//templateUrl : '/and_today/stickit/templates/stickit/motif_sticker.html',
		//E:\sites_web\django\and_today\stickit\templates\stickit\motif_sticker.html
		//template : '<div ng-transclude id="id" avertir="groupeModifie()"></div>',
		//replace : true,
		//transclude : true,
		/*scope : {
			avertirModificationSticker : "&avertir",
			id : '@'
		},*/

		/*controller : function(scope){
			scope.stickerModified = false;

			scope.bold = false;
			scope.italic = false;
			scope.fontsize = 12;
			scope.stroke = false;
			scope.underline = false;
			scope.colortext = "#000000";
			scope.backgroundcolor = "#ffffff";
			scope.fontfamily = "Times New Roman";			
		},*/
	/*return {
		restrict : 'A', 
		template : '<div ng-transclude id="id" avertir="groupeMofifie()"></div>',
		replace : true,
		transclude : true,
		scope : {
			avertirModificationSticker : "&avertir",
			id : '@'
		},*/


		link : function(scope, element, attributes){

			//console.log("STICKER CREE ", scope.$id, ", parent : ", scope.$parent.$id );
			//scope.$emit("STICKIT.STICKER_CREE", idStickerClient);
			
			$timeout(function(){

				var idStickerClient = lesServicesStickit.obtientNumeroValide();

				var idServeur = element.attr('id_serveur');
				if (idServeur){
					 scope.idSticker = idServeur;
					 scope.sauvegardeSurServeur = true;
				}	
				else{
					 element.attr('id_client', 'stickerInstance_' + idStickerClient);	
					 scope.idSticker = idStickerClient;	
				}
				servicesUpdateStickit.ajouteStickerAuRegistre(scope.id, scope.idSticker);

				//console.log("YOUPIIIIII " + element.attr('id_serveur'));
				//console.log(element.parents(".container-stickers"));
				element				
				.find(".titreSticker").html(idStickerClient).end()
				.draggable({
					cursor : 'move', 
					containment : element.parents(".container-stickers"),	
					zIndex: 100, 
					preventCollision : true,
   					obstacle: ".obstacles, .collideEnable",					
					stop 	: function(event, ui){	
											$(this).addClass	("collideEnable"); 
											//servicesUpdateStickit.modificationStickerDetectee(element);
											//var conteneur = element.parents('groupe-stickers');
											//console.log($.data(element));											
											//conteneur.data('modificationGroupeSticker', false);
											//console.log(element.data('modificationSticker'));												
											//console.log(element.parents('groupe-stickers').data('modificationGroupeSticker'));	
										},
					start 	: function(event, ui){	
						$(this).removeClass	("collideEnable"); 
						//console.log(element.parents("[espace-stickers]"));
					},					
					drag 	: function(event, ui){
					}	
				})
				.resizable({
					//handles: "e, s, n, w, nw, ne, sw, se",
					stop 	: function(event, ui){	
											$(this).addClass	("collideEnable"); 
											//servicesUpdateStickit.avertirModificationSticker(element);
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
				/*.on("mouseleave", function(ui, event){
					$(this).blur();
				});*/

				lesServicesStickit.associeActionsAuxBoutons(element, scope);
				scope.$watch('stickerModified', function(newValue, oldValue){
					if (newValue){
						console.log("changement, sticker averti !! " + scope.id);
						servicesUpdateStickit.indiqueAuRegistreModifSticker(scope.id, scope.idSticker);
					}
				});/**/

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
/******************LES SERVICES                    ***************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/


module_stickit.factory('servicesStickit', ['$q', 'servicesCacheStickit', '$http', 
	function($q, servicesCacheStickit, $http){

	var les_services_stickit = {};
	var counterStickers = 0;

	//var identifiantGroupe_enCours = "";



	les_services_stickit.recupereStickers = function(id){
		var deferred = $q.defer();
		//console.log("demande HTTP de recuperation stickers ; envoi imminent, vous etes sur le tarmac : " + id);
		var url = "/stickit/groupe-stickers/" + id + "/";

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

		//console.log("DONNEES RECUPEREES POUR CETTE DATE : ");

		return deferred.promise;

	}






	les_services_stickit.obtientNumeroValide = function(){
		//console.log("nouveau numero");
		return "_" + ++counterStickers;
	}




	les_services_stickit.associeActionsAuxBoutons = function(element, scope){

		var texte_contenu = element.find(".contenuSticker");
		var bouton_bold = element.find(".b_bold");
		var bouton_italic = element.find(".b_italic");

		bouton_bold 
		.on("click", function(event, ui){
			scope.bold = !scope.bold;
			var style = scope.bold ? "bold" : "normal";
			texte_contenu.css({'font-weight' : style});
			scope.stickerModified = true;
			//texte_contenu.html({'font-weight' : style});
		});

		bouton_italic
		.on("click", function(event, ui){
			scope.italic = !scope.italic;
			var style = scope.italic ? "italic" : "normal";			
			texte_contenu.css({'font-style' : style});
			scope.stickerModified = true;			
			//texte_contenu.html({'font-style' : style});		
		});

	}



	return les_services_stickit;
}]);



module_stickit.factory('servicesUpdateStickit', ['$q',
	function($q){

	var les_services_stickit_update = {};
	var registreStickers = {};	

	les_services_stickit_update.modificationEnregistree = false;
	//les_services_stickit_update.groupesModifies = {};

	/*les_services_stickit_update.ajouteGroupeStickersAuRegistre = function(idGroupeStickers, idSticker){
		registreStickers[idGroupeStickers] = {};
		console.log(registreStickers);
	};*/
	
	les_services_stickit_update.ajouteStickerAuRegistre = function(idGroupeStickers, idSticker){
		//console.log(idGroupeStickers, idSticker);
		if (! (idGroupeStickers in registreStickers)){
			registreStickers[idGroupeStickers] = {	nbStickersCrees 		: 1, 
													nbStickersModifies 		: 0, 
													listeStickersCrees 		: [idSticker],
													listeStickersModifies 	: [],													
												};
		}
		else{
			registreStickers[idGroupeStickers].nbStickersCrees++;
			registreStickers[idGroupeStickers].listeStickersCrees.push(idSticker);			 
			//registreStickers[idGroupeStickers] = {nbStickersCrees : 1, nbStickersModifies : 0, listeStickersModifies : [idSticker]}
		}
		//console.log(registreStickers);
	};


	les_services_stickit_update.indiqueAuRegistreModifSticker = function(idGroupeStickers, idSticker){
		registreStickers[idGroupeStickers].nbStickersModifies++;
		registreStickers[idGroupeStickers].listeStickersModifies.push(idSticker);
		console.log(registreStickers);
	};


	les_services_stickit_update.sauverStickersDunGroupe  = function(id){
		console.log(id);
		var url = "/stickit/groupe-stickers/" + id + "/";
		var stickersASauver  = $("#gr-stick-" + id).find("[sticker]");

		var elementsJSON = $.map(stickersASauver, function(elementDOMSticker, cle){
			elementSticker = $(elementDOMSticker);
			contenuSticker = elementSticker.find(".contenuSticker");
			//contenantSticker = $(elementDOMSticker).find(".contenantSticker");
			//console.log($(elementDOMSticker).position());
			return  donnees = {
				'style' 		: contenuSticker.attr("style"),
				'contenu' 		: contenuSticker.text(),
				'top' 			: elementSticker.position().top,
				'left' 			: elementSticker.position().left,
				'width'			: elementSticker.width(),	
				'height'		: elementSticker.height(),				

				'id_client' 	: $(elementDOMSticker).attr("id_client"),
				'id_serveur' 	: $(elementDOMSticker).attr("id_serveur")
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

	/*les_services_stickit_update.avertirModificationSticker = function(scope){
		console.log("procedure d'avertissement ", scope.idSticker);
		scope.$emit("STICKIT.STICKER_MODIFIE", scope.idSticker);
		//var conteneur = element.parents('groupe-stickers');
		//element.data('modificationSticker', true);
		//element.parents('groupe-stickers').data('modificationGroupeSticker', true);
		les_services_stickit_update.modificationEnregistree = true;
		//console.log($.data(element));
		//console.log(conteneur.data('modificationGroupeSticker'));		
		//console.log($.data(element.parent('groupe-stickers')));
		//console.log($.cache);					
	}*/


	return les_services_stickit_update;
}]);




module_stickit.factory('servicesCacheStickit', [ '$q', 
	function($q){

	var les_services_cache = {};
	var cache = {};

	/*function ObjetStocke(){
		this.donnees = "";
		this.modifsNonSauvees = false;
	}*/


	les_services_cache.miseAJour = "";


	les_services_cache.recupereDonnees = function(idRecuperation) {
		/*console.log("DESTOCKAGE : ", idRecuperation);		
		console.log(cache);
		var deferred = $q.defer();
		deferred.resolve(cache[idRecuperation].donnees);
		return deferred.promise;*/
		return cache[idRecuperation];
		//return cache[idRecuperation].donnees;
	}

	les_services_cache.stockeDonnees = function(idRecuperation, donnees){
		//console.log("STOCKAGE : ", idRecuperation);
		//var obj = new ObjetStocke();
		//obj.donnees = donnees;		
		cache[idRecuperation] = donnees;
		//console.log(cache);	
		//cache[idRecuperation] = donnees;*/		
		//console.log("SAUVEGARDE id " + idRecuperation);
	}

	les_services_cache.lectureCache = function(){
		return cache;
	}

	les_services_cache.contient = function(cle){
		return (cle in cache);
	}



	return les_services_cache;
}]);