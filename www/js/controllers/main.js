(function() {
    'use strict';
    var module = angular.module('Main', []);


    module.controller('MainController', function($scope, $http, userData) 
    {
    	$scope.userData = userData;
    	$scope.init = function()
    	{
            if ($scope.userData.logedIn) {
                if($scope.menu._currentPageUrl != 'templates/TabBarBottom.html')
                {
                    $scope.menu.setMainPage('templates/TabBarBottom.html');
                }
            } else {
                console.log('NO logeado');
                $scope.menu.setMainPage('templates/forms/login.html');
            }
    	};
        $scope.logout = function()
        {
            $scope.userData.logout();
            $scope.menu.setMainPage('templates/forms/login.html');
        }
    });
})();
