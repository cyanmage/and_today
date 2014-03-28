var images = document.getElementsByClassName('image')

//console.log("TO , ", images.length);
for(var i=0 ; i < images.length ; i++){
		
	images[i].addEventListener('dragstart', function (event) {
		console.log("depart !!");
	});
	
	images[i].addEventListener('drag', function (event) {
		console.log("DRAG !!");
	});
	images[i].addEventListener('dragend', function (event){
		console.log("ARRIVEE !");
	});

}

var contenant = document.getElementById('dropfile');
	
contenant.addEventListener("dragover", function (event){
    //event.stopPropagation();
    //event.preventDefault();	
	console.log("on me passe dessus ! ");
});

contenant.addEventListener("drop", function (event){
    //event.stopPropagation();
    //event.preventDefault();	
	console.log(event.dataTransfer.files);
	console.log("j'ai recu quelque chose dans la boite");
});

contenant.addEventListener("dragleave", function (event){
	console.log("je quitte vite ce socle, je ne veux pas y entrer");
});


var boite_draggable =  document.getElementById("boite-draggable-1");

boite_draggable.addEventListener("dragstart", function(event){
	console.log("Je suis une div draggable transportant des informations ");
	event.dataTransfer.setData('text/plain', "Je suis l'information, ne me bousculez pas");
});