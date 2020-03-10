'use scrict';

// BraileCell constructor

function BrailleCell(value) {

  this.value; // must be int n; 0 <= n < 64
  let bascii = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=";

  setFromArray = function(a) {
    let sum = 0;
    for (let i = 1; i <= 6; i++) {
      if (a.includes(i)) {
        sum += 2 ** (i - 1);
      }
    }
    return sum;
  }

  setFromAscii = function(value) {
    if (bascii.includes(value)) {
      return bascii.indexOf(value);
    } else {
      throw "Invalid character";
    }
  }

  setFromUnicode = function(value) {
    let bunicode = "";
    for (let i = 0; i < 64; i++) {
      bunicode += String.fromCodePoint(0x2800 + i);
    }
    if (bunicode.includes(value)) {
      return bunicode.indexOf(value);
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
    this.value = setFromArray(value);
  } else if (typeof(value) === "string") {
    if (value.length === 1) {
      if (value.charCodeAt(0) < 128) {
        this.value = setFromAscii(value);
      } else {
        this.value = setFromUnicode(value);
      }
    } else {
      throw "String must contain only a single character";
    }
  } else {
    throw "Invalid input";
  }
};

// BrailleCell method definitions

BrailleCell.prototype.ascii = function() {
  return " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)="[this.value];
}

BrailleCell.prototype.braille = function() {
  return String.fromCodePoint(0x2800 + this.value);
}


// BrailleLine constructor function

function BrailleLine(content, width) {
  this.content = []; // an array of BrailleCell objects

  if (typeof(width) === "number") {
    if (Number.isInteger(width)) {
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

  if (typeof(content) === "string") {
    if (content.length > this.width) {
      throw "content too long for width";
    }
  } else {
    throw "content must be string";
  }

  for (const cell of content) {
    this.content.push(new BrailleCell(cell));
  }

}

// BrailleLine method definitions.

BrailleLine.prototype.ascii = function() {
  let rstr = "";
  for (const cell of this.content) {
    rstr += cell.ascii();
  }
  return rstr;
}

BrailleLine.prototype.braille = function() {
  let rstr = "";
  for (const cell of this.content) {
    rstr += cell.braille();
  }
  return rstr;
}
