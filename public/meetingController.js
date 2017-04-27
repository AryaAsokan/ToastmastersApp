mainApp.controller('meetingController',function($scope, $location, $http, $routeParams){
	$scope.formData = {};
	$scope.loadSheet = function(){
		var data ={
			name : $scope.formData.text
		};
		console.log(data);
		$http.post('/api/loadSheet',data).success(
			function(response){
				//console.log($scope.formData.text);
				$scope.data = response;
				//console.log(response);
				console.log($scope.data);
			});
	};	

	$scope.getSheetNames = function() {
		$http.get('/api/getSheetNames', $scope.formData).success(
			function(response){
				console.log(response);
			});
	};
});