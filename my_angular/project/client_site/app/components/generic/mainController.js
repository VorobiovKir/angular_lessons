angular
    .module('angularCrud')
    .controller('MainCtrl', function MainCtrl($scope) {
        'use strict';
        $scope.test = '';
        $scope.setTest = function (test) {
            $scope.test = test;
        }
    });
