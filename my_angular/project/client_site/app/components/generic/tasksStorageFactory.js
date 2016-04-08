angular.module('angularCrud')
    .factory('tasksStorage', function($http, $injector) {
        'use strict';

        return $http.get('/api')
            .then(function() {
                return $injector.get('api');
            }, function() {
                return $injector.get('localStorage');
            });
    })
    .factory('localStorage', function($q) {
        'use strict';

        var STORAGE_ID = 'crud-angularjs';

        var store = {

            notes: [],

            _getFromLocalStorage: function() {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            _saveToLocalStorage: function(note) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(notes));
            },

            delete: function(note) {
                var deferred = $q.defer();

                store.notes.splice(store.notes.indexOf(note), 1);
                store._saveToLocalStorage(store.notes);
                deferred.resolve(store.notes);

                return deferred.promise;
            },

            get: function() {
                var deferred = $q.defer();

                angular.copy(store._getFromLocalStorage(), store.notes);
                deferred.resolve(store.notes);

                return deferred.promise;
            },

            insert: function(note) {
                var deferred = $q.defer();

                store.notes.push(note);
                store._saveToLocalStorage(store.notes);

                deferred.resolve(store.notes);
            }


        };
    });
