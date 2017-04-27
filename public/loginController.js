mainApp.controller('loginController', function($scope, $http, $location,dataShare) {
         $scope.form = {};
        $scope.loginUser = function() {
                $http.post('/api/login', $scope.form)
                        .success(function(data) {  
                          dataShare.sendData(data);
                        $location.path("/viewStudents");
                              /*  $scope.formData = {}; // clear the form so our user is ready to enter another
                                $scope.todos = data;
                                console.log("data:"+data.username)   */
                        })
                        .error(function(data) {
                         $location.path("/home");
            });
        };
    });  








   