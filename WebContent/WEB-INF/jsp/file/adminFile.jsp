<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<script  src="/AcademicFileCloud/script/jquery-3.2.1.min.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function () {
    $('#objFile').change(function () {
        uploadFile(this);
    });

});

function uploadFile(obj) {
    var input = obj;//document.getElementById('objFile');
    // var file = $("#objFile")[0].files[0];
    var file = input.files[0];
    console.debug("file->" +file);
    fr = new FileReader();
    fr.onload = receivedText;
    //fr.readAsText(file);
    fr.readAsDataURL(file);
    console.debug(fr);
}

function receivedText() {
    var b64Data = fr.result.split(',');
    alert(b64Data);
    var contentType = 'image/jpeg';
    //document.getElementById('editor').appendChild(document.createTextNode(fr.result))
    var byteCharacters = atob(b64Data[1]);
    var byteNumbers = Array.prototype.map.call(byteCharacters,
                                   charCodeFromCharacter);
    var uint8Data = new Uint8Array(byteNumbers);
    var blob = b64toBlob(b64Data[1], contentType);
//     var blobUrl = URL.createObjectURL(blob);
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
    alert(byteArray);
//     for (var i = 0; i < byteArray.length; i++) {
//         alert(byteArray[i]);
//     }

}
</script>
<html>
<head>
	<meta name="_csrf" content="${_csrf.token}"/>
	<meta name="_csrf_header" content="${_csrf.headerName}"/>
</head>
<body>
 	<h1>adminFile</h1>
 	<div>
    <input type="file" id="objFile" size="50" /><br />
    <br />
    <input type="button" id="cmdUpload" value="Upload" />
    <div id="editor"></div>
</div>
</body>
</html>