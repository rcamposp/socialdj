var app = angular.module('loginApp',["firebase","ionic"]);

app.controller("LoginCtrl",["$scope", "$firebaseAuth", function($scope, $firebaseAuth){

	$scope.login = function(){
		var ref = new Firebase("https://socialdj.firebaseio.com");
    	$scope.authObj = $firebaseAuth(ref);

		$scope.authObj.$authWithOAuthRedirect("twitter").then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		}).then(function() {
		  // Never called because of page redirect
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});
	};

}]);