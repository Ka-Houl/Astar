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
				console.info(json)
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
    this.rechargeSubmit = function(num){
		if(localStorage['login_status'] && localStorage['login_status'] == '1'){
			var email = localStorage['login_email']
			var productPriceId = $("#product_price_id_" + num).val()

			$.ajax({
				url: 'https://astarvpn.center/astarnew/user/charge?' + new Date().getTime(),
				type: 'post',
				dataType: 'json',
				data: {
					strP:chrome.runtime.id, strlognid: email, productPriceId: productPriceId
				},
				success: function(json){
					if(json.nCode != 0){
						$("#load_div").hide()
						$("#NoPermissioniframe").attr("src", "");
						$('#NoPermissionModal').modal("hide");
						showMessage(json.strText)
						return ;
					}
					var url = json.strText
					$("#NoPermissioniframe").attr("src", url);
					$('#NoPermissionModal').modal("show");
					setTimeout(function(){
						$("#load_div").hide()
						$("#NoPermissioniframe").show()
					}, 4000)
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
		$("#load_div").show()
		astar.rechargeSubmit(1)
	})

	$("#product_price_button_2").bind("click", function(){
		$("#load_div").show()
		astar.rechargeSubmit(2)
	})

	$("#product_price_button_3").bind("click", function(){
		$("#load_div").show()
		astar.rechargeSubmit(3)
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
})