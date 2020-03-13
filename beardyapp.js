'use strict';

var display = document.getElementById("beardyapp");
var bp = document.createElement("p");
var bline = document.createTextNode("");
bp.appendChild(bline);
display.appendChild(bp);

var updateDisplay = function(blobj) {
  bline.textContent = blobj.braille();
};

// this will need to be deleted later
var test = new BrailleLine("", 40);

var dotnums = [];
var parseDotKey = function(keyCode) {
  let i = "fdsjkl".indexOf(keyCode.key);
  if (++i) {
    dotnums.push(i);
  }
};

var keyHandler = function(keyCode) {
  if (keyCode.key === " ") {
    test.append(dotnums);
    updateDisplay(test);
    dotnums = [];
  } else {
    parseDotKey(keyCode);
  }
};

document.addEventListener("keydown", keyHandler);
