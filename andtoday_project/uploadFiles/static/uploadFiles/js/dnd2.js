function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "copy";

    var files = evt.dataTransfer.files; // FileList object.
    console.log(files);
    // files is a FileList of File objects. List some properties.



    var output = [];

/*for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }*/

    for (var i = 0, f; f = files[i]; i++) {

      if (!f.type.match('image.*')) {
        continue;
      }

    var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
        var image = new Image();
            image.src = event.target.result;
            image.width = 50; // a fake resize
          //  document.body.appendChild(image);          
          /*var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');*/
          document.getElementById('list2').insertBefore(image, null);
        };
      })(f);

      reader.readAsDataURL(f);//
      //reader.readAsBinaryString(f);
      //reader.readAsArrayBuffer(f);
      //reader.readAsText(f);  
      

      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '<BR><u><i>', f.type, '</u></i>',
                  '</li>');
    }



    document.getElementById('list2').innerHTML = '<ul>' + output.join('') + '</ul>';
  }





function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');







 function handleFileUpload(event){
    event.stopPropagation();
    event.preventDefault();

    //console.log($("img"));

    var files = event.dataTransfer.files; // FileList object.
    console.log(files);

    var formData = new FormData();
    for(var i=0 ; i<files.length ; i++){
          var img = new Image();
          img.src = window.URL.createObjectURL(files[i]);
          ///document.getElementById('list2').insertBefore(img, null); 
          document.getElementById('drop_zone').insertBefore(img, null); 
          
          //new fileUpload(img.src, files[i], img);
          img.classList.add("obj");
          img.file = files[i];          
          formData.append(img.src, files[i]);        
     }

   var xhr = new XMLHttpRequest();
   var url = "/stockeImage/";    

    xhr.open("POST", url);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.overrideMimeType('image/*; charset=x-user-defined-binary');    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
              if(xhr.status == 200){
                  console.log(xhr.responseText);
              }
             else{
                  $("html").html(xhr.responseText);               
              }
        }
    }

    //xhr.send(formData);     
}

    /*for(var i=0 ; i<files.length ; i++){
      var img = new Image();
      img.src = window.URL.createObjectURL(files[i]);
      formData.append(img.src, files[i]);
      document.getElementById('list2').insertBefore(img, null);         
      //var img = document.createElement('img');
      //img.height = 60;
      img.onload = function(event){
        URL.revokeObjectURL(this.src);
      }
      //console.log("http://" + window.location.host + ":8000" +  "/stickit/stockeImage/");

      //console.log(document.cookie);
      //console.log(formData); 
      //formData.append('csrfmiddlewaretoken',csrfmiddlewaretoken.value);
     
      /*(function(file){
                          reader.onload = function(evt) {
                                  formData.append('file', file);       
                            //xhr.send(files[i]);
                            //xhr.sendAsBinary(evt.target.result);
                          } 
                          console.log(i);
                          //reader.readAsBinaryString(files[i]); 
                      })(files[i]);

   
    }*/
      //xhr.open("POST", url);
       //xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");  
       //console.log(csrftoken);  



/***************************************************************/
/***************************************************************/
/*                VERSION AVEC LES CLOSURES                    */
/***************************************************************/
/***************************************************************/
/*  for(var i=0 ; i<files.length ; i++){
      var img = new Image();
      img.src = window.URL.createObjectURL(files[i]);

      document.getElementById('list2').insertBefore(img, null); 
//(function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
       
      var fnExecute = (function(file)
                      { return function(event){
                                //console.log(file.name);
                                var xhr = new XMLHttpRequest();
                                var formData = new FormData();                                
                                xhr.open("POST", url);
                                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                                xhr.overrideMimeType('image/*; charset=x-user-defined-binary');    
                                  xhr.onreadystatechange = function() {
                                      if (xhr.readyState == 4) {
                                            if(xhr.status == 200){
                                                console.log(xhr.responseText);
                                                img.setAttribute("id", img.src);
                                            }
                                           else{
                                                $("html").html(xhr.responseText);               
                                            }
                                      }
                                  }


                                var reader = new FileReader(); 
                                reader.onload = function(evt) {
                                  formData.append(img.src, file); 
                                  xhr.send(formData);

                                }                               
                                reader.readAsArrayBuffer(file); 

                                               }
                      })(files[i]);
   
          fnExecute();            
    }
    //xhr.send(formData);

 }*/






/*function fileUpload(filename, file, DOMtarget){
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    var reader = new FileReader(); 
    var url = "/stockeImage/";    

    xhr.open("POST", url);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.overrideMimeType('image/*; charset=x-user-defined-binary');    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
              if(xhr.status == 200){
                  console.log(xhr.responseText);
                  DOMtarget.setAttribute("id", filename);
              }
             else{
                  $("html").html(xhr.responseText);               
              }
        }
    }

    reader.onload = function(evt) {
        formData.append(filename, file); 
        xhr.send(formData);
    }                               
    reader.readAsArrayBuffer(file); 
}*/



function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}






// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileUpload, false);














/*function handlerUniqueUpload(filename, file, DOMtarget){
    var xhr = new XMLHttpRequest();

    var reader = new FileReader(); 
    var url = "/stockeImage/";    

    xhr.open("POST", url);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.overrideMimeType('image/*; charset=x-user-defined-binary');    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
              if(xhr.status == 200){
                  console.log(xhr.responseText);
              }
             else{
                  $("html").html(xhr.responseText);               
              }
        }
    }

    reader.onload = function(evt) {

        xhr.send(formData);
    }                               
    reader.readAsArrayBuffer(file); 
}*/

function handleClick(event){
    var imgs = document.querySelectorAll(".obj");
    var formData = new FormData();
    
    for (var i = 0; i < imgs.length; i++) {

        var img = imgs[i];
        //console.log(img.src);
        formData.append(img.src, imgs[i].file);
        //new handlerUniqueUpload(img.src, img.file);        
        //new FileUpload(imgs[i], imgs[i].file);
    }

   var xhr = new XMLHttpRequest();
   var url = "/stockeImage/";    

    xhr.open("POST", url);
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
    xhr.overrideMimeType('image/*; charset=x-user-defined-binary');    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
              if(xhr.status == 200){
                  var associations = JSON.parse(xhr.responseText);
                  console.log(associations);
                  for (var i = 0; i < imgs.length; i++) {
                      console.log(imgs[i].src, associations[imgs[i].src]);
                      imgs[i].src = associations[imgs[i].src];
                      //imgs[i].src = 
                      //var img = imgs[i];
                      //console.log(img.src);
                      //formData.append(img.src, imgs[i].file);
                      //new handlerUniqueUpload(img.src, img.file);        
                      //new FileUpload(imgs[i], imgs[i].file);
                  }                  
              }
             else{
                  $("html").html(xhr.responseText);               
              }
        }
    }

    xhr.send(formData);
                            
}

var button = document.getElementById('btn_execute');
button.addEventListener('click', handleClick, false);