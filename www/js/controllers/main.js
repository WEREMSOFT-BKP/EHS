(function() {
    'use strict';
    var module = angular.module('Main', []);


    module.controller('MainController', function($scope, $http, userData) {
        $scope.userData = userData;
        $scope.isWorking = false;
        $scope.documentacionVehiculo = [];
        $scope.documentacionContratista = [];
        $scope.detallesEmpleado = [];
        $scope.documentacionEmpleado = [];
        $scope.searchResult = [];
        $scope.searchType = '';
        $scope.detallesVehiculo = [];
        $scope.contratista = {};
        $scope.connectionFail = false;
        $scope.noMoreResults = false;

        //--Esto es para los selects
        $scope.genericSelect = {};
        $scope.genericSelect.options = [];
        $scope.genericSelect.returnVariable = null;
        $scope.genericSelectLabel = 'Seleccióne una opción';

        $scope.genericSelectStart = function(pSelectOptions, pReturnVariable, pReturnDescription, pLabelFieldName, pValueFieldName, pCallBackFunction, pChildScope, pSortCallback, pTemplateToUse) {
            if (pSortCallback) {
                pSelectOptions.sort(pSortCallback)
            }

            if (!pLabelFieldName) {
                pLabelFieldName = 'label';
            }
            $scope.genericSelect.labelFieldName = pLabelFieldName;

            if (!pValueFieldName) {
                pValueFieldName = 'value';
            }
            $scope.genericSelect.valueFieldName = pValueFieldName;
            $scope.genericSelect.callBackFunction = pCallBackFunction;
            $scope.genericSelect.options = pSelectOptions;
            $scope.genericSelect.returnVariable = pReturnVariable;
            $scope.genericSelect.returnDescription = pReturnDescription;
            $scope.genericSelect.childScope = pChildScope;
            if (!pTemplateToUse) {
                pTemplateToUse = 'templates/modules/combo/GenericSelectPage.html';
            }
            $scope.ons.navigator.pushPage(pTemplateToUse);
        }

        $scope.genericSelectOptionClick = function(pReturnVariable) {
            /* $scope.genericSelect.returnVariable[$scope.genericSelect.labelFieldName] = pReturnVariable[$scope.genericSelect.labelFieldName];
             $scope.genericSelect.returnVariable[$scope.genericSelect.valueFieldName] = pReturnVariable[$scope.genericSelect.valueFieldName];*/
            console.log($scope['sortOptions.selectedSortOption']);
            if ($scope.genericSelect.childScope) {
                eval('$scope.genericSelect.childScope.' + $scope.genericSelect.returnDescription + ' = pReturnVariable[$scope.genericSelect.labelFieldName]');
                eval('$scope.genericSelect.childScope.' + $scope.genericSelect.returnVariable + ' = pReturnVariable[$scope.genericSelect.valueFieldName]');
            } else {
                eval('$scope.' + $scope.genericSelect.returnVariable + ' = pReturnVariable[$scope.genericSelect.valueFieldName]');
                eval('$scope.' + $scope.genericSelect.returnDescription + ' = pReturnVariable[$scope.genericSelect.labelFieldName]');
            }
            ons.navigator.popPage();
            if ($scope.genericSelect.callBackFunction) {
                $scope.genericSelect.callBackFunction(pReturnVariable);
            }
        }


        $scope.init = function() {
            if (userData.logedIn && userData.profileData.tipo == 2) {
                $scope.menu.setMainPage('templates/TabBarBottom.html');
            } else if (userData.logedIn && userData.profileData.tipo == 1) {
                $scope.menu.setMainPage('templates/forms/clienteSearch.html');
            } else {
                $scope.menu.setMainPage('templates/forms/login.html');
            }
        }

        $scope.logout = function() {
                $scope.userData.logout();
                $scope.menu.setMainPage('templates/forms/login.html');
            }
            //--- Search
        $scope.search = function(pTipo, pSearchString) {
            if (pSearchString == '' || pSearchString == undefined) {
                messageWindow("Debe ingresar un texto para la busqueda");
                return;
            }
            $scope.loading = true;
            $scope.searchType = pTipo;
            ons.navigator.pushPage('templates/pages/listaSearchResult.html');
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.ehslatam.com/controlcontratistas/ws/json.php?service=' + $scope.searchType + '&parametro=' + pSearchString + '&cliente=' + $scope.userData.profileData.codigo + '&desde=0&cantidad=1000',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: '' //'_method=POST&data[Login][login]=' + $scope.userData.userName + '&data[Login][password]=' + $scope.userData.password + '&',
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpSearchSuccess);
            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpSearchSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.searchResult = data;
        };






        $scope.getDocumentacionVehiculo = function(pVehicle) {
            $scope.loading = true;
            $scope.detallesVehiculo = pVehicle;
            ons.navigator.pushPage('templates/pages/listaDocumentacionVehiculo.html');
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.ehslatam.com/controlcontratistas/ws/json.php?service=documentacionVehiculo&codigoVehiculo=' + pVehicle.codigo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDocumentacionVehiculoSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpDocumentacionVehiculoSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.documentacionVehiculo = data;
        };

        $scope.getDetallesEmpleado = function(pEmpleadoCodigo) {
            $scope.loading = true;
            ons.navigator.pushPage('templates/pages/detallesPersonal.html');
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.ehslatam.com/controlcontratistas/ws/json.php?service=empleadoDetalle&codigoEmpleado=' + pEmpleadoCodigo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDetallesEmpleadoSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpDetallesEmpleadoError);

            var requestDocEmpleados = $http({
                method: "get",
                url: 'http://www.ehslatam.com/controlcontratistas/ws/json.php?service=documentacionEmpleado&codigoEmpleado=' + pEmpleadoCodigo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            requestDocEmpleados.success($scope.httpDocumentacionEmpleadoSuccess);

            // Store the data-dump of the FORM scope.
            requestDocEmpleados.error($scope.httpError);
        }

        $scope.httpDocumentacionEmpleadoSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.documentacionEmpleado = data;
        };

        $scope.httpDetallesEmpleadoSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.detallesEmpleado = data;
        };


        $scope.getDocumentacionContratista = function(pContratistaCode, pDontRedirect) {
            $scope.contratista.codigo = pContratistaCode;
            $scope.loading = true;
            if (!pDontRedirect) {
                ons.navigator.pushPage('templates/pages/listaDocumentacionContratista.html');
            }
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.ehslatam.com/controlcontratistas/ws/json.php?service=documentacionContratista&codigo=' + pContratistaCode,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDocumentacionContratistaSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpDocumentacionContratistaSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.documentacionContratista = data;
        };




        $scope.getEmpleados = function(pContratistaCode, pPage, pCount) {
            //http://www.ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=571&parametro=
            $scope.loading = true;
            $scope.isWorking = true;

            if (pCount == null) {
                pCount = 30;
                $scope.noMoreResults = false;
            }

            if (pPage == null) {
                pPage = 0;
                $scope.lastPage = 0;
            } else {
                $scope.lastPage = pPage;
            }


            var request = $http({
                method: "get",
                url: 'http://www.ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=' + pContratistaCode + '&parametro=&desde=' + (pPage * pCount) + '&cantidad=' + pCount,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpGetEmpleadosSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpGetEmpleadosSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;

            if (data.length == 0) {
                $scope.noMoreResults = true;
            }

            if ($scope.lastPage > 0) {
                $scope.searchResult = $.merge($scope.searchResult, data);
            } else {
                $scope.searchResult = data;
            }
        }

        $scope.getVehiculos = function(pContratistaCode) {
            //http://www.ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=571&parametro=
            $scope.loading = true;
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.ehslatam.com/controlcontratistas/ws/json.php?service=vehiculos&codigo=' + pContratistaCode + '&parametro=',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpGetVehiculosSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpGetVehiculosSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.searchResult = data;
        }

        $scope.httpError = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.connectionFail = true;
        };

        $scope.getDocumentosRechazados = function(pContratistaCode) {
            //http://www.ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=571&parametro=
            $scope.loading = true;
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.ehslatam.com/controlcontratistas/ws/json.php?service=documentosRechazados&codigo=' + pContratistaCode,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDocumentosRechazadosSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpDocumentosRechazadosSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.searchResult = data;
        }

        $scope.getDetallesContratista = function(pContratistaCode) {
            //http://www.ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=571&parametro=
            $scope.loading = true;
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.ehslatam.com/controlcontratistas/ws/json.php?service=contratistaDetalle&codigo=' + pContratistaCode,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDetallesContratistaSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpDetallesContratistaSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.userData.contratistaInfo = data;
            $scope.searchResult = data;
            $scope.getDocumentacionContratista($scope.userData.profileData.codigo, true);
        }

        $scope.getDetallesContratistaAsEmpresa = function(pContratistaCode) {
            //http://www.ehslatam.com/controlcontratistas/ws/json.php?service=empleados&codigo=571&parametro=
            $scope.loading = true;
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.ehslatam.com/controlcontratistas/ws/json.php?service=contratistaDetalle&codigo=' + pContratistaCode,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: ''
            });

            // Store the data-dump of the FORM scope.
            request.success($scope.httpDetallesContratistaAsEmpresaSuccess);

            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);
        }

        $scope.httpDetallesContratistaAsEmpresaSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.contratista.info = data;
        }

        $scope.retryConnection = function() {
            $scope.isWorking = false;
            $scope.loading = false;
            $scope.connectionFail = false;
            menu.setMainPage('templates/home.html');
        }

    });

    module.directive('moduleSinResultados', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/sinResultados.html'
        };
    });

    module.directive('moduleSinConexion', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/sinConexion.html'
        };
    });

    module.directive('moduleLoadingSpinner', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/loadingSpinner.html'
        };
    });
})();
