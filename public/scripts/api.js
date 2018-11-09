//when someone select a country

$('select').on('change',function(){

	//display content area
	$('.content').removeClass('invisible');
	
	//scroll to the content area
	$('html, body').animate({scrollTop:$('.content').offset().top}, 800);
	
	// 1. find the city the user asked from google map.
	
	//send request to google map, asking for geographical infos
	$.ajax({
		
		method:"GET",
		url:"https://maps.googleapis.com/maps/api/geocode/json?address="+$('select').val()+"&key=AIzaSyBIX1VRdrE9bwN5MxzppArVb5aUmQA7okI"
	
	}).done(function(ginfo){
		
		// as the request processed, parse the data
	 	var city = ginfo['results'][0]['geometry']['location'];
		//initialize and center the google map
		var map;
		map = new google.maps.Map(
			document.getElementById('map'), {
				center: city,
				zoom: 10
		});
		// create new marker
		var marker = new google.maps.Marker(
			{position: city , map: map}
		);

		// 2. get weather info from apixu.com
		
		//send request to apixu.com, asking for weather infos of specific country
		$.ajax({
			
			method:"GET",
			url:"https://api.apixu.com/v1/forecast.json?key=038bde0bc2734af2b27134702181709&q="+$('select').val()
			
		}).done(function(winfo){
			
			//as the request processed, parse the data
			var temp_c = winfo['current']['temp_c'],
				text = winfo['current']['condition']['text'],
				icon = winfo['current']['condition']['icon'],
				ws = winfo['current']['wind_kph'],
				humid = winfo['current']['humidity'];
			
			//set html content for weather info display
			var contentString =
				"<h1>Current Weather</h1>"+
				"<h3>City: "+$('select').val()+"</h3>"+
				"<h3>Temperature : "+temp_c+"&#176;C</h3>"+
				"<h3>Humidity : "+humid+"</h3>"+
				"<h3>Wind-velocity : "+ws+" kph</h3>"+
				"<h3>Condition: "+text+"</h3>"+
				"<img src='http:"+icon+"'></img>"; 

			//create new info window on google map
			var infowindow = new google.maps.InfoWindow(
				{content: contentString}
			);

			// open info as default
			infowindow.open(map,marker);
			// when pressed, open the info
			marker.addListener("click", function(){
				infowindow.open(map,marker);
			});
			
		});
		
	});

});


