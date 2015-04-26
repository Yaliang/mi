/* This function call does the preparation work after the web document is loaded.
 * initialElementEventSetting:  initialization for certain elements, see the function for details;
 * cacheInitialization:  initialization of the cache, see the function for details;
 * loginByLocalStorage:  try to log into user session using the local storage, see the function for details.
 */
$(document).ready(function (){
    initialElementEventSetting();
    cacheInitialization();
    loginByLocalStorage();
    getDeviceInfo();
});

/* Enable Pull Notifications*/
var pullNotificationEnable = true;

/* Empty function. Just wanna make convert from web to native more streightforword
 */ 
function registerNotificationId(){

}

/* Empty function. Just wanna make convert from web to native more streightforword
 */ 
function unregisterNotificationId(){

}

/*****************************************************
 * get the system version and device platform
 * created by Yaliang 4/25/2015
 ****************************************************
 */
function getDeviceInfo(){
    devicePlatform = navigator.platform;
    deviceVersion = navigator.appVersion;
    deviceIsIOS = (devicePlatform == "iPhone") || (devicePlatform == "iPad") || (devicePlatform == "iPod");
    if (deviceIsIOS) {
        if (deviceVersion.indexOf("OS 8") != -1) {
            deviceIOSVersion = 8
        } else if (deviceVersion.indexOf("OS 7") != -1) {
            deviceIOSVersion = 7
        } else if (deviceVersion.indexOf("OS 6") != -1) {
            deviceIOSVersion = 6
        } else if (deviceVersion.indexOf("OS 5") != -1) {
            deviceIOSVersion = 5
        } else {
        	deviceIOSVersion = 4 // iOS version <= 4
        }
    }
}