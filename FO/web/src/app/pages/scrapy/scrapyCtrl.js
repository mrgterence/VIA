(function() {
    'use strict';
  
    angular.module('BlurAdmin.pages.scrapy')
      .controller('scrapyCtrl', scrapyCtrl);
  
    /** @ngInject */
    function scrapyCtrl($scope, $state, $http, $rootScope, $window) {
      var $ctrl = this;
      
      $ctrl.model = null; 
  
      

        $window.setInterval(function () {
            $ctrl.callServer();
        }, 5000);

        $scope.$watch('$viewContentLoaded', function () {
            $ctrl.callServer();
        });

        $ctrl.callServer = function (){
            $http.get("https://storage.scrapinghub.com/jobq/283123/summary?apikey=86086a670f6a40f2a634ecbe2abed855&count=10&format=json&jobmeta=spider&jobmeta=version&jobmeta=state&jobmeta=close_reason&jobmeta=pending_time&jobmeta=running_time&jobmeta=finished_time&jobmeta=spider_args&jobmeta=job_cmd&jobmeta=tags&jobmeta=priority&jobmeta=cancelled_by&jobmeta=units&jobmeta=spider_type&reverse=pending")
            .then(function successCallBack(result) {
              console.log(result.data[2].summary[0]);
            
            for (var i = 0; i < 3; i++) {
                for( var j=0;j<result.data[i].summary.length;j++){
                  
                  result.data[i].summary[j].pending_time = new Date(result.data[i].summary[j].pending_time).toUTCString();
                  result.data[i].summary[j].finished_time = new Date(result.data[i].summary[j].finished_time).toUTCString();     
                  result.data[i].summary[j].running_time = ((new Date(result.data[i].summary[j].finished_time).getTime()- new Date(result.data[i].summary[j].pending_time).getTime())/60000).toFixed(2);
                }
            }

              // console.log(result.data[2].summary.running_time);
              //   console.log(result.data[2].summary.finished_time);
              //     console.log(new Date(result.data[2].summary[1].finished_time).toUTCString());


              $ctrl.model = result.data;
              console.log($ctrl.model);
              console.log($ctrl.model[0]);
              console.log("Successfully Get-ed data");
            }, function error(result) {
              console.log("Get-ing of data failed");
            })
          }




    }
  
  })();