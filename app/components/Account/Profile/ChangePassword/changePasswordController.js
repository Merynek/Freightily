/**
 * changePasswordController
 *
 * @class changePasswordController
 * @constructor
 */

angular.module('appControllers')
    .controller('changePasswordController', ['$scope', '$filter', 'UserAbility', function ($scope, $filter, UserAbility) {
        $scope.route = "account|changePass";

        $scope.changePassword = function () {
            var currentPass = $(".change-password-page #currentPass"),
                newPass = $(".change-password-page #newPass"),
                newPassRe = $(".change-password-page #newPassRe"),
                data;

            currentPass.removeClass("input-error");
            newPass.removeClass("input-error");
            newPassRe.removeClass("input-error");

            if(currentPass.val().length < 8) {
                message(3, $filter('i18next')('errors.xxx'));
                currentPass.addClass("input-error");
                return;
            }
            if(newPass.val().length < 8) {
                message(3, $filter('i18next')('errors.xxx'));
                newPass.addClass("input-error");
                return;
            }
            if(newPassRe.val().length < 8) {
                message(3, $filter('i18next')('errors.xxx'));
                newPassRe.addClass("input-error");
                return;
            }

            data = {
                currentPass: currentPass.val(),
                newPass: newPass.val(),
                newPassRe: newPassRe.val()
            };

            UserAbility.changePassword(data).then(function () {
                message(1, $filter('i18next')('success.change_password'));
            }).catch(function (error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            });
        };
    }
    ]);



