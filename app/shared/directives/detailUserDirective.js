angular.module('appDirectives')
    .directive("detailUser", function () {
        return {
            templateUrl: 'app/shared/directives/detailUserDirective.html',
            restrict: "E",
            bindToController: true,
            controllerAs: 'vm',
            scope: {
                driver: '='
            },
            controller: function ($scope, $filter, UserAbility, User, $state, Shipments, ngDialog) {
                $scope.driver = this.driver.driver;

                Shipments.getAllNewShipments().then(function(res){
                    $scope.allShipments = res;
                    $scope.notAssignedShipments = res.filter(function(shipment) {
                        return shipment.driver === 0;
                    });
                    $scope.driverShipments = res.filter(function(shipment) {
                        return shipment.driver === $scope.driver.ID;
                    });
                }).catch(function(){
                    return null;
                });

                $scope.shipmentsForDriver = [];
                $scope.assignmentsIds = [];
                $scope.currentDriver = 0;

                $scope.show = false;
                $scope.toggleDetail = function () {
                    $scope.show = !$scope.show;
                    if ($scope.show) {
                        $scope.getDriverPosition($scope.driver.ID);
                    }
                };

                UserAbility.getDrivers().then(function(res){
                    $scope.drivers = res;
                }).catch(function(){
                    return null;
                });

                $scope.getDriverPosition = function(id_driver) {
                    UserAbility.getDriverPosition(id_driver).then(function(data) {
                        var position = data.position;

                        console.log(data.last_position_set);
                        var dateFuture = new Date(data.last_position_set);
                        var dateNow = new Date();

                        var seconds = Math.floor((dateNow - (dateFuture))/1000);
                        var minutes = Math.floor(seconds/60);
                        var hours = Math.floor(minutes/60);
                        var days = Math.floor(hours/24);

                        hours = hours-(days*24);
                        minutes = minutes-(days*24*60)-(hours*60);

                        $scope.lastGpsUpdate = dateFuture.getDate() + "." + (dateFuture.getMonth()+1) + "." + dateFuture.getFullYear();
                        $scope.lastGpsUpdateTime = dateFuture.getHours() + ":" + dateFuture.getMinutes();



                        initMap(position, id_driver);

                        function initMap(position, id) {
                            var gps = position.split(","),
                                lat = Number(gps[0]),
                                lng = Number(gps[1]);
                            var map = new google.maps.Map(document.getElementById('user-map-'+id), {
                                zoom: 13,
                                center: {lat: lat, lng: lng}
                            });

                            new google.maps.Marker({
                                position: {lat: lat, lng: lng},
                                map: map
                            });
                        }
                    }).catch(function(error) {
                        message(3, $filter('i18next')(getErrorKeyByCode(error)));
                    })
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
                        },
                        format: "dd.mm.yyyy",
                        weekStart: 1
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

                $scope.assignDriver = function (id_driver) {
                    $scope.currentDriver = id_driver;
                    $scope.shipmentsForDriver = $scope.allShipments.filter(function(shipment) {
                        return shipment.driver === 0 || shipment.driver === id_driver;
                    });

                    $scope.assignmentsIds = $scope.shipmentsForDriver.filter(function(shipment) {
                        return shipment.driver !== 0;
                    }).map(function(shipment) {
                        return shipment.ID;
                    });

                    ngDialog.open({
                        template: 'modal_assign',
                        scope: $scope,
                        closeByDocument: false,
                        showClose: false,
                        closeByEscape: true,
                        controller: ['$scope', function($scope) {
                            // controller logic
                            $scope.ok = function() {
                                $scope.closeThisDialog(true);
                            };
                            $scope.cancel = function() {
                                $scope.closeThisDialog(false);
                            };
                            $scope.setAssignment = function(id_shipment, input) {
                                if (input.currentTarget.checked) {
                                    $scope.assignmentsIds.push(id_shipment);
                                } else {
                                    var index = $scope.assignmentsIds.indexOf(id_shipment);
                                    if (index !== -1) {
                                        $scope.assignmentsIds.splice(index, 1);
                                    }
                                }

                            }
                        }],
                        preCloseCallback: function(value) {
                            if (value) {
                                assignShipments();
                                $scope.shipmentsForDriver = [];
                                $scope.assignmentsIds = [];
                                return true;
                            }
                            $scope.shipmentsForDriver = [];
                            $scope.assignmentsIds = [];
                            return true
                        }
                    });
                };

                $scope.deleteUser = function(id_user) {
                    if (window.confirm($filter('i18next')("warnings.delete_driver"))) {
                        UserAbility.deleteUser(id_user).then(function() {
                            message(1, $filter('i18next')('success.driver_deleted'));
                        }).catch(function(error) {
                            message(3, $filter('i18next')(getErrorKeyByCode(error)));
                        })
                    }
                };

                function getDriver(id) {
                    for (var i = 0; i < $scope.drivers.length; i++) {
                        if ($scope.drivers[i].ID === id) {
                            return $scope.drivers[i];
                        }
                    }
                }


                function assignShipments() {
                    var data = {
                        id_driver: $scope.currentDriver,
                        id_shipments: $scope.assignmentsIds
                    };

                    if ($scope.shipmentsForDriver.length === 0) {
                        return;
                    }

                    UserAbility.assignShipments(data).then(function(){
                        $state.transitionTo($state.current, {}, {
                            reload: true
                        });
                    }).catch(function(error){
                        message(3, $filter('i18next')(getErrorKeyByCode(error)));
                    })
                }

            }
        }
    });
