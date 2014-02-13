module_stickit.directive('contenuSticker', ['servicesControlesStickit', 'servicesUpdateStickit',
	function(servicesControlesStickit, servicesUpdateStickit){

		return {
			restrict : 'AE', 
			link : function(scope, element, attributes){
				element
				.on('click', function(event){
					if (scope.options.modeDesign){
						servicesControlesStickit.stickerEnCours = scope.idSticker;
						scope.$apply(servicesControlesStickit.optionsCurseur());			
					}
				})
				.on("keyup", function(event){
					if (scope.options.modeDesign){
						scope.$apply(servicesControlesStickit.optionsCurseur());
					}
				})		
				.on("mousedown", function (event) {
				    event.stopPropagation();
				})
				.on("mouseenter", function(ui, event){
					//console.log(servicesControlesStickit.stickerEnCours, ", ", scope.idSticker);
					if (scope.options.modeDesign && (servicesControlesStickit.stickerEnCours == scope.idSticker)){
						$(this).focus();						
					}
			
				})
				.on('dragenter', function(event){
					console.log("evenement deplacable entrant ");
					if (scope.options.modeDesign){
						$(this).focus();						
					}					
				})
				.on('drop', function(event){

					var files = event.originalEvent.dataTransfer.files; 
					
					if (files.length){
						//element.focus;
						var position = window.getSelection().getRangeAt(0).startOffset;
						console.log( "focus : ", window.getSelection().getRangeAt(0), ", caret : ", position);
						event.preventDefault();
						event.stopPropagation();
						var range = window.getSelection().getRangeAt(0); 
						for (var i=0 ; i <files.length ; i++) {
							servicesUpdateStickit.uploadFiles(files[i], range, scope);
    					}	
					}
				})

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
				.draggable({
					cursor : 'move',
					containment : $("defileur")
				})/**/
				.on("click", function(event, ui){
					//console.log("wizaaaa");
				})
				servicesStickit.associeActionsAuxBoutons(element, scope);

			}

		}


}]);




module_stickit.factory('servicesControlesStickit', function(){

	var les_services_stickit_controles = {};
	les_services_stickit_controles = {parametrages : {}, curseur : {} };
	//les_services_stickit_controles.bold = 12345 ;
	les_services_stickit_controles.stickerEnCours = -1;


	les_services_stickit_controles.parametrages.max_fontsize = 7;	//--- ?
	les_services_stickit_controles.parametrages.min_fontsize = 1;	//--- ?		
	les_services_stickit_controles.parametrages.fontnames = [
	    'Arial'			,
	    "Times New Roman"	,
	    "cursive"			,
	    "fantasy"			,
	    /*"monospace"		,*/
	    "Comfortaa"			    
	  ];



	les_services_stickit_controles.curseur.bold = false;
	les_services_stickit_controles.curseur.italic = false;
	les_services_stickit_controles.curseur.underline = false;	
	les_services_stickit_controles.curseur.fontsize = 2;
	les_services_stickit_controles.curseur.stroke = false;
	les_services_stickit_controles.curseur.underline = false;
	les_services_stickit_controles.curseur.colortext = "#000000";
	les_services_stickit_controles.curseur.backgroundcolor = "#ffffff";
	les_services_stickit_controles.curseur.fontname = les_services_stickit_controles.parametrages.fontnames[2]; 


	les_services_stickit_controles.optionsCurseur = function(){
		var optionsCurseur = {};

		optionsCurseur.bold = les_services_stickit_controles.curseur.bold = document.queryCommandState("bold", false, null);
		optionsCurseur.italic = les_services_stickit_controles.curseur.italic = document.queryCommandState("italic", false, null);
		optionsCurseur.underline = les_services_stickit_controles.curseur.underline = document.queryCommandState("underline", false, null);
		strFontname = document.queryCommandValue("fontname", false, null);
		strFontname = strFontname.replace(/'/g, "");
		optionsCurseur.fontname = les_services_stickit_controles.curseur.fontname = strFontname;
		console.log(strFontname);

		optionsCurseur.fontsize = les_services_stickit_controles.curseur.fontsize = document.queryCommandValue("fontsize", false, null);
		//console.log("au clic :  ", les_services_stickit_controles.bold);
		return optionsCurseur;
	}


	return les_services_stickit_controles;
});


