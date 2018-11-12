/**
 * forgotPasswordController
 *
 * @class forgotPasswordController
 * @constructor
 */

angular.module('appControllers')
    .controller('forgotPasswordController', ['$scope', 'UserAbility', '$filter', '$state', function ($scope, UserAbility, $filter, $state) {
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
                message(1, $filter('i18next')('success.resend_password'));
                $state.go('login');
             }).catch(function (error) {
                 message(3, $filter('i18next')(getErrorKeyByCode(error)));
             })
         }
    }
    ]);



