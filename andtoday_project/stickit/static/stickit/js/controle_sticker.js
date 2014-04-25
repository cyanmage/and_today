


/*/////////////////////////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////////////////////////*/
/*                                                                                 */
/*                                 Controleurs                                     */
/*                                                                                 */
///////////////////////////////////////////////////////////////////////////////////*/
/////////////////////////////////////////////////////////////////////////////////////

module_stickit.controller('controleur_Controles', ['$scope', 'servicesControlesStickit',
	function($scope, servicesControlesStickit) {
	//console.log("coucou !!");

	$scope.ongletSelectionne = 2;
	$scope.fontcolor_deploye = true;
	$scope.backgroundcolor_deploye = true;	
	$scope.boiteAOutils_deploye = false;
	$scope.b_justifySelectionne = "justifyLeft";


	$scope.toggle = function(property){
		$scope[property] = ! $scope[property];
	}	

	$scope.selectLayer = function(numeroOnglet){
		//console.log("selectionne : ", numeroOnglet);
		$scope.ongletSelectionne = numeroOnglet;
	}

	$scope.testLayer = function(numeroOnglet){
		return numeroOnglet !== $scope.ongletSelectionne; 
	}

	$scope.etatControle = function(optionControle){
		//console.log(optionControle, ", ", $scope.controles[optionControle]);
		return servicesControlesStickit[optionControle];
	}/**/

	$scope.etatControleJustify = function(valeurJustify){
		//console.log(optionControle, ", ", $scope.controles[optionControle]);
		return valeurJustify == servicesControlesStickit["justify"];
	}/**/


	$scope.handlerControles =  function(optionControle, valeur){

/*		if (optionControle in ["bold", "italic", "underline"]){
			document.execCommand([optionControle], false, null);
			servicesControlesStickit[optionControle] = ! servicesControlesStickit[optionControle];			
		}*/
		//console.log("test");



		if (optionControle == "bold"){
			//console.log("bold");
			//servicesControlesStickit.keepSelection(); 

    		////servicesControlesStickit.optionsCurseur();	
    		document.contentEditable = true;
			document.execCommand('bold', false, null);
   			document.contentEditable = false;			
			servicesControlesStickit.bold = ! servicesControlesStickit.bold ;
		}

		if (optionControle == "italic"){
			//servicesControlesStickit.keepSelection(); 			
			document.execCommand('italic', false, null);
			servicesControlesStickit.italic = ! servicesControlesStickit.italic ;
		}

		if (optionControle == "underline"){
			//servicesControlesStickit.keepSelection(); 			
			document.execCommand('underline', false, null);
			servicesControlesStickit.underline = ! servicesControlesStickit.underline ;
		}

		if (optionControle == "fontname"){
			//servicesControlesStickit.keepSelection(); 			
			//console.log($scope.controles.fontname);
			document.execCommand('fontname', false, $scope.controles.stickit.fontname);
			//console.log(servicesControlesStickit.fontname) ;			
		}

		if (optionControle == "fontcolor"){
			//servicesControlesStickit.keepSelection(); 			
			//valeur="rgba(182, 182, 182, 0.1)";
			//document.execCommand("styleWithCSS", true, null);
    		document.execCommand('forecolor', false, valeur);
    		//console.log(valeur);
			servicesControlesStickit.fontcolor = valeur;
		}

		if (optionControle == "backgroundcolor"){
			//servicesControlesStickit.keepSelection(); 			
			//valeur="rgba(182, 182, 182, 1)";	
			//console.log("MAJ backgroundcolor", valeur);		
			servicesControlesStickit.backgroundcolor = valeur;
		}

		if (optionControle == "justify"){
			//servicesControlesStickit.keepSelection(); 			
			//valeur="rgba(182, 182, 182, 1)";	
			//console.log("MAJ backgroundcolor", valeur);	
			document.execCommand(valeur, false, null);
			servicesControlesStickit.justify = valeur;
			//servicesControlesStickit[valeur] = ! servicesControlesStickit[valeur];
			//console.log(valeur, servicesControlesStickit.justify);
		}


	}


	$scope.incremente_fontsize = function(){
			//servicesControlesStickit.keepSelection(); 		
			//console.log(servicesControlesStickit.fontsize + 1, ",", servicesControlesStickit.parametrages.max_fontsize);
		if (servicesControlesStickit.fontsize + 1 <= servicesControlesStickit.parametrages.max_fontsize){

			servicesControlesStickit.fontsize++;
			document.execCommand('fontsize', false, servicesControlesStickit.fontsize);			
		}
	}

	$scope.decremente_fontsize = function(){
			//servicesControlesStickit.keepSelection(); 		
		if (servicesControlesStickit.fontsize - 1 >= servicesControlesStickit.parametrages.min_fontsize){
			servicesControlesStickit.fontsize--;
			document.execCommand('fontsize', false, servicesControlesStickit.fontsize);					
		}
	}


}]);





/*#############################             ###############################          ################################*/
//													  DIRECTIVES													 //
/*#############################             ###############################          ################################*/









module_stickit.directive('controleSticker', ['servicesStickit', '$compile', 'servicesControlesStickit', 
	function(servicesStickit, $compile, servicesControlesStickit){
		//console.log("test");
		return {

			restrict : "AE",
			link : function(scope, element, attributes){
				//console.log("Je créé une directive controle sticker");
				element
				.draggable({
					cursor : 'move',
					containment : $("defileur"), 
					handle : ".barre-actions-controles"
				})/**/
				.on("click", function(event, ui){
					//console.log("wizaaaa");
					console.log("j'ai recu un click, oh bin ca alors !! ");
					servicesControlesStickit.restoreSelection(); 
				})
				//servicesStickit.associeActionsAuxBoutons(element, scope);

			}

		}


}]);


/******//*    directive du composant chromo-selector  *//*******/
module_stickit.directive("chromoSelectorDeploy", ['$timeout', 
	function($timeout){

	return {
		restrict : 'AE', 
		link : function(scope, element, attributes) {
			var elemHorizParent  = element.parents(".ensembleHorizontalControlesSticker");

			$timeout(function() {
				$(".conteneur", elemHorizParent).hide();				
			});
			//console.log(elemHorizParent);
			element.on("click", function(event){
				//event.preventDefault();
				//event.stopPropagation();
				//console.log("toto");
				console.log("clic sur ", attributes.nameControl);/**/
				scope.toggle(attributes.nameControl);
				scope.$apply();
			})
					//

			scope.$watch(attributes.nameControl, function(newValue, oldValue){
				//console.log(newValue, ",", oldValue);
				if (newValue !== oldValue){
						//console.log("execution");
						$(".conteneur", elemHorizParent).toggle("slide", {direction : 'up'}, 500);
				}
			})

		}
	}
}]);

module_stickit.directive('chromoSelector', ['servicesControlesStickit', 'servicesStickit',
	function(servicesControlesStickit, servicesStickit){

	return {
		restrict : 'AE', 
		link : function(scope, element, attributes){

			var elemHorizParent  = element.parents(".ensembleHorizontalControlesSticker");


			var firstTime = true;
			var updatePreview = function() {
			     if (firstTime)
			     	firstTime = false;		// HACK A LA CON POUR FIREFOX LE MONGOL	  
			     else {
			     	//console.log("mise a jour, ");
			     	var color = $(this).chromoselector('getColor').getRgbaString();

		     		scope.handlerControles(attributes.nameProperty, color); 

			     	if (attributes.nameProperty == "backgroundcolor"){
			     		$("[id_sticker=" + servicesStickit.stickerSelectionne + "]").find("contenu-sticker")
			     			.css("background", color);
			     	}
			     	//console.log(attributes.nameProperty, color, scope.$id);  			     	
			     }		


			     if(!scope.$$phase) 
			     	scope.$apply();	
			 };


			scope.$watch(function(){
				return servicesControlesStickit[attributes.nameProperty];
				//return servicesControlesStickit.fontcolor;
			}, function(newValue, oldValue){
				if(newValue != oldValue){
					//console.log("dfsvf");
					element.chromoselector("setColor", newValue );
				}
			})/**/
			//console.log(attributes.nameProperty, ",", attributes.transparency);
			//var isTransparencySet = (attributes.transparency === 'true');
			element.chromoselector({ // Initialise the picker
		        //create: createPreview,
		        update: updatePreview,
		        preview: false,
		        resizable : false,
		        roundcorners: false,
		        panelAlpha: (attributes.transparency === 'true'),
		        panelChannelWidth: 10,
		        /*speed : 250, */
		        autoshow : false,
		        target : $(".conteneur", elemHorizParent),
		        //target : $("#testbcgk", elemHorizParent),
		        width : 100,
		        ringwidth : 14
		    });



			//console.log(attributes.nameProperty, ",", servicesControlesStickit[attributes.nameProperty]);
			element.chromoselector("setColor", servicesControlesStickit[attributes.nameProperty] );
			element.chromoselector("show");
			element.hide();
		}
	}

}]);

/*module_stickit.directive('layerControles', ['servicesControlesStickit', 
	function(servicesControlesStickit) {
	
	return {
		restrict : "AE",
		link : function(scope, element, attributes){
			//console.log(attributes);
			element.on("click", function(event, ui){
				//console.log("panneau clique");
				//servicesControlesStickit.restoreSelection();
				//event.preventDefault();
			});
		}

	}


}]);*/


/******************************************************************************/
/******************************************************************************/
/*******                       LES SERVICES                    ****************/
/******************************************************************************/
/******************************************************************************/


module_stickit.factory('servicesControlesStickit', ['servicesStickit',
	function(servicesStickit){

	var les_services_stickit_controles = {};
	les_services_stickit_controles = {parametrages : {}, curseur : {}, options : {} };
	//les_services_stickit_controles.bold = 12345 ;
	//les_services_stickit_controles.stickerEnCours = -1;


	/*function rgb2hex(rgb){
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		//console.log("rgb : ", rgb);
		return  "#" +
		  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
	}*/

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

	les_services_stickit_controles.fontcolor_deploye = false;	


	les_services_stickit_controles.optionsCurseurParDefaut = function(){
		les_services_stickit_controles.bold = false;
		les_services_stickit_controles.italic = false;
		les_services_stickit_controles.underline = false;	
		les_services_stickit_controles.fontsize = "3";
		les_services_stickit_controles.stroke = false;
		les_services_stickit_controles.underline = false;
		les_services_stickit_controles.fontcolor= "#e6341a";
		les_services_stickit_controles.backgroundcolor = "#ffffff"
		les_services_stickit_controles.fontname = les_services_stickit_controles.parametrages.fontnames[2]; 
		les_services_stickit_controles.justify = "justifyLeft";
	}

	les_services_stickit_controles.optionsCurseurParDefaut(); //initialisation du panneau de controles

	/*les_services_stickit_controles.bold = false;
	les_services_stickit_controles.italic = false;
	les_services_stickit_controles.underline = false;	
	les_services_stickit_controles.fontsize = 2;
	les_services_stickit_controles.stroke = false;
	les_services_stickit_controles.underline = false;
	les_services_stickit_controles.fontcolor= "#e6341a";
	les_services_stickit_controles.backgroundcolor = "#ffffff"//"#6a98c5";
	les_services_stickit_controles.fontname = les_services_stickit_controles.parametrages.fontnames[2]; 
	les_services_stickit_controles.justify = "justifyLeft";*/




	les_services_stickit_controles.optionsCurseur = function(){
		var optionsCurseur = {};
		//console.log("test options curseur");

		optionsCurseur.bold 		= les_services_stickit_controles.bold 		= document.queryCommandState("bold", false, null);
		optionsCurseur.italic 		= les_services_stickit_controles.italic 	= document.queryCommandState("italic", false, null);
		optionsCurseur.underline 	= les_services_stickit_controles.underline 	= document.queryCommandState("underline", false, null);
		
		var strFontcolor =  document.queryCommandValue("forecolor", false, null);
		//console.log(strFontcolor);			
		//strFontcolor = rgb2hex(strFontcolor);
		les_services_stickit_controles.fontcolor = optionsCurseur.fontcolor = strFontcolor;		


		var strFontname = document.queryCommandValue("fontname", false, null);
		strFontname = strFontname.replace(/'/g, "");
		optionsCurseur.fontname 	= les_services_stickit_controles.fontname = strFontname;


		var strFontsize = document.queryCommandValue("fontsize", false, null);
		strFontsize = strFontsize ? parseInt(strFontsize, 10)	: 3;
		optionsCurseur.fontsize = les_services_stickit_controles.fontsize = strFontsize;

		//console.log(document.queryCommandValue("fontsize", false, null), document.queryCommandState("fontsize", false, null));

		optionsCurseur.justify  =	les_services_stickit_controles.justify = 	
		document.queryCommandValue("justifyFull"  , false, null) 	? "justifyFull" 	:
		document.queryCommandValue("justifyCenter", false, null) 	? "justifyCenter"	:
		document.queryCommandValue("justifyRight" , false, null) 	? "justifyRight" 	:		"justifyLeft";	



		return optionsCurseur;
	}






   /*var savedSel = null;
    var savedSelActiveElement = null;

   les_services_stickit_controles.saveSelection = function() {
         // Remove markers for previously saved selection
        if (savedSel) {
            rangy.removeMarkers(savedSel);
        }
        savedSel = rangy.saveSelection();
        savedSelActiveElement = document.activeElement;

    }*/

  /*  les_services_stickit_controles.keepSelection = function() {
		les_services_stickit_controles.saveSelection();
		les_services_stickit_controles.restoreSelection();		
         // Remove markers for previously saved selection
       if (savedSel) {
            rangy.removeMarkers(savedSel);
        }
        savedSel = rangy.saveSelection();//
       savedSelActiveElement = document.activeElement; 

        if (savedSel) {
            rangy.restoreSelection(savedSel, true);// 
               	//console.log(savedSelActiveElement);
            savedSel = null;

            window.setTimeout(function() {
                if (savedSelActiveElement && typeof savedSelActiveElement.focus != "undefined") {
                    savedSelActiveElement.focus();
                }
            }, 1);
        }
    }*/

	var savedRange,isInFocus;
	les_services_stickit_controles.saveSelection = function() {
	  //savedRange = rangy.saveSelection();
	 	 /*  if(window.getSelection) { //non IE Browsers
	    //savedRange = window.getSelection().getRangeAt(0);
 
	    //console.log( savedRange);
	  } else if(document.selection) { //IE
	    savedRange = document.selection.createRange();  
	  } 

	 //console.log(document.activeElement);*/
	}

	les_services_stickit_controles.restoreSelection = function() {
// 		
	  //isInFocus = true;
	  //$("[id_sticker='426']").find("contenu-sticker").focus()
	  //console.log(servicesStickit.stickerSelectionne);
	  //console.log($("[id_sticker=" + servicesStickit.stickerSelectionne + "]").find("contenu-sticker"));
	  $("[id_sticker=" + servicesStickit.stickerSelectionne + "]").find("contenu-sticker").focus();
	     // rangy.restoreSelection(savedRange, true);
		//rangy.restoreSelection(savedRange, true);	  
	  //element.focus();
	  //console.log();
	  //document.getElementById('myInstance1').focus();
	  /*if(savedRange != null) {
	    if (window.getSelection) { //non IE and there is already a selection
	      var s = window.getSelection();
	      if (s.rangeCount > 0) 
	        s.removeAllRanges();
	      s.addRange(savedRange);
	    } else if (document.createRange) { //non IE and no selection
	      window.getSelection().addRange(savedRange);
	    } else if (document.selection) { //IE
	      savedRange.select();
	    }
	  }*/
	}

	/*les_services_stickit_controles.saveSelection = function() {    
        // Remove markers for previously saved selection
        if (savedSel) {
            rangy.removeMarkers(savedSel);
        }
        savedSel = rangy.saveSelection();
        savedSelActiveElement = document.activeElement;
    }

	les_services_stickit_controles.restoreSelection = function() {   
    	if (savedSel) {
    	    rangy.restoreSelection(savedSel, true);
    	    savedSel = null;
    	    window.setTimeout(function() {
    	        if (savedSelActiveElement && typeof savedSelActiveElement.focus != "undefined") {
    	            savedSelActiveElement.focus();
    	        }
    	    }, 1);
		}
    }*/




	return les_services_stickit_controles;
}]);



/*

{ 				
	'gras' : 'bold', 
	'italic' : 'italic',
	'souligné' : 'underline',
	'barré' : 'strikethrough',
	'centre' : 'justifycenter',
	'justifier' : 'justifyfull',
	'gauche' : 'justifyleft',
	'droite' : 'justifyright',
	'retour' : 'undo',
	'taille' : 'fontsize',
	'police' : 'fontname',
	'couleur' : 'forecolor',
	'lien' : 'createlink',
	'liste puce' : 'insertunorderedlist',
	'liste num' : 'insertorderedlist',
	'image' : 'inserthtml' 
} ;


*/

