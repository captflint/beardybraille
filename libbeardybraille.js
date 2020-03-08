function BrailleCell(value) {

	const bascii = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=";
	this.value = 0;

	this.ascii = function() {
		return bascii[this.value];
	}
	
	this.braille = function() {
		return String.fromCharCode(0x2800 + this.value);
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
	} else {
		throw "Invalid input";
	}
};
