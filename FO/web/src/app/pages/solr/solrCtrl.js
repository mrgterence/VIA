(function() {
    'use strict';
  
    angular.module('BlurAdmin.pages.solr')
      .controller('solrCtrl', solrCtrl);
  
    /** @ngInject */
    function solrCtrl($scope, $location, $http, $rootScope) {
      var $ctrl = this;


      $ctrl.submit = function () {

          if($ctrl.IP == null)
          {
              $ctrl.IP = "192.168.222.128";
          }
          
          console.log($ctrl.IP);
          $ctrl.called = true;
          $http.get("http://"+$ctrl.IP+":8983/solr/admin/cores?action=STATUS&core=nutch&wt=json")
          .then(function successCallBack(result) {
            $ctrl.success = true;
            console.log("abc");
            $ctrl.model = result.data.status.nutch;
            console.log($ctrl.model);
            console.log("Successfully Get-ed data");
          }, function error(result) {
            $ctrl.fail = true;
            console.log("Get-ing of data failed");
          })
      }

    }

  })();