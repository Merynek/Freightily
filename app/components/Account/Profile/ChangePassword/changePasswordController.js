/**
 * changePasswordController
 *
 * @class changePasswordController
 * @constructor
 */

angular.module('appControllers')
    .controller('changePasswordController', ['$scope', '$filter', 'UserAbility', function ($scope, $filter, UserAbility) {
        $scope.route = "account|changePass";
        $scope.account = {
            currentPass: "",
            newPass: "",
            newPassRe: ""
        };

        $scope.changePassword = function () {
            var currentPass = $(".change-password-page #currentPass"),
                newPass = $(".change-password-page #newPass"),
                newPassRe = $(".change-password-page #newPassRe"),
                data;

            currentPass.removeClass("input-error");
            newPass.removeClass("input-error");
            newPassRe.removeClass("input-error");

            if($scope.account.currentPass.length < 8) {
                message(3, $filter('i18next')('errors.password_must_me_greater_eight'));
                currentPass.addClass("input-error");
                return;
            }
            if($scope.account.newPass.length < 8) {
                message(3, $filter('i18next')('errors.password_must_me_greater_eight'));
                newPass.addClass("input-error");
                return;
            }
            if($scope.account.newPassRe.length < 8) {
                message(3, $filter('i18next')('errors.password_must_me_greater_eight'));
                newPassRe.addClass("input-error");
                return;
            }

            if($scope.account.newPassRe !== $scope.account.newPass) {
                newPass.addClass("input-error");
                newPassRe.addClass("input-error");
                message(3, $filter('i18next')('errors.passwords_not_match'));
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
    }
    ]);



