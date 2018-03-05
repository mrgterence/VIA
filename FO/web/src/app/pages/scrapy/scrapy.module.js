(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.scrapy', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('main.scrapy', {
            url: '/scrapy',
            templateUrl: 'app/pages/scrapy/scrapy.html',
            title: 'Scrapy',
            sidebarMeta: {
              icon: 'ion-bug',
              order: 400,
            },
          });
    }
  
  })();