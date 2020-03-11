'use strict';

var display = document.getElementById("beardyapp");
var bp = document.createElement("p");
var bline = document.createTextNode("");
bp.appendChild(bline);
display.appendChild(bp);

var updateDisplay = function(blobj) {
  bline.textContent = blobj.braille();
};

var test = new BrailleLine("THIS IS A TEST", 40);
updateDisplay(test);
