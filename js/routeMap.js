function showRouteMap(route){
           var myRouter = {
            map_: null,
            directionsHelper_: null,

            stores: [],

            calcRoute: function() {
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
                    this.stores.push(
                        {name: "store"+indexName, location: new google.maps.LatLng(gps[0], gps[1])}
                    )
                    indexName++;
                }
                end = new google.maps.LatLng(gps[0], gps[1]);

                var waypts = [];
                for (var i in this.stores) {
                    waypts.push({
                        location: this.stores[i].location,
                        stopover:true
                    });
                }
                //new google.maps.LatLng(47.7006494, 18.0882306);
                

                var request = {
                    origin: start,
                    destination: end,
                    waypoints: waypts,
                    optimizeWaypoints: true,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                var _SELF = this;
                var distance = document.getElementById('distance');
                this.directionsHelper_.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        _SELF.directionsDisplay_.setDirections(response);
                        distance.innerHTML = response.routes[0].legs[0].distance.text;
                        return;
                    }
                    console.log('Directions Status: ' + status);
                });
            },

            init: function(mapid) {

                this.directionsHelper_ = new google.maps.DirectionsService();
                this.directionsDisplay_ = new google.maps.DirectionsRenderer();
                //console.log(this.directionsDisplay.directions.routes[0].legs[0].distance.text);

                var center = new google.maps.LatLng(50.82788, 3.26499);
                var myOptions = {
                    zoom:7,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: center
                }
                this.map_ = new google.maps.Map(document.getElementById(mapid), myOptions);
                this.directionsDisplay_.setMap(this.map_);

                this.calcRoute();
            }
        };
        $("#map").css("display", "block");
        //$("#distance").css("display", "block");
        myRouter.init('map');
        return;
};
