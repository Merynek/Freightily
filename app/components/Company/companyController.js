/**
 * CompanyController
 *
 * @class CompanyController
 * @constructor
 */

angular.module('appControllers')
    .controller('companyController', ['$scope', 'drivers', 'UserAbility', 'Notification', 'User', '$filter', '$state',
        function($scope, drivers, UserAbility, Notification, User, $filter, $state) {
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
            var data = {
                ID : id_user
            };
            UserAbility.deleteUser(data).then(function() {
                Notification.success('User deleted');
            }).catch(function() {
                Notification.error('nejde smazat');
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

                if(User.SetVacation(data)) {
                    message(1, $filter('i18next')('success.set_vacation'));
                    // refresh data
                    setTimeout(function() {
                        $state.transitionTo($state.current, {}, {
                            reload: true
                        });
                    }, 50);
                } else {
                    message(3, $filter('i18next')('errors.set_vacation'));
                }
            }
        };

        $scope.removeVacation = function(id){
            var dateTime = $(".inputDatePicker-"+id).val();

            if (dateTime) {
                if(User.DeleteVacation(id, dateTime)) {
                    message(1, $filter('i18next')('success.delete_vacation'));
                    // refresh data
                    setTimeout(function() {
                        $state.transitionTo($state.current, {}, {
                            reload: true
                        });
                    }, 50);
                } else {
                    message(3, $filter('i18next')('errors.delete_vacation'));
                }
            }
        };
    }
    ]);


