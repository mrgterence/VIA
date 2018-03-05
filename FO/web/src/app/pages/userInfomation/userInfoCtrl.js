(function () {
  'use strict';

  angular.module('BlurAdmin.pages.userI')
    .controller('userInfoCtrl', userInfoCtrl);

  /** @ngInject */
  function userInfoCtrl($scope, $location, $http, $rootScope, $uibModal) {
    var $ctrl = this;
    $ctrl.isView = true;
    $ctrl.model = null;
    $ctrl.temp = null;
    $ctrl.gender = [ {gender:"Male"},
                     {gender:"Female"}];
    
    $scope.$watch('$viewContentLoaded', function () {
      if ($rootScope.user.ROLE == 1) {
        $ctrl.admin = true;
        $ctrl.callServerList();
      }
      else {
        $ctrl.admin = false;
        $ctrl.callServerUser();
      }

      $ctrl.callServerSearchHistory();

    });

    $scope.open = function (page, size, row, number) {
      $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        resolve: {
          items: function () {

            if (number == 1) {
              $rootScope.userRow = row;
              return $scope.items;
            } else {
              $rootScope.searchHistoryUser = row.Name;
              var temp = [];

              for (var i = 0; i < $ctrl.temp.length; i++) {
                if ($ctrl.temp[i].UserID == row.Id) {
                  temp.push($ctrl.temp[i]);
                }
              }

              $rootScope.searchHistoryList = temp;

              return $scope.items;
            }

          }
        }
      });
    };
      
    $ctrl.Edit = function () {
       $ctrl.isView = false;
    }

    $ctrl.Save = function () {
      $ctrl.isView = true;
      console.log("USER ID",$rootScope.user.ID);
      $ctrl.callServerUpdate();

    }

      $ctrl.getId = function (Id){
        $rootScope.Id = Id;
      }

    
      $ctrl.validate = function (){
        if ($ctrl.model.Password === $ctrl.model.confirmPassword) {
           $ctrl.fail = false;
           console.log("PAss",$ctrl.model.Password);
           console.log ($ctrl.fail);
        }else{
           $ctrl.fail= true;
           console.log ($ctrl.fail);
        }
      }
  
      $ctrl.secure = function (){
        console.log ("ABC");
         var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
         if(re.test($ctrl.model.Password) == false){
           $ctrl.passFail = true;
         }
         else{
           $ctrl.passFail = false;
         }
         console.log(re.test($ctrl.model.Password));
         console.log($ctrl.model.Password)
      }

      $ctrl.callServerUpdate = function (){
        $http.put("http://localhost:57683/api/user/"+ $rootScope.user.ID, $ctrl.model)
         .then(function successCallBack (result){
           console.log("Successfully put data");
         }, function error(result){
          console.log("Fail put data");
         })
      }

      $ctrl.callServerList = function () {
        $http.get("http://localhost:57683/api/user")
        .then(function successCallBack(result) {
          $ctrl.list = result.data;
          console.log("Successfully Get-ed data");
        }, function error(result) {
          console.log("Get-ing of data failed");
        })
      }

      $ctrl.callServerUser = function (){
        $http.get("http://localhost:57683/api/user/"+ $rootScope.Id)
        .then(function successCallBack(result) {
          $ctrl.model = result.data;
          console.log("Successfully Get-ed data");
        }, function error(result) {
          console.log("Get-ing of data failed");
        })
      }

      $ctrl.callServerSearchHistory = function (){
        $http.get("http://localhost:57683/api/user/search/history/")
        .then(function successCallBack(result) {
          $ctrl.temp = result.data;
          console.log("Successfully Get-ed data");
        }, function error(result) {
          console.log("Get-ing of data failed");
        })
      }

    }

  })();