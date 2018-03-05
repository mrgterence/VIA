(function() {
  'use strict';

  angular.module('BlurAdmin.pages.authSignUp')
    .controller('authSignUpCtrl', authSignUpCtrl);

  /** @ngInject */
  function authSignUpCtrl($scope ,$http, $rootScope, $state) {
    var $ctrl = this;
    var test = null; 
    $ctrl.success = true ;

    $ctrl.register = register;
    $ctrl.validate = validate;
    $ctrl.secure = secure;
    $ctrl.fail = null;

    console.log ($ctrl.model);

    function validate (){
      if ($ctrl.password === $ctrl.confirmPassword) {
         $ctrl.fail = false;
         console.log("PAss",$ctrl.password);
         console.log ($ctrl.fail);
      }else{
         $ctrl.fail= true;
         console.log ($ctrl.fail);
      }
    }

    function secure (){
      console.log ("ABC");
       var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
       if(re.test($ctrl.password) == false){
         $ctrl.passFail = true;
       }
       else{
         $ctrl.passFail = false;
       }
       console.log(re.test($ctrl.password));
       console.log($ctrl.password)
    }


    function register (){
      {
        $rootScope.$pageFinishedLoading = false;
        console.log("ctrl",$ctrl);
        $http.post("http://localhost:57683/api/user/register", $ctrl)
          .then(function successCallBack(result) {
            console.log("Successfully POST-ed data");
            $state.go('authSignIn');
          }, function error(result) {
            $ctrl.success = false;
            console.log("POST-ing of data failed");
            console.log ($ctrl);
          })
          .finally(function () {
            $rootScope.$pageFinishedLoading = true;
          })
      }
    }
  }

})();