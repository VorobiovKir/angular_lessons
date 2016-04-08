angular
    .module('angularCrud')
    .controller('AuthCtrl', function AuthCtrl($scope) {
        'use strict';

        $scope.user = {
            data: {
                name: '',
                email: '',
                password: '',
                password1: ''
            }
        };

        $scope.showUsername = function() {
            alert($scope.user.data.name + ' - ' + $scope.user.data.password);
        };
        
    });
