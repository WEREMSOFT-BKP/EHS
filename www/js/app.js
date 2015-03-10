(function() {
    'use strict';
    var app = angular.module('app', ['onsen', 'Login', 'Main', 'Contact', 'buttonCombo', 'ngDropdowns', 'GenericSelect']);


    app.factory('userData', function($http) {
        this.isWorking = false;
        var returnValue = {
            logedIn: false,
            profileData: {
                tipo: null
            },
            contratistaInfo: {}, 
            userName: null,
            password: null,
            check_password: null,
            isWorking: false,
            scope: null,
            callBackSuccess: null,
            callBackError: null
        };
        returnValue.reset = function() {
            this.logedIn = false;
            window.localStorage.setItem('logedIn', false);
        }

        if (window.localStorage.getItem('logedIn')) {
            returnValue.logedIn = window.localStorage.getItem('logedIn') === 'true' ? true : false;
            returnValue.profileData = JSON.parse(window.localStorage.getItem('profileData'));
            returnValue.userName = window.localStorage.getItem('user');
            returnValue.password = window.localStorage.getItem('password');
        }

        returnValue.httpError = function(data, status, headers, config) {
            returnValue.isWorking = false;
            messageWindowError("Oops! Algo ha salido mal. Reintenta en un momento");
            if (returnValue.callBackError) {
                returnValue.callBackError();
                returnValue.callBackError = null;
            }
        }

        returnValue.logout = function() {
            returnValue.reset();
        }

        returnValue.httpSuccess = function(data, status, headers, config) {
            if (returnValue.scope) {
                returnValue.scope.isWorking = false;
            }
            console.log(data.ok);
            if (data.ok == 1) {
                window.localStorage.setItem("user", returnValue.userName);
                window.localStorage.setItem("password", returnValue.password);
                window.localStorage.setItem("logedIn", true);
                returnValue.check_password = returnValue.password;
                returnValue.profileData = data;

                window.localStorage.setItem("profileData", JSON.stringify(data));
                returnValue.logedIn = true;
                if (returnValue.callBackSuccess) {
                    returnValue.callBackSuccess();
                    returnValue.callBackSuccess = null;
                }
            } else if (data.ok == 0) {
                messageWindow('Nombre de usuario o contraseña inválidas');
                //$scope.logout(false);
            }
        }

        returnValue.refreshUserDetails = function(pScope, pCallBackSuccess, pCallBackError) {
            if (pScope) {
                pScope.isWorking = true;
                this.scope = pScope;
            }
            var data = window.localStorage.getItem('profileData');
            if (data && returnValue.logedIn) {
                returnValue.profileData = JSON.parse(window.localStorage.getItem('profileData'));
            }

            this.callBackSuccess = pCallBackSuccess;
            this.callBackError = pCallBackError;
            this.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://ehslatam.com/controlcontratistas/ws/json.php?service=login&tipo=' + this.profileData.tipo + '&usuario=' + this.userName + '&password=' + this.password,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '' //'_method=POST&data[Login][login]=' + $scope.userData.userName + '&data[Login][password]=' + $scope.userData.password + '&',
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        if (returnValue.logedIn) {
            returnValue.refreshUserDetails();
        }

        return returnValue;
    });

    app.factory('buttonCombo', function($http) {
        var returnValue = {
            currentComboOptions: [],
            currentComboSelection: {}
        };
        return returnValue;
    });


    app.directive('moduleHeader', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/header.html'
        };
    });

    app.directive('comboButton', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/comboButton/comboButton.html',
            link: function($scope, $element, $attrs)
            {
                $scope.label = $attrs.label;
            }
        };
    });




})();

var deviceReadyWasFired = false;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        deviceReadyWasFired = true;
        navigator.splashscreen.hide();
    }
};

app.initialize();

window.setTimeout(function() {
    if (!deviceReadyWasFired) {
        var e = document.createEvent('Events');
        e.initEvent("deviceready");
        document.dispatchEvent(e);
    }
}, 3000);
