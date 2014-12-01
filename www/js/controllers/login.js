(function() {
    'use strict';
    var module = angular.module('Login', []);


    module.controller('LoginController', function($scope, $http, userData) {
        $scope.userData = userData;
        $scope.isWorking = false;
        $scope.editMode = false;
        $scope.shouldAskForConfirmationBeforeLeave = false;
        $scope.loginOptions = [{name: 'Empresa', value: 1}, {name: 'Contratista', value: 2}];


        $scope.login = function() {
            $scope.userData.refreshUserDetails($scope, $scope.loginSuccess, $scope.loginError);
        };

        $scope.loginSuccess = function()
        {
            $scope.menu.setMainPage('templates/forms/clienteSearch.html');
        };
        $scope.loginError = function()
        {
            alert('No funciono!');
        };

        $scope.logout = function()
        {
          $scope.userData.logout();
        };
       

    });


})();
