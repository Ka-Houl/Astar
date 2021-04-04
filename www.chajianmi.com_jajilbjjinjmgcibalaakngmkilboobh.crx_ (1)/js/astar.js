var submitPay = 0

function astarObject(){
	this.showProductPrice = function(){
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
				var productPriceList = json.jsonObject.productPriceList

				for(var i = 0;i < productPriceList.length;i++){
					var productPrice = productPriceList[i]
					$("#price_font_" + (i+1)).html('Billed $'+productPrice.price)
					$("#ori_price_font_" + (i+1)).html('$'+productPrice.oriPrice)
					$("#name_font_" + (i+1)).html(' ' +productPrice.name)
					$("#product_price_" + (i+1)).html("US$"+productPrice.price)
					$("#product_name_" + (i+1)).html(productPrice.name)
					$("#product_price_id_" + (i+1)).val(productPrice.productPriceId)
				}
			},
			error: function(){
				console.info("service net exception");
			}
		})
	},
	this.getPayType = function(num){
		if(localStorage['login_status'] && localStorage['login_status'] == '1'){
			var email = localStorage['login_email']

			$.ajax({
				url: 'https://astarvpn.center/astarnew/user/getPayType?' + new Date().getTime(),
				type: 'post',
				dataType: 'json',
				data: {
					strP:chrome.runtime.id, strlognid: email
				},
				success: function(json){
					submitPay = 0
					if(json.nCode != 0){
						showMessage(json.strText)
						return ;
					}
					
					var div_html = ""
					var payTypeList = json.jsonObject.payTypeList
					for(var i = 0;i < payTypeList.length;i++){
						var payType = payTypeList[i]
						var pmId = payType.pmId
						var pic = payType.pic
						var name = payType.name
						
						div_html += "<div id='" + pmId + "' style='cursor: pointer;  display: inline-block; margin-left: 20px; margin-top: 20px;padding: 5px;'>"
						if(pic == null || pic  == ''){
							div_html += "<span>" + name + "</span>"
						} else {
							div_html += "<img src='/img/" + pic + "'/>"
						}
						div_html += "</div>"
					}

					$("#Cashier_div").html(div_html)

					for(var i = 0;i < payTypeList.length;i++){
						var payType = payTypeList[i]
						var pmId = payType.pmId
						$("#" + pmId).unbind("click")
						$("#" + pmId).bind("click", function(){
							if(submitPay == 1){
								return ;
							}
							var pId = $(this).attr("id")
							submitPay = 1
							$("#load_div").show()
							astar.rechargeSubmit(num, pId)
						})
						
						$("#" + pmId).unbind("mouseover")
						$("#" + pmId).bind("mouseover", function(){
							$(this).addClass("block_div")
						})
						
						$("#" + pmId).unbind("mouseout")
						$("#" + pmId).bind("mouseout", function(){
							$(this).removeClass("block_div")
						})
					}

					$('#CashierModal').modal("show");
				},
				error: function(){
					console.info("service net exception");
				}
			})
		}
	},
    this.rechargeSubmit = function(num, pmId){
		if(localStorage['login_status'] && localStorage['login_status'] == '1'){
			var email = localStorage['login_email']
			var productPriceId = $("#product_price_id_" + num).val()
			console.info(pmId)

			$.ajax({
				url: 'https://astarvpn.center/astarnew/user/charge?' + new Date().getTime(),
				type: 'post',
				dataType: 'json',
				data: {
					strP:chrome.runtime.id, strlognid: email, productPriceId: productPriceId, pmId: pmId
				},
				success: function(json){
					submitPay = 0
					if(json.nCode != 0){
						$("#load_div").hide()
						$('#CashierModal').modal("hide");
						showMessage(json.strText)
						return ;
					}
					var url = json.strText
					chrome.tabs.create({url: url})
				},
				error: function(){
					console.info("service net exception");
				}
			})
		}
	}
}

var astar = new astarObject();
astar.showProductPrice()

function showMessage(mess){
	$("#message_dialog_div").html(mess)
	$("#dialog_button").hide()
	$("#myModal").modal("show")
}

$(function(){
	$("#product_price_button_1").bind("click", function(){
		// $("#load_div").show()
		astar.getPayType(1)
	})

	$("#product_price_button_2").bind("click", function(){
		// $("#load_div").show()
		astar.getPayType(2)
	})

	$("#product_price_button_3").bind("click", function(){
		// $("#load_div").show()
		astar.getPayType(3)
	})

	$("#closeButton").bind("click", function(){
		$("#NoPermissioniframe").attr("src", "");
		$('#NoPermissionModal').modal("hide");
	})

	$("#closeButtonX").bind("click", function(){
		$("#NoPermissioniframe").attr("src", "");
		$('#NoPermissionModal').modal("hide");
	})

	$("#account_foot").bind("click", function(){
		chrome.tabs.create({url: "account.html"})
	})

	$("#CashierCloseButton").bind("click", function(){
		$('#CashierModal').modal("hide");
	})

	$("#CashierCloseButtonX").bind("click", function(){
		$('#CashierModal').modal("hide");
	})
})