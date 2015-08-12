(function() {
    'use strict';
    var module = angular.module('Login', []);


    module.controller('LoginController', function($scope, $http, userData, buttonCombo) {
        $scope.userData = userData;
        $scope.buttonCombo = buttonCombo;
        $scope.isWorking = false;
        $scope.editMode = false;
        $scope.selectedLoginOption = {};
        this.scope = $scope;
        $scope.loginOptions = [
        {
            name: 'Contratista',
            id: 1
        }, {
            name: 'Empresa',
            id: 2
        }];

        $scope.init = function() {
        }

        $scope.login = function() {
            $scope.userData.refreshUserDetails($scope, $scope.loginSuccess, $scope.loginError);
        };

        $scope.loginSuccess = function() {
            $scope.menu.setMainPage('templates/home.html');

        };
        $scope.loginError = function() {
            ons.notification.alert({message: 'Ah ocurrido un error'});
            $scope.isWorking = false;
        };

        $scope.logout = function() {
            $scope.userData.logout();
        };
        $scope.selectCallback = function(pObject) {
            $scope.userData.profileData.tipo = pObject.id;
            console.log(pObject);
        }

    });


})();
