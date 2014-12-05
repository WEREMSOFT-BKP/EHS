(function() {
    'use strict';
    var module = angular.module('buttonCombo', []);


    module.controller('comboController', function($scope, $http, userData, buttonCombo) {
        $scope.buttonCombo = buttonCombo;

        $scope.clickSelect = function(pObject) {
            //if (pObject.value === $scope.buttonCombo.currentComboSelection.value) return;
            console.log('llamando');
            $scope.buttonCombo.currentComboSelection = pObject;
            $scope.buttonCombo.callBack(pObject);
            ons.navigator.popPage();
        }
    });


})();
