/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _playlist=__webpack_require__(1);var _playlist2=_interopRequireDefault(_playlist);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

	function getAllUrlParams(url){

	var queryString=url?url.split('?')[1]:window.location.search.slice(1);

	var obj={};

	if(queryString){

	queryString=queryString.split('#')[0];

	var arr=queryString.split('&');
	for(var i=0;i<arr.length;i+=1){

	var a=arr[i].split('=');

	var paramNum=void 0;
	var paramName=a[0].replace(/\[\d*]/,function(v){
	paramNum=v.slice(1,-1);
	return'';
	});

	var paramValue=typeof a[1]==='undefined'?true:a[1];

	paramName=paramName.toLowerCase();

	if(obj[paramName]){

	if(typeof obj[paramName]==='string'){
	obj[paramName]=[obj[paramName]];
	}

	if(typeof paramNum==='undefined'){

	obj[paramName].push(paramValue);
	}else{

	obj[paramName][paramNum]=paramValue;
	}
	}else{
	obj[paramName]=paramValue;
	}
	}
	}
	return obj;
	}

	function getDayOfYear(){
	var today=new Date();
	var year=today.getFullYear();

	var isLeapYear=year%4===0&&(year%400===0||year%100!==0);

	var dayCount=[0,31,59,90,120,151,181,212,243,273,304,334];
	var mn=today.getMonth();
	var dn=today.getDate();
	var dayOfYear=dayCount[mn]+dn;
	if(mn>1&&isLeapYear)dayOfYear+=1;
	return dayOfYear-1;
	}

	var params=getAllUrlParams();

	function getVideoId(){
	if(params.videoId)return params.videoId;

	var dayOfYear=getDayOfYear();
	var playlistLength=Object.keys(_playlist2.default);
	console.log('dayOfYear',dayOfYear);
	console.log(_playlist2.default);
	return _playlist2.default[dayOfYear%playlistLength];
	}
	var videoId=getVideoId()||'nihfLAMgYMY';


	function onPlayerReady(event){
	event.target.setPlaybackQuality('small');

	event.target.setVolume(params.volume?parseInt(params.volume,10):0);
	if(params.autoplay)event.target.playVideo();
	}


	var player=void 0;
	window.onYouTubeIframeAPIReady=function onYouTubeIframeAPIReady(){
	player=new YT.Player('player',{
	width:'100%',
	height:'100%',
	videoId:videoId,
	events:{
	onReady:onPlayerReady},

	playerVars:{
	rel:0,
	controls:1,
	showinfo:0,
	loop:1}});


	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
		"0": "KcoevKNPrT4",
		"1": "LZ-oJbQc1Ac"
	};

/***/ }
/******/ ]);