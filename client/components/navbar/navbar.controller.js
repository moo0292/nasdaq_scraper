'use strict';

angular.module('abctechApp')
    .controller('NavbarCtrl', function($scope, $location, $window) {

        $scope.navbar = {
            smallScreen: false
        };

        //determines what to show
        $scope.setupScreenSize = function() {
            if ($window.innerWidth <= 767) {
                $scope.navbar.smallScreen = true;
            } else {
                $scope.navbar.smallScreen = false;
            }
        };

        //do initial setup
        $scope.setupScreenSize();

        var w = angular.element($window);

        w.bind('resize', function() {
            $scope.$apply(function() {
                $scope.setupScreenSize();
            });
        });

    });