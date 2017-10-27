var blockSizeInBits = 128;
var IRREDUCIBLEPOLYNOMIAL="00100010101";
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

function transposed(block){
	
	var r0=[],r1=[],r2=[],r3=[];
	for(var i=0;i<block.length;i++){
		var table=[];	
		for(var j = 0;j<block.length;j++){
			switch(j%4){
				case 0:
					r0.push(block[i][j]);
					break;
				case 1:
					r1.push(block[i][j]);
					break;
				case 2:
					r2.push(block[i][j]);
					break;
				case 3:
					r3.push(block[i][j]);
					break;
				default:
					break;
			}
		}
		table.push(r0);
		table.push(r1);
		table.push(r2);
		table.push(r3);
	}
	return table;
}

function hex2bin(hex){
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
}

function reverse(s){
    return s.split("").reverse().join("");
}

function xor(a,b){
	res =""
	for(var i = 0 ; i<a.length; i++){
		res+= Number(a.charAt(i)) ^ Number(b.charAt(i));
	}
	return res;
}
function shiftLeft(str,n){
	try{
		str=str.substring(n,str.length);
		for(var i=0;i<n;i++){
			str+="0";
		}
	}catch(e){
		log.debug(e)
	} 
	
	return str;
}

function gnerateMultiplications(){
	var multiplicatios={};
	 var elements= ["01","02","03","09","0b","0d","0e"];
	for(var i=0;i<elements.length; i++){
		var item={}; 
		for(var j=0;j<256;j++){
			var key=j.toString(16);
			if(j != 0){
				if(j != 1 ){
					obj=multiplicate(elements[i],key);
				}else{
					obj=elements[i];
				}
					
			}else
				obj="00";	
			item[key]=obj;	 	
		}
	 
		multiplicatios[elements[i]]=item;		
	}	

	data = [];
	data.push( JSON.stringify(multiplicatios, null, "\t"));
	properties = {type: 'plain/text'}; // Specify the file's mime-type.
	var file;
	var url;
	try {
	  // Specify the filename using the File constructor, but ...
	  file = new File(data, "multiplications.js", properties);
	} catch (e) {
	  // ... fall back to the Blob constructor if that isn't supported.
	  file = new Blob(data, properties);
	}
	
	url = URL.createObjectURL(file);
	return url;
}


function multiplicate(a,b){
var aBin=reverse(hex2bin(a));
var	bBin=reverse(hex2bin(b));
//	console.debug("a = " + aBin);
//	console.debug("b = " + bBin);
	var arr=[0,0,0,0,0,0,0,0,0,0,0];
	var res="";
	for(var i=0;i<aBin.length;i++){
		for(var j=0;j<bBin.length;j++){
			if(aBin.charAt(i) == "1" && bBin.charAt(j) =="1" ){
				arr[i+j] =  arr[i+j] +1 ;
			}
		}
	}
	
	for(var i=arr.length-1;i>=0;i--){
		if(arr[i] % 2  != 0 &&  arr[i] != 0 ){
			res+="1";
		}else{
			res+="0";
		}
	}
	res=reverse(res);
//	console.debug("before mod : " + res);
	if(comparePolynomials(reverse(res),IRREDUCIBLEPOLYNOMIAL)){
	  res = polynomialMod(res,reverse(IRREDUCIBLEPOLYNOMIAL));
	}
	intVal =  parseInt(reverse(res), 2);
	res= intVal.toString(16);
	
	if(res.length == 1){
		res = "0" + res; 
	}
	
	return res;
}



function comparePolynomials(a,b){
	var i= a.indexOf("1");
	var j = b.indexOf("1");
	if(i<j || i == j)
		return true;
	else
		return false;
}



function polynomialMod(dividendo,divisor){
	var aux = dividendo;
	while(comparePolynomials(reverse(aux),reverse(divisor))){
		var n =  reverse(divisor).indexOf("1") -reverse(aux).indexOf("1");
		var shifted=reverse(shiftLeft(reverse(divisor),n));
		aux=xor(aux,shifted);
	}
	
	return aux;
}