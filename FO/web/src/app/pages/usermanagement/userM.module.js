(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.userM', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('main.userM', {
            url: '/usermanagement',
            templateUrl: 'app/pages/usermanagement/userM.html',
            title: 'User Management',
            sidebarMeta: {
              icon: 'ion-ios-people',
              order: 200,
            },
          });
   
    }
  
  })();