/**
 * UsersController
 *
 * @class UsersActivitiesController
 * @constructor
 */

angular.module('appControllers')
    .controller('usersActivitiesController', ['$scope', 'usersActivities',
    function($scope, usersActivities) {
        $scope.usersActivities = usersActivities;
        $scope.route = "admin|activities";

        $scope.getLastBidDate = function(activity) {
            if (activity.last_bidded_auction_id) {
                return createPrettyDate(activity.last_bidded_auction_date);
            }
            return "";
        };

        $scope.getLastCreatedDate = function(activity) {
            if (activity.last_created_auction_id) {
                return createPrettyDate(activity.last_created_auction_date);
            }
            return "";
        };

        function createPrettyDate(auction_date) {
            var date = new Date(auction_date);

            return date.getDate() + "." + (date.getMonth() + 1) + ". " + date.getFullYear() + " - (" + getDiff(date) + ")"
        }

        function getDiff(auction_date) {
            var date2 = new Date(),
                date1 = new Date(auction_date),
                timeDiff = date1.getTime() - date2.getTime();

            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
    }
]);