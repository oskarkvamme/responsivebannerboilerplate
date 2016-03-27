var bannerConfig = require('../bannerConfig');

module.exports = function(){
  var currentBanner = bannerConfig.banners.filter(function(banner){
      return window.innerWidth === banner.width && window.innerHeight === banner.height;
  });

  if(!currentBanner.length){
      currentBanner = bannerConfig.defaultBanner;
  }else{
      currentBanner = currentBanner[0];
  }

  return currentBanner;
}
