window.onload = function(){
    scrypt = scrypt_module_factory()
    document.getElementById('submit').addEventListener('click', function(){
	var username_utf8 = $('#username').val()
	var secret_utf8 = $('#secret').value
	var username_uint8 = scrypt.encode_utf8(username_utf8)
	var secret_uint8 = scrypt.encode_utf8(secret_utf8)
	var length_ = document.getElementById('length_').value
	$('#wrapper').empty().append($('<dic>', {id: 'message'}).text("Calculating..."))
	setTimeout(function(){calculate_password(username_uint8, secret_uint8, length_)}, 1)
    })
}
function calculate_password(username_uint8, secret_uint8, length_){
	var password_uint8 = scrypt.crypto_scrypt(
	    username_uint8, secret_uint8, Math.pow(2, 14), 8, 1, 16)
	var password_hex = scrypt.to_hex(password_uint8)
	var password_words = CryptoJS.enc.Hex.parse(password_hex)
	var password = CryptoJS.enc.Base64.stringify(password_words)
	password = password.replace(/=/g, '')
	password = password.replace(/\//g, '')
	password = password.replace(/\+/, '')
	if(!(/[a-z]/.test(password))){password = 'a' + password}
	if(!(/[A-Z]/.test(password))){password = 'A' + password}
	if(!(/[0-9]/.test(password))){password = '0' + password}	
	if(length_ == 'short'){password = password.slice(0, 8)}
	else if(length_ == 'long'){password = password.slice(0, 16)}	    
	var div = $('<textarea/>').text(password).appendTo($('body')).select()
	document.execCommand('copy')
	div.remove()
	$('#wrapper').empty()
	$('<div>', {'id': 'message'}).appendTo($('#wrapper')).text('Password copied to clipboard.')
}
