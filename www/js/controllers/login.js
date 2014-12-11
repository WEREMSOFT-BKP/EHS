(function() {
    'use strict';
    var module = angular.module('Login', []);


    module.controller('LoginController', function($scope, $http, userData, buttonCombo) {
        $scope.userData = userData;
        $scope.buttonCombo = buttonCombo;
        $scope.isWorking = false;
        $scope.editMode = false;
        $scope.selectedLoginOption = {};
        $scope.loginOptions = [{
            text: '--Seleccione una opción--',
            value: 0
        },{
            text: 'Contratista',
            value: 1
        }, {
            text: 'Empresa',
            value: 2
        }];

        $scope.init = function() {
            if($scope.userData.profileData.tipo)
            {
                $scope.selectedLoginOption =  cloneObject($scope.loginOptions[$scope.userData.profileData.tipo]);
            }else
            {
                $scope.selectedLoginOption =  cloneObject($scope.loginOptions[0]);
            }


        }

        $scope.login = function() {
            $scope.userData.refreshUserDetails($scope, $scope.loginSuccess, $scope.loginError);
        };

        $scope.loginSuccess = function() {
            $scope.menu.setMainPage('templates/TabBarBottom.html');
        };
        $scope.loginError = function() {
            alert('No funciono!');
        };

        $scope.logout = function() {
            $scope.userData.logout();
        };
        $scope.selectCallback = function(pObject) {
            $scope.userData.profileData.tipo = pObject.value;
            console.log(pObject);
        }

    });


})();
