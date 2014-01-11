$.ui.plugin.add("resizable", "collision", {
	resize : function(){
		//console.log("ouhhhkv");
		var that = $(this).data("ui-resizable"),
			o = that.options,		
			cs = that.size,
			cp = that.position,
			os = that.originalSize,
			op = that.originalPosition;

		var collisions = $(this).collision(o.obstacle, {directionData : 'ddata', as: "<div />"});	

		//console.log(collisions.html());
		if(typeof collisions.html() !== 'undefined'){
			for( var i=0; i<collisions.length; i++ ){
				var direction = $(collisions[i]).data("ddata");

				if (direction == "E"){
					o.maxWidth = cs.width;
				}
				else if (direction == "S"){
					o.maxHeight = cs.height;
				}
				else if (direction == "SE"){
					o.maxHeight = cs.height;
					o.maxWidth = cs.width;					
				}
				else if (direction == "NE"){
					o.maxWidth = cs.width;					
				}				
				else if (direction == "SW"){
					o.maxHeight = cs.height;
				}
			}
		}
		else{
			o.maxHeight = "";
			o.maxWidth = "";	
		}


	}
});

