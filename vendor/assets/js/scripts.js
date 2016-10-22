"use strict";
jQuery(document).ready(function () {
	function setCookie(c_name,value,expiredays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
			((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+";path=/")
	}

	$('.page-container form').submit(function () {
		var target=this;
		var username = $(this).find('.username').val();
		var password = $(this).find('.password').val();
		var success = false;
		$.ajax({
			url: "data/systemUser/systemUser.json",
			async:false,
			success:function(users){
				for (var i = 0; i < users.length; i++) {
					if (username == users[i].nickName && password == users[i].password) {
						setCookie("user",JSON.stringify(users[i]));
						success = true;
					}
				}
			}
		});

		if (success) {
			return true;
		} else {
			$(target).find('.error').fadeOut('fast', function () {
				$(target).css('top', '27px');
			});
			$(target).find('.error').fadeIn('fast', function () {
				$(target).parent().find('.username').focus();
			});
			return false;
		}
	});

	$('.page-container form .username, .page-container form .password').keyup(function () {
		$(this).parent().find('.error').fadeOut('fast');
	});

});
