/**
 * notificationController
 *
 * @class notificationController
 * @constructor
 */

angular.module('appControllers')
    .controller('notificationController', ['notificationResponse', '$scope', '$filter', 'UserAbility', function (notificationResponse, $scope, $filter, UserAbility) {
        // var response = notificationResponse;
        var response = {
            notification: notificationResponse || {},
            users: [
                {id: 1, company: "foo"},
                {id: 2, company: "bar"},
                {id: 3, company: "foobar"},
                {id: 4, company: "asdf"},
                {id: 5, company: "asdfoo"},
                {id: 6, company: "asdbar"}
            ]
        };

        $scope.notificationEnabled = Boolean(notificationResponse);
        $scope.senders = response.notification.senders || [];
        $scope.platform = response.notification.platform ? response.notification.platform.toString() : "1";

        $scope.users = [];
        response.users.forEach(function (value) {
            $scope.users[value.id] = value.company;
        });
        updateToSelect();

        $scope.selectedUser = null;

        $scope.addUser = function () {
            if (!$scope.selectedUser) {
                return;
            }
            $scope.senders.push($scope.selectedUser.id);
            updateToSelect();
            setNotification();
        };

        $scope.removeUser = function (id) {
            $scope.senders.splice($scope.senders.indexOf(id), 1);
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
            $scope.toSelect = $scope.senders.length ?
                response.users.filter(function (value) {
                    return response.notification.senders.indexOf(value.id) === -1
                }) :
                response.users;
        }

        function setNotification() {
            var data = {
                enable: $scope.notificationEnabled,
                platform: parseInt($scope.platform),
                senders: $scope.senders
            };
            UserAbility.setNotification(data).then(function () {
                // message set is success
            }).catch(function (error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        }
    }
    ]);



