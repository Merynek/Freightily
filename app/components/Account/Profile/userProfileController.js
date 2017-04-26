/**
 * userProfileController
 *
 * @class userProfileController
 * @constructor
 */

angular.module('appControllers')
    .controller('userProfileController', ['$scope', '$filter', 'userInfo', 'UserAbility', function ($scope, $filter, userInfo, UserAbility) {
        $scope.setNavigationPath("home|my_profile");
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
                message(1, $filter('i18next')('Heslo bylo zmeneno'));
            }).catch(function () {
                message(3, $filter('i18next')('Heslo nebylo zmeneno'));
            })
        }
    }
    ]);



