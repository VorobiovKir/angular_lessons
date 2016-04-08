/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', ['ngResource', 'ngCookies', 'ui.router']);
//angular.module('todomvc').factory('authInterceptor', function () {
//        return {
//            request: function (config) {
//                config.headers = config.headers || {};
//                if (localStorage.csrftoken) {
//                    config.headers['Authorization'] = 'Token ' + localStorage.csrftoken;
//                }
//                return config;
//            }
//        }
//    })
//    .config(function ($httpProvider) {
//        $httpProvider.interceptors.push('authInterceptor');
//    });
    //.config(function ($routeProvider) {
    //    'use strict';
    //
    //    var routeConfig = {
    //        controller : 'TodoCtrl',
    //        templateUrl: 'todomvc-index.html',
    //        resolve    : {
    //            store: function (todoStorage) {
    //                // Get the correct module (API or localStorage).
    //                return todoStorage.then(function (module) {
    //                    module.get(); // Fetch the todo records in the background.
    //                    return module;
    //                });
    //            }
    //        }
    //    };
    //
    //    $routeProvider
    //        .when('/', routeConfig)
    //        .when('/:status', routeConfig)
    //        .otherwise({
    //            redirectTo: '/'
    //        });
    //});
