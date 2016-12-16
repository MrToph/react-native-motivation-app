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
	console.log(params);
	function getVideoId(){
	if(params.videoid)return params.videoid;

	var dayOfYear=getDayOfYear();
	var playlistLength=_playlist2.default.length;
	return _playlist2.default[dayOfYear%playlistLength];
	}
	var videoId=getVideoId()||'SuPLxQD4akQ';


	function onPlayerReady(event){
	event.target.setPlaybackQuality('small');

	event.target.setVolume(params.volume?parseInt(params.volume,10):100);
	if(params.autoplay)event.target.playVideo();
	}




	var errorTypeToTimeoutId={};
	function onPlayerError(event){
	var errorType=event.data;
	console.error('YouTube-Iframe-Api Error-Code:',errorType);

	if(typeof errorTypeToTimeoutId[errorType]==='number')return;
	errorTypeToTimeoutId[errorType]=setTimeout(function(){return window.postMessage(errorType,'*');},3000);
	}

	var player=void 0;
	window.onYouTubeIframeAPIReady=function onYouTubeIframeAPIReady(){
	player=new YT.Player('player',{
	width:'100%',
	height:'100%',
	videoId:videoId,
	events:{
	onReady:onPlayerReady,
	onError:onPlayerError},

	playerVars:{
	rel:0,
	controls:1,
	showinfo:0,
	loop:1,

	playlist:videoId}});


	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = [
		"KcoevKNPrT4",
		"48H7FkH7EeQ",
		"UhD3_dxKNd8",
		"Khy6RHTy6KI",
		"JGfygJXTwq4",
		"5Wvu7x3dYEY",
		"nihfLAMgYMY",
		"i5Fr3xXea9M",
		"4EiM_-oSWzI",
		"fTowrrWaHPY",
		"dWuGqdsQCm4",
		"oAHSu1REvaU",
		"7E_rtl3-6pE",
		"MyOvJzRA-P0",
		"_S8QtLR-gZs",
		"KCs8cj7-fr4",
		"00rPgc0tISM",
		"ajuxqguMvIE",
		"RVxbFj2iJqk",
		"1j-n6vB4xog",
		"o273H8DjIr8",
		"I_Yg6F7OOQE",
		"flBd7yQ-bv8",
		"wy8XbK-R7CQ",
		"EPwQbQekk38",
		"TBQJ_ijbbGc",
		"Ibjq9C7nS94",
		"aQBc-X21Gbg",
		"yYx-1nrDpHg",
		"3Q3NblRa2X8",
		"TFeCuTiitmU",
		"H-aAXuZpp9c",
		"FOp-LmapC2s",
		"Q3_ypSMbWVM",
		"JXX4-wCZVjc",
		"BsfkapOxC9E",
		"_erSS2OVp2c",
		"lK-vrvfsTT4",
		"5yBU1ELFXfk",
		"ZVuMXpd1NJA",
		"jgEyJ3eVxz0",
		"rK_EikZ6oqU",
		"Z0ZrkBCnfxw",
		"oLWScthpAgY",
		"KSTKheVpEq4",
		"ZIrFhIeTkXw",
		"wySYdhClg2c",
		"rWLbqPkX_rs",
		"uB5Pt_8cr6Y",
		"PF54jfEFhIM",
		"Fy8VIwdCOFY",
		"YMz2_S2y9WE",
		"ukN8lr4Mbkc",
		"LhFRTC3kms0",
		"5KhENyphgjc",
		"-idijgzSSA4",
		"sWlXsEj1RpM",
		"nCZYBMQoml0",
		"_ok0PXY7HhU",
		"RGtz_e6nE9U",
		"VdcwDp5MK9s",
		"cJy3nKwfDZ8",
		"Om3kKDrCDnQ",
		"OpG4m1GB3Ug",
		"bhQH5AFjNj0",
		"F6gNSnxq-V4",
		"ztChrYW_25w",
		"CJx5zMGos44",
		"ScQ-ad9gR9M",
		"FOP0HvD6E_g",
		"WldsRzmu4zs",
		"IgO50e6fdpk",
		"pIL1f186LSY",
		"IkjdKkS113I",
		"LOuhHPJQn94",
		"o8pQdp3hwFs",
		"Ls0xX6IXPHs",
		"J-pC3AjI9DI",
		"SSijcZjWMng",
		"-2RszuyACbM",
		"nPQKN2TTurc",
		"JHBtiXVCJuI",
		"ptcqyPg1zus",
		"l8lcbTWoE5c",
		"RQRfnexHJmk",
		"JZF34HuAGu4",
		"Wo6i7TD50Os",
		"FH1zd-zPWms",
		"0jaMXGnDnJQ",
		"3sW0-gJCg10",
		"YIgJmu5emvM",
		"CV5r5c8U9_U"
	];

/***/ }
/******/ ]);