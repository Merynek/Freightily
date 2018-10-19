/**
 * MapController
 *
 * @class MapController
 * @constructor
 */

angular.module('appControllers')
    .controller('mapController', ['$scope', 'Admin', 'User', '$filter',
        function($scope, Admin, User, $filter) {
            $scope.route = "admin|map";
            $scope.drivers = [];
            Admin.GetDriversPosition().then(function(drivers) {
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
                    var gps = drivers[i].position;

                    if (!gps) {
                        continue;
                    }

                    $scope.drivers.push(drivers[i]);

                    var gpsParts = gps.split(",");
                    gps = {lat: Number(gpsParts[0]), lng: Number(gpsParts[1])};

                    var contentString = '<div id="content">'+
                        drivers[i].driver.username+
                        '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    var marker = new google.maps.Marker({
                        position: gps,
                        map: map,
                        label: {
                            position: 'relative',
                            color: 'black',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            text: drivers[i].driver.username
                        }
                    });

                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                }
            }

            $scope.GetLastGpsUpdate = function(last_position_set) {
                var dateFuture = new Date(last_position_set);
                var dateNow = new Date();

                var seconds = Math.floor((dateNow - (dateFuture))/1000);
                var minutes = Math.floor(seconds/60);
                var hours = Math.floor(minutes/60);
                var days = Math.floor(hours/24);

                hours = hours-(days*24);
                minutes = minutes-(days*24*60)-(hours*60);

                var lastGpsUpdate = dateFuture.getDate() + "." + (dateFuture.getMonth()+1) + "." + dateFuture.getFullYear();
                var lastGpsUpdateTime = dateFuture.getHours() + ":" + dateFuture.getMinutes();

                return lastGpsUpdate + " " + lastGpsUpdateTime;
            }
        }
    ]);


