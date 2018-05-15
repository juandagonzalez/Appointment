	$(document).ready(function(){
    $("#account").click(function(){
        $("#hidding").slideToggle("slow");
    });
    });

	var map;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 4.870, lng: -75.6224},
				zoom: 15
			});
		};
    