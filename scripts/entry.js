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

//TODO: setup content
//Example
// document.getElementById["heading1"].innerHtml = currentDynamicContent[currentBanner.heading1];
