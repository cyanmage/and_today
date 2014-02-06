var appli = angular.module('appli', ['core', 'defileur', 'stickit', 'chargeurPage', 'ngAnimate', 'warningMessages', 'busEvent'/**/]);

appli.config(['$httpProvider', '$interpolateProvider', function($httpProvider, $interpolateProvider) {

    	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
    	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'; 
 		$interpolateProvider.startSymbol('{*');
 		$interpolateProvider.endSymbol('*}'); 

}]);	




appli.run(['serviceIds', function(serviceIds){

	serviceIds.initialise_les_ids();

}]);

$( document ).ready(function() {
	$('#dropfile').on('click', function(){
		console.log("CA VA TOGGLER LE BOLD ! ")
		document.execCommand('bold', false, null);
	});
});

/*
//$( document ).ready(function(){
	$(document).on('dragenter', '#dropfile', function() {
	            $(this).css('border', '3px dashed red');
	            return false;
	});
	 
	$(document).on('dragover', '#dropfile', function(e){
		//console.log(e);
				e.originalEvent.dataTransfer.dropEffect = "copy";
	            e.preventDefault();
	            e.stopPropagation();
	            //console.log(e);
	            $(this).css('border', '3px dashed red');
	            return false;
	});
	 
	$(document).on('dragleave', '#dropfile', function(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            $(this).css('border', '3px dashed #BBBBBB');
	            return false;
	});
	
	$(document).on('drop', '#dropfile', function(e) {
		console.log(e.originalEvent.dataTransfer);
	            if(e.originalEvent.dataTransfer){
	                       if(e.originalEvent.dataTransfer.files.length) {
	                                   // Stop the propagation of the event
	                                   e.preventDefault();
	                                   e.stopPropagation();
	                                   $(this).css('border', '3px dashed green');
	                                   // Main function to upload
	                                   //upload(e.originalEvent.dataTransfer.files);
	                       }  
	            }
	            else {
	                       $(this).css('border', '3px dashed #BBBBBB');
	            }
	           
	});

//})*/
	
