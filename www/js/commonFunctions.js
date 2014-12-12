var isApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
var raiseDebugErrors = false;


function prompt(strMessage, fnctCallBaclFunction, strTitle, strButtonLabel) {

    if (!fnctCallBaclFunction) {
        fnctCallBaclFunction = messageDefaultCallBackFunction;
    }

    if (!strTitle) {
        strTitle = "Información";
    }

    if (!strButtonLabel) {
        strButtonLabel = "Ok";
    }
    ons.notification.alert({
        message: strTitle,
        title: strMessage
    });
    //navigator.notification.alert(strMessage, fnctCallBaclFunction, strTitle, strButtonLabel);
    if (fnctCallBaclFunction)
        fnctCallBaclFunction();
}

function promptError(strMessage, fnctCallBaclFunction, strTitle, strButtonLabel) {

    if (!fnctCallBaclFunction) {
        fnctCallBaclFunction = messageDefaultCallBackFunction;
    }

    if (!strTitle) {
        strTitle = "Error";
    }

    if (!strButtonLabel) {
        strButtonLabel = "Ok";
    }

    ons.notification.alert({
        message: strTitle,
        title: strMessage
    });
    if (console.logError) {
        console.logError(strMessage);
    }
}

function messageDefaultCallBackFunction() {
    console.log('Notificación mostrada con exito');
}

function androidCloseApp() {
    navigator.app.exitApp();
}

function goBackOnePage() {
    ons.navigator.popPage();
}

if (raiseDebugErrors) {
    console.logError = console.error;
    console.error = promptError;
}
var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "browser";
var gcmProductID = null;
var gcmCategoryID = null;


function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}
