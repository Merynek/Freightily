/**
 * UsersController
 *
 * @class UsersActivitiesController
 * @constructor
 */

angular.module('appControllers')
    .controller('usersActivitiesController', ['$scope', 'usersActivities',
    function($scope, usersActivities) {
        $scope.route = "admin|activities";

        $scope.sendersActivities = [];
        $scope.transportersActivities = [];
        $scope.bothActivities = [];
        $scope.unknownActivities = [];

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

        for (var i = 0; i < usersActivities.length; i++) {
            var activity = usersActivities[i],
                lastBidDate = $scope.getLastBidDate(activity),
                lastCreateDate = $scope.getLastCreatedDate(activity);

            if (lastBidDate && lastCreateDate) {
                $scope.bothActivities.push(activity);
                continue;
            }
            if (lastBidDate) {
                activity.diff = getDiff(activity.last_bidded_auction_date);
                $scope.transportersActivities.push(activity);
                continue;
            }
            if (lastCreateDate) {
                activity.diff = getDiff(activity.last_created_auction_date);
                $scope.sendersActivities.push(activity);
                continue;
            }
            $scope.unknownActivities.push(activity);
        }
        $scope.sendersActivities.sort(sort);
        $scope.transportersActivities.sort(sort);

        function sort(a,  b) {
            if (a.diff > b.diff) {
                return 1;
            }
            return -1
        }

        function createPrettyDate(auction_date) {
            var date = new Date(auction_date);

            return date.getDate() + "." + (date.getMonth() + 1) + ". " + date.getFullYear() + " - (" + getDiff(date) + ")"
        }

        function getDiff(auction_date) {
            var today = new Date(),
                date1 = new Date(auction_date),
                timeDiff = date1.getTime() - today.getTime();

            if (isToday(date1)) {
                return 0;
            }

            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }

        function isToday(someDate) {
            var today = new Date();

            return someDate.getDate() === today.getDate() &&
                someDate.getMonth() === today.getMonth() &&
                someDate.getFullYear() === today.getFullYear();
        }
    }
]);