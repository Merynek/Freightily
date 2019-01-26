/**
 * notificationController
 *
 * @class notificationController
 * @constructor
 */

angular.module('appControllers')
    .controller('notificationController', ['notificationResponse', '$scope', '$filter', 'UserAbility', function (notificationResponse, $scope, $filter, UserAbility) {
        var response = notificationResponse,
            notification = response.notification;

        $scope.companies = response.companies;

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

        $scope.addCompany = function () {
            if (!$scope.selectedCompany) {
                return;
            }
            $scope.setCompanies.push($scope.selectedCompany);
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

        setTimeout(function () {
            var selector = $('#toggle-notification');
            selector.bootstrapToggle();
            selector.change(function () {
                $scope.notificationEnabled = $(this).prop('checked');
                setNotification();
            })
        }, 10);

        function updateToSelect() {
            $scope.toSelect = $scope.setCompanies.length ?
                $scope.companies.filter(function (value) {
                    return  $scope.setCompanies.indexOf(value) === -1
                }) :
                $scope.companies;
        }

        function setNotification() {
            var data = {
                enable: $scope.notificationEnabled,
                platform: parseInt($scope.platform),
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



