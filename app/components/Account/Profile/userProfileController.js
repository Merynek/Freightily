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
        $scope.clickedAcc = false;
        $scope.sharePercent = getSharePercent();

        function getSharePercent() {
            switch ($scope.userInfo.senderLevel) {
                case 1: return "10%";
                default: return "10%";
            }

        }

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
            });
        };

        $scope.setInfo = function () {
            var phone_number = $(".user-page #phone_number"),
                email = $(".user-page #email"),
                data;

            $scope.clickedAcc = true;
            phone_number.removeClass("input-error");
            email.removeClass("input-error");

            if (!$scope.setAccountInfoForm.$valid) {
                return;
            }
            if (!validateEmail($scope.userInfo.email)) {
                message(3, $filter('i18next')('errors.wrong_email'));
                email.addClass("input-error");
                return;
            }
            if($scope.userInfo.phone_number.length < 9) {
                message(3, $filter('i18next')('errors.phone_number_must_me_greater_none'));
                phone_number.addClass("input-error");
                return;
            }

            data = {
                phone_number: $scope.userInfo.phone_number,
                email: $scope.userInfo.email
            };

            UserAbility.setInfo(data).then(function () {
                message(1, $filter('i18next')('success.set_account_info'));
            }).catch(function (error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        };
    }
    ]);



