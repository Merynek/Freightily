/**
 * invoicesController
 *
 * @class invoicesController
 * @constructor
 */

angular.module('appControllers')
    .controller('invoicesController', ['$scope', '$filter', 'invoices', 'UserAbility', function ($scope, $filter, invoices, UserAbility) {
        $scope.route = "account|invoices";

        $scope.invoices = invoices;
        $scope.getPrintInvoice = function (id) {
            UserAbility.getInvoicePrint(id).then(function (data) {
                var file = new Blob([data], {
                    type: 'application/csv'
                });
                //trick to download store a file having its URL
                var fileURL = URL.createObjectURL(file);
                var a = document.createElement('a');
                a.href = fileURL;
                a.target = '_blank';
                a.download = 'invoice-' + id +'.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }).catch(function (error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            });
        };

        $scope.getState = function(state) {
            if (state) {
                return $filter('i18next')('texts.invoices.paid');
            }
            return $filter('i18next')('texts.invoices.not_paid');
        };

        $scope.createPrettyDate = function(date) {
            var newDate = new Date(date);

            return newDate.getDate() + "." + (newDate.getMonth() + 1) + ". " + newDate.getFullYear();
        };
    }
]);



