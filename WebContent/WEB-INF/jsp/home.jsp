<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
	<script data-main="/AcademicFileCloud/script/elFinder-2.1.29/main.default.js" src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min.js"></script>
<script  src="/AcademicFileCloud/script/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="/AcademicFileCloud/script/elFinder-2.1.29/js/elfinder.min.js" type="text/javascript">
<!--

//-->
</script>
<script type="text/javascript">
define('elFinderConfig', {
	// elFinder options (REQUIRED)
	// Documentation for client options:
	// https://github.com/Studio-42/elFinder/wiki/Client-configuration-options
	defaultOpts : {
		url : '' // connector URL (REQUIRED)
		,commandsOptions : {
			edit : {
				extraOptions : {
					// set API key to enable Creative Cloud image editor
					// see https://console.adobe.io/
					creativeCloudApiKey : '',
					// browsing manager URL for CKEditor, TinyMCE
					// uses self location with the empty value
					managerUrl : ''
				}
			}
			,quicklook : {
				// to enable preview with Google Docs Viewer
				googleDocsMimes : ['application/pdf', 'image/tiff', 'application/vnd.ms-office', 'application/msword', 'application/vnd.ms-word', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
			}
		}
		// bootCalback calls at before elFinder boot up 
		,bootCallback : function(fm, extraObj) {
			/* any bind functions etc. */
			fm.bind('init', function() {
				// any your code
			});
			// for example set document.title dynamically.
			var title = document.title;
			fm.bind('open', function() {
				var path = '',
					cwd  = fm.cwd();
				if (cwd) {
					path = fm.path(cwd.hash) || null;
				}
				document.title = path? path + ':' + title : title;
			}).bind('destroy', function() {
				document.title = title;
			});
		}
	},
	managers : {
		// 'DOM Element ID': { /* elFinder options of this DOM Element */ }
		'elfinder': {}
	}
});
$(document).ready(function(){
	
	var options = {
			url  : '',
			lang : 'es'
		}
	$('#elfinder').elfinder(options);
});
</script>

<html>
<head>
	<meta name="_csrf" content="${_csrf.token}"/>
	<meta name="_csrf_header" content="${_csrf.headerName}"/>
</head>
<body>
 	<h1>home</h1>
 	<div id="elfinder"></div>
</body>
</html>