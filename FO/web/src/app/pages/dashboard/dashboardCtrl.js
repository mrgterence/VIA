(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('dashboardCtrl', dashboardCtrl);

  /** @ngInject */
  function dashboardCtrl($scope, $location, $http, $rootScope, $uibModal) {
    var $ctrl = this;
    $ctrl.feedB500 = 0;
    $ctrl.view = 0;
    $ctrl.array = [];
    $ctrl.called = false;
    $ctrl.frequency = [];
    $rootScope.finish = true;

    $scope.open = function (page, size, row) {
      $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        resolve: {
          items: function () {
            $rootScope.row = row;
            console.log($ctrl.row);
            return $scope.items;
          }
        }
      });
    };

    // sleep time expects milliseconds
    function sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    $ctrl.getData = function () {

      $ctrl.searchObj = {
        userID : $rootScope.user.ID,
        searchTerm: $ctrl.key,
        searchKey: $ctrl.model
      }
      
      console.log("searchObj", $ctrl.searchObj);

      $http.post("http://localhost:57683/api/user/search/history",$ctrl.searchObj)
      .then(function successCallBack(result) {
        console.log("Post-ing of data failed");
      }), function error (result) {
        console.log("Post-ing of data failed");
      }

      console.log('model', $ctrl.model);
      $http.get("https://storage.scrapinghub.com/jobq/283123/summary?apikey=86086a670f6a40f2a634ecbe2abed855&count=10&format=json&jobmeta=spider&jobmeta=version&jobmeta=state&jobmeta=close_reason&jobmeta=pending_time&jobmeta=running_time&jobmeta=finished_time&jobmeta=spider_args&jobmeta=job_cmd&jobmeta=tags&jobmeta=priority&jobmeta=cancelled_by&jobmeta=units&jobmeta=spider_type&reverse=pending")
        .then(function success(result) {
          console.log('result', result);
          if (result.data[2].summary[0].key == $ctrl.model) {
            console.log('try');
            $http.get("https://storage.scrapinghub.com/items/" + $ctrl.model + "?apikey=86086a670f6a40f2a634ecbe2abed855&format=json&meta=_ts&meta=_key")
              .then(function success(result) {
                console.log('efg');
                console.log("getSH",result.data);
                $ctrl.count = result.data.length;
                $ctrl.item = result.data;

                for (var i = 0; i < $ctrl.item.length; i++) {
                  if ($ctrl.item[i].s_feedBackScore > 500) {
                    $ctrl.feedB500++;
                  }

                  if (parseInt($ctrl.item[i].view[0].match(/[0-9]+/g)) > 500) {
                    $ctrl.view++;
                  }
  
                  $ctrl.array.push($ctrl.item[i].location[0].replace("Ship from :", ""));

                }

                $ctrl.frequency = Object.keys(_.countBy($ctrl.array)).map(function (data) {
                  return [data, _.countBy($ctrl.array)[data]];
                });
                $ctrl.called = true;
                $rootScope.finish = true;

                console.log("Successfully Get-ed data");
                console.log("wawawa");
              }), function fail(result) {
                console.log("Get-ing of data failed");
              }
          }
        })
    }

    $ctrl.submit = function () {

      console.log("user",$rootScope.user);

      $rootScope.finish = false;

      var object = {
        spider: "quotes",
        priority: "2",
        units: "1",
        addtags: [],
        args: {
          key: $ctrl.key
        }
      }

      $http.post("https://app.scrapinghub.com/api/v2/projects/283123/jobs?apikey=86086a670f6a40f2a634ecbe2abed855&", object)
        .then(function successCallBack(result) {
          $ctrl.success = true;
          console.log("abc");
          $ctrl.model = result.data.key;
          console.log($ctrl.model);

        }, function error(result) {
          $ctrl.fail = true;
          console.log("Get-ing of data failed");
        })

      sleep(300000).then(() => {
        console.log("hiiiiiiiiiiiiiiiiiii");
        $ctrl.getData();
      });
      
    }

  }

})();