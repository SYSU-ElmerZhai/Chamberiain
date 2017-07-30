/**
 * Created by Haodong on 2017/5/26.
 */
$(function () {
    function bind() {
        $("div.content a.register").click(function () {
            $("div.register").show();
            
        });
        $("div.content a.forgetPassword").click(function () {
            $("div.forgetPassword").show();
        });
        $("div.registerTitle a").click(function () {
        	$("input#registerUser").val("");
        	$("input#registerPassword").val("");
        	$("input#registerPhoneNumber").val("");
        	$("input#registerChecked").val("");
            $("div.register").hide();
        });
        $("div.forgetPassword div.title a").click(function () {
            $("div.forgetPassword").hide();
        });
        $("div.newPassword div.title a").click(function () {
            $("div.newPassword").hide();
        });
        $("button#neededCancel").click(function () {
        	$("input#neededPhoneNumber").val("");
        	$("input#neededChecked").val("");
            $("div.forgetPassword").hide();
        });
        /*$("button#neededNext").click(function () {
            $("div.forgetPassword").hide();
            $("div.newPassword").show();
        });*/
        $("button#returnLogIn").click(function () {
            $("div.newPassword").hide();
        })
        $("input.inputUserName").focus(function(){
        	$("div.inputUser").css("border","2px solid #66cdcc");
        })
        $("input.inputUserName").blur(function(){
        	$("div.inputUser").css("border","2px solid #a7d8e6");
        })
        $("input.inputPassword").focus(function(){
        	$("div.inputPassword").css("border","2px solid #66cdcc");
        }).blur(function(){
        	$("div.inputPassword").css("border","2px solid #a7d8e6");
        })
    }
    bind();
    
    
    var checkedNumber;
    var count=60;//间隔函数，1秒执行
    var curCount;//当前剩余秒数
    $("button#getCheckedNumber").click(function(){
    	var phoneNumber=$("input#registerPhoneNumber").val();
    	var codeLength = 6;//验证码长度
    	var code="";//验证码
    	if(phoneNumber.length==0) {
    		alert("手机号不能为空");
    		return false;
    	}
    	function sendMessage() {
    		curCount=count;
    		//产生验证码
    		for (var i = 0 ;i < codeLength ; i++) {
    			code+=parseInt(Math.random()*9).toString();
    		}
    		checkedNumber=code;
    		$("button#getCheckedNumber").attr("disabled","true");
    		$("button#getCheckedNumber").text(curCount+"秒");
    		InterValObj=window.setInterval(setRemainTime,1000);
    		//向后台发送数据
    		$.ajax({
    			type:"POST",
    			dataType:"text",
    			url:"https://sms.yunpian.com/v2/sms/single_send.json",
    			//data:"&apikey=b9c42e318dbd5914d066b538c9bf6106&mobile="+phoneNumber+"&text=【云片网】您的验证码是"+code,
    			data:{apikey:"b9c42e318dbd5914d066b538c9bf6106",mobile:phoneNumber,text:"【云片网】您的验证码是"+code},
    			//success:function(data,textStatus){console.log(textStatus);},
    			complete:function(XMLHttpRequest,textStatus){
    				console.log(textStatus);
    			}
    		});
    		console.log("已经发送请求");
    	}
    	sendMessage();
		function setRemainTime() {
			if(curCount==0) {
				window.clearInterval(InterValObj);
				$("button#getCheckedNumber").removeAttr("disabled");
				$("button#getCheckedNumber").text("获取验证码");
				code="";
			}
			else {
				curCount--;
				$("button#getCheckedNumber").text(curCount+"秒");
			}
		}
    })
    
   $("input.registerButton").click(function(){
	   var pattern=/\d{11}/;
	   if($("input#registerUser").val().length==0) {
		   document.getElementById("registerUser").style.border="1px solid #e74c3c";
		   alert("用户名不能为空");
		   return false;
	   } else if($("input#registerPassword").val().length<7) {
		   document.getElementById("registerUser").style.border="1px solid #e1e1e1";
		   document.getElementById("registerPassword").style.border="1px solid #e74c3c";
		   alert("为保障账号安全，请设置密码并且长度不得小于7");
		   return false;
	   } else if($("input#registerPhoneNumber").val().length==0) {
		   document.getElementById("registerUser").style.border="1px solid #e1e1e1";
		   document.getElementById("registerPassword").style.border="1px solid #e1e1e1";
		   document.getElementById("registerPhoneNumber").style.border="1px solid #e74c3c";
		   alert("请输入正确的手机号码");
		   return false;
	   } else if(!pattern.test($("input#registerPhoneNumber").val())){
		   alert("请输入正确的11位的手机号来注册账号");
		   document.getElementById("registerUser").style.border="1px solid #e1e1e1";
		   document.getElementById("registerPassword").style.border="1px solid #e1e1e1";
		   document.getElementById("registerPhoneNumber").style.border="1px solid #e74c3c";
		   //console.log("手机号位数不是11");
		   return false;
	   }
	   else if($("input#registerChecked").val().length==0){
	     document.getElementById("registerUser").style.border="1px solid #e1e1e1";
	     document.getElementById("registerPassword").style.border="1px solid #e1e1e1";
	     document.getElementById("registerPhoneNumber").style.border="1px solid #e1e1e1";
	     document.getElementById("registergetCheckedNumber").style.border="1px solid #e74c3c";
		   alert("验证码输入不能为空");
		   return false;
	   } else if($("input#registerChecked").val()!=checkedNumber) {
	   	     document.getElementById("registerUser").style.border="1px solid #e1e1e1";
	   	     document.getElementById("registerPassword").style.border="1px solid #e1e1e1";
	   	    document.getElementById("registerPhoneNumber").style.border="1px solid #e1e1e1";
	   	     document.getElementById("registergetCheckedNumber").style.border="1px solid #e74c3c";
		   alert("请根据短信提示输入正确的验证码");
		   $("input#registerChecked").val("");
		   return false;
	   } else if(curCount==0) {
	   	 document.getElementById("registerUser").style.border="1px solid #e1e1e1";
	     document.getElementById("registerPassword").style.border="1px solid #e1e1e1";
	     document.getElementById("registerPhoneNumber").style.border="1px solid #e1e1e1";
	     document.getElementById("registergetCheckedNumber").style.border="1px solid #e74c3c";
		   alert("验证码已超时，请重新获取验证码");
		   checkedNumber="";
		   $("input#registerChecked").val("");
		   return false;
		} 
	   else {
		     document.getElementById("registerUser").style.border="1px solid #e1e1e1";
		    document.getElementById("registerPassword").style.border="1px solid #e1e1e1";
		     document.getElementById("registerPhoneNumber").style.border="1px solid #e1e1e1";
		     document.getElementById("registergetCheckedNumber").style.border="1px solid #e1e1e1";
		   alert("信息全部正确");
		   //console.log("信息正确进入后台");
		   return true;
	   }  
   })
   $("button#needidButton").click(function(){
	   var PhoneNumber=$("input#neededPhoneNumber").val();
   	   var codeLength = 6;//验证码长度
   	   var code="";//验证码
   	   var pattern=/\d{11}/;
   	   if(PhoneNumber.length==0) {
   		document.getElementById("neededPhoneNumber").style.border="1px solid #e74c3c";
   		   alert("手机号不能为空");
   		   return false;
   	   }else if(!pattern.test(PhoneNumber)) {
   		document.getElementById("neededPhoneNumber").style.border="1px solid #e74c3c";
   		   alert("请输入正确的手机号以获得验证码");
   		   return false;
   	   }   
   	function sendMessage() {
		curCount=count;
		//产生验证码
		for (var i = 0 ;i < codeLength ; i++) {
			code+=parseInt(Math.random()*9).toString();
		}
		checkedNumber=code;
		$("button#needidButton").attr("disabled","true");
		$("button#needidButton").text(curCount+"秒");
		InterValObj=window.setInterval(setRemainTime,1000);
		//向后台发送数据
		$.ajax({
			type:"POST",
			dataType:"text",
			url:"https://sms.yunpian.com/v2/sms/single_send.json",
			//data:"&apikey=b9c42e318dbd5914d066b538c9bf6106&mobile="+phoneNumber+"&text=【云片网】您的验证码是"+code,
			data:{apikey:"b9c42e318dbd5914d066b538c9bf6106",mobile:PhoneNumber,text:"【云片网】您的验证码是"+code},
			//success:function(data,textStatus){console.log(textStatus);},
			complete:function(XMLHttpRequest,textStatus){
				console.log(textStatus);
			}
		});
			//console.log("已经发送请求");
   		}
   		sendMessage();
		function setRemainTime() {
			if(curCount==0) {
				window.clearInterval(InterValObj);
				$("button#needidButton").removeAttr("disabled");
				$("button#needidButton").text("获取验证码");
				code="";
			}
			else {
				curCount--;
				$("button#needidButton").text(curCount+"秒");
			}
		}
   		
   })
   $("button#neededNext").click(function(){
	   var PhoneNumber=$("input#neededPhoneNumber").val();
	   var neededChecked=$("input#neededChecked").val();
	   if(PhoneNumber.length==0){
		   alert("请输入手机号以取得验证码");
		   $("input#neededChecked").val("");
		   return false;
	   }else if(neededChecked.length==0) {
		   alert("验证码不能为空，请输入正确的验证码");
		   $("input#neededChecked").val("");
		   return false;
	   }else if(neededChecked!=checkedNumber){
		   alert("请按照短信提示，输入正确的验证码");
		   $("input#neededChecked").val("");
		   return false;
	   } else {
	   
		   alert('验证码输入成功');
           $("div.forgetPassword").hide();
           $("div.newPassword").show();
           $("div.glyphicon-ok").hide();
           $("div.newPassword input.userPhoneNumber").val(PhoneNumber);
           $("div.newPassword input.userPhoneNumber").hide();
		   return true;
	   }
   })
   $("input#returnLogIn").click(function(){
	   var newPassword=$("input#inputPassword").val();
	   var confirmPassword=$("input#confirmPassword").val();
	   
	  if(newPassword.length==0){
		  document.getElementById("inputPassword").style.border="1px solid #e74c3c";
		  alert("请输入您要设置的密码");
		  return false;
	  } else if (confirmPassword.length==0) {
		  document.getElementById("inputPassword").style.border="1px solid #e1e1e1";
		  document.getElementById("confirmPassword").style.border="1px solid #e74c3c";
		  alert("请输入确认密码");
		  return false;
	  } else if(newPassword.length<7){
		  document.getElementById("inputPassword").style.border="1px solid #e74c3c";
		  alert("为了保障您的安全，请确认您的密码不能少于7位");
		  $("input#inputPassword").val("");
		  $("input#confirmPassword").val("");
		  return false;
	  }else if(newPassword!=confirmPassword){
		  //document.getElementById("inputPassword").style.border="1px solid #e74c3c";
		  document.getElementById("confirmPassword").style.border="1px solid #e74c3c";
		  alert("请确保输入的确认密码和新密码相同");
		  $("input#confirmPassword").val("");
		  return false;
	  } else {
		  document.getElementById("inputPassword").style.border="1px solid #e1e1e1";
		  document.getElementById("inputPassword").style.border="1px solid #e1e1e1";
		  return true;
	  }
   })
   $("a.showPassword").click(function(){
	   var password_input=document.getElementById("user_password");
	   if(password_input.type=="password") {
		   password_input.type="text";
	   }else {
		   password_input.type="password";
	   }
   })

   

});