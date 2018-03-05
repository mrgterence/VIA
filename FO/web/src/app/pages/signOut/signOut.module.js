(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.signOut', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('main.signOut', {
            url: '/signOut',
            controller: function ($scope, $state, $window){

             $scope.$watch('$viewContentLoaded',function(){
                $window.history.forward();
                $state.go('authSignIn');
             });
            },
            title: 'Sign Out',
            sidebarMeta: {
              icon: 'fa fa-power-off',
              order: 500,
            },
          });
    }
  
  })();