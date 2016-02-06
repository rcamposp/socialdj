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
      controller: 'LoginCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return Auth.$waitForAuth();
        }]
      }
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
          controller: 'SessionCtrl as session',
          resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
              // $requireAuth returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return Auth.$requireAuth();
            }]
          }
        }
      }
    })                       
          
    .state('session-tabs.search', {
      url: '/search',
      views: {
        'session-tabs': {
          templateUrl: 'templates/search.html',
          controller: 'SessionCtrl as session',
          resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
              // $requireAuth returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return Auth.$requireAuth();
            }]
          }
        }
      }
    }) 
        
    ;
    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/session-tabs/playlist');

});