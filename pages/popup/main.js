window.onload = function(){
    scrypt = scrypt_module_factory()
    document.getElementById('submit').addEventListener('click', function(){
	var username_utf8 = $('#username').val()
	var secret_utf8 = $('#secret').value
	var username_uint8 = scrypt.encode_utf8(username_utf8)
	var secret_uint8 = scrypt.encode_utf8(secret_utf8)	
	var length_utf8 = document.getElementById('length_').value
	var length_int = parseInt(length_utf8)
	$('#wrapper').empty().append($('<div>', {id: 'message'}).text("Calculating..."))
	setTimeout(function(){calculate_password(username_uint8, secret_uint8, length_int)}, 1)
    })
}
function calculate_password(username_uint8, secret_uint8, length_){
    var password_uint8 = scrypt.crypto_scrypt(
	username_uint8, secret_uint8, Math.pow(2, 14), 8, 1, length_ / 8)
    password = btoa(String.fromCharCode.apply(null, password_uint8))    
    console.log(password)
    password = password.replace(/\//g, '0')
    password = password.replace(/\+/g, '0')    
    if(!(/[a-z]/.test(password))){password = 'a' + password.slice(1)}
    if(!(/[A-Z]/.test(password))){password = 'A' + password.slice(1)}
    if(!(/[0-9]/.test(password))){password = '0' + password.slice(1)}	
    console.log(password)
    var div = $('<textarea/>').text(password).appendTo($('body')).select()
    document.execCommand('copy')
    div.remove()
    $('#wrapper').empty()
    $('<div>', {'id': 'message'}).appendTo($('#wrapper')).text('Password copied to clipboard.')
}
