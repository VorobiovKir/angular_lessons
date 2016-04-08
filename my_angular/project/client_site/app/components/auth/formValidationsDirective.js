angular
    .module('angularCrud')
    .directive('namevalidation', function() {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (name) {
                    if (/^[A-z]\w{2,10}$/.test(name)) {
                        ctrl.$setValidity('username', true);
                        return name;
                    } else {
                        ctrl.$setValidity('username', false);
                        return undefined;
                    }
                });
            }
        };
    })
    .directive('emailvalidation', function() {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (email) {
                    var emailRegExp =
                        /^[a-z][-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
                    if (emailRegExp.test(email)) {
                        ctrl.$setValidity('email', true);
                        return email;
                    } else {
                        ctrl.$setValidity('email', false);
                        return undefined;
                    }
                });
            }
        };
    });
