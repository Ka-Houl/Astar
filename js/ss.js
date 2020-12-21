var error_send_num = 0

function getMajorVerison(){
  var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
  return raw ? parseInt(raw[2], 10) : false;
}

function stopWebRtc(){
  if(getMajorVerison() > 47){
      try{
        chrome.privacy.network.webRTCIPHandlingPolicy.set({
          value: 'disable_non_proxied_udp'
        });
      }
      catch(e){
        console.log("Error: " + e.message);
      }
  }
  else if(getMajorVerison() > 41 && getMajorVerison() < 47){
      try{
          chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
            value: false,
            scope: 'regular'
          });
      }
      catch(e){
        console.log("Error: " + e.message);
      }
  }
  else if(getMajorVerison() == 47){
      try{
          chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
            value: false,
            scope: 'regular'
          });
          chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
            value: false,
            scope: 'regular'
          });
      }
      catch(e){
        console.log("Error: " + e.message);
      }
  }
}

function startWebRtc(){
  if(getMajorVerison() > 47){
      try{
        chrome.privacy.network.webRTCIPHandlingPolicy.set({
          value: 'default_public_and_private_interfaces'
        });
      }
      catch(e){
        console.log("Error: " + e.message);
      }
  }
  else if(getMajorVerison() > 41 && getMajorVerison() < 47){
      try{
          chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
            value: true,
            scope: 'regular'
          });
      }
      catch(e){
        console.log("Error: " + e.message);
      }
  }
  else if(getMajorVerison() == 47){
      try{
          chrome.privacy.network.webRTCMultipleRoutesEnabled.set({
            value: true,
            scope: 'regular'
          });
          chrome.privacy.network.webRTCNonProxiedUdpEnabled.set({
            value: true,
            scope: 'regular'
          });
      }
      catch(e){
        console.log("Error: " + e.message);
      }
  }
}

function clientFun(){
    this.init = function(nReq){
		// ConsoleManager.init()
		var login_status = localStorage['login_status'] 
		if(!login_status){
			login_status = 0
		}
		var email = localStorage['login_email']
        $.ajax({url: 'https://astarvpn.center/astarnew/NewVPN/getProxyList?' + new Date().getTime(),type: 'post',dataType: 'json',data: { strP:chrome.runtime.id, nonlinestate: login_status, strlognid: email, version: '108'},
            success: function(json,textStatus,request){var key = CryptoJS.enc.Utf8.parse(hex_md5(json.s + ConsoleManager.onOpen.toString() + ConsoleManager.onClose.toString() + ConsoleManager.init.toString() + client.init.toString() + client.checkProxy.toString() + client.getProxy.toString() + p.on.toString()).substring(json.startIndex,json.endIndex));var decrypt = CryptoJS.AES.decrypt(json.d, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});var d = CryptoJS.enc.Utf8.stringify(decrypt).toString();
				var _d = $.parseJSON(d);if(_d.nCode != 0){//chrome.storage.local.set({'state':0, "_click":1},function(){});
					localStorage['state'] = '0';localStorage['_click'] = '1';chrome.browserAction.setBadgeBackgroundColor({color:'#FFFFFF'});chrome.browserAction.setBadgeText({text:""});server.req({"n": 0});console.info("service exception");return ;}localStorage['_sl'] = JSON.stringify(_d.jsonObject);localStorage['_s'] = json.s;
				//chrome.storage.local.set({"_sl":_d.jsonObject,"_s":json.s},function(){});
				var state = localStorage['state'];
				//chrome.storage.local.get(['state'], function(result) {
				if(state == undefined){if(nReq != undefined && nReq != null){server.req({"n": nReq});}return ;}if(state == '0'){if(nReq != undefined && nReq != null){server.req({"n": nReq});}return ;}p.exceptionNumber = 0;client.checkProxy();
				//});
            },
            error: function(){
				console.info("service net exception");
            }
        })
	},
	this.checkProxy = function(){
		var _sl = localStorage['_sl'];
		if(_sl == undefined){client.failRequest();return ;}var _d = JSON.parse(_sl);var _i = localStorage['_i'];if(_i == undefined){client.failRequest();return ;}
	
		var _src = ''
		for(var i = 0;i < _d.d.length;i++){
			if(_d.d[i].i == _i){
				_src = _d.d[i].c
			}
		}
		if(_src == ''){client.getProxy();return ;}
		
		$.ajax({ url: _src + '?' + new Date().getTime(),type: 'get',success: function(){client.getProxy();},error: function(){client.failRequest();console.info("proxy net exception");}})
	},
	this.timeCheckProxy = function(){
		var state = localStorage['state'];
		if(state == 0){
			return ;
		}

		var _sl = localStorage['_sl'];
		if(_sl == undefined){
			return ;
		}
		var _d = JSON.parse(_sl)

		var _i = localStorage['_i'];
		if(_i == undefined){
			return ;
		}
		
		var _src = ''
		for(var i = 0;i < _d.d.length;i++){
			if(_d.d[i].i == _i){
				_src = _d.d[i].c
			}
		}
		if(_src == ''){
			return ;
		}
		
		$.ajax({
            url: _src + '?' + new Date().getTime(),
			type: 'get',
            success: function(){
				
			},
            error: function(){
				console.info("time check proxy net exception");
				client.failRequest();
            }
        })
	},
	this.getProxy = function(){
		var _s = localStorage['_s'];
		if(_s == undefined){
			return ;
		}
		
		var _i = localStorage['_i'];
		if(_i == undefined || _i == '-1'){
			client.failRequest()
			return ;
		}

		var login_status = localStorage['login_status'] 
		if(!login_status){
			login_status = 0
		}
		var email = localStorage['login_email']
			
		$.ajax({
			url: 'https://astarvpn.center/astarnew/NewVPN/getProxy?' + new Date().getTime(),
			type: 'post',
			dataType: 'json',
			data: {strP:chrome.runtime.id,strtoken:_s,lid:_i, nonlinestate: login_status, strlognid: email, version: '108'},
			success: function(json){var key = CryptoJS.enc.Utf8.parse(hex_md5(json.s + ConsoleManager.onOpen.toString() + ConsoleManager.onClose.toString() + ConsoleManager.init.toString() + client.init.toString() + client.checkProxy.toString() + client.getProxy.toString() + p.on.toString()).substring(json.startIndex,json.endIndex));var decrypt = CryptoJS.AES.decrypt(json.d, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});var d = CryptoJS.enc.Utf8.stringify(decrypt).toString();var _d = $.parseJSON(d);
				if(_d.nCode != 102){
					client.failRequest()
					console.info("proxy line exception,please select other proxy line.");
					return ;
				}
				
				p.on(_d.jsonObject);
				//chrome.storage.local.set({"_click":1},function(){});
				localStorage['_click'] = '1';
				error_send_num = 0
				server.req({"n": 1});
				
				
				//if(result._sl == undefined){
				//	return ;
				//}
				//var _d = result._sl;
				
				var _sl = localStorage['_sl'];
				if(_sl == undefined){
					return ;
				}
				var _d = JSON.parse(_sl)
				
				for(var i = 0;i < _d.d.length;i++){
					if(_i == undefined){
						if(i == 0){
							chrome.browserAction.setBadgeBackgroundColor({color:[16,201,33,100]});
							chrome.browserAction.setBadgeText({text:_d.d[i].p.replace(".png", "")});
						}
					} else {
						if(_d.d[i].i == _i){
							chrome.browserAction.setBadgeBackgroundColor({color:[16,201,33,100]});
							chrome.browserAction.setBadgeText({text:_d.d[i].p.replace(".png", "")});
						}
					}
				}
				
				p.exceptionState = 0;
			},
			error: function(){
				console.info("service net exception");
			}
		})
    },
	this.heartDump = function(){
		var _s = localStorage['_s'];
		var _i = localStorage['_i'];
		var _sl = localStorage['_sl'];
		var state = localStorage['state'];

		if(_s == undefined){
			return ;
		}
		if(_i == undefined){
			return ;
		}
		if(_sl == undefined){
			return ;
		}
		if(state == 0){
			return ;
		}
		
		var _d = JSON.parse(_sl);
		var _name = "";
		for(var i = 0;i < _d.d.length;i++){
			if(_i == undefined){
				if(i == 0){
					_name = _d.d[i].n;
				}
			} else {
				if(_d.d[i].i == _i){
					_name = _d.d[i].n;
				}
			}
		}
		
		$.ajax({
			url: 'https://astarvpn.center/astarnew/NewVPN/heartDump?' + new Date().getTime(),
			type: 'post',
			dataType: 'json',
			data: {
				strP:chrome.runtime.id,strtoken:_s,lid:_i,strlognid:_name
			},
			success: function(json){
				
			},
			error: function(){
				
			}
		})
    },
	this.timeSend = function(){
		// this.heartDump()
		// setTimeout(function(){
		// 	client.timeSend()
		// }, 60 * 60 * 1000 )
	},
	this.failRequest = function(){
		p.off();

		localStorage['state'] = '0';
		localStorage['_click'] = '1';
		
		chrome.browserAction.setBadgeBackgroundColor({color:'#FFFFFF'});
		chrome.browserAction.setBadgeText({text:""});
		server.req({"n": 0});
	}
	
}

var client = new clientFun();

setInterval(function(){
	client.timeCheckProxy()
}, 600000);

function serverFun(){
	this.req = function(data){
		var views = chrome.extension.getViews({type:'popup'});
		if(views.length > 0){
		  views[0].popup.backgroundEvent(data);
		}
		
	},
	this.init = function(){
		chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
			if(message.n == 404){
				p.off();
				
				//chrome.storage.local.set({'state':0, "_click":1},function(){});
				
				localStorage['state'] = '0';
				localStorage['_click'] = '1';
				
				chrome.browserAction.setBadgeBackgroundColor({color:'#FFFFFF'});
				chrome.browserAction.setBadgeText({text:""});
				
				client.init(4);
			}
			if(message.n == 200){
				//chrome.storage.local.set({'state':1},function(){});
				localStorage['state'] = '1';
				client.init();
			}
			if(message.n == 202){
				client.init(2);
			}
			
			sendResponse({caback: "ok"});
		});
	},
	this.popupEvent = function(code){
		if(code == 404){
			p.off();
			
			//chrome.storage.local.set({'state':0, "_click":1},function(){});
			localStorage['state'] = '0';
			localStorage['_click'] = '1';
			
			chrome.browserAction.setBadgeBackgroundColor({color:'#FFFFFF'});
			chrome.browserAction.setBadgeText({text:""});
			
			client.init(4);
		}
		if(code == 200){
			//chrome.storage.local.set({'state':1},function(){});
			localStorage['state'] = '1';
			client.init();
		}
		if(code == 202){
			client.init(2);
		}
	},
	this.getUserData = function(){
		if(localStorage['login_status'] && localStorage['login_status'] == '1'){
			var state = localStorage['state'];
			if(state && state == 1){
				var _i = localStorage['_i'];
				var email = localStorage['login_email']
				$.ajax({
					url: 'https://astarvpn.center/astarnew/user/getUserData?' + new Date().getTime(),
					type: 'post',
					dataType: 'json',
					data: {
						strP:chrome.runtime.id, strlognid: email, dataId: _i
					},
					success: function(json){
						if(json.nCode == 0){
							var data = json.jsonObject
							localStorage['nCurrValidTime'] = data.nCurrValidTime;
						} else if(json.nCode == 4){
							var data = json.jsonObject
							localStorage['nCurrValidTime'] = data.nCurrValidTime;

							server.popupEvent(404)
						}
					},
					error: function(){
						console.info("service net exception");
						if(error_send_num >= 3){
							server.popupEvent(404)
							error_send_num = 0
						} else {
							error_send_num = error_send_num + 1
						}
					}
				})
			}
		} 
	}
}

var server = new serverFun();

setInterval(function(){
	server.getUserData()
}, 300000)

function pFun(){
	this.exceptionState=0,
	this.exceptionNumber = 0,
	this.d={},
	this.on = function(_j){try{var key = CryptoJS.enc.Utf8.parse(hex_md5(_j._p + ConsoleManager.onOpen.toString() + ConsoleManager.onClose.toString() + ConsoleManager.init.toString() + client.init.toString() + client.checkProxy.toString() + client.getProxy.toString() + p.on.toString()).substring(_j.startIndex,_j.endIndex));var decrypt = CryptoJS.AES.decrypt(_j._s, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});var config = {mode: "pac_script",pacScript: {data: CryptoJS.enc.Utf8.stringify(decrypt).toString(),mandatory:true}};chrome.proxy.settings.set({value: config, scope: 'regular'},function() {stopWebRtc();notice.noticeStart();});}catch(e){console.info(e);}},
	this.off = function(){
		var pv={mode: "direct"};
		chrome.proxy.settings.set({
			value: pv
		},
		function() {
			startWebRtc()
		})
	},
	this.init=function(){
		chrome.proxy.settings.get(
				{'incognito': false},
				function(config) {
					if(config.levelOfControl == "controlled_by_this_extension"){
						p.off();
					} else if(config.levelOfControl == "controllable_by_this_extension"){
					} else if(config.levelOfControl == "controlled_by_other_extensions"){
						console.info("Another proxy is uesing.");
					} else if(config.levelOfControl == "not_controllable"){
						console.info("Proxy is not supported.");
					}
					client.init();
				});
		
		
		// chrome.permissions.contains({
		// 		permissions: ['privacy']
		// 	  }, function(result) {
		// 		if (result) {
		// 		  stopWebRtc();
		// 		  localStorage['webRtcState'] = '1';
		// 		} else {
		// 		  localStorage['webRtcState'] = '2';
		// 		}
		// }); 
		
	}
}

var p = new pFun();

p.init();


var notice = {

	noticeStart: function(){
		this.checkNotification()
		
	},

	checkNotification: function(){
		if (!("Notification" in window)) {
			console.info("Browser does not support message notification.");
		}
		// check whether notification permissions have alredy been granted
		else if (Notification.permission === "granted") {
		// If it's okay let's create a notification
			this.getMessage()
		}
		// Otherwise, ask the user for permission
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
			// If the user accepts, let's create a notification
				if (permission === "granted") {
					this.getMessage()
				}
			});
		}
	},

	getMessage: function(){
		var ths = this;
		$.ajax({
			url: 'https://astarvpn.center/astarnew/NewVPN/getNoticeMess?' + new Date().getTime(),
			type: 'post',
			dataType: 'json',
			data: {
				strP:chrome.runtime.id
			},
			success: function(json){
				if(json.nCode == 0){
					if(json.jsonObject && json.jsonObject != null){
						ths.showMessage(json.jsonObject)
					}
				}
			}
		})
	},

	showMessage: function(mess){
		var id = mess.id
		var messId = localStorage['messId']
		if(messId){
			if(messId == ''){
				messId = "," + id + ","
			} else {
				if(messId.indexOf("," + id + ",") == -1){
					messId += id + ","
					localStorage['messId'] = messId
				} else {
					return 
				}
			}
		} else {
			localStorage['messId'] = "," + id + ","
		}

		var notification = new Notification("ASTARVPN Message",{
            body : mess.mess,
            icon : 'img/32.png'
		})
		if(mess.href && mess.href != ''){
			notification.onclick = function() {
				chrome.tabs.create({url: mess.href})
			}
		}
		notification.onerror = function() {
			alert("The latest version of Android is online. Download Link:" + mess.href);
		}
		notification.onclose = function() {
			console.log('onclose');
		}


		// NEW
		// chrome.tabs.create({url: "account.html"})
	}
}

var ConsoleManager = {
	eventInter: null,
    onOpen: function () {try {window.open("about:blank", target = "_self")} catch (e) {try{var n = document.createElement("button");n.onclick = function () {window.open("about:blank", target = "_self")}, n.click()}catch(ex){}}},
    onClose: function () {},
    init: function() {if (ConsoleManager.eventInter != null) {try{clearInterval(ConsoleManager.eventInter)}catch(e){}}try{var e = this, n = document.createElement("div"), t = false, o = false;Object.defineProperty(n, "id", {get: function() {t || (e.onOpen(),t = !0), o = !0}});ConsoleManager.eventInter = setInterval(function() { o = !1, console.info(n),console.clear(),!o && t && (e.onClose(),t = !1)}, 200)}catch(ex){}}
}

function getKey(){
	return ConsoleManager.onOpen.toString() + ConsoleManager.onClose.toString() + ConsoleManager.init.toString() + client.init.toString() + client.checkProxy.toString() + client.getProxy.toString() + p.on.toString();
}

function initClientListner(){
	chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
		var headers = details.requestHeaders;
		var value = "";
		for (var i = 0; i < headers.length; i++) {
			if (headers[i].name.toLowerCase() == 'user-agent') {
				value = headers[i].value + " FS"
				headers.splice(i, 1);
				break;
			}
		}
		details.requestHeaders.push({name:"user-agent",value:value});
		return {requestHeaders: details.requestHeaders};
	},{urls:["<all_urls>"]},["blocking", "requestHeaders"]);
}

initClientListner();