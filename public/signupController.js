mainApp.controller('signupController', function($scope, $http, $location) {
         $scope.formData = {};
        $scope.signupUser = function() {
                $http.post('/api/signup', $scope.formData)
                        .success(function(data) {
                        $location.path("/viewStudents");
                                $scope.formData = {}; // clear the form so our user is ready to enter another
                                $scope.todos = data;
                         })
                        .error(function(data) {
                         $location.path("/home");
            });
        };
    });  








   