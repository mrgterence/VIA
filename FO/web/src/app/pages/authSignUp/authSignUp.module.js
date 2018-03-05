(function() {
  'use strict';

  angular.module('BlurAdmin.pages.authSignUp', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('authSignUp', {
        url: '/authSignUp',
        templateUrl: 'app/pages/authSignUp/authSignUp.html',
        title: 'Sign Up',
        controller: 'authSignUpCtrl',
        // sidebarMeta: {
        //   order: 800,
        // },
        authenticate: false
      });
  }

})();