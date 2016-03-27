//double click dynamic content
//----------------------------
var getBanner = require('./getBanner');
var bannerConfig = require('../bannerConfig');

module.exports = function(){
  var currentBanner = getBanner();

  var currentDynamicContent = window.dynamicContent[bannerConfig.googleSheetTabName][0];
  Enabler.setProfileId('[ID]');

  //example
  var devDynamicContent = {};
  devDynamicContent[bannerConfig.googleSheetTabName] = [{}];
  devDynamicContent.[bannerConfig.googleSheetTabName][0]._id = 0;

  Enabler.setDevDynamicContent(devDynamicContent);

  function enablerInitHandler() {
  	// if enabler is loaded code
  	function exitClickHandler() {
  	   Enabler.exitOverride("Banner Exit", currentDynamicContent.out_link.Url);
  	}
  	document.getElementById('banner').addEventListener('click', exitClickHandler, false);
  }

  // google doubleclick init
  window.onload = function() {
    if (Enabler.isInitialized()) {
      enablerInitHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
    }
  }
};
