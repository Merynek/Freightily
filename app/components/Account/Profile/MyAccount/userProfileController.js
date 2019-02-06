/**
 * userProfileController
 *
 * @class userProfileController
 * @constructor
 */

angular.module('appControllers')
    .controller('userProfileController', ['$scope', '$filter', 'userInfo', 'UserAbility', function ($scope, $filter, userInfo, UserAbility) {
        $scope.route = "account|profile";
        $scope.userInfo = userInfo.user;
        $scope.lastCreatedAuction = userInfo.lastCreatedAuction;
        $scope.sharePercent = getSharePercent();
        $scope.userInfo.share = userInfo.user.share.toString().replace(".", ","); // todo: udělat to hezčejš? ..doplnit ,- když nebudou halíře nebo zaokrouhlovat?

        function getSharePercent() {
            switch ($scope.userInfo.senderLevel) {
                case 1: return "10%";
                default: return "10%";
            }
        }

        function afterRender() {
            var ctx = document.getElementById('credit-chart').getContext('2d');

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

        $scope.setInfo = function () {
            var phone_number = $(".user-page #phone_number"),
                company_name = $(".user-page #company_name"),
                email = $(".user-page #email"),
                data;

            phone_number.removeClass("input-error");
            company_name.removeClass("input-error");
            email.removeClass("input-error");

            if (!validateEmail($scope.userInfo.email)) {
                message(3, $filter('i18next')('errors.wrong_email'));
                email.addClass("input-error");
                return;
            }
            if($scope.userInfo.phone_number.length < 9) {
                message(3, $filter('i18next')('errors.phone_number_must_me_greater_none'));
                phone_number.addClass("input-error");
                return;
            }
            if($scope.userInfo.company_name.length < 1) {
                message(3, $filter('i18next')('errors.company_name_is_required'));
                company_name.addClass("input-error");
                return;
            }

            data = {
                phone_number: $scope.userInfo.phone_number,
                email: $scope.userInfo.email,
                company_name: $scope.userInfo.company_name
            };

            UserAbility.setInfo(data).then(function () {
                message(1, $filter('i18next')('success.set_account_info'));
            }).catch(function (error) {
                message(3, $filter('i18next')(getErrorKeyByCode(error)));
            })
        };
    }
    ]);



