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
		servicesStickit.sauverStickersDunGroupe($scope.id);
	}

	$scope.$on("APPLICATIONS.ENVOI_ID", function(event, data){
		$scope.id = data.id;
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



module_stickit.directive('containerStickers', ['$compile', 'servicesCacheStickit', 'servicesStickit', '$q', '$timeout',
	function($compile, servicesCacheStickit, servicesStickit, $q, $timeout){

	return {
		restrict : 'AE', 
		scope : {
			id : "="
		},
		replace : true,
		priority : 10,
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
							var sticker = ui.helper.clone()
										.attr("sticker", '')
										.removeClass("creationSticker")
										.css("z-index", "");
							sticker.addClass("stickerCree collideEnable");
							$compile(sticker)(scope);
	
  							element.find("groupe-stickers").append(sticker); 						
  							sticker.offset(ui.helper.offset());
						}
					},		
					accept : function(element){
							return (typeof $(".creationSticker").collision(".collideEnable").html() === "undefined");
					},
	
				});


			/*function attacheDetache(oldValue, elementARattacher){
				elementDetache = element.find("#gr-stick-" + oldValue).detach();
				servicesCacheStickit.stockeDonnees(oldValue, elementDetache);
				element.append(elementARattacher);					
			}*/

			scope.$watch('id', function(newValue, oldValue, scope){

				var elementARattacher = "";
				var deferred = $q.defer();

				if (newValue in servicesCacheStickit.lectureCache()){
					//on a récupéré les stickers d'une page depuis le cache client juste au départ du défilement
					console.log("*****RECUP STICKERS DEPUIS LE CACHE CLIENT");
					elementARattacher = servicesCacheStickit.recupereDonnees(newValue);
					deferred.resolve(elementARattacher);
				}
				else{
					if (oldValue !== newValue){
						//console.log("===================================", newValue);							
						servicesStickit.recupereStickers(newValue)
							.then(function(data){
								//on a récupéré les stickers d'une page depuis le serveur juste au départ du défilement
								deferred.resolve(data);
								console.log("-----RECUP STICKERS DEPUIS LE SERVEUR");	
								//console.log(promise);															
							}, function(error){
								// Par défaut, on créé un groupe stickers, on passe donc en resolve la promise, pas en reject
								data = "<groupe-stickers style='visibility  : hidden' id='gr-stick-" + newValue + "'>" + newValue + "</groupe-stickers>";
								deferred.resolve(data);
								console.log("+++++REMPLISSAGE PAR DEFAUT");									
								//A AMELIORER POUR PRENDRE EN COMPTE LE CAS OU IL Y A UN REEL PROBLEME 
							});
					}
					else {
						//console.log("####################################", newValue);						
						deferred.reject();  //la page est chargée pour la première fois, le serveur a déjà chargé les stickers
						console.log("~~~~~~ON CHARGE DEPUIS LA PREMIERE FOIS", newValue);						
					}
				}

				deferred.promise
				.then(function(_elementARattacher){
					/*if (_elementARattacher){
						_elementARattacher = $compile(_elementARattacher)(scope);					
						if (oldValue !==  newValue){*/
							console.log("XXXXXXXXXXXXXX DETACH  : ", oldValue, " ATTACH : ", newValue, " XXXXXXXXXXXXXX");
							_elementDetache = element.find("#gr-stick-" + oldValue).detach();
							servicesCacheStickit.stockeDonnees(oldValue, _elementDetache);

							_elementARattacher = $compile(_elementARattacher)(scope);
							console.log(_elementARattacher);
							element.append(_elementARattacher);	
							
					/*	}						
					}*/
				});


/*				//console.log("mise a jour panneau " + newValue);
				var promise = $q.when('start'), elementARattacher = "";				
				if (newValue in servicesCacheStickit.lectureCache()){
					promise = servicesCacheStickit.recupereDonnees(newValue);
				}
				else{
					if (oldValue !== newValue){
						promise = servicesStickit.recupereStickers(newValue);
						//elementARattacher = $compile(elementARattacher)(scope);
						//console.log(elementARattacher);	
					}
				}

				promise
				.then(function(data){
					elementARattacher = data;
				}, function(error){
					elementARattacher = "<groupe-stickers style='visibility  : hidden' id='gr-stick-" + newValue + "'>" + newValue + "</groupe-stickers>";
				})
				.done(function(){
					elementARattacher = $compile(elementARattacher)(scope);					
					if (oldValue !==  newValue){
						elementDetache = element.find("#gr-stick-" + oldValue).detach();
						servicesCacheStickit.stockeDonnees(oldValue, elementDetache);
						element.append(elementARattacher);	
					}					
				});*/
					

				


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


module_stickit.directive('sticker', ['servicesStickit', '$compile',  '$timeout',
	function(lesServicesStickit, $compile, $timeout){

	return {
		restrict : 'A', 
		scope : {

		},

		link : function(scope, element, attributes){
				var idSticker = lesServicesStickit.obtientNumeroValide();

			$timeout(function(){
				if (!element.attr('id_serveur'))	
					element.attr('id_client', 'stickerInstance_' + idSticker);
				//console.log("YOUPIIIIII " + element.attr('id_serveur'));
				//console.log(element.parents(".container-stickers"));
				element				
				.find(".titreSticker").html(idSticker).end()
				.draggable({
					cursor : 'move', 
					containment : element.parents(".container-stickers"),	
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
					containment : element.parents(".container-stickers"),
					minHeight : 80,
					minWidth : 200,
					maxHeight : 160,
					maxWidth: 250,					
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
	var identifiantGroupe_enCours = "";



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

	les_services_stickit.sauverStickersDunGroupe  = function(id){

		var url = "/stickit/groupe-stickers/" + id + "/";
		var stickersASauver  = $("#gr-stick-" + id).children();

		var elementsJSON = $.map(stickersASauver, function(elementDOMSticker, cle){
			elementSticker = $(elementDOMSticker);
			contenuSticker = elementSticker.find(".contenuSticker");
			//contenantSticker = $(elementDOMSticker).find(".contenantSticker");
			//console.log($(elementDOMSticker).position());
			return  donnees = {
				'style' 		: contenuSticker.attr("style"),
				'contenu' 		: contenuSticker.html(),
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




	les_services_stickit.obtientNumeroValide = function(){
		return identifiantGroupe_enCours + "_" + ++counterStickers;
	}




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






module_stickit.factory('servicesCacheStickit', [ '$q', 
	function($q){

	var les_services_cache = {};
	var cache = {};

	function ObjetStocke(){
		this.donnees = "";
		this.modifsNonSauvees = false;
	}


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
		console.log(cache);	
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