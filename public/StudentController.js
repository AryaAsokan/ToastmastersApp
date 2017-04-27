mainApp.controller('StudentController', function($scope, $http, $location,dataShare) {
                       
       
        $scope.$on('data_shared',function(){
           $scope.todos = dataShare.getData();
        });

        $scope.formData = {};
    

        // when landing on the page, get all todos and show them
       /* $http.get('/api/todos')
                .success(function(data) {
                        $scope.todos = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });*/

        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
                $http.post('/api/todos', $scope.formData)
                        .success(function(data) {
                                $scope.formData = {}; // clear the form so our user is ready to enter another
                                $scope.todos = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
                $http.delete('/api/todos/' + id)
                        .success(function(data) {
                                $scope.todos = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
        $scope.logout = function() {
                $http.get('/api/logout')
                        .success(function(data) {
                        $location.path("/home");
                                
                        })
                        .error(function(data) {
                         $location.path("/home");
            });
        };
      
    });  








   