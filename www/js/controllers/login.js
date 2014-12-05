(function() {
    'use strict';
    var module = angular.module('Login', []);


    module.controller('LoginController', function($scope, $http, userData, buttonCombo) {
        $scope.userData = userData;
        $scope.buttonCombo = buttonCombo;
        $scope.isWorking = false;
        $scope.editMode = false;
        $scope.shouldAskForConfirmationBeforeLeave = false;
        $scope.selectedLoginOptionLabel = '';
        $scope.loginOptions = [{
            name: 'Empresa',
            value: 1
        }, {
            name: 'Contratista',
            value: 2
        }];

        $scope.init = function() {
            $scope.buttonCombo.currentComboOptions = $scope.loginOptions;
            $scope.buttonCombo.callBack = $scope.selectCallback;
            console.log($scope.buttonCombo.currentComboOptions);
        }

        $scope.login = function() {
            $scope.userData.refreshUserDetails($scope, $scope.loginSuccess, $scope.loginError);
        };

        $scope.loginSuccess = function() {
            $scope.menu.setMainPage('templates/home.html');
        };
        $scope.loginError = function() {
            alert('No funciono!');
        };

        $scope.logout = function() {
            $scope.userData.logout();
        };
        $scope.selectCallback = function(pObject) {
            $scope.selectedLoginOptionLabel = pObject.name;
            $scope.userData.profileData.tipo = pObject.value;
            console.log(pObject);
        }

    });


})();
