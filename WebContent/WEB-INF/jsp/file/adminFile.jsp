<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<script  src="/AcademicFileCloud/script/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="https://etherhack.co.uk/symmetric/aes/js/entropy.js"></script>
<script src="https://etherhack.co.uk/symmetric/aes/js/md5.js"></script>
<script src="https://etherhack.co.uk/symmetric/aes/js/aesprng.js"></script>
<script src="https://etherhack.co.uk/symmetric/aes/js/aes.js" type="text/javascript"></script>
<script  src="/AcademicFileCloud/script/file/adminFile.js" type="text/javascript"></script>
<script  src="/AcademicFileCloud/script/AES/utils.js" type="text/javascript"></script>
<script  src="/AcademicFileCloud/script/AES/aes.js" type="text/javascript"></script>
<script  src="/AcademicFileCloud/script/AES/sbox.js" type="text/javascript"></script>
<script  src="/AcademicFileCloud/script/AES/multiplications.js" type="text/javascript"></script>

<script type="text/javascript">
$(document).ready(function () {
    $('#objFile').change(function () {
        uploadFile(this);
    });

});


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