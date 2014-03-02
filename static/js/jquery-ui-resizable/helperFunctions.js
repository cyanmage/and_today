//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Private Classes
  //

  ////////////
  // EVENTS //
  ////////////

  function CollisionEvent( eventType, collider, obstacle, collisionType, collision )
  {
    jQuery.Event.call( this, eventType );
    this.collider  = collider;
    this.obstacle  = obstacle; 
    this.collisionType = collisionType;
    this.collision = collision;
  }

  CollisionEvent.prototype = new $.Event( "" );

  function CollisionCheckEvent( eventType, collider, obstacle, collisionType )
  {
    jQuery.Event.call( this, eventType );
    this.collider  = collider;
    this.obstacle  = obstacle; 
    this.collisionType = collisionType;
  }

  CollisionCheckEvent.prototype = new $.Event( "" );

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

  /////////////////////////////////
  // COORDINATE HELPER FUNCTIONS //
  /////////////////////////////////

  // create a box with the same total area, centered at center of gravity
  function centerGravity( coordsList )
  {
    if( coordsList.length <= 0 ) return null;
    var wsumx = 0;
    var wsumy = 0;
    var suma  = 0;
    for( var i = 0; i < coordsList.length; i++ )
    {
      suma += coordsList[i].area();
      wsumx += coordsList[i].centerx() * coordsList[i].area();
      wsumy += coordsList[i].centery() * coordsList[i].area();
    }
    var d = Math.sqrt( suma ); // dimension of square (both w and h)
    return new Coords( (wsumx/suma) - d/2, (wsumy/suma) - d/2, (wsumx/suma) + d/2, (wsumy/suma) + d/2 );
  }

  // convert a jq object into a Coords object, handling all the nice-n-messy offsets and margins and crud
  function jq2Coords( jq, dx, dy , dw, dh)
  {
      //console.log(dw, dh);
    if( !dx ) dx=0;
    if( !dy ) dy=0;
    if( !dw ) dw=0;
    if( !dh ) dh=0;
    //console.log(dw, dh);
    if( jq.parent().length > 0 )
    {
      var x1 = dx + jq.offset().left - (parseInt(jq.css("margin-left"))||0);
      var y1 = dy + jq.offset().top  - (parseInt(jq.css("margin-top" ))||0);
      var x2 = x1 + dw + jq.outerWidth( true);
      var y2 = y1 + dh + jq.outerHeight(true);
    }
    else
    {
      var x1 = dx + parseInt(jq.css("left"  )) || 0;
      var y1 = dy + parseInt(jq.css("top"   )) || 0;
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

  function jqList2CenterGravity( jqList, dx, dy, dw, dh )
  {
    return centerGravity( jqList.toArray().map( function(e,i,a){ return jq2Coords($(e),dx,dy, dw, dh); } ) );
  }

  /////////////////////
  // COLLISION CLASS //
  /////////////////////

  function Collision( jq, cdata, odata, type, dx, dy, dw, dh, ddata, recentCenterOfGravity, mousex, mousey )
  {
    if(!recentCenterOfGravity) recentCenterOfGravity=jqList2CenterGravity($(this.collider), dx, dy, dw, dh);
    if(!dx) dx = 0;
    if(!dy) dy = 0;
    if(!dw) dw = 0;
    if(!dh) dh = 0;    
    this.collision = $(jq            );
    this.collider  = $(jq.data(cdata));
    this.obstacle  = $(jq.data(odata));
    this.direction =   jq.data(ddata);
    this.type      = type;
    this.dx        = dx;
    this.dy        = dy;
    this.dw        = dw;
    this.dh        = dh;    
    this.centerOfMass    = recentCenterOfGravity;
    this.collisionCoords = jq2Coords( this.collision, 0, 0, 0, 0);
    this.colliderCoords  = jq2Coords( this.collider,  dx, dy, dw, dh );
    this.obstacleCoords  = jq2Coords( this.obstacle  ,0, 0, 0, 0);
    if(!mousex) mousex = this.colliderCoords.centerx();
    if(!mousey) mousex = this.colliderCoords.centery();
    this.mousex = mousex;
    this.mousey = mousey;
  }

  // amount "embedded" into obstacle in x-direction
  // might be negative or zero if it doesn't make sense
  // this is used with the delta calculation - if its <= 0, it'll get skipped
  // dirx is -1 or +1, depending on which way we are orienting things (which way we want to move it)
  // NOTE: originally, we were taking the collision area into account, but it's easier to recalc embed value
  Collision.prototype.embedx = function( dirx )
  {
      if( dirx < 0 ) /* want to move left  */ return this.colliderCoords.x2 - this.obstacleCoords.x1;
      if( dirx > 0 ) /* want to move right */ return this.obstacleCoords.x2 - this.colliderCoords.x1;

    return 0;
  }

  // and ditto for y-direction
  Collision.prototype.embedy = function( diry )
  {
      if( diry < 0 ) /* want to move up   */ return this.colliderCoords.y2 - this.obstacleCoords.y1;
      if( diry > 0 ) /* want to move down */ return this.obstacleCoords.y2 - this.colliderCoords.y1;
    return 0;
  }

  // distance from collision to recent center of mass, i.e. it used to be in one place, and we're resizing it
  // to another, so the "overlap" of some collider happens a certain "distance" from the center of where stuff
  // used to be...
  Collision.prototype.distance = function()
  {
    var cx1 = this.centerOfMass.centerx();
    var cy1 = this.centerOfMass.centery();
    var cx2 = this.collisionCoords.centerx();
    var cy2 = this.collisionCoords.centery();
    return Math.sqrt( (cx2-cx1)*(cx2-cx1) + (cy2-cy1)*(cy2-cy1) );
  };

  Collision.prototype.hash = function(){ return this.type+"["+this.colliderCoords.hash()+","+this.obstacleCoords.hash()+"]"; }

  ////////////////////////////////
  // COLLISION HELPER FUNCTIONS //
  ////////////////////////////////

  // sort so that collisions closest to recent center of mass come first -- we need to resolve them in order
  function collisionComparison(c1,c2)
  {
    var cd1 = c1.distance();
    var cd2 = c2.distance();
    return ( ( cd1 < cd2 ) ? -1 : ( cd1 > cd2 ) ? +1 : 0 );
  };

  ///////////////////////
  // INTERACTION CLASS //
  ///////////////////////

  function Interaction( resizable, options )
  {
    this.resizable         = $(resizable);
    this.obstacleSelector  =   options.obstacle        || ".ui-resizable-collision-obstacle"   ;
    this.restraintSelector =   options.restraint       || ".ui-resizable-collision-restraint"  ;
    this.obstacle          = $(options.obstacle        || ".ui-resizable-collision-obstacle"  );
    this.restraint         = $(options.restraint       || ".ui-resizable-collision-restraint" );
    var  collider          =   options.collider        || ".ui-resizable-resizing"             ;
    this.collider          = resizable.find( collider ).andSelf().filter( collider );
    this.colliderData      = options.colliderData      || null;
    this.obstacleData      = options.obstacleData      || null;
    this.directionData     = options.directionData     || null;
    this.relative          = options.relative          || "body";
    this.preventCollision  = options.preventCollision  || false;
    this.preventProtrusion = options.preventProtrusion || false;
    this.collisions        = $();
    this.protrusions       = $();
  }




  // This is the inner-loop collision-prevention function, called maxiter times inside handleCollide()
  // Its purpose is to determine a single [dx,dy] to move the whole list of colliders and resizable,
  //   in an attempt to fit them properly. Only one of dx or dy will be non-zero at a time.
  // The cache argument is a simple object passed in from handleCollide, and is used to store previously-
  //   -tried movements, so that it doesn't repeat itself. 
  //   * The most common repeat case is if a collider is stuck inbetween two obstacles, and the space isn't big 
  //     enough -- one iteration will have it clear obstacle A, but embed into obstacle B, and the next iteration
  //     will reverse it, and it will get nowhere quickly. 
  //   * The key for the hash is collider+obstacle coordinates, so the same collider won't avoid the same obstacle
  //     in the same way twice. (Actually three times, see below.)
  //   * Note that the value of the hash is either nothing, "tried normal", or "tried reverse"
  //     * Nothing means it hasn't been tried yet
  //     * Tried normal means it was tried once
  //     * Tried reverse means it was tried a second time
  // How does it determine how to move things around?
  //   * It calculates an "embed" value, i.e. how far the collider is "embedded" into the obstacle
  //   * And a direction, either towards center of gravity or away, depending on if it's a collision or protrusion
  //   * And it returns that
  // How does it choose what obstacle to avoid?
  //   * It first sorts all the "collisions" (remember, these are the actual overlapping regions) based on how
  //     far their centers of gravity are from the last known center of gravity of the resizable itself,
  //     which was passed in during the creation of the Collision objects
  //   * It looks at the last one first, so the furthest from the object -- that way, it's going to always reign
  //     it in towards the last known good value, otherwise "closer" obstacles might keep shoving it away forever
  //   * Next, it calculates the embed values in the x and y direction, and picks the smallest one -- so if it's
  //     embedded heavily in the x-direction and only a little in the y, it'll pick the y first (small changes are
  //     more likely to succeed)
  //   * If it's a negative value, it tries again, because the embed function does the sanity-checking if we
  //     tried to move it in a strange or useless way
  //   * Finally, this is why it tries each "position" twice -- because for each starting position, it tries the
  //     smaller movement first, but then it tries the larger one. That's why the cache keeps track of the
  //     "tried reverse" value
  // In the end, it returns a { dx:_, dy:_ } object, the handleCollision tries moving everything around, recalculates
  //   all the collisions, and calls this again to see what to do next
  // NOTE: you can't easily re-calc "real position" from the jquery objects, because they're tagged with data that has
  //       offsets that are used internally by the jquery-collision plugin, so only use the thisc.*Coords values
  function delta( collisions, containments, cache )
  {
     console.log(collisions);
    var c = collisions.concat(containments).sort( collisionComparison );
    if( VISUAL_DEBUG ) { if(!cache.deltanum){ cache.deltanum = 1; } };
    //if( DEBUG ) 
      //{ console.log( "collisions, in order: ", c.map(function(e,i,a){return e.collisionCoords.hash();}).join(",") ); }
    while( c.length > 0 )
    {
      // note _pop_ not _shift_. we want to grab furthest collision from center of mass first...
      // this one is likely the one causing the most problems, because something is embedded deeply into
      // some obstacle:
      var thisc = c.pop();
      var co = thisc.obstacleCoords;
      var cc = thisc.colliderCoords;
      var cv = thisc.collisionCoords;
      var ct = thisc.type;
      var cd = thisc.direction;
      var key = thisc.hash();
      var dirx = ( thisc.type=="protrusion" ? ( cc.centerx() > co.centerx() ? -1 : +1 )
                                            : ( cc.centerx() > co.centerx() ? +1 : -1 ) );
      var diry = ( thisc.type=="protrusion" ? ( cc.centery() > co.centery() ? -1 : +1 )
                                            : ( cc.centery() > co.centery() ? +1 : -1 ) );
      var dx = thisc.embedx( dirx );
      var dy = thisc.embedy( diry );
      console.log(dx, dy);
      if( DEBUG ) console.log("cv,cc,co,ct,dx,dy,thisc.dx,thisc.dy,dirx,diry,co.centerx,co.centery,cc.centerx,cc.centery,key=",
                  cv.hash(),cc.hash(),co.hash(),ct,dx,dy,thisc.dx,thisc.dy,dirx,diry,co.centerx(),co.centery(),cc.centerx(),cc.centery(),key);
      var tryToAdjustDX = ( dx < dy );
      if(      key in cache && cache[key] == "tried reverse" ) { if( DEBUG ) console.log("but already tried reverse too...");
                                                                 continue; }
      else if( key in cache && cache[key] == "tried normal"  ) { if( DEBUG ) console.log("but already tried this...");
                                                                 tryToAdjustDX=!tryToAdjustDX; cache[key]="tried reverse";
                                                               }
      else                                                     { cache[key]="tried normal"; }
      if( tryToAdjustDX )
      {
        if( VISUAL_DEBUG ) { $("<span>"+thisc.direction+"d"+cache.deltanum+".dx="+dx+"*"+dirx+"</span>").css("color","black").addClass("testdebug")
                             .css("position","absolute")
                             .css("white-space","nowrap").offset( { left: thisc.mousex, top: thisc.mousey + 20*(cache.deltanum-1) } ).appendTo("body"); cache.deltanum++; };
        if( dx <= 0 ) { c.push(thisc); continue; }
        return { "dx":dx*dirx, "dy":0 };
      }
      else
      {
        if( VISUAL_DEBUG ) { $("<span>"+thisc.direction+"d"+cache.deltanum+".dy="+dy+"*"+diry+"</span>").css("color","black").addClass("testdebug")
                             .css("position","absolute")
                             .css("white-space","nowrap").offset( { left: thisc.mousex, top: thisc.mousey + 20*(cache.deltanum-1) } ).appendTo("body"); cache.deltanum++; };
        if( dy <= 0 ) { c.push(thisc); continue; }
        return { "dx":0, "dy":dy*diry };
      }
    }
    return { "dx":0, "dy":0 };
  };