// 5. Google Login / Register
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

function handleCredentialResponse(response) {
	const responsePayload = parseJwt(response.credential);
	console.log("Encoded JWT ID token: " + response.credential);
	console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    if (responsePayload){
		$.ajax({
        	type:"post",
        	url: "http://localhost:8080/demo/loginGoogle",
        	async : false,
        	data : {"email":responsePayload.email},
        	dataType : "text",
        	success : function(data){
				if(data === 'usable') {
                    console.log("Login success. ( "+data+ " )");
                    // Session 해야
                } else {
                   console.log("There is no users ( email : "+data + " )");
                   localStorage.setItem("email",responsePayload.email );
                   window.location.href="register-google.html";
                }
			},
			error:function (data) {
                console.log('error');
            }
    	});
	}
}

function signout(){
	google.accounts.id.disableAutoSelect();
	alert("bye");
}


$(document).ready(function(){
	// 0. Setting
	// 0-1. Google API setting
	google.accounts.id.initialize({
		client_id: '810881042250-il0mmkd0m3japrej8mfh1opm55d2ku46.apps.googleusercontent.com',
      	callback: handleCredentialResponse
      	
    });
    
    // 0-2. Google Login button
    google.accounts.id.renderButton(
      	document.getElementById("buttonDiv"),
      	{
      		type:"standard",
		    size:"large",
		    theme:"outline",
		    text:"signin_with",
		    shape:"rectangular",
		    logo_alignment:"left",
		    width:400,
		    locale:"en_US"
      	}
    );
    
     //google.accounts.id.prompt();
     
     
     // 1. Email login
     
     $('#login-button').click(function(){
	
		if ($('#login-email').val()=='' || $('#login-password').val()==''){
                alert('Fill in the information.');
        }
		else{
			$.ajax({
	        	type:"post",
	        	url: "http://localhost:8080/demo/loginEmail",
	        	async : false,
	        	data : {"email":$('#login-email').val(),
						"password":$('#login-password').val()},
	        	dataType : "text",
	        	success : function(data){
					if(data === 'success') {
	                    console.log("login success. : "+data);
	                    //location.replace('');
	                } else {
	                   	console.log("login failure : "+data );
	                }
				},
				error:function (data) {
	                console.log('loginEmail error');
	            }
    		});
		}
		
	});
     
     
});

