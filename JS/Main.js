var Location = function(){
	let Lat="",Lon="";
	return {
		Lat:Lat,
		Lon:Lon
	};
};
var ApiKey = "AIzaSyC32Rs2dQdcKbJToKj_-130btg1znFy4Y8";
$().ready(function(){
	Init();
	GetLocationLatLng();
});

$(document).on("pagebeforeshow","#PageOne",function(){ 
	let url = "https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Kaohsiung?$format=JSON"
	$.ajax({
                type: "GET",
                url: url,
                async: true,
                success: function(result) {
                    $("#PageOneShowJson").html(JSON.stringify(result))
                }
            });
});

$(document).on("pagebeforeshow","#PageTwo",function(){ 
	let latlon = new google.maps.LatLng(Location.Lat, Location.Lon)
    let mapholder = document.getElementById("PageTwoMap")
    mapholder.style.height = "700px";
    mapholder.style.width = "97%";

    let myOptions = {
        center:latlon,zoom:12,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }
    
    let map = new google.maps.Map(mapholder, myOptions);
 	let marker = new google.maps.Marker({
            position: latlon,  
            icon: {
                path: google.maps.SymbolPath.CIRCLE,  // 使用圖圈圖形
                strokeColor: "white", // 線條顏色
                strokeWeight: 5,      // 線條粗細
                fillColor: "red",     // 填充顏色
                fillOpacity: 0.3,     // 填充透明度
                scale: 20 // 圖形大小
            },
            title: "現在位置",
            map: map
                });
});

$(document).on("pagebeforeshow","#PageThree",function(){ 
	let url = "https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Kaohsiung?$format=JSON"

	let latlon = new google.maps.LatLng(Location.Lat, Location.Lon)
    let mapholder = document.getElementById("PageThreeMap")
    mapholder.style.height = "700px";
    mapholder.style.width = "97%";

    let myOptions = {
        center:latlon,zoom:12,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }
    
    let map = new google.maps.Map(mapholder, myOptions);
 	let marker = new google.maps.Marker({
            position: latlon,  
            icon: {
                path: google.maps.SymbolPath.CIRCLE,  // 使用圖圈圖形
                strokeColor: "white", // 線條顏色
                strokeWeight: 5,      // 線條粗細
                fillColor: "blue",     // 填充顏色
                fillOpacity: 0.3,     // 填充透明度
                scale: 20 // 圖形大小
            },
            title: "現在位置",
            map: map
                });
 	$.ajax({
                type: "GET",
                url: url,
                async: true,
                success: function(result) {
                	console.log(result);
                	result.forEach(function(e){
	                    let latlon = new google.maps.LatLng(e.StationPosition.PositionLat, e.StationPosition.PositionLon)
				 		let marker = new google.maps.Marker({
				            position: latlon,  
				            icon: {
				                path: google.maps.SymbolPath.CIRCLE,  // 使用圖圈圖形
				                strokeColor: "white", // 線條顏色
				                strokeWeight: 2,      // 線條粗細
				                fillColor: "red",     // 填充顏色
				                fillOpacity: 0.3,     // 填充透明度
				                scale: 10 // 圖形大小
				            },
				            title: e.StationName.Zh_tw,
				            map: map
				                });

                	});
                }
            });

});

$(document).on("pagebeforeshow","#PageFour",function(){ 
	let url = "https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Kaohsiung?$format=JSON"
	let HeatmapData  = []
	let latlon = new google.maps.LatLng(Location.Lat, Location.Lon)
    let mapholder = document.getElementById("PageFourMap")
    mapholder.style.height = "700px";
    mapholder.style.width = "97%";

    let myOptions = {
        center:latlon,zoom:12,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }
    let map = new google.maps.Map(mapholder, myOptions);
 	$.ajax({
                type: "GET",
                url: url,
                async: true,
                success: function(result) {
                	console.log(result);
                	result.forEach(function(e){
	                    let latlon = new google.maps.LatLng(e.StationPosition.PositionLat, e.StationPosition.PositionLon)
				 		HeatmapData.push(latlon);
                	});

	            	let heatmap = new google.maps.visualization.HeatmapLayer({
			          data: HeatmapData,
			          dissipating: false,
			          map: map
			        });
	            }
            });

});

$(document).on("pagebeforeshow","#PageFive",function(){ 
	let url = "https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Kaohsiung?$format=JSON"
	let Markers = []
	let latlon = new google.maps.LatLng(Location.Lat, Location.Lon)
    let mapholder = document.getElementById("PageFiveMap")
    mapholder.style.height = "700px";
    mapholder.style.width = "97%";

    let myOptions = {
        center:latlon,zoom:12,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }
    
    let map = new google.maps.Map(mapholder, myOptions);
 	let marker = new google.maps.Marker({
            position: latlon,
            title: "現在位置",
            map: map
                });
 	Markers.push(marker);
 	$.ajax({
                type: "GET",
                url: url,
                async: true,
                success: function(result) {
                	console.log(result);
                	result.forEach(function(e){
	                    let latlon = new google.maps.LatLng(e.StationPosition.PositionLat, e.StationPosition.PositionLon)
				 		let marker = new google.maps.Marker({
				            position: latlon,
				            title: e.StationName.Zh_tw,
				            map: map
				                });
				 		Markers.push(marker);
                	});
	            	let markerCluster = new MarkerClusterer(map, Markers,
	                    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	                }
            });
});

$(document).on("pagebeforeshow","#PageSix",function(){ 

 	SetMapByDistance($("#points").val(),"PageSixMap");
 	$("a[role=slider]").on("click",function(){
 		SetMapByDistance($("#points").val(),"PageSixMap");
 	})
 	
});

function Init(){
	SetChangePageEffects();
};

function SetChangePageEffects(){
	$(".NextPage").attr("data-transition","slide");
	$(".BackPage").attr("data-transition","slide");
	$(".BackPage").attr("data-direction","reverse");
}

function GetLocationLatLng(){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			Location.Lat= position.coords.latitude;
            Location.Lon= position.coords.longitude;
		});
	}
}

function GetDistance(lat1,lon1,lat2,lon2){
	let R = 6371; // Km  
	let dLat = (lat2-lat1)*Math.PI/180;  
	let dLon = (lon2-lon1)*Math.PI/180;   
	let a = Math.sin(dLat/2) * Math.sin(dLat/2) +  
	        Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *   
	        Math.sin(dLon/2) * Math.sin(dLon/2);   
	let c = 2 * Math.asin(Math.sqrt(a));   
	let d = R * c;
	return d;
}

function SetMapByDistance(distance,MapId){
	console.log(distance);
	let latlon = new google.maps.LatLng(Location.Lat, Location.Lon)
    let mapholder = document.getElementById(MapId)
    mapholder.style.height = "700px";
    mapholder.style.width = "97%";

    let myOptions = {
        center:latlon,zoom:12,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }
    
    let map = new google.maps.Map(mapholder, myOptions);
 	let marker = new google.maps.Marker({
            position: latlon,  
            icon: {
                path: google.maps.SymbolPath.CIRCLE,  // 使用圖圈圖形
                strokeColor: "white", // 線條顏色
                strokeWeight: 5,      // 線條粗細
                fillColor: "blue",     // 填充顏色
                fillOpacity: 0.3,     // 填充透明度
                scale: 20 // 圖形大小
            },
            title: "現在位置",
            map: map
                });
	let url = "https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Kaohsiung?$format=JSON"
		$.ajax({
            type: "GET",
            url: url,
            async: true,
            success: function(result) {
            	console.log(result);
            	result.forEach(function(e){
                    let latlon = new google.maps.LatLng(e.StationPosition.PositionLat, e.StationPosition.PositionLon)
                    if(GetDistance(Location.Lat, Location.Lon,e.StationPosition.PositionLat, e.StationPosition.PositionLon) <= distance){
                    	console.log(GetDistance(Location.Lat, Location.Lon,e.StationPosition.PositionLat, e.StationPosition.PositionLon));
				 		let marker = new google.maps.Marker({
				            position: latlon,  
				            icon: {
				                path: google.maps.SymbolPath.CIRCLE,  // 使用圖圈圖形
				                strokeColor: "white", // 線條顏色
				                strokeWeight: 2,      // 線條粗細
				                fillColor: "red",     // 填充顏色
				                fillOpacity: 0.3,     // 填充透明度
				                scale: 10 // 圖形大小
				            },
				            title: e.StationName.Zh_tw,
				            map: map
				                });
                    }
            	});
            }
        });
	}