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
	var playlistLength=Object.keys(_playlist2.default).length;
	return _playlist2.default[dayOfYear%playlistLength];
	}
	var videoId=getVideoId()||'SuPLxQD4akQ';


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
		"1": "48H7FkH7EeQ",
		"2": "UhD3_dxKNd8",
		"3": "Khy6RHTy6KI",
		"4": "JGfygJXTwq4",
		"5": "5Wvu7x3dYEY",
		"6": "nihfLAMgYMY",
		"7": "i5Fr3xXea9M",
		"8": "4EiM_-oSWzI",
		"9": "fTowrrWaHPY",
		"10": "dWuGqdsQCm4",
		"11": "oAHSu1REvaU",
		"12": "7E_rtl3-6pE",
		"13": "MyOvJzRA-P0",
		"14": "_S8QtLR-gZs",
		"15": "KCs8cj7-fr4",
		"16": "00rPgc0tISM",
		"17": "ajuxqguMvIE",
		"18": "RVxbFj2iJqk",
		"19": "1j-n6vB4xog",
		"20": "o273H8DjIr8",
		"21": "I_Yg6F7OOQE",
		"22": "flBd7yQ-bv8",
		"23": "wy8XbK-R7CQ",
		"24": "EPwQbQekk38",
		"25": "TBQJ_ijbbGc",
		"26": "Ibjq9C7nS94",
		"27": "aQBc-X21Gbg",
		"28": "yYx-1nrDpHg",
		"29": "3Q3NblRa2X8",
		"30": "TFeCuTiitmU",
		"31": "H-aAXuZpp9c",
		"32": "FOp-LmapC2s",
		"33": "Q3_ypSMbWVM",
		"34": "JXX4-wCZVjc",
		"35": "BsfkapOxC9E",
		"36": "_erSS2OVp2c",
		"37": "lK-vrvfsTT4",
		"38": "5yBU1ELFXfk",
		"39": "ZVuMXpd1NJA",
		"40": "jgEyJ3eVxz0",
		"41": "rK_EikZ6oqU",
		"42": "Z0ZrkBCnfxw",
		"43": "oLWScthpAgY",
		"44": "KSTKheVpEq4",
		"45": "ZIrFhIeTkXw",
		"46": "wySYdhClg2c",
		"47": "rWLbqPkX_rs",
		"48": "uB5Pt_8cr6Y",
		"49": "PF54jfEFhIM",
		"50": "Fy8VIwdCOFY",
		"51": "YMz2_S2y9WE",
		"52": "ukN8lr4Mbkc",
		"53": "LhFRTC3kms0",
		"54": "5KhENyphgjc",
		"55": "-idijgzSSA4",
		"56": "sWlXsEj1RpM",
		"57": "nCZYBMQoml0",
		"58": "_ok0PXY7HhU",
		"59": "RGtz_e6nE9U",
		"60": "VdcwDp5MK9s",
		"61": "cJy3nKwfDZ8",
		"62": "Om3kKDrCDnQ",
		"63": "OpG4m1GB3Ug",
		"64": "bhQH5AFjNj0",
		"65": "F6gNSnxq-V4",
		"66": "ztChrYW_25w",
		"67": "CJx5zMGos44",
		"68": "ScQ-ad9gR9M",
		"69": "FOP0HvD6E_g",
		"70": "WldsRzmu4zs",
		"71": "J-pC3AjI9DI",
		"72": "pIL1f186LSY",
		"73": "IkjdKkS113I",
		"74": "LOuhHPJQn94",
		"75": "o8pQdp3hwFs",
		"76": "Ls0xX6IXPHs",
		"77": "IgO50e6fdpk",
		"78": "SSijcZjWMng",
		"79": "-2RszuyACbM",
		"80": "-KyCIwrk9Qk",
		"81": "JHBtiXVCJuI",
		"82": "ptcqyPg1zus",
		"83": "l8lcbTWoE5c",
		"84": "RQRfnexHJmk",
		"85": "JZF34HuAGu4",
		"86": "Wo6i7TD50Os",
		"87": "FH1zd-zPWms",
		"88": "0jaMXGnDnJQ",
		"89": "3sW0-gJCg10"
	};

/***/ }
/******/ ]);