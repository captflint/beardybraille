function BrailleCell(value) {

	const bascii = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=";
	this.value = 0;

	this.ascii = function() {
		return bascii[this.value];
	}

	this.braille = function() {
		return String.fromCodePoint(0x2800 + this.value);
	}

	this.setFromArray = function(a) {
		let sum = 0;
		for (let i = 1; i <= 6; i++) {
			if (a.includes(i)) {
				sum += 2**(i-1);
			}
		}
		this.value = sum;
	}

	this.setFromAscii = function(value) {
		if (bascii.includes(value)) {
			this.value = bascii.indexOf(value);
		} else {
			throw "Invalid character";
		}
	}

	this.setFromUnicode = function(value) {
		let bunicode = "";
		for (let i = 0; i < 64; i++) {
			bunicode += String.fromCodePoint(0x2800 + i);
		}
		if (bunicode.includes(value)) {
			this.value = bunicode.indexOf(value);
		} else {
			throw "Invalid character";
		}
	}

	if (typeof(value) === "number") {
		if (!(Number.isInteger(value))) {
			throw "Must be an int";
		}
		if (value < 0) {
			throw "Number too low";
		}
		if (value > 63) {
			throw "Number too high";
		}
		this.value = value;
	} else if (Array.isArray(value)) {
		this.setFromArray(value);
	} else if (typeof(value) === "string") {
		if (value.length === 1) {
			if (value.charCodeAt(0) < 128) {
				this.setFromAscii(value);
			} else {
				this.setFromUnicode(value);
			}
		} else {
			throw "String must contain only a single character";
		}
	} else {
		throw "Invalid input";
	}
};

function BrailleLine(content, width) {
	this.content = [];

	if (typeof(width) === "number") {
		if (Number.isInteger(width)){
			if (width < 1) {
				throw "width must be positive";
			} else {
				this.width = width
			}
		} else {
			throw "width must be an int";
		}
	} else {
		throw "width must be an int";
	}

	for (const cell in content) {
		this.content.push(new BrailleCell(cell));
	}

	this.toAscii = function() {
		let rstr = "";
		for (const cell in this.content) {
			rstr += cell.ascii();
		}
		return rstr;
	}

	this.toBraille = function() {
		let rstr = "";
		for (const cell in this.content) {
			rstr += cell.braille();
		}
		return rstr;
	}
}
