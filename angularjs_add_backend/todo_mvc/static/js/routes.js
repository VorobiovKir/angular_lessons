'use strict';

angular.module('todomvc').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/list');

        $stateProvider
            .state('todo_list', {
                url: '/list',
                templateUrl: 'static/templates/todo_list.html',
                controller: 'TodoListCtrl'
            })
            .state('todo_list_detail', {
                url: '/list/:id/detail',
                templateUrl: 'static/templates/todo_detail.html',
                controller: 'TodoListDetailCtrl'

            })
    }]);