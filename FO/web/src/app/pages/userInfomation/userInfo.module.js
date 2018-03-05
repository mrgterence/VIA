(function () {
  'use strict';

  angular.module('BlurAdmin.pages.userI', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('main.userI', {
          url: '/userInfomation/:id',
          templateUrl: 'app/pages/userInfomation/userInfo.html',
          title: 'User',
          sidebarMeta: {
            icon: 'ion-ios-person',
            order: 100,
          },
        });
 
  }

})();