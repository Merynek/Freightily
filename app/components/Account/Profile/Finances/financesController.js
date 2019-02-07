/**
 * financesController
 *
 * @class financesController
 * @constructor
 */

angular.module('appControllers')
    .controller('financesController', ['$scope', '$filter', 'financesInfo', function ($scope, $filter, financesInfo) {
        $scope.route = "account|finance";
        $scope.userInfo = financesInfo.user;
        $scope.lastCreatedAuction = financesInfo.lastCreatedAuction;
        /* lastCreatedAuction Mock example
        * [
        *   {price: 1500, currently_price: 1000, end_auction: '11.2.2019 16:00:00'},
        *   {price: 1800, currently_price: 800, end_auction: '11.5.2019 14:00:00'}
        * ]
        * */
        $scope.sharePercent = getSharePercent();
        $scope.userInfo.share = financesInfo.user.share.toString().replace(".", ","); // todo: udělat to hezčejš? ..doplnit ,- když nebudou halíře nebo zaokrouhlovat?

        function getSharePercent() {
            switch ($scope.userInfo.senderLevel) {
                case 1: return "10%";
                default: return "10%";
            }
        }

        function afterRender() {
            var el = document.getElementById('credit-chart');

            if (!el) {
                return;
            }
            var ctx = el.getContext('2d');

            var color = Chart.helpers.color;
            var horizontalBarChartData = {
                datasets: [{
                    label: $filter('i18next')('texts.charts_start'),
                    backgroundColor: color("#12133d").alpha(0.4).rgbString(),
                    borderColor: "#12133d",
                    data: [
                        $scope.userInfo.start_credit
                    ]
                }, {
                    label: $filter('i18next')('texts.charts_end'),
                    backgroundColor: color("#74ce3b").alpha(0.4).rgbString(),
                    borderColor: "#74ce3b",
                    data: [
                        $scope.userInfo.end_credit
                    ]
                }]
            };
            new Chart(ctx, {
                type: 'horizontalBar',
                data: horizontalBarChartData,
                options: {
                    elements: {
                        rectangle: {
                            borderWidth: 2
                        }
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    legend: {
                        position: 'top',
                        onClick: function () { }
                    },
                    tooltips: {
                        cornerRadius: 3,
                        bodySpacing: 7,
                        callbacks: {
                            afterLabel: function (tooltipItem, data) {}
                        }
                    },
                    title: {
                        display: true,
                        text: $filter('i18next')('texts.charts_label')
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 0,
                                callback: function(value, index, values) {
                                    return value + "Kč";
                                }
                            }
                        }]
                    }
                }
            });
        }

        setTimeout(function () {
            afterRender();
            window.dispatchEvent(new Event('resize'));
        }, 50);
    }
    ]);



