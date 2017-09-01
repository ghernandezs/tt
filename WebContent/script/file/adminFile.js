
function uploadFile(obj) {
    var input = obj;//document.getElementById('objFile');
    // var file = $("#objFile")[0].files[0];
    var file = input.files[0];
   	 console.debug(file);
    fr = new FileReader();
    fr.onload = receivedText;
    result = null;
    flag=false;
    name=file.name
    fr.onloadend = function()
    {
    	
    	var fname=parent.name;
    	encryptfile(byteArr,fname);
    };
    
  
    //fr.readAsText(file);
    fr.readAsDataURL(file);
//     console.debug("-->");
//     console.debug(result);
    return result;
}

var byteArr=[];
function receivedText() {
    var b64Data = fr.result.split(',');
    var contentType = 'image/jpeg';
    var byteCharacters = atob(b64Data[1]);
    var byteNumbers = Array.prototype.map.call(byteCharacters,
                                   charCodeFromCharacter);
    var uint8Data = new Uint8Array(byteNumbers);
    var blob = b64toBlob(b64Data[1], contentType);
    byteArr=blob;
}
