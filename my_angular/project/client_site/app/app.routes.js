angular.module('angularCrud')
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/components/home/templates/home.html',
                    controller: 'HomeCtrl'
                })
                .state('blog', {
                    url: '/blog',
                    templateUrl: 'app/components/blog/templates/blog.html',
                    controller: 'BlogCtrl'
                })
                .state('login', {
                    url: '/auth/login',
                    templateUrl: 'app/components/auth/templates/login.html',
                    controller: 'AuthCtrl'
                })
                .state('register', {
                    url: '/auth/register',
                    templateUrl: 'app/components/auth/templates/register.html',
                    controller: 'AuthCtrl'
                });
                // .state('state1.list', {
                //     url: '/list',
                //     templateUrl: 'templates/partials/state1.list.html',
                //     controller: function($scope) {
                //         $scope.items = ['A', 'List', 'Of', 'Items']
                //     }
                // })
                // .state('state1.list.new', {
                //     url: '/new',
                //     templateUrl: 'templates/partials/new.html'
                // })
                // .state('state2', {
                //     url: '/state2',
                //     templateUrl: 'templates/partials/state2.html'
                // })
                // .state('state2.list', {
                //     url: '/list',
                //     templateUrl: 'templates/partials/state2.list.html',
                //     controller: function($scope) {
                //         $scope.things = ['A', 'List', 'Of', 'Things']
                //     }
                // });
        }]);
