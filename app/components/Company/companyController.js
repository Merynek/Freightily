/**
 * CompanyController
 *
 * @class CompanyController
 * @constructor
 */

angular.module('appControllers')
    .controller('companyController', ['$scope', 'drivers', 'UserAbility', 'User', '$filter', '$state',
        function($scope, drivers, UserAbility, User, $filter, $state) {
        $scope.drivers = drivers;
        $scope.route = "company|overview";

        function getDriver(id) {
            for (var i = 0; i < $scope.drivers.length; i++) {
                if ($scope.drivers[i].ID === id) {
                    return $scope.drivers[i];
                }
            }
        }

        $scope.deleteUser = function(id_user) {
            UserAbility.deleteUser(id_user).then(function() {
                message(1, $filter('i18next')('success.driver_deleted'));
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
    }
    ]);


