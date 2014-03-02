  function debugCloneAt( element, x, y, w, h, color )
  {
    var $clone = $(element).clone();
    $clone.children().remove();
    $clone.css("background","transparent")
          .css("pointer-events","none")
          .css("border","1px solid "+color)
          .css("margin","0px").css("padding","0px")
          .addClass("testdebug")
          .css("position","absolute")
          .css("background-color","transparent")
          .appendTo("body");
    $clone.width(  w-2 );
    $clone.height( h-2 );
    $clone.offset( { left: x, top: y }  );
    return $clone;
  }

  function debugClone( element, color )
  {
    return debugCloneAt( element, $(element).css("left"), $(element).css("top"), $(element).outerWidth(), $(element).outerHeight(), color );
  }

  function debugCloneContainment( element, resizable, containment, color )
  {
    return debugCloneAt( element, containment[0], containment[1], 
                         containment[2]-containment[0]+$(resizable).width(), 
                         containment[3]-containment[1]+$(resizable).height(),
                       color );
  }