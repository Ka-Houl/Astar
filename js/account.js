function accountObject(){
	this.showMessage = function(){
        $.ajax({
			url: 'https://astarvpn.center/astarnew/NewVPN/getNoticeMessList?' + new Date().getTime(),
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
                let list = json.jsonObject.list
                if(!list || list.length == 0){
                    return 
                }

                var tr = ""
                for(let i = 0;i < list.length;i++){
                    let list_data = list[i]
                    tr += "<tr>"
                    tr += "<td>" + list_data.strMessage + "</td>"
                    tr += "<td>" + list_data.dtValidTime + "</td>"
                    tr += "</tr>"
                }
                $("#message_table").html(tr)

                $("#notice_number").html(list.length)
			},
			error: function(){
				console.info("service net exception");
			}
		})    
    }
}

var account = new accountObject();

function showMessage(mess){
	$("#message_dialog_div").html(mess)
	$("#dialog_button").hide()
	$("#myModal").modal("show")
}

$(function(){
    let login_status= localStorage['login_status']
    if(!login_status || login_status == '0'){
        showMessage("Please log in again")
        return 
    }
    let login_email = localStorage['login_email']
    let nCurrValidTime = localStorage['nCurrValidTime']
    $("#emailAccount").html(login_email)
	$("#email").val(login_email)
	if(nCurrValidTime == "0"){
		$("#time").val(nCurrValidTime + " second")
	} else {
		$("#time").val(nCurrValidTime)
	}
	
	if(nCurrValidTime != '0'){
		$("#vip_img_user").show()
	}

    account.showMessage()

    $("#RechargeSubmit").bind("click", function(){
		chrome.tabs.create({url: "astar.html"})
    })
    
    $("#recharge-href").bind("click", function(){
		chrome.tabs.create({url: "astar.html"})
    })
    
    $("#Recharge_foot").bind("click", function(){
		chrome.tabs.create({url: "astar.html"})
    })
    
    $("#account-href").bind("click", function(){
        $("[name='tab_href']").removeClass("kt-widget__item--active")
        $("[name='message_div']").hide()
        $("#account-href").addClass("kt-widget__item--active")
        $("#accountInfo").show()
    })

    $("#password-href").bind("click", function(){
        $("#change-password-old").val("")
        $("#change-password").val("")
        $("#change-password-confirmation").val("")

        $("[name='tab_href']").removeClass("kt-widget__item--active")
        $("[name='message_div']").hide()
        $("#password-href").addClass("kt-widget__item--active")
        $("#changePasswordDiv").show()
    })

    $("#rechargeRecord-href").bind("click", function(){
        $("[name='tab_href']").removeClass("kt-widget__item--active")
        $("[name='message_div']").hide()
        $("#rechargeRecord-href").addClass("kt-widget__item--active")
        $("#rechargeRecordDiv").show()

        var email = localStorage['login_email']
		$.ajax({
			url: 'https://astarvpn.center/astarnew/user/rechargeRecord?' + new Date().getTime(),
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
                let list = json.jsonObject.list
                if(!list || list.length == 0){
                    return 
                }

                var tr = ""
                for(let i = 0;i < list.length;i++){
                    let list_data = list[i]
                    tr += "<tr>"
                    tr += "<td>" + list_data.strsn + "</td>"
                    tr += "<td>$" + list_data.lamount + "</td>"
                    tr += "<td>" + list_data.dtcreatetime + "</td>"
                    tr += "</tr>"
                }
                $("#record_table").html(tr)
			},
			error: function(){
				console.info("service net exception");
			}
		})    

    })


    $("#messageNotification-href").bind("click", function(){
        $("[name='tab_href']").removeClass("kt-widget__item--active")
        $("[name='message_div']").hide()
        $("#messageNotification-href").addClass("kt-widget__item--active")
        $("#messageNotificationDiv").show()
    })

    $("#informationFeedback-href").bind("click", function(){
        $("#informationFeedbackData").val("")
        $("[name='tab_href']").removeClass("kt-widget__item--active")
        $("[name='message_div']").hide()
        $("#informationFeedback-href").addClass("kt-widget__item--active")
        $("#informationFeedbackDiv").show()
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
                
                $("#password-href").removeClass("kt-widget__item--active")
                $("#changePasswordDiv").hide()
                $("#account-href").addClass("kt-widget__item--active")
                $("#accountInfo").show()
			},
			error: function(){
				$("#load_div").hide()
				console.info("service net exception");
			}
		})
    })
    
    $("#informationFeedbackSubmit").bind("click", function(){
		$("#load_div").show()
		var informationFeedbackData = $("#informationFeedbackData").val()
		if(informationFeedbackData == ''){
			$("#load_div").hide()
			showMessage('Feedback Data must exist')
			return ;
		}
		
		var time = new Date()
		var temp_time = time.getTime()
		var feedback_time = localStorage['feedback_time']
		if(feedback_time && temp_time < Number.parseInt(feedback_time)){
			$("#load_div").hide()
			showMessage('Send frequently, please try again later')
			return ;
		}


		var email = localStorage['login_email']
		$.ajax({
			url: 'https://astarvpn.center/astarnew/user/informationFeedback?' + new Date().getTime(),
			type: 'post',
			dataType: 'json',
			data: {
				strP:chrome.runtime.id, strlognid: email, message: informationFeedbackData
			},
			success: function(json){
				$("#load_div").hide()
				localStorage['feedback_time'] = temp_time + 600 * 1000
				if(json.nCode != 0){
					showMessage(json.strText)
					return ;
				}
                showMessage("submit is success!")
                
                $("#informationFeedback-href").removeClass("kt-widget__item--active")
                $("#informationFeedbackDiv").hide()
                $("#account-href").addClass("kt-widget__item--active")
                $("#accountInfo").show()
			},
			error: function(){
				$("#load_div").hide()
				console.info("service net exception");
			}
		})
    })

})