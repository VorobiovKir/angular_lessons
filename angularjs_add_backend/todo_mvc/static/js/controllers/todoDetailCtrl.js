'use strict';

angular.module('todomvc')
    .controller('TodoListDetailCtrl', ['$scope', '$stateParams', 'todoApi', '$filter',
        function ($scope, $stateParams, todoApi, $filter) {

            $scope.listId = $stateParams.id;
            $scope.saving = false;
            $scope.completedCount = 0;
            $scope.newTodoTitle ='';
            $scope.todos = [];
            $scope.editedTodo = null;
            $scope.originalTodo = null;
            $scope.toggleCompleted = toggleCompleted;
            $scope.addTodo = addTodo;
            $scope.removeTodoTask = removeTodoTask;
            $scope.editTodo = editTodo;
            $scope.saveEdits = saveEdits;
            $scope.revertEdits = revertEdits;
            
            
            
            init();
            
            
            
            function init() {
                todoApi
                    .getListInfo($scope.listId)
                    .then(function successCallback(response) {
                        $scope.list_info = response;
                    })
                    .catch(function errorCallback(response) {
                        console.log(response);
                    });
    
                todoApi
                    .getTasks($scope.listId)
                    .then(function successCallback(response) {
                        $scope.todos = response;
                    }).catch(function errorCallback(response) {
                        console.log(response);
                    });

                $scope.$watch('todos', function () {
                    $scope.remainingCount = $filter('filter')($scope.todos, function (value, index) {
                        return (!angular.isDefined(value.completed) || value.completed === false);
                    }).length;
                    $scope.completedCount = $scope.todos.length - $scope.remainingCount;
                    $scope.allChecked = !$scope.remainingCount;
                }, true);
            }



            function addTodo() {
                var newTodo = {
                    task     : $scope.newTodoTitle.trim(),
                    completed: false
                };

                if (!newTodo.task) {
                    return;
                }
                
                $scope.saving = true;
                todoApi
                    .addTodoTask($scope.listId, $scope.newTodoTitle)
                    .then(function success(response) {
                        newTodo.todo_list = response.todo_list;
                        newTodo.id = response.id;
                        $scope.todos.push(newTodo);
                        $scope.newTodoTitle = '';
                    })
                    .finally(function () {
                        $scope.saving = false;
                    });
            }
            
            
            
            function toggleCompleted(todo) {
                console.log('toggled');
                /*store.put(todo, todos.indexOf(todo))
                    .then(function success() {
                    }, function error() {
                        todo.completed = !todo.completed;
                    });*/
            }
            
            
            
            function removeTodoTask(todo) {
                return todoApi
                    .removeTodoTask($scope.listId, todo.id)
                    .then(function success() {
                        $scope.todos.splice($scope.todos.indexOf(todo), 1);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }



            function editTodo(todo) {
                $scope.editedTodo = todo;
                $scope.originalTodo = angular.extend({}, todo);
            }



            function revertEdits(todo) {
                $scope.todos[$scope.todos.indexOf(todo)] = $scope.originalTodo;
                $scope.editedTodo = null;
                $scope.originalTodo = null;
                $scope.reverted = true;
            }


            
            function saveEdits(todo, event) {
                if (event === 'blur' && $scope.saveEvent === 'submit') {
                    $scope.saveEvent = null;
                    return;
                }

                $scope.saveEvent = event;

                if ($scope.reverted) {
                    $scope.reverted = null;
                    return;
                }

                todo.task = todo.task.trim();

                if (todo.task === $scope.originalTodo.task) {
                    $scope.editedTodo = null;
                    return;
                }

                if (todo.task) {
                    todoApi
                        .editTodoTask($scope.listId, todo.id, todo.task)
                        .then(function success(response) {
                            console.log('all edited fine');
                            console.log(response);
                        })
                        .catch(function error() {
                            todo.task = $scope.originalTodo.task;
                        })
                        .finally(function () {
                            $scope.editedTodo = null;
                        });
                    
                } else {
                    removeTodoTask(todo)
                        .finally(function () {
                            $scope.editedTodo = null;
                        });
                }
            }

        }]);