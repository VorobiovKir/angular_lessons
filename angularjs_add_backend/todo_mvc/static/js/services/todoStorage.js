'use strict';
/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('todomvc')
    .factory('todoStorage', function ($http, $injector) {
        'use strict';

        // Detect if an API backend is present. If so, return the API module, else
        // hand off the localStorage adapter
        return $http.get('/api')
            .then(function () {
                return $injector.get('api');
            }, function () {
                return $injector.get('localStorage');
            });
    })

    .factory('api', function ($resource) {
        'use strict';

        var store = {
            todos: [],

            api: $resource('/api/todos/:id', null,
                {
                    update: {method: 'PUT'}
                }
            ),

            clearCompleted: function () {
                var originalTodos = store.todos.slice(0);

                var incompleteTodos = store.todos.filter(function (todo) {
                    return !todo.completed;
                });

                angular.copy(incompleteTodos, store.todos);

                return store.api.delete(function () {
                }, function error() {
                    angular.copy(originalTodos, store.todos);
                });
            },

            delete: function (todo) {
                var originalTodos = store.todos.slice(0);

                store.todos.splice(store.todos.indexOf(todo), 1);
                return store.api.delete({id: todo.id},
                    function () {
                    }, function error() {
                        angular.copy(originalTodos, store.todos);
                    });
            },

            get: function () {
                return store.api.query(function (resp) {
                    angular.copy(resp, store.todos);
                });
            },

            insert: function (todo) {
                var originalTodos = store.todos.slice(0);

                return store.api.save(todo,
                    function success(resp) {
                        todo.id = resp.id;
                        store.todos.push(todo);
                    }, function error() {
                        angular.copy(originalTodos, store.todos);
                    })
                    .$promise;
            },

            put: function (todo) {
                return store.api.update({id: todo.id}, todo)
                    .$promise;
            }
        };

        return store;
    })

    .factory('localStorage', function ($q) {
        'use strict';

        var STORAGE_ID = 'todos-angularjs';

        var store = {
            todos: [],

            _getFromLocalStorage: function () {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            _saveToLocalStorage: function (todos) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
            },

            clearCompleted: function () {
                var deferred = $q.defer();

                var incompleteTodos = store.todos.filter(function (todo) {
                    return !todo.completed;
                });

                angular.copy(incompleteTodos, store.todos);

                store._saveToLocalStorage(store.todos);
                deferred.resolve(store.todos);

                return deferred.promise;
            },

            delete: function (todo) {
                var deferred = $q.defer();

                store.todos.splice(store.todos.indexOf(todo), 1);

                store._saveToLocalStorage(store.todos);
                deferred.resolve(store.todos);

                return deferred.promise;
            },

            get: function () {
                var deferred = $q.defer();

                angular.copy(store._getFromLocalStorage(), store.todos);
                deferred.resolve(store.todos);

                return deferred.promise;
            },

            insert: function (todo) {
                var deferred = $q.defer();

                store.todos.push(todo);

                store._saveToLocalStorage(store.todos);
                deferred.resolve(store.todos);

                return deferred.promise;
            },

            put: function (todo, index) {
                var deferred = $q.defer();

                store.todos[index] = todo;

                store._saveToLocalStorage(store.todos);
                deferred.resolve(store.todos);

                return deferred.promise;
            }
        };

        return store;
    })


    .factory('todoApi', function ($http) {

        var baseApiUrl = 'api/list/';

        return {
            'getList': getList,
            'getTasks': getTasks,
            'getListInfo': getListInfo,
            'addNewList': addNewList,
            'removeList': removeList,
            'addTodoTask': addTodoTask,
            'removeTodoTask': removeTodoTask,
            'editTodoTask': editTodoTask
        };

        function getList() {
            return $http.get(baseApiUrl)
        }

        function getTasks(id) {
            var urlTasks = baseApiUrl +id + '/tasks/';
            return $http
                .get(urlTasks)
                .then(function (response) {
                    return response.data;
                });
        }

        function getListInfo(id){
            var listInfoUrl = baseApiUrl + id + '/';
            return $http
                .get(listInfoUrl)
                .then(function (response) {
                    return response.data;
                });
        }

        function addNewList(name){
            var data = {"name": name};
            return $http.post(baseApiUrl, data)
        }

        function removeList(id){
            return $http.delete(baseApiUrl + id + '/')
        }
        
        function addTodoTask(listId, taskTitle){
            return $http.post(baseApiUrl + listId + '/tasks/', {
                todo_list: listId, //TODO: maybe this field is redundant because id of todo list already exists in url
                task: taskTitle
            })
            .then(function (response) {
                return response.data;
            });
        }
        
        function removeTodoTask(listId, taskId) {
            return $http.delete(baseApiUrl + listId + '/tasks/' + taskId);
        }
        
        function editTodoTask(listId, taskId, newTaskTitle) {
            return $http.put(baseApiUrl + listId + '/tasks/' + taskId + '/', {
                todo_list: listId,
                task: newTaskTitle
            })
            .then(function (response) {
                return response.data;
            });
        }
    });
