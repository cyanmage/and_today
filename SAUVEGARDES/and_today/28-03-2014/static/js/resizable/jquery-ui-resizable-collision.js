/*TETE
Copyright (c) 2011-13 Sean Cusack

MIT-LICENSE:

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($){

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Default settings
  //

  var DEBUG = false;
  var VISUAL_DEBUG = DEBUG;

  $.ui.resizable.prototype.options.obstacle          = ".ui-resizable-collision-obstacle";
  $.ui.resizable.prototype.options.restraint         = ".ui-resizable-collision-restraint";
  $.ui.resizable.prototype.options.collider          = ".ui-resizable-resizing";
  $.ui.resizable.prototype.options.colliderData      = null;
  $.ui.resizable.prototype.options.obstacleData      = null;
  $.ui.resizable.prototype.options.directionData     = null;
  $.ui.resizable.prototype.options.relative          = "body";
  $.ui.resizable.prototype.options.preventCollision  = false;
  $.ui.resizable.prototype.options.preventProtrusion = false;
  $.ui.resizable.prototype.options.collisionVisualDebug = false;
  $.ui.resizable.prototype.options.multipleCollisionInteractions = [];

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Plugin setup
  //

  $.ui.plugin.add( "resizable", "obstacle", {
    start: function(event,ui){        handleStart  .call( this, event, ui ); } ,
    resize:  function(event,ui){ return handleCollide.call( this, event, ui ); } ,
    stop:  function(event,ui){        handleCollide.call( this, event, ui );
                                      handleStop   .call( this, event, ui ); }
  });


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Main handler functions
  //

  function uiTrigger( _this, widget, eventName, event, ui )
  {
    $.ui.plugin.call( widget, eventName, event, ui );
    _this.trigger( event, ui );
  }



  
  function handleStart(event,ui)
  {
    //console.log("handleStart");
    VISUAL_DEBUG = $(this).data("ui-resizable").options.collisionVisualDebug;

    $(this).data( "jquery-ui-resizable-collision-recent-position", $.extend(ui.originalPosition, ui.originalSize) ); 

  }

  function handleStop (event,ui)
  { 
    //console.log("handleStop");
    $(this).removeData("jquery-ui-resizable-collision-recent-position");
    if( VISUAL_DEBUG ) $(".testdebug").remove();
    VISUAL_DEBUG = DEBUG;
  }

  // This is the monolithic workhorse of the plugin:
  //   * At the beginning and end, it sends out all the pre/post-collision/protrusion events
  //   * In the middle, it both calculates collisions, and prevents them if requested
  //   * When it's either tried its best, or found a fit, or wasn't required to avoid obstacles, it sends out actual collision events
  //
  // Inside the first big loop is the actual "prevention" logic
  //   * It calculates the "intended position" of everything, checks all the collision logic, and if it needs to,
  //     then calculates a delta movement to see if that fits, and the loop continues until it either works,
  //     or an arbitrary iteration limit is reached, just in case it gets in a loop
  //   * The delta function is described in more detail below
  //
  // During all the "trying a new position" and "determining collisions" calculations, it's not using purely the
  //   current position of the colliders -- it can't because the resizable is now in a new "intended position",
  //   and with it, all its children, including any collider children
  //   * So, it keeps track of a dx and dy from known position, and populates a "jquery-collision-coordinates" data value
  //     that the jquery-collision plugin takes into account during the calculations
  //   * Also, the Coords() values get populated with these offsets at various times, so that they reflect "intended position"
  //
  // Note also that the collider, obstacle, and direction data fields are temporarily overriden (because we need them here,
  //   and the user may not have asked for them), and then erased and placed where the user wants them, right before
  //   sending out the collision events
  //
  // Note also that the collisions and protrusions requested are "relative" to "body". If the use asked for
  // something relative, it has to get translated right before sending out the events...
  function handleCollide( event, ui )
  {
    // Note that $(this) is the resizable that's moving - it has a ui.position that moves according to where
    // the resizable is "about to move". However, our "collidable" objects might not be the same as $(this) -
    // they might be child elements. So we need to keep track of recent and present position so we can apply the
    // "intended" dx and dy to all the moving elements:

    var rp = $(this).data("jquery-ui-resizable-collision-recent-position");
    //console.log("AVANT : ", rp);
    if( DEBUG ) { console.log( "handleCollision ******************************************************************" ); }

    if( VISUAL_DEBUG ) $(".testdebug").remove();

    var ctyp  =     "collision";


    // NOTE: widget is used for uiTrigger, otherwise event-binders don't get a "ui" variable
    var widget = $(this).data("ui-resizable");
    var o      = widget.options;

    // List of Interactions -- first one is the main set of args from the .resizable() setup call, rest are multipleCollisionInteractions:[...]
    var ilist  = [];
    
    if( o.obstacle || o.restraint ) ilist.push( new Interaction( $(this), o ) );

    if( ilist.length <= 0 )
    {
      // Just forget the whole stupid business - why are we in here, anyways - no interactions to check
      // Cache the current position anyways, and jump out:
      $(this).data( "jquery-ui-resizable-collision-recent-position", $.extend(ui.position, ui.size));
      return;
    }
    //console.log(ilist);
    var d1 = "ui-resizable-collision-collider-temp";
    var d2 = "ui-resizable-collision-obstacle-temp";
    var d3 = "ui-resizable-collision-direction-temp";
    var di = "ui-resizable-collision-interaction-temp";
    var d  = event.data;
    var as = "<div />";
    if( d && d.as ) as = d.as;

    var e;

    // Try moving things twice the number of colliders times obstacles+restraints, plus 1 original attempt
    // We need to calculate maxiter here because there may be several levels of interactions
    // (Honestly, anything will do, just need a reasonable cutoff)
    var maxiter = 1;

    // Global just-about-to-check-collisions event:
    for( var i=0; i<ilist.length; i++ )
    {
      maxiter += 2 * ilist[i].collider.length * ( ilist[i].obstacle.length + ilist[i].restraint.length );

      if( VISUAL_DEBUG )
      {
        ilist[i].obstacle .each(function(){ debugCloneAt( $(this), $(this).offset().left, $(this).offset().top, $(this).innerWidth(), $(this).innerHeight(), "black"   ); });
        ilist[i].restraint.each(function(){ debugCloneAt( $(this), $(this).offset().left, $(this).offset().top, $(this).innerWidth(), $(this).innerHeight(), "magenta" ); });
      }

    }

    var origleft = rp.left;
    var origtop  = rp.top;
    var origdx = ui.position.left - rp.left;
    var origdy = ui.position.top  - rp.top;
    var origwidth = rp.width;
    var origheight  = rp.height;
    var origdw = ui.position.width - rp.width;
    var origdh = ui.position.height  - rp.height;    
    var dx;
    var dy;
    var dw;
    var dh;    
    var ocl  = []; // list of Collision()'s total
    var cocl = []; // list of Collision()'s just from collisions
    var pocl = []; // list of Collision()'s just from protrusions
    var ccl  = []; // list of Collision()'s just from containment (also a protrusion)



    var deltaCache = {};
    var iter = 0;
    maxiter = 7 ;
    while( iter < maxiter )
    {
      iter++;
      // Calc offset from recent move, so we can move the objects that are "coming along for the ride" before calculating their
      // collisions. Otherwise the ui variable only keeps track of the main resizable, not its contents, which may contain
      // the actual things that collide
      dx = ui.position.left - rp.left;
      dy = ui.position.top  - rp.top;
      dw = ui.size.width - rp.width;
      dh = ui.size.height - rp.height;      
      //console.log(dw, ", ",  dh);  
      // Empty the collision containers outside the interaction loop:
      ocl = [];
      cocl = [];
      pocl = [];

      for( var i=0; i<ilist.length; i++ )
      {
        ilist[i].collisions  = $();
        ilist[i].protrusions = $();

        var $c = ilist[i].collider;
        var $o = ilist[i].obstacle;
        var $r = ilist[i].restraint;
        if( DEBUG ) console.log( "trying inter,c,o,r=",ilist[i],$c,$o,$r)
          //console.log(dw, dh);
        // Add offset to coordinates before figuring out collisions, because we're basing it on "where its about to go", not "where it is":
        // (Don't do this for anything but colliders! Applying to obstacles or restrictions or containment screws things up!!)
        $c.each( function(){ $(this).data( "jquery-collision-coordinates", jq2Coords($(this),dx,dy, dw, dh) ); } );
    
        var cog = jqList2CenterGravity($c);
        for( var ci=0; ci<$c.length; ci++ )
        {
          // Calculate collisions separately from protrusions, as we might only prevent one or the other:
          var oc = $($c[ci]).collision( $o, { mode: "collision",  as: "<div />", colliderData: d1, obstacleData: d2, directionData: d3, relative: "body" } );
          if( DEBUG ) { console.log( "collisions", oc ); }

          // Add the interaction settings to their data, so we can pick it apart later:
          oc.data( di, ilist[i] );

          // And add the collisions to the interaction:
          ilist[i].collisions = ilist[i].collisions.add(oc);

          // And if there are any, make the appropriate Collision() objects and add them to the list
          if( oc.length > 0 )
          {
            cocl = oc.toArray().map( function(e,i,a){ return new Collision($(e), d1, d2, "collision" , dx, dy, dw, dh, d3, cog, event.pageX, event.pageY ); } );
            ocl = ocl.concat( cocl );
            if(VISUAL_DEBUG) $("<span>c"+iter+"</span>").appendTo( debugClone( $(oc), "black" ) );
            //console.log(ocl);
          }

        }
    
        // Now remove coordinate offsets before sending events, otherwise event results might futz with em:
        $c.each( function(){ $(this).removeData( "jquery-collision-coordinates" ); } );
      }



      if( DEBUG ) console.log("checking if we have any collisions at all...");
      // If there's no collisions, INCLUDING the container, stop now, don't keep doing stuff
      if( ( cocl.length <= 0 ) && ( pocl.length <= 0 ) && ( ccl.length <= 0 ) ) break;


      if (ocl.length > 0) {
        ui.size.width -= dw;
        ui.size.height  -= dh;            
      }


      /*var doneAdjusting = true;

      // Go through each interaction -- if any of them break the prevention rule, we aren't done adjusting yet
      for( var i=0; i<ilist.length; i++ )
      {
        if( DEBUG ) console.log("checking adjustments for",ilist[i],"ccl=",ccl,
                                "pc,cl,pp,pl=",ilist[i].preventCollision, ilist[i].collisions.length, ilist[i].preventProtrusion, ilist[i].protrusions.length);

        if( DEBUG ) console.log("checking if we overstepped our containment...");
        // If we aren't trying to prevent anything yet we SOMEHOW jumped our containment, stop - this shouldn't ever happen, DANGER, WILL ROBINSON!
        if( ( ! ilist[i].preventCollision ) && ( ! ilist[i].preventProtrusion ) && ( ccl.length > 0 ) )
        {
          if( DEBUG ) { console.log( "not trying to prevent anything, but jumped our containment", ilist[i] ); }
          doneAdjusting = false;
        }

        if( DEBUG ) console.log("checking if we want to block something we have collided with...");
        // More specifically, if aren't any collisions that we actually want to prevent, stop -- though we have to think of this in the opposite sense:
        // if we DO either 
        //   want to prevent collisions yet have a collision or containment failure, OR
        //   want to prevent protrusions yet have a protrusion or a containment failure,
        // then DON'T STOP
        if( ( ilist[i].preventCollision  && ( ( ilist[i].collisions .length > 0 ) || ( ccl.length > 0 ) ) ) ||
            ( ilist[i].preventProtrusion && ( ( ilist[i].protrusions.length > 0 ) || ( ccl.length > 0 ) ) )    )
        {
          if( DEBUG ) { console.log( "trying to prevent something that we're still hitting", ilist[i] ); }
          doneAdjusting = false;
        }
      }*/
      /*console.log( doneAdjusting);
      if( doneAdjusting )
      {
        if( DEBUG ) { console.log( "done adjusting" ); }
        break;
      }*/

      /*if( DEBUG ) console.log("calculating delta with ocl,ccl=",ocl,ccl);
      // Calculate a delta to move, based on collisions+protrusions and containment
      var d = delta( ocl.concat(), ccl, deltaCache );*/

      //if( DEBUG ) console.log("dx=",d.dx,"dy=",d.dy);
      // If there's nothing to do, stop -- it shouldn't happen if we had collisions, but...
      //if( d.dx == 0 && d.dy == 0 ) break;

      // Apply the movement, and let the loop run again, to see if our proposed delta movement was any good

      /*ui.position.left += d.dx;
      ui.position.top  += d.dy;
      console.log(d.dw, d.dh);*/
  
    }

    dx = ui.position.left - rp.left;
    dy = ui.position.top  - rp.top;
    /* deactivated for now - doesn't seem to be needed - may revisit later:
      // if our new center of gravity is further from the mouse position than the last one, revert
      var origd = jqList2CenterGravity($c,origdx,origdy).distanceTo( event.pageX, event.pageY );
      var  newd = jqList2CenterGravity($c,    dx,    dy).distanceTo( event.pageX, event.pageY );
      if( newd > origd ) { console.log("center of gravity issue: ",origd,newd); } // add this to revert
    */

    // If we failed to find a fit, revert to the previous position
    if( ( iter > maxiter ) ||                             // if we ran out of iterations, tough, revert
        ( ccl.length > 0 ) ||                             // if we ran outside out containment, also revert
        ( o.preventProtrusion && ( pocl.length > 0 ) ) || // if we have a protrusion and are trying to prevent protrusions, revert
        ( o.preventCollision  && ( cocl.length > 0 ) ) )  // if we have a collision and are trying to prevent collisions, revert
    {
      if( DEBUG ) console.log("reverting, i=",iter,"maxiter=",maxiter,"cocl=",cocl,"cocl.len=",cocl.length,"pocl=",
                               pocl,"pocl.len=",pocl.length,"ccl=",ccl,"ccl.len=",ccl.length,
                               //"newd=",newd,"origd=",origd,
                               "origdx=",origdx,"origdy=",origdy,"dx=",dx,"dy=",dy);
      ui.position.left = origleft;
      ui.position.top  = origtop;
      ui.size.width = origwidth;
      ui.size.height  = origheight;      
    }



    //console.log("APRES : ", rp);
    // And put the resulting ui position in our cache, so that if we keep resizing, we'll know how far stuff moved since this time
    $(this).data( "jquery-ui-resizable-collision-recent-position", $.extend(ui.position, ui.size));
  }














})(jQuery);
