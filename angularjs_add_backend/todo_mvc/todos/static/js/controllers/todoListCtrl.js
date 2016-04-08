'use strict';

angular.module('todomvc').run(['$http', '$cookies', function run($http, $cookies) {
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.get('csrftoken');
}]);

angular.module('todomvc')
    .controller('TodoListCtrl', ['$scope', '$http', '$location', 'todoApi',
        function ($scope, $http, $location, todoApi) {

            todoApi.getList()
                .then(function successCallback(response) {
                    $scope.lists = response.data;
                }, function errorCallback(response) {
                    console.log(response)
                });

            $scope.addNewList = function() {
                todoApi.addNewList($scope.listName)
                    .then(function successCallback(response) {
                        $scope.lists.push(response.data);
                        $scope.listName = ''
                    }, function errorCallback(response) {
                        console.log(response)
                    });
            };

            $scope.deleteList = function (index) {
                var listId = this.list.id;
                todoApi.removeList(listId)
                    .then(function successCallback(response) {
                        $scope.lists.splice(index, 1);
                    }, function errorCallback(response) {
                        console.log(response)
                    });
            };

        }]);