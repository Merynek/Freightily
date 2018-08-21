/**
 * MapController
 *
 * @class MapController
 * @constructor
 */

angular.module('appControllers')
    .controller('mapController', ['$scope', 'User', '$filter',
        function($scope, User, $filter) {
            $scope.route = "admin|map";
            $scope.drivers = [];
            User.GetDriversPosition().then(function(drivers) {
                $scope.ShowDrivers(drivers);
            }).catch(function(error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            });

            $scope.ShowDrivers = function (drivers) {
                initMap(drivers);
            };

            function initMap(drivers) {
                var map = new google.maps.Map(document.getElementById('mapDrivers'), {
                    zoom: 7,
                    center: {lat: 49.742859, lng: 15.338412}
                });
                var i;

                for (i = 0; i < drivers.length; i++) {
                    var gps = drivers[i].last_gps_point;

                    if (!gps) {
                        continue;
                    }

                    $scope.drivers.push(drivers[i]);
                    var arrayneco = gps.split(",");
                    gps = {lat: Number(arrayneco[0]), lng: Number(arrayneco[1])};

                    var contentString = '<div id="content">'+
                        drivers[i].driver.username+
                        '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    var marker = new google.maps.Marker({
                        position: gps,
                        map: map,
                        title: drivers[i].driver.name + " " + drivers[i].driver.surname
                    });

                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                }
            }
        }
    ]);


