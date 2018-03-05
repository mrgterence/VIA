(function() {
    'use strict';
  
    angular.module('BlurAdmin.pages.userM')
      .controller('userMCtrl', userMCtrl);
  
    /** @ngInject */
    function userMCtrl($scope, $state, $http, $rootScope, $window) {
      var $ctrl = this;
      
      $ctrl.list = null; 
  
      $scope.$watch('$viewContentLoaded',function(){
        $ctrl.callServer();
        console.log("Caaaa88888aaa");
      });

      $ctrl.getId = function (Id){
        $rootScope.Id = Id;
        console.log(Id);
      }

      $ctrl.callServer = function () {
        $http.get("http://localhost:57683/api/user")
        .then(function successCallBack(result) {
          console.log(result);
          $ctrl.list = result.data;
          console.log("Successfully Get-ed data");
        }, function error(result) {
          console.log("Get-ing of data failed");
        })
      }

    }
  
  })();