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
		"TFeCuTiitmU",
		"eIdHyqB-mE0",
		"w1JJ5actiUM",
		"Khy6RHTy6KI",
		"_OQXFvOvEMA",
		"2dgHyGXv_ao",
		"Z0ZrkBCnfxw",
		"Pscbwh9iKv0",
		"CJn075Aw0CY",
		"5W16YFgJ_RU",
		"ESYYby1FuPc",
		"ScQ-ad9gR9M",
		"nihfLAMgYMY",
		"FU1svpfSErg",
		"5yBU1ELFXfk",
		"6CmgzjJMzTY",
		"dWuGqdsQCm4",
		"Wo6i7TD50Os",
		"IFrtWvu8Qm8",
		"ptcqyPg1zus",
		"zIFVwF35Jb0",
		"wTblbYqQQag",
		"00rPgc0tISM",
		"RQljs9X720E",
		"ptgVYgDG48U",
		"IJIeNMHtvs4",
		"_S8QtLR-gZs",
		"_kfosISl5Eg",
		"XQnzk334PtA",
		"wy8XbK-R7CQ",
		"o8pQdp3hwFs",
		"0jaMXGnDnJQ",
		"uA5XuOIilYc",
		"G0xWRGIasQE",
		"t8FnbQ_-vck",
		"gPF_wUo4wYQ",
		"SSijcZjWMng",
		"cJy3nKwfDZ8",
		"4EiM_-oSWzI",
		"ayP7rfQzIaE",
		"JGfygJXTwq4",
		"YWCYDYAz8R0",
		"RQRfnexHJmk",
		"hQ_ARUwUWQ0",
		"o273H8DjIr8",
		"9qdl3xcohvo",
		"R4F4ef7Xv5A",
		"rK_EikZ6oqU",
		"XAtArABzn6U",
		"eQTgs7f6ExQ",
		"YCFKbtfdj_s",
		"71Az73vLwiI",
		"DS0ed93UQeY",
		"KSTKheVpEq4",
		"nCZYBMQoml0",
		"TBQJ_ijbbGc",
		"3sW0-gJCg10",
		"00CwaoWwcEk",
		"9BxKsCKTrog",
		"LOuhHPJQn94",
		"DAS_mwIBJoY",
		"ETQt0UEGMPI",
		"RGtz_e6nE9U",
		"PmEDAzqswh8",
		"flBd7yQ-bv8",
		"J-pC3AjI9DI",
		"X1VvkDNxd6s",
		"nShlloNgM2E",
		"FOp-LmapC2s",
		"S9avYHuuA68",
		"ysTGb27yCcc",
		"-KyCIwrk9Qk",
		"YMz2_S2y9WE",
		"cfI_S9svhPo",
		"l8lcbTWoE5c",
		"NdFKtyxm-OA",
		"iZiNKB28_Ns",
		"LhFRTC3kms0",
		"FOP0HvD6E_g",
		"CJx5zMGos44",
		"Om3kKDrCDnQ",
		"xuLkJR1l-hM",
		"1j-n6vB4xog",
		"UBbtq6AH6rE",
		"ZIrFhIeTkXw",
		"3NXD7BI99PI",
		"Ibjq9C7nS94",
		"FDSaF0zRVzE",
		"jgEyJ3eVxz0",
		"cUvYszHhDwA",
		"p0p1fjLPjYQ",
		"wySYdhClg2c",
		"g3d3PL1ZMhA"
	];

/***/ }
/******/ ]);