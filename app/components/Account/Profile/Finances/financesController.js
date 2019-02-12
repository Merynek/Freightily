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
        // var mock = [
        //    {price: 1500, currently_price: 1000, end_auction: '10.31.2018 16:00:00'},
        //    {price: 5500, currently_price: 4500, end_auction: '11.8.2018 14:00:00'},
        //    {price: 1800, currently_price: 800, end_auction: '12.15.2018 14:00:00'},
        //    {price: 2500, currently_price: 500, end_auction: '1.20.2019 14:00:00'},
        //    {price: 2200, currently_price: 2000, end_auction: '1.5.2019 14:00:00'},
        //    {price: 500, currently_price: 300, end_auction: '2.3.2019 14:00:00'},
        //    {price: 850, currently_price: 375, end_auction: '2.4.2019 14:00:00'},
        //    {price: 500, currently_price: 400, end_auction: '2019-02-11 23:25:00.000'}
        // ];

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
            var el = document.getElementById('credit-chart'),
                chartData;

            if (!el) {
                return;
            }
            var ctx = el.getContext('2d');

            // chartData = prepareHistoryData(mock);
            chartData = prepareHistoryData($scope.lastCreatedAuction);
            updateChartHeight(el, chartData.labels.length);

            var color = Chart.helpers.color;
            var data = {
                labels: chartData.labels,
                datasets: [{
                    label: $filter('i18next')('texts.charts_start'),
                    backgroundColor: color("#12133d").alpha(0.4).rgbString(),
                    borderColor: "#12133d",
                    data: chartData.start
                }, {
                    label: $filter('i18next')('texts.charts_end'),
                    backgroundColor: color("#74ce3b").alpha(0.4).rgbString(),
                    borderColor: "#74ce3b",
                    data: chartData.end
                }]
            };
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
                                callback: function(value) {
                                    return value + " Kč";
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



