(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.solr', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('main.solr', {
            url: '/solr',
            templateUrl: 'app/pages/solr/solr.html',
            title: 'Solr',
            sidebarMeta: {
              icon: 'ion-ios-sunny',
              order: 300,
            },
          });
    }
  
  })();