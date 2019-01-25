/**
 * notificationController
 *
 * @class notificationController
 * @constructor
 */

angular.module('appControllers')
    .controller('notificationController', ['notificationResponse', '$scope', '$filter', 'UserAbility', function (notificationResponse, $scope, $filter, UserAbility) {
        var response = notificationResponse,
            notification = response.notification,
            companies = response.companies;

        if (!Boolean(notification)) {
            $scope.setCompanies = [];
            $scope.platform = "1";
            $scope.notificationEnabled = false;
        } else {
            $scope.notificationEnabled = notification.enable;
            $scope.setCompanies = notification.companies;
            $scope.platform = notification.platform.toString();
        }

        $scope.companies = [];
        companies.forEach(function (value) {
            $scope.companies[value.ID] = value.name;
        });
        updateToSelect();

        $scope.selectedCompany = null;

        $scope.addCompany = function () {
            if (!$scope.selectedCompany) {
                return;
            }
            $scope.setCompanies.push($scope.selectedCompany.ID);
            updateToSelect();
            setNotification();
        };

        $scope.removeCompany = function (id) {
            $scope.setCompanies.splice($scope.setCompanies.indexOf(id), 1);
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
                companies.filter(function (value) {
                    return  $scope.setCompanies.indexOf(value.ID) === -1
                }) :
                companies;
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



