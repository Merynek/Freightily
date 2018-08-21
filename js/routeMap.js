function showRouteMap(route, id_shipment) {
    $("#map").css("display", "block");
    initMap('map-'+id_shipment, route);
}

function initMap(mapid, route) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById(mapid), {
      zoom: 6,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({suppressMarkers: true});
    calculateAndDisplayRoute(directionsService, directionsDisplay, route);
}


  function calculateAndDisplayRoute(directionsService, directionsDisplay, route) {
                var waypts = [];
                var stores = [];
                var start, 
                    gps,
                    end,
                    indexName = 0,
                    routes = route.split("|");
                
                for (var r in routes) {
                    gps = routes[r].split(",");
                    if(indexName === 0) {
                        start = new google.maps.LatLng(gps[0], gps[1]);
                        indexName++;
                        continue;
                    }
                    stores.push(
                        {name: "store"+indexName, location: new google.maps.LatLng(gps[0], gps[1])}
                    );
                    indexName++;
                }
                end = new google.maps.LatLng(gps[0], gps[1]);

                for (var i in stores) {
                    waypts.push({
                        location: stores[i].location,
                        stopover:true
                    });
                }

                directionsService.route({
                origin: start,
                destination: end,
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
                }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Zobrazení mapy se nezdařilo.\nJe možné že data z mobilních zařízení ještě nebyla zpracována');
                    console.log('Directions request failed due to ' + status);
                }
                });
  }
