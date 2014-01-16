

module_stickit.factory('servicesSticker', [ '$http' ------------
	])

	les_services_sticker.associeActionsAuxBoutons = function(element, scope){

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