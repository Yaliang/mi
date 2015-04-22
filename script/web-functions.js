/* This function call does the preparation work after the web document is loaded.
 * initialElementEventSetting:  initialization for certain elements, see the function for details;
 * cacheInitialization:  initialization of the cache, see the function for details;
 * loginByLocalStorage:  try to log into user session using the local storage, see the function for details.
 */
$(document).ready(function (){
    initialElementEventSetting();
    cacheInitialization();
    loginByLocalStorage();
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