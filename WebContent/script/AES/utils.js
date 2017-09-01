var blockSizeInBits = 128;
function hexToByteArray(hexString) {
	  if (hexString.indexOf("0x") == 0 || hexString.indexOf("0X") == 0)
	    hexString = hexString.substring(2);
	  hexString = hexString.replace(/[^A-Fa-f0-9]/g, ''); //remove non-hex chars
	  if (hexString.length % 2)             // must have even length
	    return;
	  var byteArray = [];
	  for (var i = 0; i<hexString.length; i += 2) 
	    byteArray[Math.floor(i/2)] = parseInt(hexString.slice(i, i+2), 16);
	  return byteArray;
}


function charCodeFromCharacter(c) {
    return c.charCodeAt(0);
}


function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 1024;
   var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = Array.prototype.map.call(slice, charCodeFromCharacter);
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return byteArray;


}

function toHexString(byteArray) {
	  return Array.from(byteArray, function(byte) {
	    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
	  }).join('')
	}

function hexBlockStrToArray(str){
	array=[];
	for(var i = 0;i<str.length;i++){
		if(i%2 == 0 ||  i == 0)
		array.push(str.substring(i,i+2));		
	}
	return array;
}


function rotateArray(array, steps) {
	  if(array.length < 2) {
	    return array.slice(0); // always return a copy
	  }
	  var n = steps % array.length;

	  if(n === 0) {
	    return array.slice(0); // always return a copy
	  }

	  if(n < 0) {
	    return array.slice(n).concat(array.slice(0, array.length+n));
	  } else {
	    return array.slice(n).concat(array.slice(0, n));
	  }
	}