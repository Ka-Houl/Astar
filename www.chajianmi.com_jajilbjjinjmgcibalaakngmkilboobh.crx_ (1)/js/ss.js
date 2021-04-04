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
        $.ajax({url: 'https://astarvpn.center/astarnew/NewVPN/getProxyList?' + new Date().getTime(),type: 'post',dataType: 'json',data: { strP:chrome.runtime.id, nonlinestate: login_status, strlognid: email, version: '109'},
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
				// console.info("time check proxy net exception");
				// client.failRequest();
				// notice.normalNotification("The current line is busy, please replace other lines.")
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
			data: {strP:chrome.runtime.id,strtoken:_s,lid:_i, nonlinestate: login_status, strlognid: email, version: '109'},
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
setInterval(function(){client.timeCheckProxy()}, 240000)

function serverFun(){
	this.req = function(data){
		var views = chrome.extension.getViews({type:'popup'});
		if(views.length > 0){
		  views[0].popup.backgroundEvent(data);
		}
		
	},
	this.init = function(){
		localStorage['nNotifyStatus'] = "0"

		chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
			if(message.code){
				if(message.code == -99){
					var msg = {code: -99}
					chrome.tabs.query({active: true, currentWindow: true}, function(tab){
						if(!tab || tab.length == 0){
							return
						}
						chrome.tabs.sendMessage(tab[0].id, msg, function(response) {
							if(chrome.runtime.lastError){
								return ;
							}
						})
					})
				}

				sendResponse({caback: "ok"});
				return 
			}
			

			// if(message.n == 404){
			// 	p.off();
				
			// 	//chrome.storage.local.set({'state':0, "_click":1},function(){});
				
			// 	localStorage['state'] = '0';
			// 	localStorage['_click'] = '1';
				
			// 	chrome.browserAction.setBadgeBackgroundColor({color:'#FFFFFF'});
			// 	chrome.browserAction.setBadgeText({text:""});
				
			// 	client.init(4);
			// }
			// if(message.n == 200){
			// 	//chrome.storage.local.set({'state':1},function(){});
			// 	localStorage['state'] = '1';
			// 	client.init();
			// }
			// if(message.n == 202){
			// 	client.init(2);
			// }
			
			// sendResponse({caback: "ok"});
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
			var _i = localStorage['_i'];
			if(_i == undefined){
				_i = -1
			}

			var clientUUID = localStorage['clientUUID']
			if(!clientUUID){
				clientUUID = ''
			}

			var clientVersion = localStorage['version']
			if(!clientVersion){
				clientVersion = ''
			}

			var email = localStorage['login_email']
			$.ajax({
				url: 'https://astarvpn.center/astarnew/user/getUserData?' + new Date().getTime(),
				type: 'post',
				dataType: 'json',
				data: {
					strP:chrome.runtime.id, strlognid: email, lid:_i, version: '109', clientUUID: clientUUID, clientVersion: clientVersion
				},
				success: function(json){
					if(json.nCode == 0){
						var data = json.jsonObject
						localStorage['nCurrValidTime'] = data.nCurrValidTime;
						if(data.nNotifyStatus && data.nNotifyStatus === 1 && (!localStorage['nNotifyStatus'] || localStorage['nNotifyStatus'] === "0")){
							localStorage['nNotifyStatus'] = "1"
							notice.normalNotification("Your use time is less than one day, in order not to affect your use, please recharge as soon as possible.")
						} 
					} else if(json.nCode == 4){
						localStorage['nNotifyStatus'] = "0"
						var data = json.jsonObject
						localStorage['nCurrValidTime'] = data.nCurrValidTime;

						var state = localStorage['state'];
						if(state && state == 1){
							server.popupEvent(404)
						}
					}
				},
				error: function(){
					console.info("service net exception");
					if(error_send_num >= 3){
						var state = localStorage['state'];
						if(state && state == 1){
							server.popupEvent(404)
						}
						error_send_num = 0
					} else {
						error_send_num = error_send_num + 1
					}
				}
			})
		} 
	},
	this.addKey = function(){
		var addKey = localStorage['addKey']
		if(addKey && addKey == '1'){
			return ;
		}
		var ths = this;
		$.ajax({
			url: 'https://astarvpn.center/astarnew/NewVPN/addKey?' + new Date().getTime(),
			type: 'post',
			dataType: 'json',
			data: {
				strP:chrome.runtime.id, key: getKey(), version: '109'
			},
			success: function(json){
				if(json.nCode != 0){
					return ;
				}
				localStorage['addKey'] = '1'
			}
		})
	}
}

var server = new serverFun();
server.init()

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
						client.init();
					} else if(config.levelOfControl == "controllable_by_this_extension"){
						client.init();
					} else if(config.levelOfControl == "controlled_by_other_extensions"){
						console.info("Another proxy is uesing.");
						notice.normalNotification("The proxy is occupied by other plugins, please close other plugins.")
						client.failRequest()
					} else if(config.levelOfControl == "not_controllable"){
						console.info("Proxy is not supported.");
						notice.normalNotification("The browser does not support the use of proxy, please change the browser.")
						client.failRequest()
					}
				});

		chrome.proxy.onProxyError.addListener(function(details){
			var state = localStorage['state']
			if(!state || state == '0'){
				return ;
			}
			console.info(details)
			// if(!details.fatal){
			// 	client.failRequest();
			// 	notice.normalNotification("The current line is busy, please replace other lines.")
			// }
		})
	}
}

var p = new pFun();

p.init();


var notice = {

	noticeStart: function(){
		this.checkNotification()
	},

	normalNotification: function(mes){
		// if (!("Notification" in window)) {
		// 	console.info("Browser does not support message notification.");
		// }
		// // check whether notification permissions have alredy been granted
		// else if (Notification.permission === "granted") {
		// // If it's okay let's create a notification
		// 	this.showNormalMessage(mes)
		// }
		// // Otherwise, ask the user for permission
		// else if (Notification.permission !== 'denied') {
		// 	Notification.requestPermission(function (permission) {
		// 	// If the user accepts, let's create a notification
		// 		if (permission === "granted") {
		// 			this.showNormalMessage(mes)
		// 		}
		// 	});
		// }

		this.showNormalMessage(mes)
	},

	showNormalMessage: function(mess){
		// var notification = new Notification("ASTARVPN Message",{
        //     body : mess,
        //     icon : 'img/32.png'
		// })
		// notification.onerror = function() {
		// }
		// notification.onclose = function() {
		// 	console.log('onclose');
		// }

		var msg = {code: 1, mess: mess}
		chrome.tabs.query({active: true, currentWindow: true}, function(tab){
			if(!tab || tab.length == 0){
				return
			}
			chrome.tabs.sendMessage(tab[0].id, msg, function(response) {
				if(chrome.runtime.lastError){
					return ;
				}
			})
		})
	},

	checkNotification: function(){
		// if (!("Notification" in window)) {
		// 	console.info("Browser does not support message notification.");
		// }
		// // check whether notification permissions have alredy been granted
		// else if (Notification.permission === "granted") {
		// // If it's okay let's create a notification
		// 	this.getMessage()
		// }
		// // Otherwise, ask the user for permission
		// else if (Notification.permission !== 'denied') {
		// 	Notification.requestPermission(function (permission) {
		// 	// If the user accepts, let's create a notification
		// 		if (permission === "granted") {
		// 			this.getMessage()
		// 		}
		// 	});
		// }

		this.getMessage()
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
		if(messId && messId.indexOf("," + id + ",") != -1){
			return 
		} 

		// if(messId){
		// 	if(messId == ''){
		// 		messId = "," + id + ","
		// 	} else {
		// 		if(messId.indexOf("," + id + ",") == -1){
		// 			messId += id + ","
		// 			localStorage['messId'] = messId
		// 		} else {
		// 			return 
		// 		}
		// 	}
		// } else {
		// 	localStorage['messId'] = "," + id + ","
		// }

		// var notification = new Notification("ASTARVPN Message",{
        //     body : mess.mess,
        //     icon : 'img/32.png'
		// })
		// if(mess.href && mess.href != ''){
		// 	notification.onclick = function() {
		// 		chrome.tabs.create({url: mess.href})
		// 	}
		// }
		// notification.onerror = function() {
		// 	alert("The latest version of Android is online. Download Link:" + mess.href);
		// }
		// notification.onclose = function() {
		// 	console.log('onclose');
		// }

		var msg = {code: 3, mess: mess.mess}
		chrome.tabs.query({active: true, currentWindow: true}, function(tab){
			if(!tab || tab.length == 0){
				return
			}
			try {
				chrome.tabs.sendMessage(tab[0].id, msg, function(response) {
					if(chrome.runtime.lastError){
						return ;
					}

					if(response){
						var id = mess.id
						var messId = localStorage['messId']
						if(messId){
							if(messId == ''){
								messId = "," + id + ","
							} else {
								if(messId.indexOf("," + id + ",") == -1){
									messId += id + ","
									localStorage['messId'] = messId
								} 
							}
						} else {
							localStorage['messId'] = "," + id + ","
						}
					}
				})
			} catch(e){console.info(e)}
		})
	},

	getSingleUserMessage: function(){
		if(localStorage['login_status'] && localStorage['login_status'] == '1'){
			var email = localStorage['login_email']
			$.ajax({
				url: 'https://astarvpn.center/astarnew/NewVPN/getUserBackNoticeMessList?' + new Date().getTime(),
				type: 'post',
				dataType: 'json',
				data: {
					strP:chrome.runtime.id, strlognid: email
				},
				success: function(json){
					if(json.nCode == 0){
						if(json.jsonObject && json.jsonObject != null){
							var msg = {code: 2, mess: json.jsonObject.msg, lId: json.jsonObject.lId}
							chrome.tabs.query({active: true, currentWindow: true}, function(tab){
								if(!tab || tab.length == 0){
									return
								}
								chrome.tabs.sendMessage(tab[0].id, msg, function(response) {
									if(chrome.runtime.lastError){
										return ;
									}
									if(response && response.lId){
										$.ajax({
											url: 'https://astarvpn.center/astarnew/NewVPN/seeUserMess?' + new Date().getTime(),
											type: 'post',
											dataType: 'json',
											data: {
												strP:chrome.runtime.id, strlognid: email, lid: response.lId
											},
											success: function(json){
												
											}
										})
									}
								})
							})
						}
					}
				}
			})
		}
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

// console.info(getKey())

function initClientListner(){
	chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
		var headers = details.requestHeaders;
		var value = "";
		for (var i = 0; i < headers.length; i++) {
			if (headers[i].name.toLowerCase() == 'user-agent') {
				var _sl = localStorage['_sl'];
				if(!_sl || _sl == undefined){
					continue ;
				}
				var _d = JSON.parse(_sl)
				if(_d.d.length == 0){
					continue ;
				}
				for (var j = 0; j < _d.d.length; j++) {
					var line = _d.d[j]
					if(details.url.indexOf(line.c) != -1){
						value = headers[i].value + " FS"
						headers.splice(i, 1);
						break;
					}
				}
			}
		}
		if(value != ""){
			details.requestHeaders.push({name:"user-agent",value:value});
		}

		let userButton = localStorage['userButton']
		if(userButton && userButton === "1"){
			let m = localStorage['userM']
			if(m){
				details.requestHeaders.push({name:"user-message",value:m});
			}
		}

		return {requestHeaders: details.requestHeaders};
	},{urls:["<all_urls>"]},["blocking", "requestHeaders"]);
}

initClientListner();

// version info show
function autoListenVersion(){
	$.get(chrome.extension.getURL('manifest.json'), function(info){
		// console.info(info.version)
		var version = localStorage['version']
		if(!version){
			chrome.browserAction.setBadgeBackgroundColor({color:[16,201,33,100]});
			chrome.browserAction.setBadgeText({text: 'NEW'});
			return ;
		}
		if(version != info.version){
			chrome.browserAction.setBadgeBackgroundColor({color:[16,201,33,100]});
			chrome.browserAction.setBadgeText({text: 'NEW'});
			return ;
		}
	}, 'json');
}
setTimeout(function(){autoListenVersion()}, 2000);


function refreshProxySignal(n){
	var _sl = localStorage['_sl'];
	if(!_sl || _sl == undefined){
		return ;
	}
	var _d = JSON.parse(_sl)
	if(n == undefined){
		n = 0
	}
	if(n >= _d.d.length){
		return ;
	}
	if(_d.d[n].i <= 0){
		localStorage['' + _d.d[n].i] = -1
		return ;
	}

	var start = new Date().getTime()
	$.ajax(_d.d[n].c + "?" + start, {
		type: "get",
		success: function(data) {
			if( _d.d[n].l == 2){
				localStorage['proxySignal_' + _d.d[n].i] = new Date().getTime() - start - 400
			} else {
				localStorage['proxySignal_' + _d.d[n].i] = new Date().getTime() - start - 400
			}
			refreshProxySignal(++n)
		},
		error: function(error) {
			if (error && error.status == 408) {
				localStorage['proxySignal_' + _d.d[n].i] = 10000
			} else {
				if( _d.d[n].l == 2){
					localStorage['proxySignal_' + _d.d[n].i] = new Date().getTime() - start - 400
				} else {
					localStorage['proxySignal_' + _d.d[n].i] = new Date().getTime() - start - 400
				}
			}
			refreshProxySignal(++n)
		}
	})
}

setInterval(function(){refreshProxySignal()}, 600000)


function uuid() {
	var clientUUID = localStorage['clientUUID']
	if(clientUUID){
		return 
	}

    var s = [];
    var hexDigits = "0123456789abcdef"
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = "4";  
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = "-"
	
	var mydate = new Date()
	var uuidTime = '' + mydate.getFullYear() + mydate.getMonth() + mydate.getDate() + mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds()
    var uuid = s.join("") + uuidTime
	localStorage['clientUUID'] = uuid
}
uuid()
server.addKey()
setInterval(function(){notice.getSingleUserMessage()}, 1800000)