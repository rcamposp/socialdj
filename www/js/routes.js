angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })   

    .state('session-tabs', {
      url: '/session-tabs',
      abstract:true,
      templateUrl: 'templates/session-tabs.html'
    })

    .state('session-tabs.playlist', {
      url: '/playlist',
      views: {
        'session-tabs': {
          templateUrl: 'templates/playlist.html',
          controller: 'SessionCtrl as session'
        }
      }
    })                       
          
    .state('session-tabs.search', {
      url: '/search',
      views: {
        'session-tabs': {
          templateUrl: 'templates/search.html',
          controller: 'SessionCtrl as session'
        }
      }
    }) 
        
    ;
    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/session-tabs/playlist');

});