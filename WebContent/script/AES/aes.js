var keySizeBytes=32; // 256 bits
var nr = 14;

mixColumnMatrix=[];

function encryptfile(byteArray,name){
// 	console.debug(byteArray);
	var arr=[16];
// 	arr=byteArray;
	console.debug(name);
	blockArray=createBlocks(byteArray);
	 key = Generate_key();
	 console.debug(key.length);
//	 	for(var i= 0; i<blockArray.length;i++){
//	 		console.debug(blockArray[i]);
	 		cipheredBlock=[];
	 		cipheredBlock=roundKey(blockArray[0],key);
	 		roudKey=[];
//	 		for(var i=0;i<nr-1;i++){
	 		console.debug("before round" +  cipheredBlock);
	 			cipheredBlock=vueltaRegular(cipheredBlock,roundKey);
	 			console.debug("after round" +  cipheredBlock);	
//	 		}
//	 	}
	 
}


function createBlocks(byteArray){
	blockArray=new Array();
	var i=Math.ceil(byteArray.length/16);
	inicio=0;
	fin = 16;
	for(var j=0;j< i; j++){
		arr=byteArray.slice(inicio,fin);
		if(arr.length<16){
			var buffer = new ArrayBuffer(16);
			var uint8 = new Uint8Array(buffer);
			uint8.set(arr, 0);
			arr=uint8;
		} 	
		blockArray.push(arr);
		inicio += 16;
		fin += 16;
	}
	
	return blockArray;
}


function Generate_key() {
    var i, j, k = "";
    var seed = keyFromEntropy();	
    var prng = new AESprng(seed);
    var hexDigits = "0123456789abcdef";
    
    for (i = 0; i < keySizeBytes; i++) {
        k += hexDigits.charAt(prng.nextInt(15));
    }
    return k;
}
function roundKey(block,key){
	console.debug("block "+block);
//	console.debug("block  length "+ block.length);
	hexBlockStr = toHexString(block);
	console.debug("hexblock "+hexBlockStr);
	console.debug("key" + key);
//	console.debug("key length" + key.length);
	console.debug("hexblock length"+hexBlockStr.length);
	hexaBlockArr= hexBlockStrToArray(hexBlockStr);
	hexKeyArr= hexBlockStrToArray(key);
	var state = generateTable(hexaBlockArr);
	var subkey= generateTable(hexKeyArr);
	console.debug(state);
	console.debug(subkey);
	return hexXor(state,subkey);
	
}

function vueltaRegular(block,roundKey){
	block=subByte(block);
	console.debug("before shift " +  block);
		block=shiftRow(block);
		console.debug("after shift " +  block);
//	block=mixColumns(block)
//	block=roundKey(block,roundKey);
	
	return block;
}


function vueltaFinal(block,roundKey){
	
	block=shiftRow(block)
	block=roundKey(block,roundKey);
	
	return block;
}


function subByte(block){
	 for(var i=0; i<4; i++){
		 for(var j=0;j<4; j++){
			 block[i][j]=sbox[block[i][j]];
		 }
	 }
	 
	 return block;
}

function shiftRow(block){
	var result=[];
	for(var i = 0; i<4; i++){
		result.push(rotateArray(block[i],i));
	}
	return result;
}

function generateTable(hexArray){
	var table=[];
	var r0=[],r1=[],r2=[],r3=[];
	for(var i = 0;i<16;i++){
		switch(i%4){
			case 0:
				r0.push(hexArray[i]);
				break;
			case 1:
				r1.push(hexArray[i]);
				break;
			case 2:
				r2.push(hexArray[i]);
				break;
			case 3:
				r3.push(hexArray[i])
				break;
			default:
				break;
		}
	}
	table.push(r0);
	table.push(r1);
	table.push(r2);
	table.push(r3);

	return table;
}

function hexXor(state, subkey){
	var result=[];
 for(var i=0; i<4; i++){
	var row=[];	 
	 for(var j=0;j<4; j++){
		  intvalue=parseInt(state[i][j], 16) ^  parseInt(subkey[i][j], 16);
//		  console.debug(state[i][j] +" xor" + subkey[i][j] +"="+ intvalue);
		 row.push(intvalue.toString(16));
	 }
	 result.push(row);
 }
 
 return result;
}