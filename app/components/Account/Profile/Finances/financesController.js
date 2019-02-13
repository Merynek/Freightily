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
        /* lastCreatedAuction Mock example */
        var mock = [
           {price: 1500, currently_price: 1000, end_auction: '2018-11-20 16:00:00.000'},
           {price: 5500, currently_price: 4500, end_auction: '2018-12-11 14:00:00.000'},
           {price: 1800, currently_price: 800, end_auction: '2018-12-15 14:00:00.000'},
           {price: 2500, currently_price: 500, end_auction: '2019-01-20 14:00:00.000'},
           {price: 2200, currently_price: 2000, end_auction: '2019-01-05 14:00:00.000'},
           {price: 500, currently_price: 300, end_auction: '2019-01-02 14:00:00.000'},
           {price: 850, currently_price: 375, end_auction: '2019-02-14 14:00:00.000'},
           {price: 500, currently_price: 400, end_auction: '2019-02-11 23:25:00.000'}
        ];

        $scope.sharePercent = getSharePercent();
        $scope.userInfo.share = financesInfo.user.share.toString().replace(".", ","); // todo: udělat to hezčejš? ..doplnit ,- když nebudou halíře nebo zaokrouhlovat?

        function getSharePercent() {
            switch ($scope.userInfo.senderLevel) {
                case 1: return "10%";
                default: return "10%";
            }
        }

        function prepareHistoryData(data) {
            var chartData = {
                labels: [],
                start: [],
                end: []
            },
                sets = [];

            data.forEach(function (d) {
                var month = (new Date(d.end_auction)).getMonth(),
                    index = chartData.labels.indexOf(month);

                if (index === -1) {
                    index = chartData.labels.length;
                    chartData.labels.push(month);
                    sets[index] = {start: d.price, end: d.currently_price};
                    return;
                }
                sets[index].start += d.price;
                sets[index].end += d.currently_price;
            });

            chartData.labels = chartData.labels.map(function (month) {
                return $filter('i18next')('months.' + month);
            });

            sets.forEach(function (d) {
                if (d.start || d.end) {
                    chartData.start.push(d.start);
                    chartData.end.push(d.end);
                }
            });

            return chartData;
        }

        /**
         * @param {HTMLElement} canvas
         * @param {number} months
         */
        function updateChartHeight(canvas, months) {
            var wrap = $(canvas).parents(".charts");

            wrap.css({height: 86 + months * 48});
        }

        function afterRender() {
            var historyElement = document.getElementById('history-chart'),
                creditElement = document.getElementById('credit-chart'),
                chartData;

            if (!historyElement) {
                return;
            }

           // chartData = prepareHistoryData(mock);
            chartData = prepareHistoryData($scope.lastCreatedAuction);
            updateChartHeight(historyElement, chartData.labels.length);

            var color = Chart.helpers.color;
            var historyData = {
                labels: chartData.labels,
                datasets: [{
                    label: $filter('i18next')('texts.charts_start'),
                    backgroundColor: "#12133d",
                    borderColor: "#12133d",
                    data: chartData.start
                }, {
                    label: $filter('i18next')('texts.charts_end'),
                    backgroundColor: color("#12133d").alpha(0.2).rgbString(),
                    borderColor: "#12133d",
                    data: chartData.end
                }]
            };
            var creditData = {
                datasets: [{
                    label: $filter('i18next')('texts.charts_start'),
                    backgroundColor: "#12133d",
                    borderColor: "#12133d",
                    data: [
                        $scope.userInfo.start_credit
                    ]
                }, {
                    label: $filter('i18next')('texts.charts_end'),
                    backgroundColor:color("#12133d").alpha(0.2).rgbString(),
                    borderColor: "#12133d",
                    data: [
                        $scope.userInfo.end_credit
                    ]
                }]
            };

            drawChart(historyElement, historyData, $filter('i18next')('texts.charts_history_label'));
            drawChart(creditElement, creditData, $filter('i18next')('texts.charts_label'));
        }

        function drawChart(el, data, title) {
            var ctx = el.getContext('2d');
            new Chart(ctx, {
                type: 'horizontalBar',
                data: data,
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
                        onClick: function () { },
                        labels: {
                            fontSize: 14
                        }
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
                        text: title,
                        fontSize: 18
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 0,
                                callback: function(value) {
                                    return value + ",-";
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



