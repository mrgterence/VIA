(function() {
  'use strict';

  angular.module('BlurAdmin.pages.authSignIn')
    .controller('authSignInCtrl', authSignInCtrl);

  /** @ngInject */
  function authSignInCtrl($scope, localStorage, $state, $http,$rootScope) {
    var vm = this;
    vm.success = true;
    var test = {
      email : null,
      password : null
    };

    vm.logar = logar;

    function logar(){
       test.email = vm.email; 
       test.password = vm.passWord;

       login();
    }

    $scope.$watch('$viewContentLoaded',function(){
      getIP();
   });

    function getIP(){
      $http.get("http://ip-api.com/json")
        .then(function successCallBack(result){
          console.log(result.data);
        }), function error (result){
          console.log(result);
        }
    }


    function login() {
      $rootScope.$pageFinishedLoading = false;
      $http.put("http://localhost:57683/api/user/login", test)
        .then(function successCallBack(result) {
          $rootScope.user = result.data;
          $rootScope.Id = result.data.ID;
          console.log(result);
          console.log("Successfully POST-ed data");
          $state.go('main.dashboard');
        }, function error(result) {
          vm.success = false;
          console.log("POST-ing of data failed");
          console.log(result);
        })
        .finally(function () {
          $rootScope.$pageFinishedLoading = true;
        })
    }
  }

})();