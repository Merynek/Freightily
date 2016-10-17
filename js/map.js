function showMap(from, to){
           var myRouter = {
            map_: null,
            directionsHelper_: null,

            calcRoute: function() {
                var start = from;
                var end = to;
                //new google.maps.LatLng(47.7006494, 18.0882306);
                var request = {
                    origin: start,
                    destination: end,
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
        $("#distance").css("display", "block");
        myRouter.init('map');
        return;
};
