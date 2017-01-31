/**
 * loginController
 *
 * @class loginController
 * @constructor
 */

angular.module('appControllers')
    .controller('userProfileController', ['$scope', 'userInfo', '$filter', function ($scope, userInfo, $filter) {
        $scope.userInfo = userInfo;

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

            User.changePassword(data).then(function () {
                message(1, $filter('i18next')('Heslo bylo zmeneno'));
            }).catch(function () {
                message(3, $filter('i18next')('Heslo nebylo zmeneno'));
            })
        }
    }
    ]);



