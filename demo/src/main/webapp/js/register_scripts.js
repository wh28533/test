

$(document).ready(function(){
	// 0-2. emailjs setting
    emailjs.init("El64pXGFt1yyN08hF");


    // 1. pw show/hide
    $(document).on('click', '.pw-confirm', function(){
        var passwordField = $(this).prev();
        if(passwordField.attr('type') == 'password'){
            $(this).replaceWith("<i class='fa-regular fa-eye pw-confirm'></i>")
            passwordField.attr('type', 'text');
        } else {
            $(this).replaceWith("<i class='fa-solid fa-eye pw-confirm'></i>")
            passwordField.attr('type', 'password');
        }
    });


    // 2. validity check
    // 2-0. email
    const email_confirm = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    var target_email = $('#email-signup-email')
    target_email.keyup(function(e){
        var value = e.target.value;
        var check = email_confirm.test(value);
        if(check){
            target_email.css('border-color','#787878');
            target_email.css('box-shadow','0 0 0 0 #000000');
        }
        else{
            target_email.css('box-shadow','0 0 6px 0.18rem #FF3333');
            target_email.css('border-color','red');
        }
    });  
    
    // 2-1. pw
    const pw_confirm = /.{8,}$/;
    var target_pw = $('#email-signup-password')
    target_pw.keyup(function(e){
        var value = e.target.value;
        var check = pw_confirm.test(value);
        if(check){
            target_pw.css('border-color','#787878');
            target_pw.css('box-shadow','0 0 0 0 #000000');
        }
        else{
            target_pw.css('box-shadow','0 0 6px 0.18rem #FF3333');
            target_pw.css('border-color','red');
        }
    });  

    // 2-2 pw confirm
    var target_confirmpw = $('#email-signup-confirmpw')
    target_confirmpw.keyup(function(e){
        var value = e.target.value;
        if(value == $('#email-signup-password').val() ){
            target_confirmpw.css('border-color','#787878');
            target_confirmpw.css('box-shadow','0 0 0 0 #000000');
        }
        else{
            target_confirmpw.css('box-shadow','0 0 6px 0.18rem #FF3333');
            target_confirmpw.css('border-color','red');
        }
    });  


    // 3. modal event
    $('.seemore').click(function(){
        $('.modal').css('display', 'flex');
    });
    $('.modal-close').click(function(){
        $('.modal').css('display', 'none');
    });
    $('.modal-footer').click(function(){
        $('.modal').css('display', 'none');
        $('#agree1').prop("checked", true);
    });
  
  
	// 4. Email Register
	// 4-1. Email check
	$(".not-email").hide();
	$(".email-check-02").hide();
	let rand_number2;
    $('#email-check-button-01').click(function(){
		let verify_email = $('#email-signup-email').val();
		        
		if(verify_email==''){
			alert('Fill in the information.');
		}
		else if($('#email-signup-email').css('border-color') == 'rgb(255, 0, 0)'){
			alert('Fill in the information correctly.');
		}
		else{
			$.ajax({
	        	type:"post",
	        	url: "http://localhost:8080/demo/checkEmail",
	        	async : false,
	        	data : {"email":verify_email},
	        	dataType : "text",
	        	success : function(data){
					if(data === 'usable') {
	                    console.log("Available : "+data);
	                    
	                    rand_number2 = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
				        console.log(verify_email, rand_number2);
				
				        var data = {
				            email : verify_email,
				            code : rand_number2
				        }
				        
				       	/*
				        emailjs.send('Dr_NEAR','template_14s83xt', data)
				        .then(function(response) {
				            console.log('[EMAILJS]register_', verify_email, '_sent');
				            //console.log( response.status, response.text);
				        }, function(error) {
				            console.log('[EMAILJS_ERROR]register_', verify_email, error.text);
				        });
				        */
				       
				       
				        $(".email-check-01").hide();
				        $("#email-signup-email").attr("disabled", true); 
				        alert('Check your email verification number.');
				        $(".email-check-02").show();
				        
	       
	                } else {
	                   console.log("Not available : "+data);
	                   alert('An account with the same email already exists. Please use another email.');
	                }
				},
				error:function (data) {
	                console.log('checkEmail error');
	            }
    		});
		}
        
	});
	
	// 4-2. Email Authentication Number check
	$('#email-check-button-02').click(function(){
		let authentication_number = $('#email-signup-authentication-number').val();
		        
		if(authentication_number==''){
			alert('Fill in the authentication number.');
		}
		else if(authentication_number!=rand_number2){
			alert('The authentication number is incorrect.');
		}
		else{
			console.log("The authentication number is correct.");
			 $(".email-check-02").hide();
			 $(".not-email").show();
		}
	});
	
	
	// 4-3. Email Register
	$('#email-signup-button').click(function(){
		if ($('#email-signup-password').val()=='' ||
            $('#email-signup-confirmpw').val()=='' || $('#email-signup-department').val()=='' || 
            $('#email-signup-position').val()=='' || $('#email-signup-country').val()=='' || 
            $('#email-signup-city').val()=='' || $('#email-signup-name').val()==''){
                alert('Fill in the information.');
        }
        else if($('#email-signup-password').css('border-color') == 'rgb(255, 0, 0)'
                || $('#email-signup-confirmpw').css('border-color') == 'rgb(255, 0, 0)'
                ){
            alert('Fill in the information correctly.');
        }
        else if($('#agree1').is(':checked')==false || $('#agree2').is(':checked')==false){
            alert('Check the check box.');
        }
		else{
			$.ajax({
	        	type:"post",
	        	url: "http://localhost:8080/demo/registerEmail",
	        	async : false,
	        	data : {"email":$('#email-signup-email').val(),
	        			"password":$('#email-signup-password').val(),
	        			"name":$('#email-signup-name').val(),
	        			"department":$('#email-signup-department').val(),
	        			"position":$('#email-signup-position').val(),
	        			"country":$('#email-signup-country').val(),
	        			"city":$('#email-signup-city').val() },
	        	dataType : "text",
	        	success : function(data){
					if(data === 'success') {
	                    console.log("register success. : "+data);
	                    //location.replace('');
	                } else {
	                   	console.log("register failure : "+data );
           				alert('registerEmail failure');
	                }
				},
				error:function (data) {
	                console.log('registerEmail error');
	            }
    		});
		}
	});
	
	
	// 5. Google Register
	$('#google-signup-button').click(function(){
		if ($('#google-signup-name').val()=='' || $('#google-signup-department').val()=='' || 
            $('#google-signup-position').val()=='' || $('#google-signup-country').val()=='' || 
            $('#google-signup-city').val()==''){
                alert('Fill in the information.');
        }
        else if($('#agree1').is(':checked')==false || $('#agree2').is(':checked')==false){
            alert('Check the check box.');
        }
		else{
			let email = localStorage.getItem("email");
			localStorage.clear();
			$.ajax({
	        	type:"post",
	        	url: "http://localhost:8080/demo/registerGoogle",
	        	async : false,
	        	data : {"email":email,
						"name":$('#google-signup-name').val(),
	        			"department":$('#google-signup-department').val(),
	        			"position":$('#google-signup-position').val(),
	        			"country":$('#google-signup-country').val(),
	        			"city":$('#google-signup-city').val() },
	        	dataType : "text",
	        	success : function(data){
					if(data === 'success') {
	                    console.log("register success. : "+data);
	                    //location.replace('');
	                } else {
	                   	console.log("register failure : "+data );
           				alert('registerGoogle failure');
	                }
				},
				error:function (data) {
	                console.log('registerGoogle error');
	            }
    		});
		}
	});
    

});
