(function($){


  	$.ui.plugin.add( "resizable", "collision", {
  		/*create: function(event,ui){       handleInit   .call( this, event, ui ); },*/
  		start: function(event,ui){        handleStart  .call( this, event, ui ); } ,
  		stop:  function(event,ui){        handleCollide.call( this, event, ui );
  		                                  handleStop   .call( this, event, ui ); },
  		resize:  function(event,ui){ return handleCollide.call( this, event, ui ); } ,  	                                    
  	});

//////////////////////
  // COORDINATE CLASS //
  //////////////////////

	function Coords( x1, y1, x2, y2 )
	{
	  this.x1 = x1;
	  this.y1 = y1;
	  this.x2 = x2; 
	  this.y2 = y2;
	}

	Coords.prototype.width   = function() { return (this.x2-this.x1);   }
	Coords.prototype.height  = function() { return (this.y2+this.y1);   }
	Coords.prototype.centerx = function() { return (this.x1+this.x2)/2; }
	Coords.prototype.centery = function() { return (this.y1+this.y2)/2; }
	Coords.prototype.area    = function() { return this.width()*this.height(); }
	Coords.prototype.hash    = function() { return "["+[this.x1,this.y1,this.x2,this.y2].join(",")+"]" }
	Coords.prototype.distance = function(c)  
	{ 
	  return this.distanceTo( c.centerx(), c.centery() );
	}
	Coords.prototype.distanceTo = function(x,y)  
	{ 
	  var dx = this.centerx()-x;
	  var dy = this.centerx()-y;
	  return Math.sqrt( dx*dx + dy*dy );
	}


	// convert a jq object into a Coords object, handling all the nice-n-messy offsets and margins and crud
	function jq2Coords( jq, dx, dy, dw, dh)
	{
	    //console.log(dw, dh);
		if( !dx ) dx=0;
		if( !dy ) dy=0;
		if( !dw ) dw=0;
		if( !dh ) dh=0;		

		if( jq.parent().length > 0 )
		{
				//console.log(jq.parent());
		  var x1 = jq.offset().left - (parseInt(jq.css("margin-left"))||0);
		  var y1 = jq.offset().top  - (parseInt(jq.css("margin-top" ))||0);
		  var x2 = x1 + dw + jq.outerWidth( true);
		  var y2 = y1 + dh + jq.outerHeight(true);
		}
		else
		{
				//console.log("mon cas 2");			
		  //var x1 = parseInt(jq.css("left"  )) || 0;
		  var y1 = parseInt(jq.css("top"   )) || 0;
		  var x2 = x1 + dw + parseInt(jq.css("width" )) || 0;
		  var y2 = y1 + dh + parseInt(jq.css("height")) || 0;
		  x2 += (parseInt(jq.css("margin-left"))||0) + (parseInt(jq.css("border-left"))||0) + (parseInt(jq.css("padding-left"))||0) + 
		        (parseInt(jq.css("padding-right"))||0) + (parseInt(jq.css("border-right"))||0) + (parseInt(jq.css("margin-right"))||0);
		  y2 += (parseInt(jq.css("margin-top"))||0) + (parseInt(jq.css("border-top"))||0) + (parseInt(jq.css("padding-top"))||0) + 
		        (parseInt(jq.css("padding-bottom"))||0) + (parseInt(jq.css("border-bottom"))||0) + (parseInt(jq.css("margin-bottom"))||0);

		}
		  //console.log( x1, y1, x2, y2 );
		  return new Coords( x1, y1, x2, y2 );
		}





	function handleStart(event,ui)
	{
	  $(this).data( "jquery-ui-resizable-collision-recent-position", $.extend(ui.originalPosition, ui.originalSize) ); 
	}

	function handleStop (event,ui)
	{ 
	  $(this).removeData("jquery-ui-resizable-collision-recent-position");
	}

  	function handleCollide( event, ui )
  	{
  		    var rp = $(this).data("jquery-ui-resizable-collision-recent-position");
    		//console.log("AVANT : ", rp);

      		dw = ui.size.width - rp.width;
      		dh = ui.size.height - rp.height;  
      		//console.log("dw : ", dw, "dh : ", dh);

			/**/var that = $(this).data("ui-resizable"),
				o = that.options,		
				cs = that.size,
				cp = that.position,
				os = that.originalSize,
				op = that.originalPosition;

			//
			$(this).data( "jquery-collision-coordinates", jq2Coords($(this), 0, 0, dw, dh) );
			var collisions = $(this).collision(o.obstacle, {directionData : 'ddata', as: "<div />"});				
			//console.log(collisions.length);

			if(collisions.length > 0){

				for( var i=0; i<collisions.length; i++ ){
					//console.log();
					var coordsCollisions = jq2Coords( $(collisions[i]));
					//console.log(coordsCollisions.hash());					
					var direction = $(collisions[i]).data("ddata");


					o.maxHeight = "";
					o.maxWidth = "";	

					if (direction == "E"){
						//o.maxWidth = cs.width;
						//console.log("width avant : ", ui.size.width, " , dw :" , dw);
						//console.log(" , dw :" , dw);						
						ui.size.width -= dw;
						//console.log("width apres : ", ui.size.width);						
					}
					else if (direction == "S"){
						o.maxHeight = cs.height;
					}
					else if (direction == "SE"){
						o.maxHeight = cs.height;
						o.maxWidth = cs.width;					
					}
				}
			}

	}



})(jQuery);

