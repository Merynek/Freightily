/**
 * noteNewController
 *
 * @class viewSchipmentsController
 * @constructor
 */

angular.module('appControllers')
    .controller('viewShipmentsController', ['$scope', 'actualShipments', 'pastShipments', '$http', '$q', '$filter', function($scope, actualShipments, pastShipments, $http, $q, $filter){
        $scope.setNavigationPath("home|manage|view_shipments");
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
		var url = "http://localhost:51246/api/data/company/";
        $scope.photos = [];
        $scope.hasPhoto = false;

        $scope.uploadPhoto = function upload(photos)
        {
            var formData = new FormData();
            formData.append("id_auction", 1002);
            angular.forEach(photos, function (photo) {
                formData.append(photo.name, photo);
            });
            //save(formData);

            postPhotos(formData).then(function(){
                message(1, $filter('i18next')('Upload OK!'));
            }).catch(function(){
                message(3, $filter('i18next')('Upload FAIL!'));
            })
        };

        var postPhotos = function(formData){
			return $q(function(resolve, reject){
				$http({
					method: 'POST',
                    transformRequest: angular.identity,
                    data: formData,
					headers: { 'token': window.localStorage.getItem("TOKEN"), 'Content-Type': undefined},
					url: url+'files',
				}).then(function(response) {
					resolve(response.data);
				}).catch(function(error){
					reject();
				})
			});
		};

        $scope.getPhoto = function getPhoto()
        {
            getPhotos().then(function(data){
                $scope.photos = data;
                $scope.hasPhoto = true;
            }).catch(function(data){
            })
        };

        var getPhotos = function(){
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					headers: { 'token': window.localStorage.getItem("TOKEN"), 'Content-Type': undefined},
					url: url+'files',
				}).then(function(response) {
					resolve(response.data);
				}).catch(function(error){
					reject();
				})
			});
		};
    }
    ]);


