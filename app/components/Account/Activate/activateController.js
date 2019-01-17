/**
 * activateController
 *
 * @class activateController
 * @constructor
 */

angular.module('appControllers')
    .controller('activateController', ['$scope', 'activateResponse', function ($scope, activateResponse) {
        $scope.success = activateResponse;
    }
]);



