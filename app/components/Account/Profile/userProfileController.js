/**
 * userProfileController
 *
 * @class userProfileController
 * @constructor
 */

angular.module('appControllers')
    .controller('userProfileController', ['$scope', '$filter', 'userInfo', 'UserAbility', 'User', '$state', function ($scope, $filter, userInfo, UserAbility, User, $state) {
        $scope.userInfo = userInfo;
        $scope.clicked = false;

        $scope.changePassword = function () {
            var data;

            $scope.clicked = true;
            if (!$scope.changePasswordForm.$valid) {
                return;
            }
            data = {
                currentPass: $scope.account.currentPass,
                newPass: $scope.account.newPass,
                newPassRe: $scope.account.newPassRe
            };

            UserAbility.changePassword(data).then(function () {
                message(1, $filter('i18next')('success.change_password'));
            }).catch(function (error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        };
    }
    ]);



