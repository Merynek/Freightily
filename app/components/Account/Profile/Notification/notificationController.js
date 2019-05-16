/**
 * notificationController
 *
 * @class notificationController
 * @constructor
 */

angular.module('appControllers')
    .controller('notificationController', ['$scope','notificationResponse' , '$filter', 'UserAbility', function ($scope, notificationResponse, $filter, UserAbility) {
        $scope.route = "account|notifi";
        var response = notificationResponse,
            notification = response.notification,
            hasDailyNotification = response.hasDailyNotification,
            rendered = false;

        $scope.companies = response.companies;
        $scope.dailyNotificationEnabled = hasDailyNotification;

        if (!Boolean(notification)) {
            $scope.setCompanies = [];
            $scope.platform = "1";
            $scope.notificationEnabled = false;
        } else {
            $scope.notificationEnabled = notification.enable;
            $scope.setCompanies = notification.companies;
            $scope.platform = notification.platform.toString();
        }

        updateToSelect();

        $scope.selectedCompany = null;

        $scope.addCompany = function (selectedCompany) {
            if (!selectedCompany) {
                return;
            }
            $scope.setCompanies.push(selectedCompany);
            updateToSelect();
            setNotification();
        };

        $scope.removeCompany = function (name) {
            $scope.setCompanies.splice($scope.setCompanies.indexOf(name), 1);
            updateToSelect();
            setNotification();
        };

        $scope.platformChange = function () {
            setNotification();
        };

        $scope.afterRender = function () {
            if (rendered) {
                return;
            }
            rendered = true;

            var selector = $('#toggle-notification');
            selector.bootstrapToggle();
            selector.change(function () {
                $scope.notificationEnabled = $(this).prop('checked');
                setNotification();
            });

            var selector_daily = $('#toggle-daily-notification');
            selector_daily.bootstrapToggle();
            selector_daily.change(function () {
                $scope.dailyNotificationEnabled = $(this).prop('checked');
                setDailyNotification();
            })
        };

        function updateToSelect() {
            $scope.toSelect = $scope.setCompanies.length ?
                $scope.companies.filter(function (value) {
                    return  $scope.setCompanies.indexOf(value) === -1
                }) :
                $scope.companies;
        }

        function setDailyNotification() {
            var data = {
                enable: $scope.dailyNotificationEnabled
            };
            UserAbility.setDailyNotification(data).then(function () {
                message(1, $filter('i18next')("success.notification_set"));
            }).catch(function (error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        }

        function setNotification() {
            var platform = $(".notification-page #platform").val();
            var data = {
                enable: $scope.notificationEnabled,
                platform: parseInt(platform),
                companies: $scope.setCompanies
            };

            UserAbility.setNotification(data).then(function () {
                message(1, $filter('i18next')("success.notification_set"));
            }).catch(function (error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        }
    }
    ]);



