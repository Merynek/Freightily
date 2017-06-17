/**
* MainController 
*
* @class MainController
* @constructor
*/

angular.module('appControllers')
  .controller('MainController', ['$scope', '$i18next', 'User', '$state', '$filter', function($scope, $i18next, User, $state, $filter){
    $scope.navigationPath = "";

    $scope.isLoggedUser = function(){
      if(User.isLoggedIn){
        $scope.usernameMain = User.username;
        $scope.roleNameMain = User.roleName;
        $scope.isSender = User.isSender();
        $scope.isDispatcher = User.isDispatcher();
        $scope.isTransporter = User.isTransporter(); 
        $scope.isDriver = User.isDriver();  
        return true;
      }
      $scope.usernameMain = "";
      $scope.roleNameMain = "";
      $scope.isSender = false;
      $scope.isDispatcher = false;
      $scope.isTransporter = false;
      return false;
    };

    $scope.logout = function(){
      User.logout().then(function(){
        console.log("Logout success");
        $state.go('login');
      }).catch(function(){
        console.log("Logout fail");
      })
    };

     $scope.ENlng = function(){
        $i18next.options.lng = 'EN';
        $i18next.options.resGetPath = '../locales/EN/translation.json';
      };
       $scope.CZlng = function(){
        $i18next.options.lng = 'CZ';
        $i18next.options.resGetPath = '../locales/CZ/translation.json';
      };

      $scope.setNavigationPath = function(path){
        if(!path) {
            $scope.navigationPath = {};
            return;
        }
        var pathArray = path.split("|"),
            navigationList = [],
            i = 0;

        for(i; i < pathArray.length; i++) {
            navigationList.push({
                link: pathArray[i],
                path: 'texts.navigation.' + pathArray[i]
            });
        }
        $scope.navigationPath = navigationList;
      };

      // Visuals by Aloush
      $scope.afterRender = function() {
          clearTimeout(this.renderDebouncer);
          this.renderDebouncer = setTimeout(function(){
              $scope.footerFix();
          }, 10);
      };

      // fix footer
      $scope.footerFix = function () {
          var win = window.innerHeight,
              $con = $('body').height(),
              $f = $('footer');

          $con += $f.css('position') === 'absolute' ? 312 : 0;
          if (win > $con) {
              $f.css({
                  position: 'absolute'
              });
          } else {
              $f.css({
                  position: 'relative'
              });
          }
      };

      // forms
      $scope.formLabels = function (name) {
          clearTimeout(this.formDebouncer);
          this.formDebouncer = setTimeout(function(){
              var $form = $("[name='" + name + "']"),
                  $inputs,
                  makeLabel = function (element) {
                      if ($(element).attr("data-label-moved")) return;
                      $(element).attr("data-label-moved", "true");
                      var inputType = $(element).attr('type');
                      if (inputType == "file" || inputType == "checkbox") {
                          return;
                      }
                      var labelElement = $("<div />").addClass("input-label").text($(element).attr("placeholder"));
                      labelElement.hide();
                      $(element).parent(".form-group").prepend(labelElement);
                      labelElement.fadeIn();
                  };
              if ($form.length > 0) {
                  $inputs = $form.find("input");
                  $inputs.on("keydown", function () {
                      makeLabel(this);
                  });
              }
          }, 10);
      }
  }
]);
