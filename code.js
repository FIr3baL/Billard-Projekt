// Zahlensystem mit 65 Zeichen

function Alphabet65() {
	alpha65 = new Array();
	// Ziffern [0-9]
	for (var i = 0; i < 10; i++) {
		alpha65.push(''+i);
	}
	// Buchstaben [A-Z]
	for (var i = 65; i < 91; i++) {
		alpha65.push(String.fromCharCode(i));
	}
	// Buchstaben [a-z]
	for (var i = 97; i < 123; i++) {
		alpha65.push(String.fromCharCode(i));
	}
	// ZEichen - _ . ~
	alpha65.push('-');
	alpha65.push('_');
	alpha65.push('~');
	// alpha65.push('.');
}


function toA65(num) {
	var alphaString = '';
	if (num == 0) alphaString += num;
	while (num > 0) {
		alphaString = alpha65[num % 65] + alphaString;
		num = Math.floor(num / 65);
	}

	if (alphaString.length == 1) alphaString = '0' + alphaString;
	return alphaString;
}

function fromA65(str) {
	var alpha;
	var num = 0;
	for (var i = 0; i < str.length; i++) {
		num += Math.pow(65, str.length-i-1) * alpha65.indexOf((str.substr(i,1)));
	}
	return num;
}