/* globals window */
var bannerConfig = require('../bannerConfig');

module.exports = function(){

  if (window.currentBanner) {
      return window.currentBanner;
  }

  const margin = 2;

  var currentBanner = bannerConfig.banners.filter(function(banner){
      return window.innerWidth < (banner.width + margin) && window.innerWidth > (banner.width - margin)
        && window.innerHeight < (banner.height + margin) && window.innerHeight > (banner.height - margin);
  });

  if (!currentBanner.length) {
      currentBanner = bannerConfig.defaultBanner;
  } else {
      currentBanner = currentBanner[0];
  }

  return currentBanner;
}
