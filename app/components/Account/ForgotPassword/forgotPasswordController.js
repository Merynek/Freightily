/**
 * forgotPasswordController
 *
 * @class forgotPasswordController
 * @constructor
 */

angular.module('appControllers')
    .controller('forgotPasswordController', ['$scope', 'UserAbility', '$filter', function ($scope, UserAbility, $filter) {
         $scope.clicked = false;

         $scope.sendMail = function () {
             var data;

             $scope.clicked = true;
             if (!$scope.forgotPasswordForm.$valid) {
                 return;
             }
             data = {
                 email: $scope.email
             };

             UserAbility.sendNewPassword(data).then(function () {
                message(1, $filter('i18next')('Heslo bylo posláno'));
             }).catch(function () {
                message(3, $filter('i18next')('Heslo nebylo posláno'));
             })
         }
    }
    ]);



