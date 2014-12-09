(function() {
    'use strict';
    var module = angular.module('Login', []);


    module.controller('LoginController', function($scope, $http, userData, buttonCombo) {
        $scope.userData = userData;
        $scope.buttonCombo = buttonCombo;
        $scope.isWorking = false;
        $scope.editMode = false;
        $scope.shouldAskForConfirmationBeforeLeave = false;
        $scope.selectedLoginOption = {};
        $scope.loginOptions = [{
            text: '--Seleccione una opción--',
            value: 0
        },{
            text: 'Empresa',
            value: 1
        }, {
            text: 'Contratista',
            value: 2
        }];

        $scope.init = function() {
            $scope.buttonCombo.callBack = $scope.selectCallback;
            console.log($scope.buttonCombo.currentComboOptions);

            if($scope.userData.profileData.tipo)
            {
                $scope.selectedLoginOption =  $scope.loginOptions[$scope.userData.profileData.tipo];
            }else
            {
                $scope.selectedLoginOption =  $scope.loginOptions[0];
            }


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
            $scope.userData.profileData.tipo = pObject.value;
            console.log(pObject);
        }

    });


})();
