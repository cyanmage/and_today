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

	$scope.name = "controleurModuleStickit"; // DEBUG
	$scope.servicesStickit = servicesStickit;
	$scope.controles  =  {'stickit' : servicesControlesStickit};
	$scope.libelleBtnAttachDetach = "Attacher/Détacher";

	
	$scope.toggleModeDesign = function(){

		$scope.options.modeDesign = ! $scope.options.modeDesign;
		/*if ( ! $scope.options.modeDesign ){
			$scope.options.modeModifStickers 	= true;	
			$scope.options.modeModifCadres 		= true;
		}
		console.log($scope.options.modeDesign);*/		
	}

	$scope.toggleModeModifStickers = function(){
		//console.log("toggle mode sticker ");	
			$scope.options.modeModifStickers = ! $scope.options.modeModifStickers;
	}

	$scope.toggleModeModifCadres = function(){
		$scope.options.modeModifCadres = ! $scope.options.modeModifCadres;
		//console.log("je change .. ", $scope.options.modeModifCadres, "scope : ", $scope.$id);
	}

	
	/*$scope.toggleModeModifBackground = function(){
		$scope.options.modeModifBackground = ! $scope.options.modeModifBackground;
	}*/


	$scope.sauvegarder = function(){

		servicesUpdateStickit
		.sauvegarder($scope.id)
		.then(function(data){
			//console.log("conteoeur, sauvegarde");
				var message = "SAUVEGARDE EFFECTUEE POUR LE " + $scope.id;
				$scope.$emit("WARNING_DISPLAY",  {	'message' : message, 'id_groupe' : $scope.id });
				$scope.$broadcast("STICKIT.ELEMENTS_SAUVES", data);
			}, function(error){
				var message = "ECHEC DE LA SAUVEGARDE POUR LE " + $scope.id;
				$scope.$emit("WARNING_DISPLAY",  {	'message' : message, 'id_groupe' : $scope.id });				
			});/**/
	}	


	$scope.$on("APPLICATIONS.ENVOI_ID", function(event, data){
		var ancien_id = $scope.id;
		$scope.id = nouvel_id = data.id;
		//console.log($scope.id);

		if(ancien_id !== nouvel_id){
			//console.log("options qui vont etre sauvees pour le ", ancien_id, " ...", $scope.options);
			servicesCacheStickit.stockeOptions(ancien_id, $scope.options);	

			if (servicesCacheStickit.contient(nouvel_id) ){
				$scope.options = servicesCacheStickit.recupereOptions(nouvel_id);

			//console.log(	"recuperation des donnees cache pour les options, id : ", nouvel_id);
			}
			else{
				$scope.options = servicesInitialisationStickit.recupereOptionsParDefaut();	
			}

			//console.log(servicesCacheStickit.retourneCacheEntier());
			//console.log(servicesCacheStickit.recupereOptions(nouvel_id));
			/*if  (! $scope.$$phase) 
				$scope.$apply();*/
			//console.log("options qui vont etre recuperees pour le ", nouvel_id, " ...", $scope.options);			
		}
	});



}]);





module_stickit.controller("controleur-sticker", ['$scope',  'servicesUpdateStickit', 'servicesStickit',
	function($scope, servicesUpdateStickit, servicesStickit){

		/*DEBUG$scope.controller = "controller-sticker";*/

		$scope.sauveSurServeur = false;	
		$scope.stickerModified = false; 		
		$scope.suppression 		= false;
		$scope.stickerVisible =  false; 

		$scope.servicesStickit = servicesStickit; 

		$scope.supprimerSticker = function(){
			$scope.suppression = true;
			//console.log("suppression dans scope sticker, ", $scope.$id);
		}


		$scope.boiteAOutils = function () {
			servicesStickit.stickerSelectionne = $scope.boiteAOutils_deploye ? -1 : parseInt($scope.idSticker, 10);
			$scope.boiteAOutils_deploye = ! $scope.boiteAOutils_deploye;
		}

		$scope.$watch(function(){
			return $scope.options && ( ! $scope.options.modeDesign || $scope.options.modeModifStickers);
			//return options && ( ! options.modeDesign || options.modeModifStickers);
		}, function(newValue, oldValue){
			//console.log(newValue);
			$scope.stickerVisible = newValue;
		})


		/*$scope.$watch(function(){
			var options = $scope.options;
			return options && options.modeDesign && options.modeModifStickers;
		}, function(newValue, oldValue){
			$scope.outilsStickerVisible = newValue;
		})*/

		/*$scope.$watch("servicesStickit.stickerSelectionne", function(newValue, oldValue){
								console.log("AVANT TEST : ", oldValue, newValue);
			if (newValue !== -1  && oldValue === parseInt($scope.idSticker, 10)){
					$scope.boiteAOutils_deploye = ! $scope.boiteAOutils_deploye;
					//element.focus();				
			}
		});*/

	
}]);


module_stickit.controller("controleur-cadre", ['$scope', '$log',
	function($scope, $log){

		$scope.sauveSurServeur = false;	
		$scope.suppression = false;

		var options = $scope.options;

		$scope.$watch(function(){
			return $scope.options && ( ! $scope.options.modeDesign || $scope.options.modeModifCadres);
		}, function(newValue, oldValue){
			$scope.cadreVisible = newValue;
			
			/*if ($scope.options){
				console.log(/*"options : ", $scope.options, '$id : ', $scope.$id,	
					"            mode design : ", ! $scope.options.modeDesign, 
					"           , mode modif cadres : ", $scope.options.modeModifCadres, 
					"           , -->resultat (newValue): ", $scope.cadreVisible
							);	
				}*/
			
			//if (options) console.log("changements", $scope.idCadre, "////  design : ", options.modeDesign, ", modifcadres : ", options.modeModifCadres) ;
		});


		$scope.$watch(function(){
			return $scope.options && ($scope.options.modeDesign && $scope.options.modeModifCadres);
		}, function(newValue, oldValue){
			//console.log("on revient (outils)!!!!!");
			//if (options) console.log("changements", $scope.idCadre, "////  design : ", options.modeDesign, ", modifcadres : ", options.modeModifCadres) ;			
			$scope.outilsCadreVisible = newValue;
		})




		$scope.supprimerCadre = function(id){
			//console.log('suppression dans scope sticker : ', $scope.$id);
			$scope.suppression = true;
		}

		$scope.opacity = 1;/**/

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
									var copie = $("div#motif-sticker").clone()
												.removeAttr("id")
												.addClass("helperCreationSticker")
												.css("z-index", 200)
												.css("visibility", "visible");
									return copie;/**/
									}

				});	
		}
	}


}]);





module_stickit.directive('createCadreImage', [function(){

	return {			
		restrict : 'A',
		link : function(scope, element, attributes){
				element.draggable({
					cursor : 'move',
					containment : $(".defileur"),
					helper : function(){
						var copie = $("div#motif-cadre .cadre").clone()
								.removeAttr("id")
								.addClass("helperCreationCadre")
								.css("z-index", 200)
								.removeClass("hidden");
						return copie;
					}, 
					//drag : function() {console.log("creation cadre imafe ... ", scope.$id);}

				});
		}
	}


}]);

module_stickit.directive("cadre", ['$timeout', '$compile', 'servicesStickit', 'servicesUpdateStickit',
 	function($timeout, $compile, servicesStickit, servicesUpdateStickit){

 	//var templateURL = '/stickit/partials/motif_cadre.html';	
 	//var templateURL = "<div test></div>"

	return {
		restrict : 'AE', 
		//replace : true,
		//template : "<div test style='width : 300px; height : 200px ; background-color : #6DAD8A'></div>",
		//templateUrl : templateURL,
		link : function(scope, element, attributes){
		//console.log("a l'arrach");	
			/*var elementsSurvoles = function(){

			}	*/		


			$timeout(function(){

				var cadreImage 				= element.find(".cadreImage");
				var parent 					= element.parents(".container-stickers");
				var recipiendaireFichier 	= element.find(".recipiendaireFichier");
				var controleTransparence 	= element.find(".controleTransparence");				
				var boutonSupprimerCadre 	= element.find(".boutonSupprimerCadre");


				var id_cadre = element.attr('id_cadre');

				if (id_cadre){
					scope.sauveSurServeur = true;
					//console.log("dans le cadre , tests draggable, resizable");
				}	
				else{
					id_cadre = '_cd_' + servicesStickit.obtientNumeroValideCadre();
					element
						.attr('id_cadre', id_cadre)
					cadreImage.attr("default", 'default');	
					recipiendaireFichier.addClass("recipiendaireFichierSurvol");
					controleTransparence.addClass("controleTransparenceSurvol");
					boutonSupprimerCadre.addClass("boutonSupprimerCadreSurvol");		
				}

				scope.idcadre = id_cadre;				
				servicesUpdateStickit.ajouteAuRegistre(scope.id,  id_cadre);/**/
//console.log("avant le draggable");
				element
					.draggable({containment : parent, 	cursor : 'move'/*, 		disabled : true	*/})
					.resizable({containment : parent,   handlers : "e, s, se", create : function(ui, event){
					//console.log("resizable cree .... !");
				}	
				/*disabled : true*/});

				element.on("mouseenter", function(event, ui){
					if (scope.options.modeDesign){
						//console.log("entre, ", scope.options.modeDesign);					
						recipiendaireFichier.addClass("recipiendaireFichierSurvol");
						controleTransparence.addClass("controleTransparenceSurvol");
						boutonSupprimerCadre.addClass("boutonSupprimerCadreSurvol");	
					}
				})/**/
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
				})/**/
				/*.on("click", function(event, ui){
					if (scope.options.modeDesign){

					}
				})*/

				scope.$on("STICKIT.ELEMENTS_SAUVES", function(event, data){
					//scope.cadreModified = false;	
					var associationsIdsClientServeur = data.associationsCadres;				
					if (associationsIdsClientServeur && associationsIdsClientServeur[scope.idCadre]){
						console.log("associations cadres : ", data.associationsCadres);
						var nouvel_id = associationsIdsClientServeur[scope.idCadre];	
						scope.idcadre = nouvel_id;
						element.attr("id_cadre", nouvel_id);				
				  	}
				});/**/

				/*var dereferenceurModeDesign = scope.$watch("options.modeDesign", function(newValue, oldValue){
//					console.log("dans le watch modedesign pour tester le draggable et le resizable ... //oldValue : ", oldValue, " ; newValue : ", newValue, ", journee : ", scope.id);
					//if (newValue !== oldValue){
						if (newValue)
							{
								element.draggable("enable") .resizable("enable")  ; 
								//console.log("je suis active, id_cadre ", scope.idcadre, "$id : ", scope.$id);
								}
						else
							{
								element.draggable("disable").resizable("disable") ; 
								//console.log("je suis desactive, id_cadre ", scope.idcadre, "$id : ", scope.$id);
							};
						//console.log("DEREFENCEUR : ", newValue);
					//}
				});*/

					scope.$watchCollection("options", function(newValue, oldValue){
					//console.log("dans la directive cadre ... ");
					//console.log("voici les options mises à jour dans le cadre ", scope.idCadre, " : ", newValue);

				});/*	*/

				/*scope.$watch("opacity", function(newValue, oldValue){
					if (newValue !== oldValue){
						//console.log("opacite : ", newValue, "oldVlue : ", oldValue, ", scope : ", scope.$id);
						cmage.css("opacity", newValue);					
					}
	
				})*/
				


	
				scope.$watch('suppression', function(newValue, oldValue){

					//console.log("suppression watch directive", scope.idcadre, newValue, ", scope : ", scope.$id);
					if(newValue){
						servicesUpdateStickit
						.supprimer(element, scope.idcadre )
						.then(	function(){
									//dereferenceurModeDesign();
									var message = "SUPPRESSION EFFECTUEE POUR LE " + scope.idcadre;
									scope.$emit("WARNING_DISPLAY", { 'message' : message, 'id_groupe' : scope.idcadre });
								}, 
								function(error){
									var message = "ECHEC DE LA SUPPRESSION POUR LE " + scope.idcadre;								
									scope.$emit("WARNING_DISPLAY",  { 'message' : message, 'id_groupe' : scope.idcadre });				
								});						
					}

				});	/**/

			});	
		}
	}
}]);




module_stickit.directive('recipiendaireFichier', ['servicesUpdateStickit',
	function(servicesUpdateStickit){

		return {
			restrict : 'AE',
			link : function (scope, element, attributes){
				var parent = element.parents("[cadre]");
				var cadreImage = parent.find(".cadreImage");
				var selecteurFichiers = parent.find(".selectFiles");

				selecteurFichiers
				.on("change", function(event){

					var file = event.target.files[0];
				
					var id_blob = window.URL.createObjectURL(file); 
					servicesUpdateStickit
					.uploadFiles(file, id_blob)
					.then(function(associations){
						cadreImage
							.attr('src', associations[id_blob])
							.removeAttr('default');
						window.URL.revokeObjectURL(id_blob);
					});	

				});

				element
				.on("click", function(event){
					event.preventDefault();
					event.stopPropagation();

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
								image
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






module_stickit.directive('sticker', ['servicesStickit', '$compile',  '$timeout', 'servicesUpdateStickit', 'servicesControlesStickit',
	function(servicesStickit, $compile, $timeout, servicesUpdateStickit, servicesControlesStickit){
	
	return {
		restrict : 'AE', 
	
		link : function(scope, element, attributes) {


			$timeout(function() {
				//console.log("scope du sticker ------------------------------------>", scope.$id);
				element
				.css("position", "absolute")
				//.attr("ng-class", '{visible : options.modeDesign && options.modeModifStickers, hidden : ! options.modeDesign || ! options.modeModifStickers}')
				.attr("modedesign", '{*options.modeDesign*}')
				.attr("modeModifSticker", '{*options.modeModifStickers*}')	
				.addClass("collideEnable");

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
					.find(".titreSticker").html(id_sticker + ", " + scope.$id).end()
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
					})
					.resizable({
							handlers : "e, s, se",
						    stop 	: function(event, ui){	
						    					$(this).addClass	("collideEnable"); 
						    					},
						    start 	: function(event, ui){	
						    					$(this).removeClass	("collideEnable"); 
						    },	
						   	collision : true,
						    obstacle : ".collideEnable", 				
						    containment : element.parents(".container-stickers"),
							minHeight : 80,
							minWidth : 200
					});				
			}, 1);


			/*scope.$watch('stickerModified', function(newValue, oldValue){
				if (newValue){
					servicesUpdateStickit.indiqueAuRegistreModifSticker(scope.id, scope.idSticker);
				}
			});*/

			element.on("click", function (event, ui) {
				// body...
				//console.log("Je reagis");
			})


			scope.$on("STICKIT.ELEMENTS_SAUVES", function(event, data){
					//console.log("associations stickers : ", data.associationsStickers);				
				scope.stickerModified = false;	
				var associationsIdsClientServeur = data.associationsStickers;			
				if (associationsIdsClientServeur && associationsIdsClientServeur[scope.idSticker]){
					var nouvel_id = associationsIdsClientServeur[scope.idSticker];	
					scope.idSticker = nouvel_id;

					element 
				  		.attr("id_sticker", nouvel_id)				
				  		.find(".titreSticker").html(nouvel_id);
			  	}
			});/**/

			scope.$watch('suppression', function(newValue, oldValue){
				//console.log("demande de suppression", newValue, "id_scope : ", scope.$id);
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
							scope.suppression = false ;
						});	

				}
			});/**/


			/*scope.$watch('servicesStickit.stickerSelectionne', function(newValue, oldValue){
				newValue == -1 ?
			}*/
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
			//console.log('$id : ', scope.$id, ', parent : ', scope.$parent.$id);
			scope.name = "containerStickers"; // DEBUG
			
			element.droppable({
				containment : $("[emplacement='centre']").find(".container-stickers"),
				tolerance : 'fit',
				drop : function(event, ui){

					//console.log("groupe-stickers-cadres : ", scope.id);
					var groupeStickersCadres = element.find("groupe-stickers-cadres");
					console.log(groupeStickersCadres.scope());

					if (ui.helper.hasClass("helperCreationSticker")){

						var coordonnees = ui.helper.offset();
  						
						var sticker = $("div#motif-sticker .sticker").clone().attr("sticker", '');
						sticker.find(".contenuSticker").attr("contenteditable", "{*options.modeDesign*}");
						sticker = $compile(sticker)(scope);
						//console.log(groupeStickersCadres);

  						sticker.appendTo(groupeStickersCadres).offset(coordonnees);

						/*OBLIGE DE PLACER LE CONTROLEUR EN DEHORS SINON BUG IE ET FIREFOX ... mystère
						//var sticker = ui.helper.contents().clone().attr("sticker", ''); 
  						var ensemble = $("<div ng-controller='controleur-sticker'></div>").append(sticker);
  						ensemble = $compile(ensemble)(scope);
  						ensemble.appendTo(groupeStickersCadres);
  						ensemble.find("[sticker]").offset(ui.helper.offset());/**/
						var nombreStickers = groupeStickersCadres.attr("nombrestickers");  							
  						groupeStickersCadres.attr("nombrestickers", ++nombreStickers); 

					}
					else if (ui.helper.hasClass("helperCreationCadre")){
						
						var coordonnees = ui.helper.offset();	

						var cadre = $("div#motif-cadre .cadre").clone().attr("cadre", '');	
						//console.log($("div#motif-cadre .cadre"));					
  						cadre.appendTo(groupeStickersCadres)
  							.css("position", "absolute")
  							.offset(coordonnees);
  						cadre = $compile(cadre)(scope);
  						  									
						/*cadre.css("position", "absolute");	*/



						//console.log(ui.helper.offset());
  						/*var cadre = $("<creationcadre></creationcadre>)");
  						cadre.appendTo(groupeStickersCadres).offset(ui.helper.offset());
						cadre = $compile(cadre)(scope);*/
						//console.log(cadre.offset());
						//cadre.offset(ui.helper.offset());
						/*.css('position', 'absolute')*/
						//console.log(cadre.offset());						
  						//cadre.css('position', 'absolute').offset(ui.helper.offset());  						

  						//groupeStickersCadres.append(cadre);.offset(coordonnees )
						//var cadre = $("<cadre ng-controller='controleur-cadre' ></cadre>)");
						//console.log(cadre);						
					}/**/	

					/*else if (ui.helper.hasClass("helperCreationCadre")){
						var coordonnees = ui.helper.offset();

						//console.log("1) ", $("div#motif-cadre .cadre"));
  						

						//cadre.find(".contenucadre").attr("contenteditable", "{*options.modeDesign*}");
						//console.log("2) ", $("div#motif-cadre .cadre"));						
						//console.log("scope cadre  container : ", scope.$id);

						var cadre = $("<cadre></cadre>)");
						cadre = $compile(cadre)(scope);


  						cadre.appendTo(groupeStickersCadres).offset(coordonnees);
					}*/
						/*var cadre = $("div#motif-cadre").contents().clone();
						cadre = $compile(cadre)(scope);*/
				},		
				accept : function(element){
					return true;
						//return ($(".helperCreationSticker").collision(".collideEnable").length == 0);
				}
	
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
						servicesStickit.recupereElements(newValue)
							.then(function(data){
								//on a récupéré les stickers d'une page depuis le serveur juste au départ du défilement
								data = $compile(data)(scope);									
								deferred.resolve(data);
								//console.log("-----RECUP STICKERS DEPUIS LE SERVEUR");	
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
						deferred.reject();  //la page est chargée pour la première fois, le serveur a déjà chargé les stickers
						//console.log("~~~~~~ON CHARGE DEPUIS LA PREMIERE FOIS", newValue);						
					}
				}

				deferred.promise
				.then(function(_elementARattacher){
							//console.log("XXXXXXXXXXXXXX DETACH  : ", oldValue, " ATTACH : ", newValue, " XXXXXXXXXXXXXX");
							var _elementDetache = element.find("#gr-stick-cadre-" + oldValue).detach();
							servicesCacheStickit.stockeDonnees(oldValue, _elementDetache);
							element.append(_elementARattacher);	
				});
			});






		}
	}


}]);


module_stickit.directive('groupeStickersCadres', ['servicesCacheStickit', '$timeout',
	function(servicesCacheStickit, $timeout){

	return{
		restrict : 'E',
		scope : false,
		link : function(scope, element, attributes){
			scope.name = "groupeStickersCadres"; // DEBUG

			$timeout(function(){
				scope.$watch("options.modeDesign", function(newValue, oldValue){
					var children = element.find("[cadre]");
					newValue ? 
						children.draggable("enable") .resizable("enable")/*console.log("true") : */:
						children.draggable("disable").resizable("disable");
				});	
			})

		}

	}

}]);





module_stickit.directive('contenuSticker', ['servicesStickit', 'servicesControlesStickit', 'servicesUpdateStickit', '$compile',
	function(servicesStickit, servicesControlesStickit, servicesUpdateStickit, $compile){

		return {
			restrict : 'AE', 
			link : function(scope, element, attributes){
	
				element
				.on('click', function(event){
					if (scope.options.modeDesign){
						servicesStickit.stickerSelectionne = scope.idSticker;
						//console.log("text", element.text());
						element.text() ? 
							scope.$apply(servicesControlesStickit.optionsCurseur())			:							
							scope.$apply(servicesControlesStickit.optionsCurseurParDefaut ());	
					}
				})
				/*.on("keyup", function(event){
					//console.log(servicesControlesStickit.optionsCurseur());
					if (scope.options.modeDesign){
						scope.$apply(servicesControlesStickit.optionsCurseur());
					}
				})
				.on("focusout", function(event){
					servicesControlesStickit.saveSelection();
					//console.log()
				})*/	
				.on("mousedown", function (event) {
					//console.log("test")
				    event.stopPropagation();
				})
				/*.on("mouseenter", function(ui, event){
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
				});*/


				/*scope.$watch("servicesStickit.stickerSelectionne", function(newValue, oldValue){
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
				});*/


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
	var counterCadres = 0;

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
		return "_" + ++counterCadres;
	}

	return les_services_stickit;
}]);







module_stickit.factory('servicesCacheStickit', [ '$q', 
	function($q){

	var les_services_cache = {};
	var cache = {};

	/*les_services_cache.retourneCacheEntier = function(idRecuperation, options){
		return 		cache;
	}*/

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

			var deferred = $q.defer();
			deferred.resolve(); 
		/*var fenetreConfirmation = $('#modalConfirmation');
		var btn_confirmer = $('#modalConfirmation').find(".confirmer");
		var btn_infirmer = $('#modalConfirmation').find(".infirmer");	


		$('#modalConfirmation').modal();	

		btn_confirmer.on("click", function(){ deferred.resolve(); fenetreConfirmation.modal('hide'); })

		btn_infirmer .on("click", function(){ deferred.reject() ; fenetreConfirmation.modal('hide'); })*/

		return deferred.promise;
	}


	les_services_stickit_update.supprimer = function(element, idElement){
		//console.log("SUPPRESSION EN PREPARATION SUR LE CLIENT");
		var deferred1= $q.defer(), deferred2 = $q.defer();

		var prefixe = idElement.substring(0, 4);
		if(prefixe == "_cd_" || prefixe == "_st_"){
			deferred1.resolve();			  		
		}
		else{
			var url ;	
			if (typeof element.attr('sticker') !== 'undefined')
				url = "/stickit/sticker/" + idElement + "/";
			else if (typeof element.attr('cadre') !== 'undefined')
				url = "/stickit/cadre/" + idElement + "/";

			var donneesEnvoyees = { 'idElement' : idElement };
			$http['delete'](url, donneesEnvoyees) /// FUCKING HACK FOR IE SHIT ... $http.delete() ...
			.success(function(data, status){ 
				deferred1.resolve()})
			.error(function(error, status){
				$("html").html(error);
				deferred1.reject("echec_suppression");
			});
		}


		deferred1.promise.then(function(){
			element
				.addClass("transitionVersSuppression")
				.addClass("suppression")		 
			  	.on("transitionend  webkitTransitionEnd", function(){
			  		element.remove();
			  		deferred2.resolve();	
			  	 })			
		});
		return deferred2.promise;

	}



	les_services_stickit_update.sauvegarder  = function(idGroupe){

		var stickersASauver  = $("#gr-stick-cadre-" + idGroupe).find("[sticker]");
		//console.log("stickers : ", stickersASauver );		
		//console.log($("#gr-stick-cadre-" + idGroupe));		
		var elementsJSONSticker = $.map(stickersASauver, function(elementDOMSticker, cle){
			var	elementSticker = $(elementDOMSticker);
			var id_sticker = elementSticker.attr("id_sticker");
			//if (listeStickersModifies.indexOf(id_sticker) !== -1){
			if(true){
				console.log(id_sticker);
				var contenuSticker = elementSticker.find(".contenuSticker");
				//console.log(id_sticker, contenuSticker);

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


		var cadresASauver  = $("#gr-stick-cadre-" + idGroupe).find("[cadre]");
		console.log("cadres : ", cadresASauver, " , idgroupe : ", idGroupe );
		var elementsJSONCadre = $.map(cadresASauver, function(elementDOMCadre, cle){
			var	elementCadre = $(elementDOMCadre);
			var id_cadre = elementCadre.attr("id_Cadre");
			//if (listeCadresModifies.indexOf(id_cadre) !== -1){
			if(true){
				//console.log(id_cadre);
				var cadreImage = elementCadre.find(".cadreImage");
				//console.log(cadreImage.attr("default"), parseFloat(cadreImage.css("opacity"), 10).toFixed(2));
				return  donnees = {
					'opacity' 		: parseFloat(cadreImage.css("opacity"), 10).toFixed(2),
					'filename' 		: (cadreImage.attr("default") || cadreImage.attr("src")),
					'top' 			: elementCadre.position().top,
					'left' 			: elementCadre.position().left,
					'width'			: elementCadre.width(),	
					'height'		: elementCadre.height(),				
	
					'id_cadre' 		: id_cadre
				}					
			}
		});

		console.log(elementsJSONCadre);
		console.log(elementsJSONSticker);/**/

		var url = "/stickit/groupe-elements/" + idGroupe + "/";
		var deferred = $q.defer();
		var donneesEnvoyees = {'id_groupe' : idGroupe, 'donneesStickers' : elementsJSONSticker, 'donneesCadres' : elementsJSONCadre};
		//console.log(url);	

		$http.post(url, donneesEnvoyees)
			.success(function(data, status){
				console.log(angular.toJson(data));
				//console.log(data);
				deferred.resolve(data);
			})
			.error(function(error, status){
				$("html").html(error);
				deferred.reject(error);
			});

		return deferred.promise;
	}



	/*function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
	        var cookies = document.cookie.split(';');
	        for (var i = 0; i < cookies.length; i++) {
	            var cookie = jQuery.trim(cookies[i]);
	             //Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}*/


	les_services_stickit_update.uploadFiles  = function(files, id_blob){

		var deferred = $q.defer();

		var formData = new FormData();		
        formData.append(id_blob, files);  		
	
		var url = "/stockeImage/";  
		
		$http({
		    method: 'POST',
		    url: url,
		    data: formData,
			transformRequest: angular.identity,		    
		    headers: {'Content-Type': undefined}
		})
		.then(function(reponseServeur) {
			var associations = reponseServeur.data;    		               
   		    deferred.resolve(associations);
   		}, function(error) {
   		              $("html").html(error);    
   		              deferred.reject(false);    
   		});
		
   		return deferred.promise;	
    }



	return les_services_stickit_update;
}]);

