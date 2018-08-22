/**
 * CompanyController
 *
 * @class CompanyController
 * @constructor
 */

angular.module('appControllers')
    .controller('companyController', ['$scope', 'drivers', 'UserAbility', 'User', '$filter', '$state', 'ngDialog',
        function($scope, drivers, UserAbility, User, $filter, $state, ngDialog) {
        $scope.drivers = drivers;
        $scope.route = "company|overview";
        $scope.lastGpsUpdate = "";

        function getDriver(id) {
            for (var i = 0; i < $scope.drivers.length; i++) {
                if ($scope.drivers[i].ID === id) {
                    return $scope.drivers[i];
                }
            }
        }

        $scope.deleteUser = function(id_user) {
            if (window.confirm($filter('i18next')("warnings.delete_driver"))) {
                UserAbility.deleteUser(id_user).then(function() {
                    message(1, $filter('i18next')('success.driver_deleted'));
                }).catch(function(error) {
                    message(3, $filter('i18next')(getErrorKeyByCode(error)));
                })
            }
        };

        $scope.clickDatePicker = function(id) {
            var datePicker = $('.inputDatePicker-'+id),
                vacation = getDriver(id).vacation;

            datePicker.datepicker({
                beforeShowDay: function (date) {
                    var calender_date = date.getFullYear()+'/'+('0'+(date.getMonth()+1)).slice(-2)+'/'+('0'+date.getDate()).slice(-2),
                        search_index = $.inArray(calender_date, vacation);

                    if (search_index > -1) {
                        return {classes: 'date-vacation', tooltip: 'Vacation'};
                    }else {
                        return {classes: 'highlighted-cal-dates', tooltip: 'Free'};
                    }
                }
            });
            datePicker.datepicker('show');
        };

        $scope.addVacation = function(id){
            var dateTime = $(".inputDatePicker-"+id).val();
            if (dateTime) {
                var data = {
                    id_user: id,
                    date: dateTime
                };

                User.SetVacation(data).then(function() {
                    message(1, $filter('i18next')('success.set_vacation'));
                    // refresh data
                    setTimeout(function() {
                        $state.transitionTo($state.current, {}, {
                            reload: true
                        });
                    }, 50);
                }).catch(function(error) {
                    message(3, $filter('i18next')(getErrorKeyByCode(error)));
                });
            }
        };

        $scope.removeVacation = function(id){
            var dateTime = $(".inputDatePicker-"+id).val();

            if (dateTime) {

                User.DeleteVacation(id, dateTime).then(function() {
                    message(1, $filter('i18next')('success.delete_vacation'));
                    // refresh data
                    setTimeout(function() {
                        $state.transitionTo($state.current, {}, {
                            reload: true
                        });
                    }, 50);
                }).catch(function(error) {
                    message(3, $filter('i18next')(getErrorKeyByCode(error)));
                });
            }
        };

        $scope.getDriverPosition = function(id_driver) {
            UserAbility.getDriverPosition(id_driver).then(function(data) {
                var position = data.position;

                var dateFuture = new Date(data.last_position_set);
                var dateNow = new Date();

                var seconds = Math.floor((dateNow - (dateFuture))/1000);
                var minutes = Math.floor(seconds/60);
                var hours = Math.floor(minutes/60);
                var days = Math.floor(hours/24);

                hours = hours-(days*24);
                minutes = minutes-(days*24*60)-(hours*60);

                $scope.lastGpsUpdate = days + " D, " + hours + " H, " + minutes + " M";


                ngDialog.open({
                    onOpenCallback: function () {
                        initMap(position);
                    },
                    template: 'modal_map',
                    scope: $scope,
                    controller: ['$scope', function($scope) {
                    }]
                });

                function initMap(position) {
                    var gps = position.split(","),
                        lat = Number(gps[0]),
                        lng = Number(gps[1]);
                    var map = new google.maps.Map(document.getElementById('currentlyPositionMap'), {
                        zoom: 14,
                        center: {lat: lat, lng: lng}
                    });

                    var marker = new google.maps.Marker({
                        position: {lat: lat, lng: lng},
                        map: map
                    });
                }
            }).catch(function(error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        };
    }
    ]);


