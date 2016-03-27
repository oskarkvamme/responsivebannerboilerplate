var bannerConfig = require('../bannerConfig');

var currentBanner = bannerConfig.banners.filter(function(banner){

    return window.innerWidth === banner.width && window.innerHeight === banner.height;
});

if(!currentBanner.length){
    currentBanner = bannerConfig.defaultBanner;

}else{
    currentBanner = currentBanner[0];

}


//double click dynamic content
//----------------------------
//var currentDynamicContent = window.dynamicContent[bannerConfig.googleSheetTabName][0];
/* example code
    Enabler.setProfileId(1073181);
    var devDynamicContent = {};
    devDynamicContent.nhhtestsheet_Campaign5= [{}];
    devDynamicContent.nhhtestsheet_Campaign5[0]._id = 0;
    ...
    Enabler.setDevDynamicContent(devDynamicContent);
*/
    
// google doubleclick init
window.onload = function() {
  if (Enabler.isInitialized()) {
    enablerInitHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }
}

function enablerInitHandler() {
	
	// if enabler is loaded code
	function exitClickHandler() {
		//Enabler.exitOverride("Banner Exit", currentDynamicContent.out_link.Url);
	}
	document.getElementById('banner').addEventListener('click', exitClickHandler, false);

}
