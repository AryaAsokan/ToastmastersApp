var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.factory('dataShare',function($rootScope,$timeout){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $timeout(function(){
         $rootScope.$broadcast('data_shared');
      },50);
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'front.html',
			controller: 'FrontController'
		})
		.when('/Meetings', {
			templateUrl: 'meetings.html',
			controller: 'meetingController'
		})
    .when('/login',{
      templateUrl: 'login.html',
			controller: 'loginController'
    })
    .when('/signup',{
      templateUrl: 'signup.html',
			controller: 'signupController'
    })
		.otherwise({
			redirectTo: '/home'
		});
});
