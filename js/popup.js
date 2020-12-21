
var winBackgroundPage = chrome.extension.getBackgroundPage();

function popupFun(){
	this.init=function(){
		var _sl = localStorage['_sl'];
		if(!_sl || _sl == undefined){
			return ;
		}
		var _i = localStorage['_i'];
		
		//chrome.storage.local.get(['_sl','_i','state'], function(result) {
		//	if(result._sl == undefined){
		//		return ;
		//	}
		//	var _d = result._sl;
			var _d = JSON.parse(_sl)
		
			$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>disconnect</font>");
			
			var _img = "";
			var _f = "";
			if(_i == undefined){
				for(var i = 0;i < _d.d.length;i++){
					if(i == 0){
						_f += '<img class="x-select-icon" src="/img/flags/'+_d.d[i].p+'">';
						_f += '<label style="display: none;" id="select_now">'+_d.d[i].i+'</label>';
						_f += '<div class="x-select-title">'+_d.d[i].n+'</div>  ';
						var _l = '';
						if(_d.d[i].l == 2){
							_l = '<div class="x-select-badge">Premium</div>';
						}
						_f += _l;
						_f += '<div class="x-select-arrow"></div>';
						
						_img = _d.d[i].p;
					}
				}
			} else {
				var _flag = true;
				for(var i = 0;i < _d.d.length;i++){
					if(_d.d[i].i == _i){
						_flag = false;
					}
				}
				
				for(var i = 0;i < _d.d.length;i++){
					if(_flag){
						if(i == 0){
							_f += '<img class="x-select-icon" src="/img/flags/'+_d.d[i].p+'">';
							_f += '<label style="display: none;" id="select_now">'+_d.d[i].i+'</label>';
							_f += '<div class="x-select-title">'+_d.d[i].n+'</div>  ';
							var _l = '';
							if(_d.d[i].l == 2){
								_l = '<div class="x-select-badge">Premium</div>';
							}
							_f += _l;
							_f += '<div class="x-select-arrow"></div>';
							
							_img = _d.d[i].p;
						}
					} else {
						if(_d.d[i].i == _i){
							_f += '<img class="x-select-icon" src="/img/flags/'+_d.d[i].p+'">';
							_f += '<label style="display: none;" id="select_now">'+_d.d[i].i+'</label>';
							_f += '<div class="x-select-title">'+_d.d[i].n+'</div>  ';
							var _l = '';
							if(_d.d[i].l == 2){
								_l = '<div class="x-select-badge">Premium</div>';
							}
							_f += _l;
							_f += '<div class="x-select-arrow"></div>';
							
							_img = _d.d[i].p;
						}
					}
				}
			}
			$(".x-select-view").html(_f);
			
			// $(".x-select-arrow").bind("click", function(){
			// $("#x-select-view-div").bind("click", function(){
			// 	console.info("show vpn data")
			// 	var _dispaly = $(".x-select-dropdown").css("display");
			// 	if(_dispaly == 'none'){
			// 		$(".x-select-dropdown").css("display", "block");
			// 	} else {
			// 		$(".x-select-dropdown").css("display", "none");
			// 	}
			// });
			
			var _s = "";
			for(var i = 0;i < _d.d.length;i++){
				var __s = '<div class="x-select-item" value="'+_d.d[i].i+'">';
					__s += '<img class="x-select-icon" src="/img/flags/'+_d.d[i].p+'">';
					__s += '<div class="x-select-title">'+_d.d[i].n+'</div>';
					var _l = "";
					if(_d.d[i].l == 2){
						_l = '<div class="x-select-badge">Premium</div>';
					}
					__s += _l;
					__s += '</div>';
				_s += __s;
			}
			$(".x-select-dropdown").html(_s);
			
			$(".x-select-item").bind("click", function(){
				var _i = $(this).attr("value");
				if(Number.parseInt(_i) < 0){
					var login_status = localStorage['login_status'] 
					var nCurrValidTime = localStorage['nCurrValidTime'] 
					if(login_status && login_status == '1'){
						if(!nCurrValidTime || nCurrValidTime == '0'){
							$("#message_dialog_div").html("Please recharge first")
							$("#dialog_button").show()
							$("#dialog_button").one("click", function(){
								$("#setting-panel").css({"width":"100%"});
								$("#setting-header").css({"display":"block"});
								$("#setting-body").css({"display":"block"});
								$("#myModal").modal("hide")
								$("#open-settings").hide()
								$("#close-settings").show()
							})
							$("#myModal").modal("show")
							return ;
						} else {
							popup.init();
							$("#message_dialog_div").html("Proxy information is automatically refreshed, please try again")
							$("#dialog_button").hide()
							$("#myModal").modal("show")
							return ;
						}
					} else {
						$("#message_dialog_div").html("Please login first")
						$("#dialog_button").show()
						$("#dialog_button").one("click", function(){
							$("#setting-panel").css({"width":"100%"});
							$("#setting-header").css({"display":"block"});
							$("#setting-body").css({"display":"block"});
							$("#myModal").modal("hide")
							$("#open-settings").hide()
							$("#login_img").attr("src", "https://astarvpn.center/astarnew/user/code?" + new Date().getTime())
							$("#close-settings").show()
						})
						$("#myModal").modal("show")
						return ;
					}
				}
				popup.showSelected(_i);
			});
			
			var state = localStorage['state'];
			if(state == undefined || state == 0){
				return ;
			}
			
			if(state == 1){
				$("body").addClass("on");
				$('#vpn-on').attr("checked", true);
				$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>connect</font>");
			}
		//});
	},
	this.showSelected=function(_i){
		//chrome.storage.local.get(['_sl'], function(result) {
		//	if(result._sl == undefined){
		//		return ;
		//	}
			
		//	var _d = result._sl;
		var _sl = localStorage['_sl'];
		if(_sl == undefined){
			return ;
		}
			var _d = JSON.parse(_sl)
			//$(".ip").html("connect");
			
			$(".x-select-dropdown").css("display", "none");
			
			var _f = "";
			for(var i = 0;i < _d.d.length;i++){
				if(_d.d[i].i == _i){
					_f += '<img class="x-select-icon" src="/img/flags/'+_d.d[i].p+'">';
					_f += '<label style="display: none;" id="select_now">'+_d.d[i].i+'</label>';
					_f += '<div class="x-select-title">'+_d.d[i].n+'</div>  ';
					var _l = '';
					if(_d.d[i].l == 2){
						_l = '<div class="x-select-badge">Premium</div>';
					}
					_f += _l;
					_f += '<div class="x-select-arrow"></div>';
				}
			}
			$(".x-select-view").html(_f);
			
			// $("#x-select-view-div").bind("click", function(){
			// 	var _dispaly = $(".x-select-dropdown").css("display");
			// 	if(_dispaly == 'none'){
			// 		$(".x-select-dropdown").css("display", "block");
			// 	} else {
			// 		$(".x-select-dropdown").css("display", "none");
			// 	}
			// });
			
			var state = localStorage['state'];
			
			//chrome.storage.local.get(['state'], function(result) {
				if(state == undefined){
					return ;
				}
				if(state == 1){
					$("body").addClass("loading");
					$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>connecting</font>");
					//chrome.storage.local.set({"_i":_i},function(){});
					localStorage['_i'] = _i
					//chrome.runtime.sendMessage(chrome.runtime.id,{'n':202}, function(response){});
					winBackgroundPage.server.popupEvent(202);
				}
				if(state == 0){
					$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>disconnecting</font>");
					//chrome.storage.local.set({"_i":_i},function(){});
					localStorage['_i'] = _i
					//chrome.runtime.sendMessage(chrome.runtime.id,{'n':202}, function(response){});
					winBackgroundPage.server.popupEvent(202);
				}
			//});
		//});
	},
    this.listenerSt = function(){
        
    },
    this.listenerBg = function(){
		chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
			if(message.n == 1){
				$("body").removeClass("loading");
				$("body").addClass("on");
				$('#vpn-on').attr("checked", true);
				popup.init();
			}
			if(message.n == 0){
				$("body").removeClass("on");
				$("body").removeClass("loading");
				$('#vpn-on').attr("checked", false);
				popup.init();
			}
			if(message.n == 2){
				popup.init();
			}
			if(message.n == 4){
				$("body").removeClass("on");
				popup.init();
			}
			
			sendResponse({caback: "ok"});
		});
	},
	this.backgroundEvent = function(message){
		if(message.n == 1){
			$("body").removeClass("loading");
			$("body").addClass("on");
			$('#vpn-on').attr("checked", true);
			popup.init();
		}
		if(message.n == 0){
			$("body").removeClass("on");
			$("body").removeClass("loading");
			$('#vpn-on').attr("checked", false);
			popup.init();
		}
		if(message.n == 2){
			popup.init();
		}
		if(message.n == 4){
			$("body").removeClass("on");
			popup.init();
		}
	},
	this.change = function(){
		if($('#vpn-on').is(':checked')){
			var _title = $("#select_now").html();
			if(_title < 0){
				localStorage['_click'] = '1';
				$('#vpn-on').attr('checked', false)
				var login_status = localStorage['login_status'] 
				var nCurrValidTime = localStorage['nCurrValidTime'] 
				if(login_status && login_status == 1){
					if(!nCurrValidTime || nCurrValidTime == '0'){
						$("#message_dialog_div").html("Please recharge first")
						$("#dialog_button").show()
						$("#dialog_button").one("click", function(){
							$("#setting-panel").css({"width":"100%"});
							$("#setting-header").css({"display":"block"});
							$("#setting-body").css({"display":"block"});
							$("#open-settings").hide()
							$("#close-settings").show()
							$("#myModal").modal("hide")
						})
						$("#myModal").modal("show")
						return ;
					}
				} else {
					$("#message_dialog_div").html("Please login first")
					$("#dialog_button").show()
					$("#dialog_button").one("click", function(){
						$("#setting-panel").css({"width":"100%"});
						$("#setting-header").css({"display":"block"});
						$("#setting-body").css({"display":"block"});
						$("#open-settings").hide()
						$("#close-settings").show()
						$("#login_img").attr("src", "https://astarvpn.center/astarnew/user/code?" + new Date().getTime())
						$("#myModal").modal("hide")
					})
					$("#myModal").modal("show")
					return ;
				}
			}
			
			localStorage['_i'] = _title
			$("body").addClass("loading");
			$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>connecting</font>");
			//chrome.storage.local.set({"_i":_title},function(){});
			//chrome.runtime.sendMessage(chrome.runtime.id,{'n':200}, function(response){}); <span>IP </span> ...
			winBackgroundPage.server.popupEvent(200);
		} else {
			$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>disconnecting</font>");
			//chrome.runtime.sendMessage(chrome.runtime.id,{'n':404}, function(response){});
			winBackgroundPage.server.popupEvent(404);
		}
	},
	this.getProduct = function(){
		if(localStorage['login_status'] && localStorage['login_status'] == '1'){
			var email = localStorage['login_email']

			$.ajax({
				url: 'https://astarvpn.center/astarnew/user/getProduct?' + new Date().getTime(),
				type: 'post',
				dataType: 'json',
				data: {
					strP:chrome.runtime.id
				},
				success: function(json){
					if(json.nCode != 0){
						showMessage(json.strText)
						return ;
					}
					console.info(json)
					var productList = json.jsonObject.productList
					var _html = '<table style="width: 100%;"><tr>'
					for(var i = 0;i < productList.length;i++){
						var product = productList[i]
						
						_html += '<td align="center" valign="middle" style="padding: 2px 2px 2px 2px;">'
						_html += '<div '
						_html += 'id="' + product.productId + '"'
						_html += 'name="payTypeDiv" style="width: 120px; height: 80px; cursor: pointer; border-radius: 10px;-moz-border-radius: 10px;-webkit-border-radius: 10px;-o-border-radius: 10px;'
						if(i == 0){
							_html += 'border: 1px solid #000000;'
							localStorage['productId'] = product.productId
						}
						_html += '"><figure class="figure">'
						_html += '<img src="/img/'+ product.pic +'" class="figure-img img-fluid rounded" style="width: 109px; height: 45px;" alt="">'
						_html += '<figcaption class="figure-caption">'+ product.name +'</figcaption>'
						_html += '</figure><div></td>'
						if((i + 1) % 2 == 0){
							_html += '</tr><tr>'
						}
					}
					_html += '</tr></table>'
					$("#login_div").hide()
					$("#recharge_div").html(_html)
					$("#recharge_div").show()
					
					$("[name='payTypeDiv']").click(function(){
						$("[name='payTypeDiv']").css("border", "1px solid #FFFFFF")
						$(this).css("border", "1px solid #000000")
						localStorage['productId'] = $(this).attr("id")
					})
				},
				error: function(){
					console.info("service net exception");
				}
			})
		}
	},
	this.getProductPrice = function(){
		if(localStorage['login_status'] && localStorage['login_status'] == '1'){
			var email = localStorage['login_email']

			$.ajax({
				url: 'https://astarvpn.center/astarnew/user/getProductPrice?' + new Date().getTime(),
				type: 'post',
				dataType: 'json',
				data: {
					strP:chrome.runtime.id
				},
				success: function(json){
					if(json.nCode != 0){
						showMessage(json.strText)
						return ;
					}
					console.info(json)
					var productPriceList = json.jsonObject.productPriceList
					var _html = '<form>'
					for(var i = 0;i < productPriceList.length;i++){
						var productPrice = productPriceList[i]
						
						_html += '<div class="radio" style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">'
						_html += '<label style="cursor: pointer;"><input type="radio" name="optradio"'
						_html += ' id="' + productPrice.productPriceId + '"'
						if(i == 0){
							_html += ' checked'
						}
						_html += '>'	
						_html += productPrice.name + ' <span style="text-decoration:line-through; color: #F00">US $' + productPrice.oriPrice + '</span> <span style="color: #0000FF">US $' + productPrice.price
						_html += '</span></label>'
						_html += '</div>'
					}
					_html += '</form>'
					
					_html += '<div style="margin-top: 15px;">'
					_html += '<button type="button" class="btn btn-outline-success btn-lg btn-block" id="paySubmit">pay</button>'
					// _html += '<button type="button" class="btn btn-secondary" id="cancelSubmit">cancel</button>'
					_html += '</div>'

					// console.info(_html)
					$("#login_div").hide()
					$("#price_div").html(_html)
					$("#price_div").show()

					$("#paySubmit").click(function(){
						popup.rechargeSubmit()
					});
					
					// $("#cancelSubmit").click(function(){
					// 	$("#price_div").hide()
					// 	$("#recharge_div").hide()
					// 	$("#login_div").show()
					// });
				},
				error: function(){
					console.info("service net exception");
				}
			})
		}
	},
	this.rechargeSubmit = function(){
		if(localStorage['login_status'] && localStorage['login_status'] == '1'){
			var email = localStorage['login_email']
			var productPriceId = $("[name='optradio']:checked").attr("id")

			$.ajax({
				url: 'https://astarvpn.center/astarnew/user/charge?' + new Date().getTime(),
				type: 'post',
				dataType: 'json',
				data: {
					strP:chrome.runtime.id, strlognid: email, productPriceId: productPriceId
				},
				success: function(json){
					if(json.nCode != 0){
						showMessage(json.strText)
						return ;
					}
					var url = json.strText
					window.open(url,"about")
				},
				error: function(){
					console.info("service net exception");
				}
			})
		}
	},
	this.signOut = function(){
		localStorage['login_status'] = '0'
		localStorage['login_email'] = ''
		$(".ip").html("<font style='font-family: verdana, sans-serif;font-size: 30px;font-weight: bold;'>disconnecting</font>");
		winBackgroundPage.server.popupEvent(404);
		$("#login_img").attr("src", "https://astarvpn.center/astarnew/user/code?" + new Date().getTime())
	},
	this.forgetPassword = function(){
		$("#load_div").show()
		var strlognid = $("#email").val()
		if(strlognid == ""){
			$("#load_div").hide()
			showMessage("email must exist!")
			return ;
		}
		if(!validateEmail(strlognid)){
			$("#load_div").hide()
			showMessage("email format error!")
			return ;
		}

		$.ajax({
			url: 'https://astarvpn.center/astarnew/user/getBackPass?' + new Date().getTime(),
			type: 'post',
			dataType: 'json',
			data: {
				strP:chrome.runtime.id, strlognid: strlognid
			},
			success: function(json){
				$("#load_div").hide()
				if(json.nCode != 0){
					showMessage(json.strText)
					return ;
				}
				showMessage("email send success!")
			},
			error: function(){
				$("#load_div").hide()
				console.info("service net exception");
			}
		})
	},
	this.showMess = function(mess){
		
	}
	/*,
	this.showIP = function(){
		chrome.storage.local.get(['_sl'], function(result) {
			if(result._sl == undefined){
				return ;
			}
			var _d = result._sl;
			//$(".ip").html("disconnect");
		});
	}*/
	// ,
	// this.showWebRtc = function(state){
	// 	var webRtcState = localStorage['webRtcState']
	// 	if(state){
	// 		webRtcState = state
	// 	}
	// 	if(webRtcState == '1'){
	// 		$("#startWebRtc").css({"display":"block"});
	// 		$("#stopWebRtc").css({"display":"none"});
	// 	} else {
	// 		$("#startWebRtc").css({"display":"none"});
	// 		$("#stopWebRtc").css({"display":"block"});
	// 	}
	// }
}

function validateEmail(email){
	var reg=/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;

	if( !reg.test( email ) ) 
		return false
	else 
		return true
}

function showMessage(mess){
	$("#message_dialog_div").html(mess)
	$("#dialog_button").hide()
	$("#myModal").modal("show")
}

var popup = new popupFun();
popup.init();
popup.listenerSt();

$(function(){
	localStorage['_click'] = '1';

	if(localStorage['login_status'] && localStorage['login_status'] == '1'){
		var email = localStorage['login_email']

		$.ajax({
            url: 'https://astarvpn.center/astarnew/user/userInfo?' + new Date().getTime(),
            type: 'post',
            dataType: 'json',
            data: {
                strP:chrome.runtime.id, strlognid: email
            },
            success: function(json){
				if(json.nCode != 0){
					showMessage(json.strText)
					return ;
				}
				var data = json.jsonObject
				$("#strLognId").html(data.email)
				if(data.nCurrValidTime == "0"){
					$("#nCurrValidTime").html(data.nCurrValidTime + " second")
				} else {
					$("#nCurrValidTime").html(data.nCurrValidTime)
				}
				localStorage['nCurrValidTime'] = data.nCurrValidTime;

				$("#loginForm").hide()
				$("#login_div").hide()
				$("#userData").show()
				$("#login_out_div").show()
				if(data.nCurrValidTime != '0'){
					$(".x-select-item").each(function(){
						// console.info($(this).attr("value"))
						var _value = $(this).attr("value")
						if(Number.parseInt(_value) < 0){
							winBackgroundPage.server.popupEvent(200);
							return ;
						}
					})
					$("#vip_img").show()
				} else {
					winBackgroundPage.server.popupEvent(404);
					$("#vip_img").hide()
				}
            },
            error: function(){
				console.info("service net exception");
				winBackgroundPage.server.popupEvent(404);
            }
        })


	}
	
	$('#vpn-on').bind("click", function(){
		//chrome.storage.local.get(['_click'], function(result) {
			var _click = localStorage['_click']
			console.info(_click)
			if(_click == 0){
				return ;
			}
			//chrome.storage.local.set({"_click":0},function(){});
			localStorage['_click'] = '0';
			popup.change();
		//});
	});
	
	$("#x-select-view-div").bind("click", function(){
		var _dispaly = $(".x-select-dropdown").css("display");
		if(_dispaly == 'none'){
			$(".x-select-dropdown").css("display", "block");
		} else {
			$(".x-select-dropdown").css("display", "none");
		}
	});

	$("#open-settings").bind("click", function(){
		$("#setting-panel").css({"width":"100%"});
		$("#setting-header").css({"display":"block"});
		$("#setting-body").css({"display":"block"});
		$("#open-settings").hide()
		$("#close-settings").show()
		$("#login_img").attr("src", "https://astarvpn.center/astarnew/user/code?" + new Date().getTime())
	});
	
	$("#close-settings").bind("click", function(){
		$("#setting-header").css({"display":"none"});
		$("#setting-body").css({"display":"none"});
		$("#setting-panel").css({"width":"0px"});
		$("#close-settings").hide()
		$("#open-settings").show()
	});
	
	$(".wechat").hover(function(){
		$(".wechatshare").css({"display":"block"});
	},function(){
		$(".wechatshare").css({"display":"none"});
	});
	
	// $("#stopWebRtc").bind("click", function(){
	// 	chrome.permissions.request({
	// 		permissions: ['privacy'],
	// 	}, (granted) => {
	// 		console.info(granted)
	// 		if (granted) {
	// 			winBackgroundPage.stopWebRtc()
	// 			popup.showWebRtc('1')
	// 			localStorage['webRtcState'] = '1';
	// 		} else {
	// 			popup.showWebRtc('2')
	// 			localStorage['webRtcState'] = '2';
	// 		}
	// 	})
	// });
	
	// $("#startWebRtc").bind("click", function(){
	// 	winBackgroundPage.startWebRtc()
	// 	chrome.permissions.remove({
	// 		permissions: ['privacy'],
	// 	}, (granted) => {
	// 		console.info(granted)
	// 		if (granted) {
	// 			popup.showWebRtc('2')
	// 			localStorage['webRtcState'] = '2';
	// 		} else {
	// 			popup.showWebRtc('1')
	// 			localStorage['webRtcState'] = '1';
	// 		}
	// 	})
	// });
	
	$("[name='five_astar']").bind("click", function(){
		var userAgent = window.navigator.userAgent;
		var t = "";
		if(userAgent.indexOf('Chrome') != -1){
			t = "https://chrome.google.com/webstore/detail/jajilbjjinjmgcibalaakngmkilboobh/reviews?utm_source=chrome-ntp-icon";
		} else {
			t = "https://addons.mozilla.org/zh-CN/firefox/addon/jajilbjjinjmgcibalaakngmkilboobh/";
		}
		
		window.open(t,"about")
	});
	
	$("[name='share_img']").bind("click", function(){
		var  t = 'https://chrome.google.com/webstore/detail/jajilbjjinjmgcibalaakngmkilboobh';
		var i = 'Astar VPN';
		var n = 'Astar VPN - Free and fast VPN for everyone. Easily watch 720P, 1080P, 1440P, 4K, 8K videos on YouTube.';
		var toPage = $(this).attr("id");
		
		if(toPage == 'facebook'){
			window.open("https://www.facebook.com/sharer/sharer.php?u="+t,"facebook")
		} else if(toPage == 'twitter'){
			window.open("https://twitter.com/intent/tweet?text="+i+": "+n+"&url="+t,"twitter")
		} else if(toPage == 'weibo'){
			window.open("http://service.weibo.com/share/share.php?title="+i+": "+n+"&url="+t+"&pic=","weibo")
		} else if(toPage == 'google'){
			window.open("https://plus.google.com/share?url="+t,"google")
		} else if(toPage == 'qzone'){
			window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+t+"&title="+i+": "+n+"&desc="+i+": "+n+"&summary="+i+": "+n+"&site="+i+": "+n,"qzone")
		}
		});
	
	$("#androidDownload").bind("click", function(){
		$("#hide_div").css({"display": "block"})
		$("#androidDownload").css({"display": "none"})
	})

	$("#hideAndroidDownload").bind("click", function(){
		$("#hide_div").css({"display": "none"})
		$("#androidDownload").css({"display": "block"})
	})

	$("#goHref").bind("click", function(){
		chrome.tabs.create({url: "https://get.astarvpn.app/"})
	})


	$("#goRegister").bind("click", function(){
		$("#loginForm").hide()
		$("#registerForm").show()
		$("#register_img").attr("src", "https://astarvpn.center/astarnew/user/code?" + new Date().getTime())
	})

	$("#goLogin").bind("click", function(){
		$("#registerForm").hide()
		$("#loginForm").show()
		$("#login_img").attr("src", "https://astarvpn.center/astarnew/user/code?" + new Date().getTime())
	})

	$("#login_img").bind("click", function(){
		$("#login_img").attr("src", "https://astarvpn.center/astarnew/user/code?" + new Date().getTime())
	})

	$("#register_img").bind("click", function(){
		$("#register_img").attr("src", "https://astarvpn.center/astarnew/user/code?" + new Date().getTime())
	})

	$("#loginSubmit").bind("click", function(){
		$("#load_div").show()
		var strlognid = $("#email").val()
		var strpassword = $("#pwd").val()
		var codeV = $("#code").val()
		if(strlognid == ""){
			$("#load_div").hide()
			showMessage("email must exist!")
			return ;
		}
		if(!validateEmail(strlognid)){
			$("#load_div").hide()
			showMessage("email format error!")
			return ;
		}
		if(strpassword == ""){
			$("#load_div").hide()
			showMessage("password must exist!")
			return ;
		}
		if(codeV == ""){
			$("#load_div").hide()
			showMessage("code must exist!")
			return ;
		}

		$.ajax({
            url: 'https://astarvpn.center/astarnew/user/loginCode?' + new Date().getTime(),
            type: 'post',
            dataType: 'json',
            data: {
                strP:chrome.runtime.id, strlognid: strlognid, strvcode: codeV
            },
            success: function(json){
				if(json.nCode != 0){
					$("#load_div").hide()
					localStorage['login_status'] = '0';
					localStorage['login_email'] = ''
					showMessage(json.strText)
					return ;
				}
				var jsonObject = json.jsonObject
				var strPassToken = jsonObject.strPassToken
				var strSalt = jsonObject.strSalt
				var data1 = hex_md5(hex_md5(strpassword) + strSalt)
				var strrandompasscode = hex_md5(data1 + strPassToken)

				$.ajax({
					url: 'https://astarvpn.center/astarnew/user/login?' + new Date().getTime(),
					type: 'post',
					dataType: 'json',
					data: {
						strP:chrome.runtime.id, strlognid: strlognid, strrandompasscode: strPassToken, strpasstoken: strrandompasscode, strvcode: codeV
					},
					success: function(json){
						$("#load_div").hide()
						if(json.nCode != 0){
							localStorage['login_status'] = '0';
							localStorage['login_email'] = ''
							showMessage(json.strText)
							return ;
						}
						localStorage['login_status'] = '1';
						localStorage['login_email'] = strlognid;
						$("#login_div").hide()
						$("#loginForm").hide()
						$("#userData").show()
						$("#login_out_div").show()

						// popup.getProductPrice()
						
						$("#email").val("")
						$("#pwd").val("")
						$("#code").val("")

						var data = json.jsonObject
						$("#strLognId").html(data.email)
						if(data.nCurrValidTime == "0"){
							$("#nCurrValidTime").html(data.nCurrValidTime + " second")
						} else {
							$("#nCurrValidTime").html(data.nCurrValidTime)
						}
						localStorage['nCurrValidTime'] = data.nCurrValidTime;
						
						// NEW
						// if(data.nCurrValidTime != '0'){
						// 	chrome.tabs.create({url: "astar.html"})
						// } else {
						// 	$("#vip_img").show()
						// }
					},
					error: function(){
						$("#load_div").hide()
						console.info("service net exception");
					}
				})
            },
            error: function(){
				$("#load_div").hide()
				console.info("service net exception");
            }
        })

	})

	$("#registerSubmit").bind("click", function(){
		$("#load_div").show()
		var strlognid = $("#email_register").val()
		var strpassword = $("#pwd_register").val()
		var strpassword2 = $("#pwd2_register").val()
		var codeV = $("#code_register").val()
		if(strlognid == ""){
			$("#load_div").hide()
			showMessage("email must exist!")
			return ;
		}
		if(!validateEmail(strlognid)){
			$("#load_div").hide()
			showMessage("email format error!")
			return ;
		}
		if(strpassword == ""){
			$("#load_div").hide()
			showMessage("password must exist!")
			return ;
		}
		if(strpassword != strpassword2){
			$("#load_div").hide()
			showMessage("two password is not same!")
			return ;
		}
		if(codeV == ""){
			$("#load_div").hide()
			showMessage("code must exist!")
			return ;
		}

		$.ajax({
            url: 'https://astarvpn.center/astarnew/user/register?' + new Date().getTime(),
            type: 'post',
            dataType: 'json',
            data: {
                strP:chrome.runtime.id, strlognid: strlognid, strpassword: strpassword, strvcode: codeV
            },
            success: function(json){
				$("#load_div").hide()
				if(json.nCode != 0){
					showMessage(json.strText)
					return ;
				}

				$("#email_register").val("")
				$("#pwd_register").val("")
				$("#pwd2_register").val("")
				$("#code_register").val("")

				$("#registerForm").hide()
				$("#loginForm").show()

            },
            error: function(){
				$("#load_div").hide()
				console.info("service net exception");
            }
        })

	})

	$("#rechargeSubmit").bind("click", function(){
		chrome.tabs.create({url: "astar.html"})
	})

	$("#strLognId").bind("click", function(){
		chrome.tabs.create({url: "account.html"})
	})

	$("#signOut").bind("click", function(){
		popup.signOut()
		$("#userData").hide()
		$("#signOut").hide()
		$("#loginForm").show()
		// $("#price_div").hide()
		$("#login_div").show()
	})

	$("#forgot-link").bind("click", function(){
		if(confirm("Are you sure you want to retrieve the password?")){
			popup.forgetPassword()
		}
	})

	$("#signup-tab").bind("click", function(){
		$("#signin-tab").removeClass("active")
		$("#loginForm").hide()
		$("#signup-tab").addClass("active")
		$("#registerForm").show()
		$("#register_img").attr("src", "https://astarvpn.center/astarnew/user/code?" + new Date().getTime())
	})

	$("#signin-tab").bind("click", function(){
		$("#signup-tab").removeClass("active")
		$("#registerForm").hide()
		$("#signin-tab").addClass("active")
		$("#loginForm").show()
		$("#login_img").attr("src", "https://astarvpn.center/astarnew/user/code?" + new Date().getTime())
	})

	$("#changePasswordLi").bind("click", function(){
		$("#change-password-old").val("")
		$("#change-password").val("")
		$("#change-password-confirmation").val("")
		$("#changePassword").css("top", "0px")
	})

	$("#back_btn").bind("click", function(){
		$("#changePassword").css("top", "100%")
		$("#changePasswordSubmit").removeClass("active")
	})

	$("#changePasswordSubmit").bind("click", function(){
		$("#load_div").show()
		var oldPassword = $("#change-password-old").val()
		var newPassword = $("#change-password").val()
		var newPasswordConfirmation = $("#change-password-confirmation").val()
		if(oldPassword == ''){
			$("#load_div").hide()
			showMessage('old password must exist')
			return ;
		}
		if(newPassword == ''){
			$("#load_div").hide()
			showMessage('new password must exist')
			return ;
		}
		if(newPassword != newPasswordConfirmation){
			$("#load_div").hide()
			showMessage('new password confirmation is error')
			return ;
		}
		var email = localStorage['login_email']
		$("#changePasswordSubmit").addClass("active")
		$.ajax({
			url: 'https://astarvpn.center/astarnew/user/changePassword?' + new Date().getTime(),
			type: 'post',
			dataType: 'json',
			data: {
				strP:chrome.runtime.id, strlognid: email, oldPassword: oldPassword, newPassword: newPassword
			},
			success: function(json){
				$("#load_div").hide()
				if(json.nCode != 0){
					showMessage(json.strText)
					return ;
				}
				showMessage("change password is success!")
				$("#changePassword").css("top", "100%")
				$("#changePasswordSubmit").removeClass("active")
			},
			error: function(){
				$("#load_div").hide()
				console.info("service net exception");
			}
		})
	})
})

