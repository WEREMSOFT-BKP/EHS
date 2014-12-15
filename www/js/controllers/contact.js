(function() {
    'use strict';
    var module = angular.module('Contact', []);

    module.controller('ContactController', function($scope) {

        $scope.askCallSoporte = function(cod_sucursal) {
            try {
                ons.notification.confirm({
                    buttonLabel: 'Sí',
                    title: 'Contacto',
                    message: '¿Desea llamar a soporte?',
                    callback: function(idx) {
                        switch (idx) {
                            case 0:
                                //do nothing
                                break;
                            case 1:
                                $scope.onConfirm(1);
                                break;
                        }
                    }
                });
            } catch (e) {
                console.log(e);
                //alert(e);
            }
        }

        $scope.onConfirm = function(buttonIndex) {
            if (buttonIndex == 1) {
                $scope.callContacto();
            }
        }

        $scope.callContacto = function() {
            phonedialer.dial(
                "01148335900",
                function(err) {
                    if (err == "empty") console.log("Unknown phone number");
                    else console.log("Dialer Error:" + err);
                },
                function(success) {
                    //alert('Dialing succeeded');
                }
            );
        }
        $scope.emailContacto = function() {
            var link = "mailto:contratistas@ehslatam.com" + "?subject=" + escape("Consulta") + "&body=" + escape("Estimado equipo de soporte:\n");
            window.plugin.email.open({
                to: ['contratistas@ehslatam.com'], // email addresses for TO field
                cc: [], // email addresses for CC field
                bcc: [], // email addresses for BCC field
                attachments: [], // paths to the files you want to attach or base64 encoded data streams
                subject: "Solicitud de soporte", // subject of the email
                body: "Estimado equipo de soporte:<br>", // email body (could be HTML code, in this case set isHtml to true)
                isHtml: true, // indicats if the body is HTML or plain text
            });
        }


    });
})();
