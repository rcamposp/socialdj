angular.module('app.services', ["firebase"])

.factory('SharedData', [function(){
	var SharedData = {};
	return SharedData;	
}])

.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//socialdj.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})

.service('BlankService', [function(){

}])

;

