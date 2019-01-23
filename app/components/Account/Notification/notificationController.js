/**
 * notificationController
 *
 * @class notificationController
 * @constructor
 */

angular.module('appControllers')
    .controller('notificationController', ['notificationResponse', '$scope', '$filter', 'UserAbility', function (notificationResponse, $scope, $filter, UserAbility) {
        $scope.notificationResponse = notificationResponse;

        $('#toggle-notification').bootstrapToggle();

        $scope.setNotification = function () {
            var data = {
                enable: true,
                platform: 1,
                senders: [1, 2]
            };
            UserAbility.setNotification(data).then(function () {
                // message set is success
            }).catch(function (error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        };
    }
]);



